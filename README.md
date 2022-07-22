# graviton-adoption-workshop

AWS Graviton2 processors are custom designed by AWS to enable the best price performance for workloads in Amazon EC2. Amazon EC2 instances powered by AWS Graviton2 processors provide up to 40% better price performance over comparable fifth generation x86-based instances for a wide variety of workloads. This workshop is designed to show how you can deploy containers to EKS using Graviton instances. The EC2 nodes lifecycle will be managed by either managed nodegroups or Karpenter. 

Cluster Autoscaler is a tool that automatically adjusts the size of the Kubernetes cluster based on the utilization of Pods and Nodes in your cluster. Karpenter is an open-source autoscaling project built for Kubernetes. 



## Pre-requisites

Install CDKv2 as shown here
https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

If you are using Cloud9, CDK would have been installed.

Bookstrap the CDK to your AWS environment

`cdk bootstrap`

## Lab1: Deploy EKS with Managed Nodegroups

With Amazon EKS managed node groups, you don’t need to separately provision or register the Amazon EC2 instances that provide compute capacity to run your Kubernetes applications. You can create, automatically update, or terminate nodes for your cluster with a single operation. Node updates and terminations automatically drain nodes to ensure that your applications stay available.

Every managed node is provisioned as part of an Amazon EC2 Auto Scaling group that's managed for you by Amazon EKS. Every resource including the instances and Auto Scaling groups runs within your AWS account. Each node group runs across multiple Availability Zones that you define.

We shall initialize a project that uses managed nodegroups on Spot.

`mkdir eks-blueprint-spot-mng`

`cdk init app --language typescript`

Install the eks-blueprints NPM package via the following

`npm i @aws-quickstart/eks-blueprints`

Replace the contents of bin/<your-main-file>.ts with the eks-blueprint-spot-mng.ts

Deploy into AWS environment. This creates the EKS cluster with 2 manage nodegroups - one for x86 and another for ARM.

`cdk deploy`

Next deploy the nginx nodes using nginx-deployment-arm.yaml. 

`kubectl apply -f nginx-deployment-arm.yaml`

Verify that the pods come up and running. Which nodes are they running on?


## Lab2: Deploy EKS with Karpenter

Karpenter is designed to provide the right compute resources to match your application’s needs in seconds, instead of minutes by observing the aggregate resource requests of unschedulable pods and makes decisions to launch and terminate nodes to minimize scheduling latencies.

Karpenter shall be bootstrapped via EKS Blueprints. EKS Blueprints that makes it easier and faster for you to adopt Amazon Elastic Kubernetes Service (Amazon EKS). EKS Blueprints is a collection of Infrastructure as Code (IaC) modules that will help you configure and deploy consistent, batteries-included EKS clusters across accounts and regions. You can use EKS Blueprints to easily bootstrap an EKS cluster with Amazon EKS add-ons as well as a wide range of popular open-source add-ons, including Prometheus, Karpenter, Nginx, Traefik, AWS Load Balancer Controller, Fluent Bit, Keda, Argo CD, and more. EKS Blueprints also helps you implement relevant security controls needed to operate workloads from multiple teams in the same cluster.

`mkdir eks-blueprint-graviton`

Initialize the project

`cdk init app --language typescript`

Install the eks-blueprints NPM package via the following

`npm i @aws-quickstart/eks-blueprints`

Replace the contents of bin/<your-main-file>.ts with the eks-blueprint-spot-graviton.ts

Deploy into AWS environment. This creates the EKS cluster with the Karpenter add-on.

`cdk deploy`

Next deploy the nginx nodes using nginx-deployment-arm.yaml. 

`kubectl apply -f nginx-deployment-arm.yaml`

Verify that the pods come up and running. What is the instance type that has been provisioned for the pods? You can find out by running the command

`kubectl get nodes --show-labels`
