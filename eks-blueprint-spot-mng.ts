#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { EksBlueprintSpotMngStack } from '../lib/eks-blueprint-spot-mng-stack';

const app = new cdk.App();
const account = '';
const region = 'ap-southeast-1';

const clusterProvider = new blueprints.GenericClusterProvider({
  version: cdk.aws_eks.KubernetesVersion.V1_21,
  managedNodeGroups: [
      {
          id: "mng-amd",
          nodeGroupCapacityType: cdk.aws_eks.CapacityType.SPOT,
          amiType: cdk.aws_eks.NodegroupAmiType.AL2_X86_64,
          instanceTypes: [new cdk.aws_ec2.InstanceType('t3.large')],

      },
      {
          id: "mng-arm",
          nodeGroupCapacityType: cdk.aws_eks.CapacityType.SPOT,
          amiType: cdk.aws_eks.NodegroupAmiType.AL2_ARM_64,
          instanceTypes: [new cdk.aws_ec2.InstanceType('t4g.large')],

      }
  ],
});


const containerInsightsAddOn = new blueprints.addons.ContainerInsightsAddOn();

const addOns: Array<blueprints.ClusterAddOn> = [ containerInsightsAddOn ];


blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .clusterProvider(clusterProvider)
    .addOns(...addOns)
    .build(app, 'eks-blueprint-spot-mng');