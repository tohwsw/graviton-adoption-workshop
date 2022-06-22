#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { EksBlueprintSpotGravitonStack } from '../lib/eks-blueprint-spot-graviton-stack';

const app = new cdk.App();
const account = '';
const region = 'ap-southeast-1';


const karpenterAddonProps = {
  provisionerSpecs: {
    'kubernetes.io/arch': ['amd64','arm64'],
    'karpenter.sh/capacity-type': ['spot','on-demand'],
  },
  subnetTags: {
    'karpenter.sh/discovery': 'eks-blueprint-spot-graviton',
  },
  securityGroupTags: {
    'karpenter.sh/discovery': 'eks-blueprint-spot-graviton',
  },
}
const vpcCniAddOn = new blueprints.addons.VpcCniAddOn();
const karpenterAddOn = new blueprints.addons.KarpenterAddOn(karpenterAddonProps);
const addOns: Array<blueprints.ClusterAddOn> = [ vpcCniAddOn, karpenterAddOn ];

blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .addOns(...addOns)
    .build(app, 'eks-blueprint-spot-graviton');