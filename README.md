# Spinnaker Advanced User Lab (SAUL)

## About the Project

The Spinnaker Advanced User Lab (SAUL) serves as a single point of aggregation for additional tools useful to advanced 
users of the Spinnaker Continuous Delivery Platform. SAUL is not a replacement for Spinnaker's Deck UI, but a parallel 
user interface that delivers additional functionality not found in Deck. The first feature delivered by SAUL is the 
Pipeline Expression Test Environment (PETE) that provides an enhanced user experience for developing complex Pipeline 
Expressions that can be tested against previous Pipeline Executions.

SAUL was built starting from the open-source vue-user-application-quick-start repo located on Github.

## Why are these features here instead of integrated back into Spinnaker's Deck UI?

Simply put, the code base of Spinnaker's Deck UI is massively complex. Built originally by Netflix and open-sourced in 
2016, the Deck UI started with AngularJS, a single page application framework that has since been declared as in
end-of-life support by Google. As the Spinnaker Open Source Community took over development, webpack was layered on top
of the AngularJS to allow for the integration of React-based UI components. Further adding to the complexity of working 
with Deck is its build process that leverages Docker, Yarn, and Gradle.

SAUL is a single page application built entirely using Vue.js and the Vue CLI. The code base's structure allows for
immutable Docker images to be produced by the build process.  By placing these features in a parallel UI, we can spend
more time delivering useful functionality and less time working with the legacy code constraints.

## How does SAUL work alongside Spinnaker Deck?

While SAUL is a completely standalone application, it does require Spinnaker to deliver value. SAUL communicates with 
Spinnaker's Gate API to retrieve data about the applications and pipelines just as Deck does. Given that most Spinnaker
installations implement some form of authentication (SAML, Oauth, LDAP), both Spinnaker and SAUL must be precisely 
configured so that SAUL can adhere to same authentication standards and gain access to Gate API endpoints.

When configured properly, SAUL offers the same level of authentication security as Spinnaker Deck whereby Gate enforces
authentication and, if configured, Fiat enforces authorization.

## What are the precise configuration requirements?

In order for SAUL to be able to authenticate with Spinnaker the following must be true:
1. Spinnaker and SAUL must be deployed inside of the same Kubernetes (K8s) cluster and namespace.
2. Spinnaker must be configured to use a third-party authentication provider using (SAML, Oauth, LDAP).
3. Spinnaker Deck and Spinnaker Gate must be configured to use the same Hostname.
    * Example:
        * Deck URL:  https://spinnaker.example.com
        * Gate URL:  https://spinnaker.example.com/api/v1
4. SAUL must be deployed at a sub-directory of Spinnaker Deck.
    * Example:
        * SAUL URL:  https://spinnaker.example.com/saul
        
NOTE: Given that all three services/applications are sharing a hostname, the Kubernetes ingress handling Spinnaker must
also be modified to handle traffic for SAUL.  

WARNING: To date, the Nginx Ingress Controller is the only ingress method we have proven to work since it is in use in 
our development environment.  That said, other ingress capabilities should be able to be configured to achieve the same
result.

## Deploying SAUL into a Kubernetes (K8s) Cluster alongside Spinnaker

#### Step 1: Complete Prerequisites

