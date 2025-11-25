// import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
// import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
// import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
// import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
// import * as iam from 'aws-cdk-lib/aws-iam';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
// import { IntegratorFunction } from './funcs/integrator-function';

export interface BitbucketDevinSlackIntegratorProps {
  readonly secretName: string;
  readonly customDomain?: string;
}

export class BitbucketDevinSlackIntegrator extends Construct {
  constructor(scope: Construct, id: string, _props: BitbucketDevinSlackIntegratorProps) {
    super(scope, id);
  }
}