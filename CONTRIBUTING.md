# Spinnaker Advanced User Lab (SAUL)

## Submitting Issues & Feature Requests
Please feel free to submit any issues or feature requests you identify by opening an issue in the Github repository. We 
use JIRA internally for project management, but prefer to communicate with the open source community via Github.

## Developing Locally
We recommend cloning the repo locally for all development work.  Since SAUL is Vue2 application built with vue-cli you
need to install run the following command from within the project root directory after cloning the git repository:

```
# Be sure to install node and npm on your machine prior to running this command

npm install
```

Once all the node_modules are installed successfully, run the following command from within the project root directory 
to build and run a temporary build of the application:

```
npm run serve
```

This command will serve the application on localhost:8080 at default sub-directory path of `/saul`.  You can access the 
application at `http://localhost:8080/saul/home`.

## Testing Builds Locally

We recommend testing the Docker builds locally prior to submitting any pull requests any time new npm packages are added.
This requires Docker to be installed on your local machine.  With Docker installed and running, run the following command
from within the project root directory to build a local Docker image:

```
docker build --build-arg VERSION=testing -t spinnaker-saul .
```

Once built, you can bring up the Docker instance local to confirm the build was successful by running the following 
command:

```
docker run -it \
-p 8082:80 \
--env BASE_GATE_URL=https://spinnaker.example.com/api/v1 \
--env BASE_DECK_URL=https://spinnaker.example.com \
--rm \
--name spinnaker-saul \
spinnaker-saul
```

**WARNING**: Given that the application is protected by Spinnaker's Gate authentication, it's likely that you will not 
be able to move beyond the login screen on locally hosted Docker builds unless you have a locally hosted Spinnaker Cluster
for which the BASE_GATE_URL and BASE_DECK_URL environment variables are properly configured.

## Submitting Changes

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
    
**WARNING:** Pull requests that change the Github Action workflows, the Dockerfile, the Startup script, or any of the
existing deployment Manifests without first opening an issue to discuss the needed change will likely be rejected.
    
## Leveraging the Existing Github Action Workflows in forked Repos

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