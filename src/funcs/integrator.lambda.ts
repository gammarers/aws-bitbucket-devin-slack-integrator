import * as crypto from 'crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { WebClient } from '@slack/web-api';
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import axios from 'axios';

const SECRET_MANAGER_GET_URL = 'http://localhost:2773/secretsmanager/get';
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || '';
const TABLE_NAME = process.env.TABLE_NAME!;
const SECRET_NAME = process.env.SECRET_NAME!;

const ddbClient = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(ddbClient);

type Secrets = {
  BitbucketSecretToken: string;
  SlackSecretToken: string;
  SlackDevinUserIdentifier: string;
  BitbucketDevinUserAccountId: string;
};

const responseHeaders = {
  'Content-Type': 'application/json',
};

const getSlackThreadTimeStamp = (async(prid: number) => {
  const response = await ddb.send(new GetCommand({
    TableName: TABLE_NAME,
    Key: { prid },
  }));
  return response.Item?.threadTs;
});

const putSlackThreadTimeStamp = (async(prid: number, ts: string) => {
  const response = await ddb.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: { prid, threadTs: ts },
  }));
  console.log(response);
});

const deleteSlackThreadTimeStamp = (async(prid: number) => {
  const response = await ddb.send(new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { prid },
  }));
  console.log(response);
});

// Bitbucket webhook signature の検証
const validateBitbucketSignature = (payload: string, signature: string, secret: string): boolean => {
  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(new TextEncoder().encode(hash), new TextEncoder().encode(signature.replace('sha256=', '')));
};

export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyResultV2> => {
  const channelId = event.pathParameters?.channel;
  if (!channelId) {
    return { statusCode: 400, body: 'Missing channel parameter' };
  }

  // Get Bitbucket Secret by SecretManager
  const secrets = await (async () => {
    const result = await axios.get(SECRET_MANAGER_GET_URL, {
      params: {
        secretId: encodeURIComponent(SECRET_NAME),
      },
      headers: {
        'X-Aws-Parameters-Secrets-Token': AWS_SESSION_TOKEN,
      },
    });
    return JSON.parse(result.data.SecretString) as Secrets;
  })();

  // Validate Bitbucket webhook signature
  const signature = event.headers['x-hub-signature'] || '';
  const bodyRaw = event.body!;
  if (!validateBitbucketSignature(bodyRaw, signature, secrets.BitbucketSecretToken)) {
    return { statusCode: 403, body: 'Invalid Bitbucket signature' };
  }

  const payload = JSON.parse(bodyRaw);
  console.log(payload);

  const eventType = event.headers['x-event-key']; // e.g., "pullrequest:created"
  let text: string;
  let prid: number;

  const slackClient = new WebClient(secrets.SlackSecretToken);

  if (eventType?.startsWith('pullrequest:')) {
    const pr = payload.pullrequest;
    prid = pr.id as number;

    // Check if the PR is assigned to Devin
    const isAssignedToDevin = pr.reviewers?.some(
      (reviewer: any) => reviewer.user.account_id === secrets.BitbucketDevinUserAccountId,
    ) || pr.author?.account_id === secrets.BitbucketDevinUserAccountId;

    switch (eventType) {
      case 'pullrequest:created': {
        if (isAssignedToDevin) {
          text = `Hey <@${secrets.SlackDevinUserIdentifier}> \n🥳 Pull Request: <${pr.links.html.href}|${pr.title}> by ${pr.author.display_name}\nI have created a PR, please review it. Please review the description of the PR.`;
          const res = await slackClient.chat.postMessage({ channel: channelId, text });
          const ts = res.ts;
          if (ts) {
            await putSlackThreadTimeStamp(prid, ts);
          }
        }
        return {
          headers: responseHeaders,
          statusCode: 200,
          body: JSON.stringify({
            message: 'OK',
            detail: 'Created a PR',
          }),
        };
      }

      case 'pullrequest:updated': {
        if (isAssignedToDevin) {
          const threadTs = await getSlackThreadTimeStamp(prid);
          if (!threadTs) {
            text = `Hey <@${secrets.SlackDevinUserIdentifier}> \n🥳 Pull Request: <${pr.links.html.href}|${pr.title}> by ${pr.author.display_name}\nI have updated a PR, please review it.`;
            const res = await slackClient.chat.postMessage({ channel: channelId, text });
            const ts = res.ts;
            if (ts) {
              await putSlackThreadTimeStamp(prid, ts);
            }
          }
        }

        // Check if PR is merged
        if (pr.state === 'MERGED') {
          const targetBranch = pr.destination.branch.name;
          if (targetBranch === 'main' || targetBranch === 'master') {
            await slackClient.chat.postMessage({
              channel: channelId,
              text: `🤩 Branch <${pr.links.html.href}|${pr.title}> was merged into '${targetBranch}' by '${payload.actor.display_name}'. Please make sure to update your branches with the latest '${targetBranch}'.`,
            });
          }
          await deleteSlackThreadTimeStamp(prid);
        }

        return {
          headers: responseHeaders,
          statusCode: 200,
          body: JSON.stringify({
            message: 'OK',
            detail: 'Updated a PR',
          }),
        };
      }

      default:
        return {
          headers: responseHeaders,
          statusCode: 200,
          body: JSON.stringify({
            message: 'OK',
            detail: 'Pull request event processed',
          }),
        };
    }
  }

  if (eventType === 'pullrequest:comment_created') {
    const comment = payload.comment;
    const pr = payload.pullrequest;
    prid = pr.id as number;
    const author = comment.user.account_id as string;

    if (author !== secrets.BitbucketDevinUserAccountId) {
      const threadTs = await getSlackThreadTimeStamp(prid);
      if (threadTs) {
        text = `🗨️ Comment on PR <${pr.links.html.href}|${pr.title}> by ${comment.user.display_name}:\n>${comment.content.raw}`;
        await slackClient.chat.postMessage({
          channel: channelId,
          thread_ts: threadTs,
          text,
        });
        return {
          headers: responseHeaders,
          statusCode: 200,
          body: JSON.stringify({
            message: 'OK',
            detail: 'Commented a PR',
          }),
        };
      }
      return {
        headers: responseHeaders,
        statusCode: 200,
        body: JSON.stringify({
          message: 'OK',
          detail: 'This request went through (Not Found a PR timestamp).',
        }),
      };
    }

    return {
      headers: responseHeaders,
      statusCode: 200,
      body: JSON.stringify({
        message: 'OK',
        detail: 'This request went through (Commented from Devin).',
      }),
    };
  }

  return { statusCode: 400, body: 'Event ignored' };
};
