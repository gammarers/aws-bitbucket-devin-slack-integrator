# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BitbucketDevinSlackIntegrator <a name="BitbucketDevinSlackIntegrator" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator"></a>

#### Initializers <a name="Initializers" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer"></a>

```typescript
import { BitbucketDevinSlackIntegrator } from '@gammarers/aws-bitbucket-devin-slack-integrator'

new BitbucketDevinSlackIntegrator(scope: Construct, id: string, props: BitbucketDevinSlackIntegratorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer.parameter.props">props</a></code> | <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps">BitbucketDevinSlackIntegratorProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.Initializer.parameter.props"></a>

- *Type:* <a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps">BitbucketDevinSlackIntegratorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.isConstruct"></a>

```typescript
import { BitbucketDevinSlackIntegrator } from '@gammarers/aws-bitbucket-devin-slack-integrator'

BitbucketDevinSlackIntegrator.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegrator.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### BitbucketDevinSlackIntegratorProps <a name="BitbucketDevinSlackIntegratorProps" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps.Initializer"></a>

```typescript
import { BitbucketDevinSlackIntegratorProps } from '@gammarers/aws-bitbucket-devin-slack-integrator'

const bitbucketDevinSlackIntegratorProps: BitbucketDevinSlackIntegratorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps.property.secretName">secretName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps.property.customDomain">customDomain</a></code> | <code>string</code> | *No description.* |

---

##### `secretName`<sup>Required</sup> <a name="secretName" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string

---

##### `customDomain`<sup>Optional</sup> <a name="customDomain" id="@gammarers/aws-bitbucket-devin-slack-integrator.BitbucketDevinSlackIntegratorProps.property.customDomain"></a>

```typescript
public readonly customDomain: string;
```

- *Type:* string

---



