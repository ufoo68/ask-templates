import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import { countResources } from '@aws-cdk/assert'

export class AskTemplatesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'Bucket', {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [`${bucket.bucketArn}/*`],
      principals: [new iam.AccountRootPrincipal()],
    }))

    new s3deploy.BucketDeployment(this, 'Deploy', {
      sources: [s3deploy.Source.asset('./assets')],
      destinationBucket: bucket,
    })
  }
}
