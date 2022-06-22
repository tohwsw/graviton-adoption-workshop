# graviton-adoption-workshop

AWS Graviton2 processors are custom designed by AWS to enable the best price performance for workloads in Amazon EC2. Amazon EC2 instances powered by AWS Graviton2 processors provide up to 40% better price performance over comparable fifth generation x86-based instances for a wide variety of workloads. This workshop is designed to show how you can deploy containers to EKS using Graviton instances. The EC2 nodes lifecycle will be managed by Karpenter. Karpenter is an open-source autoscaling project built for Kubernetes. Karpenter is designed to provide the right compute resources to match your application’s needs in seconds, instead of minutes by observing the aggregate resource requests of unschedulable pods and makes decisions to launch and terminate nodes to minimize scheduling latencies.

Karpenter shall be bootstrapped via EKS Blueprints. EKS Blueprints that makes it easier and faster for you to adopt Amazon Elastic Kubernetes Service (Amazon EKS). EKS Blueprints is a collection of Infrastructure as Code (IaC) modules that will help you configure and deploy consistent, batteries-included EKS clusters across accounts and regions. You can use EKS Blueprints to easily bootstrap an EKS cluster with Amazon EKS add-ons as well as a wide range of popular open-source add-ons, including Prometheus, Karpenter, Nginx, Traefik, AWS Load Balancer Controller, Fluent Bit, Keda, Argo CD, and more. EKS Blueprints also helps you implement relevant security controls needed to operate workloads from multiple teams in the same cluster.

## Pre-requisites

Install CDKv2 as shown here
https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

If you are using Cloud9, CDK would have been installed.

Bookstrap the CDK to your AWS environment

`cdk bootstrap`

## Setup the project

`mkdir eks-blueprint-graviton`

Initialize the project

`cdk init app --language typescript`

Replace the script content with the eks-blueprint-spot-graviton.ts

Deploy into AWS environment. This creates the EKS cluster with the Karpenter add-on.

`cdk deploy`

Next deploy the nginx nodes using nginx-deployment-arm.yaml. 

`kubectl apply -f nginx-deployment-arm.yaml`

Verify that the pods come up and running. What is the instance type that has been provisioned for the pods? You can find out by running the command

`kubectl get nodes`