1. Configure Spinnaker Deck and Spinnaker Gate to use the same Hostname
    * [Documentation](https://docs.armory.io/docs/armory-admin/hostname-deck-gate-configure/)
2. Configure Spinnaker Authentication to use either SAML, Oauth, or LDAP
    * [Documentation](https://spinnaker.io/setup/security/authentication/)

#### Step 2: Choose a deployment approach

SAUL requires the following Kubernetes resources to be deployed successfully:
* ConfigMap
* Service
* Deployment

We have created Kubernetes manifests located in the `manifests/deploy` directory that have been tested to successfully 
deploy SAUL into a Spinnaker Kubernetes Cluster under one of two approaches:
1. Basic [manifests/deploy/basic](./manifests/deploy/basic)
    * This is the manual approach where you will need to edit all three of the manifests to meet your specific.
    * Copy all the files in the `basic` directory
    * Edit the files as prescribed by the comments
        * Make sure you read all comments in each manifest to make the appropriate edits to deploy SAUL
    * Deploy the ConfigMap from within the `basic` directory
        ```
        kubectl apply -f configmap.yml
        ```
    * Deploy the Service from within the `basic` directory
        ```
        kubectl apply -f service.yml
        ```
    * Deploy the Deployment from within the `basic` directory
        ```
        kubectl apply -f deployment.yml
        ```
2. Kustomize [manifests/deploy/kustomize](./manifests/deploy/kustomize)
    * This is our preferred deployment method but also requires that you have `kustomize` installed on your workstation.
        * [Documentation](https://kubectl.docs.kubernetes.io/installation/kustomize/)
    * Obtain all the files/directories in the `kustomize` directory of the repo
    * Edit the `kustomization.yml` file
        * Namespace
        * ConfigMap Literal Values
        * If hosting SAUL in a sub-directory other than `saul`, edit the `patch-deployment-readiness-probe-path.json` patch file
    * Deploy the manifests using Kustomize from within the `kustomize` directory
        ```
        kubectl apply -k .
        ```
      
#### Step 3: Create new Ingress or Modify Existing Ingress to support SAUL

Since SAUL is in a Kubernetes cluster it needs an ingress pointed to its Service so that traffic can be served by the
application.  To date, the Nginx Ingress Controller is the only ingress method we have proven to work since it is in use 
in our development environment.  That said, other ingress capabilities should be able to be configured to achieve the 
same result.

If you are using the Nginx Ingress Controller, we have provided an example Ingress manifest located in the 
[manifests/ingresses/nginx-ingress-controller](./manifests/ingress/nginx-ingress-controller) directory.  The ingress
is configured to use the Kubernetes cert-manager to auto-generate SSL certificates so if you are not using cert-manager
you will need to remove these sections.  You will also need to edit the example ingress to make sure domains and namespaces
match your environment.

When using the Nginx Ingress Controller, rules for a single domain must be contained inside of a single, ingress definition
so you'll notice that our example Ingress manifest is for Deck, Gate, and SAUL.

If you are not using the Nginx Ingress Controller, use the example Ingress Manifest as a reference to ensure your Ingress
capability is configured properly to route traffic to the SAUL application.

## About our Spinnaker Environment

For reference, we would like to provide some insight on the Spinnaker Environment we are using to host and test SAUL.

* Kubernetes Cloud Provider:  Linode Kubernetes Engine (LKE)
    * [Documentation](https://www.linode.com/docs/guides/deploy-and-manage-a-cluster-with-linode-kubernetes-engine-a-tutorial/)
* Spinnaker Version:  Armory Spinnaker (2.23)
    * [Documentation](https://docs.armory.io)
    * Features Enabled:
        * Authentication: Okta SAML
        * Authorization: Okta SAML Groups
        * Front 50 Backing Store: AWS S3
        * Other Services Cache: RedisLabs Redis
        * Secrets: K8s and Armory Vault Secrets
        * Dynamic Kubernetes Accounts: Vault
        * Image Registries: Docker
        * Artifact Registries: Github
* Ingress: Nginx Ingress Controller
    * [Documentation](https://kubernetes.github.io/ingress-nginx/)
* SSL: Kubernetes Cert-manager
    * [Documentation](https://cert-manager.io/docs/installation/kubernetes/)


## Contributing to the Project

We welcome contributions to the project through pull requests to our 'main' branch. To keep things simple, we are
leveraging a mono-branch approach to the repo where `main` is a protected branch with releases created using tags to
`main` rather than maintaining separate release branches in the repo. Since `main` is protected, you will need to 
create a new unprotected branch locally that contains your commits then submit a pull request of this branch to our 
`main`.

We recommend the following workflow for each chunk of work for a feature or fix:
1. Pull main
2. Create local feature branch from main
3. Commit Code to local feature branch
4. Create Pull Request of local feature branch to main
5. Lather, Rinse, Repeat.

Please use the following naming convention for your pull request titles to help improve organization and speed up the 
review process.  Whenever possible, we will squash all commits in the feature branch into a single commit on main and
then delete the feature branch from the repo.

* Features:
    * (feature) Pull Request title here
* Fixes:
    * (fix) Pull Request title here
    
If you would like to make significant changes to the repo organizational structure or the overall architecture of the
application, please open an Issue in the project to discuss the proposed changes first.

If your pull request fixes or closes any open Issue in the Project, please indicate this in the pull request's
description using the format outlined [here](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).
* Example: If the pull request fixes the problem outlined by Issue #6 you would put the following in the pull request
description:
    * Fixes #6

The project uses two Github Action workflows. The first creates a build of any submitted pull request to `main` then
pushes the build to our private development Docker registry. The second creates a build on any tag to `main` matching 
our release tagging convention (i.e. `v1.0.0`) then pushes the build to our public Docker registry. These workflows use 
Github secrets for both the Docker login credentials and the target push registries.  If you would like to leverage the 
Github Actions workflows in your own cloned/forked version of the repository you will need to add the following Github 
secrets to your repo:
* DOCKER_HUB_USERNAME
* DOCKER_HUB_ACCESS_TOKEN
* DOCKER_HUB_REGISTRY_PROD
* DOCKER_HUB_REGISTRY_DEV

**WARNING:** Pull requests that change the Github Action workflows, the Dockerfile, the Startup script, or any of the
existing deployment Manifests without first opening an issue to discuss the needed change will likely be rejected.

## License

[MIT License](./LICENSE)
