export const applications = [{
    "name": "armory-color-deployments",
    "email": "mark.a.noe@gmail.com",
    "updateTs": "1592493817000",
    "createTs": "1592493816939",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "cloudProviders": "kubernetes",
    "trafficGuards": [],
    "instancePort": 80,
    "user": "mark.a.noe@gmail.com",
    "accounts": "linode"
}, {
    "name": "custom-deck",
    "email": "mark.a.noe@gmail.com",
    "updateTs": "1590759267000",
    "createTs": "1589816165362",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "cloudProviders": "kubernetes",
    "trafficGuards": [],
    "instancePort": 80,
    "customBanners": [],
    "instanceLinks": [],
    "user": "mark.a.noe@gmail.com",
    "dataSources": {"disabled": [], "enabled": []},
    "accounts": "spinnaker"
}, {
    "name": "pattern-hold-on-failure",
    "email": "mark.a.noe@gmail.com",
    "updateTs": "1598566782000",
    "createTs": "1598566781855",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "cloudProviders": "kubernetes",
    "trafficGuards": [],
    "instancePort": 80,
    "user": "mark.a.noe@gmail.com"
}, {
    "name": "pattern-test-segments",
    "email": "mark.a.noe@gmail.com",
    "updateTs": "1598626107000",
    "createTs": "1598626106633",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "cloudProviders": "kubernetes",
    "trafficGuards": [],
    "instancePort": 80,
    "user": "mark.a.noe@gmail.com"
}, {
    "name": "sample-app",
    "email": "mark.a.noe@gmail.com",
    "updateTs": "1596047182000",
    "createTs": "1589045727050",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "cloudProviders": "kubernetes",
    "trafficGuards": [],
    "instancePort": 80,
    "permissions": {"READ": ["spin-admin"], "WRITE": ["spin-admin"], "EXECUTE": ["spin-admin"]},
    "user": "mark.a.noe@gmail.com",
    "dataSources": {"disabled": [], "enabled": []},
    "accounts": "linode"
}, {
    "name": "spin",
    "email": "mark.a.noe@gmail.com",
    "updateTs": "1588949546000",
    "createTs": "1588949545838",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "cloudProviders": "",
    "trafficGuards": [],
    "instancePort": 80,
    "permissions": {
        "READ": ["spin-admin", "spin-qa", "spin-ops", "spin-dev"],
        "WRITE": ["spin-admin"],
        "EXECUTE": ["spin-admin"]
    },
    "user": "mark.a.noe@gmail.com",
    "dataSources": {"disabled": [], "enabled": []},
    "accounts": "spinnaker"
}, {"name": "spel-training", "accounts": "linode"}]

export const applicationPipelineConfigs = [{
    "keepWaitingPipelines": false,
    "appConfig": {},
    "limitConcurrent": true,
    "application": "pattern-test-segments",
    "spelEvaluator": "v4",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "name": "Call Orca Endpoint with Webhook",
    "stages": [{
        "completeOtherBranchesThenFail": false,
        "continuePipeline": true,
        "failPipeline": false,
        "method": "GET",
        "name": "Webhook",
        "refId": "1",
        "requisiteStageRefIds": [],
        "statusUrlResolution": "getMethod",
        "type": "webhook",
        "url": "https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss",
        "waitForCompletion": false
    }, {
        "failOnFailedExpressions": true,
        "name": "Evaluate Variables",
        "refId": "2",
        "requisiteStageRefIds": ["1"],
        "type": "evaluateVariables",
        "variables": [{"key": "webhook_status", "value": "${execution.stages.?[name == 'Webhook'][0].status}"}]
    }, {
        "method": "GET",
        "name": "Webhook",
        "refId": "3",
        "requisiteStageRefIds": [],
        "statusUrlResolution": "getMethod",
        "type": "webhook",
        "url": "https://dev.apps.marqaaron.io/canary"
    }],
    "index": 0,
    "id": "650604e3-812e-4cb9-8577-ea44e42898ce",
    "triggers": [],
    "updateTs": "1598626254000"
}, {
    "keepWaitingPipelines": false,
    "parameterConfig": [{
        "default": "",
        "description": "",
        "hasOptions": false,
        "label": "",
        "name": "iteration",
        "options": [{"value": ""}],
        "pinned": false,
        "required": true
    }, {
        "default": "",
        "description": "",
        "hasOptions": false,
        "label": "",
        "name": "limit",
        "options": [{"value": ""}],
        "pinned": false,
        "required": true
    }],
    "spelEvaluator": "v4",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "index": 1,
    "triggers": [],
    "appConfig": {},
    "limitConcurrent": false,
    "application": "pattern-test-segments",
    "name": "Self Looping Pipeline",
    "stages": [{
        "failOnFailedExpressions": true,
        "name": "Evaluate Variables",
        "refId": "1",
        "requisiteStageRefIds": [],
        "type": "evaluateVariables",
        "variables": [{
            "key": "nextIteration",
            "value": "${new Integer(parameters['iteration']) + 1}"
        }, {"key": "currentIteration", "value": "${new Integer(parameters['iteration'])}"}, {
            "key": "limit",
            "value": "${new Integer(parameters['limit'])}"
        }]
    }, {
        "completeOtherBranchesThenFail": false,
        "continuePipeline": false,
        "failPipeline": false,
        "name": "More Looping Needed",
        "preconditions": [{
            "context": {"expression": "${currentIteration  <= limit}"},
            "failPipeline": true,
            "type": "expression"
        }],
        "refId": "2",
        "requisiteStageRefIds": ["1"],
        "type": "checkPreconditions"
    }, {
        "failPipeline": true,
        "judgmentInputs": [],
        "name": "Continuing Loop!",
        "notifications": [],
        "refId": "3",
        "requisiteStageRefIds": ["2"],
        "type": "manualJudgment"
    }, {
        "application": "pattern-test-segment",
        "failPipeline": true,
        "name": "Re-run Pipeline",
        "pipeline": "6b6f6482-2ac9-4c5b-9cb4-1e4345db5e06",
        "pipelineParameters": {"iteration": "${nextIteration}", "limit": "${limit}"},
        "refId": "4",
        "requisiteStageRefIds": ["3"],
        "type": "pipeline",
        "waitForCompletion": true
    }, {
        "completeOtherBranchesThenFail": false,
        "continuePipeline": false,
        "failPipeline": false,
        "name": "Looping Complete",
        "preconditions": [{
            "context": {"expression": "${currentIteration > limit}"},
            "failPipeline": true,
            "type": "expression"
        }],
        "refId": "5",
        "requisiteStageRefIds": ["1"],
        "type": "checkPreconditions"
    }, {
        "failPipeline": true,
        "judgmentInputs": [],
        "name": "Completed!",
        "notifications": [],
        "refId": "6",
        "requisiteStageRefIds": ["5"],
        "type": "manualJudgment"
    }, {
        "failOnFailedExpressions": true,
        "name": "Output Loop Execution Context",
        "refId": "7",
        "requisiteStageRefIds": ["6"],
        "type": "evaluateVariables",
        "variables": [{"key": "test", "value": "test"}]
    }],
    "id": "d140f157-9537-43ee-bca5-9be3c9d1939b",
    "updateTs": "1598626495000"
}, {
    "keepWaitingPipelines": false,
    "appConfig": {},
    "limitConcurrent": true,
    "application": "pattern-test-segments",
    "spelEvaluator": "v4",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "name": "Master to Multiple Self Looping",
    "stages": [{
        "application": "pattern-test-segments",
        "failPipeline": true,
        "name": "First Loop Iteration",
        "pipeline": "9eef92bf-663d-4624-91e0-621c956659b6",
        "pipelineParameters": {"iteration": "1", "limit": "2"},
        "refId": "1",
        "requisiteStageRefIds": [],
        "type": "pipeline",
        "waitForCompletion": true
    }, {
        "application": "pattern-test-segments",
        "failPipeline": true,
        "name": "Second Loop Iteration",
        "pipeline": "9eef92bf-663d-4624-91e0-621c956659b6",
        "pipelineParameters": {"iteration": "1", "limit": "2"},
        "refId": "2",
        "requisiteStageRefIds": ["1"],
        "type": "pipeline",
        "waitForCompletion": true
    }, {
        "failPipeline": true,
        "judgmentInputs": [],
        "name": "Successful?",
        "notifications": [],
        "refId": "3",
        "requisiteStageRefIds": ["2"],
        "type": "manualJudgment"
    }],
    "index": 2,
    "id": "9eef92bf-663d-4624-91e0-621c956659b6",
    "triggers": [],
    "updateTs": "1598626619000"
}, {
    "keepWaitingPipelines": false,
    "parameterConfig": [{
        "default": "",
        "description": "",
        "hasOptions": true,
        "label": "",
        "name": "action",
        "options": [{"value": "deploy"}, {"value": "patch"}],
        "pinned": false,
        "required": true
    }],
    "spelEvaluator": "v4",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "index": 3,
    "triggers": [],
    "appConfig": {},
    "limitConcurrent": true,
    "application": "pattern-test-segments",
    "name": "Patch Manifest with Strategic Merge Strategy",
    "stages": [{
        "account": "linode",
        "cloudProvider": "kubernetes",
        "manifests": [{
            "apiVersion": "v1",
            "kind": "Service",
            "metadata": {"label": "service ${param}", "name": "patch-service-test", "namespace": "dev"},
            "spec": {
                "ports": [{"name": "http", "port": 80, "protocol": "TCP", "targetPort": 80}],
                "selector": {"ingress": "service-1"}
            }
        }],
        "moniker": {"app": "sample-app"},
        "name": "Deploy (Manifest)",
        "namespaceOverride": "dev",
        "refId": "1",
        "requisiteStageRefIds": ["2"],
        "skipExpressionEvaluation": false,
        "source": "text",
        "trafficManagement": {"enabled": false, "options": {"enableTraffic": false, "services": []}},
        "type": "deployManifest"
    }, {
        "completeOtherBranchesThenFail": false,
        "continuePipeline": false,
        "failPipeline": false,
        "name": "Is Deployment",
        "preconditions": [{
            "context": {"expression": "${parameters['action'] == 'deploy'}"},
            "failPipeline": true,
            "type": "expression"
        }],
        "refId": "2",
        "requisiteStageRefIds": [],
        "type": "checkPreconditions"
    }, {
        "completeOtherBranchesThenFail": false,
        "continuePipeline": false,
        "failPipeline": false,
        "name": "Is Patch",
        "preconditions": [{
            "context": {"expression": "${parameters['action'] == 'patch'}"},
            "failPipeline": true,
            "type": "expression"
        }],
        "refId": "3",
        "requisiteStageRefIds": [],
        "type": "checkPreconditions"
    }, {
        "account": "linode",
        "app": "sample-app",
        "cloudProvider": "kubernetes",
        "location": "dev",
        "manifestName": "service patch-service-test",
        "mode": "static",
        "name": "Patch (Manifest)",
        "options": {"mergeStrategy": "strategic", "record": true},
        "patchBody": [{
            "apiVersion": "v1",
            "kind": "Service",
            "metadata": {"name": "patch-service-test", "namespace": "dev"},
            "spec": {
                "ports": [{"name": "http", "port": 80, "protocol": "TCP", "targetPort": 80}],
                "selector": {"$patch": "replace", "selector3": "testtesttest"}
            }
        }],
        "refId": "4",
        "requisiteStageRefIds": ["3"],
        "source": "text",
        "type": "patchManifest"
    }],
    "id": "cfe1f184-f944-408d-83c6-d0b9457eef0c",
    "updateTs": "1598626729000"
}, {
    "keepWaitingPipelines": false,
    "limitConcurrent": true,
    "application": "sample-app",
    "spelEvaluator": "v4",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "name": "Packer Baking",
    "stages": [],
    "index": 4,
    "id": "08763a4b-b6f3-490e-8408-e89f00719ad2",
    "triggers": [],
    "updateTs": "1598642754000"
}, {
    "keepWaitingPipelines": false,
    "limitConcurrent": true,
    "application": "pattern-test-segments",
    "spelEvaluator": "v4",
    "lastModifiedBy": "mark.a.noe@gmail.com",
    "name": "Artifacts",
    "stages": [{
        "application": "pattern-test-segments",
        "executionOptions": {"successful": true},
        "expectedArtifacts": [{
            "defaultArtifact": {"customKind": true, "id": "cb0c2f86-9cdd-4343-ac75-554bea37c596"},
            "displayName": "sweet-shrimp-3",
            "id": "24320361-fc0b-46e6-be8c-02d8baa7cccb",
            "matchArtifact": {"customKind": true, "id": "f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad"},
            "useDefaultArtifact": false,
            "usePriorArtifact": false
        }],
        "name": "Find Artifacts From Execution",
        "pipeline": "cfe1f184-f944-408d-83c6-d0b9457eef0c",
        "refId": "1",
        "requisiteStageRefIds": [],
        "type": "findArtifactFromExecution"
    }],
    "index": 5,
    "id": "c61d6fdb-622a-4b63-aa3b-23810cfc7429",
    "triggers": [],
    "updateTs": "1599604740000"
}]

export const applicationPipelineExecutions = [{
    "type": "PIPELINE",
    "id": "01EH5F35DVKYEFEFBX2B93YKGF",
    "application": "pattern-test-segments",
    "name": "Call Orca Endpoint with Webhook",
    "buildTime": 1598985181473,
    "canceled": false,
    "limitConcurrent": true,
    "keepWaitingPipelines": false,
    "stages": [{
        "id": "01EH5F368ZVSZ67HWJ1NQF355Z",
        "refId": "1",
        "type": "webhook",
        "name": "Webhook",
        "startTime": 1598985181931,
        "endTime": 1598985183608,
        "status": "FAILED_CONTINUE",
        "context": {
            "webhook": {
                "statusCodeValue": 404,
                "body": "\"Not found\"",
                "error": "Error submitting webhook for pipeline 01EH5F35DVKYEFEFBX2B93YKGF to https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss with status code 404.",
                "statusCode": "NOT_FOUND"
            },
            "method": "GET",
            "statusUrlResolution": "getMethod",
            "completeOtherBranchesThenFail": false,
            "failPipeline": false,
            "waitForCompletion": false,
            "url": "https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss",
            "continuePipeline": true
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.webhook.tasks.CreateWebhookTask",
            "name": "createWebhook",
            "startTime": 1598985182209,
            "endTime": 1598985183494,
            "status": "FAILED_CONTINUE",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }, {
        "id": "01EH5F369000CWVZ56BD65ZPDD",
        "refId": "2",
        "type": "evaluateVariables",
        "name": "Evaluate Variables",
        "startTime": 1598985183785,
        "endTime": 1598985184050,
        "status": "CANCELED",
        "context": {
            "failOnFailedExpressions": true,
            "variables": [{
                "key": "webhook_status",
                "value": "FAILED_CONTINUE",
                "sourceValue": "{execution.stages.?[name == 'Webhook'][0].status}"
            }]
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.pipeline.tasks.EvaluateVariablesTask",
            "name": "evaluateVariables",
            "startTime": 1598985183844,
            "endTime": 1598985183985,
            "status": "CANCELED",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": ["1"]
    }, {
        "id": "01EH5F3691N0DHXGQ930D8F0D0",
        "refId": "3",
        "type": "webhook",
        "name": "Webhook",
        "startTime": 1598985181935,
        "endTime": 1598985183456,
        "status": "TERMINAL",
        "context": {
            "webhook": {
                "statusCodeValue": 404,
                "body": "<html>\r\n<head><title>404 Not Found</title></head>\r\n<body>\r\n<center><h1>404 Not Found</h1></center>\r\n<hr><center>nginx/1.17.8</center>\r\n</body>\r\n</html>\r\n",
                "error": "Error submitting webhook for pipeline 01EH5F35DVKYEFEFBX2B93YKGF to https://dev.apps.marqaaron.io/canary with status code 404.",
                "statusCode": "NOT_FOUND"
            }, "method": "GET", "statusUrlResolution": "getMethod", "url": "https://dev.apps.marqaaron.io/canary"
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.webhook.tasks.CreateWebhookTask",
            "name": "createWebhook",
            "startTime": 1598985182202,
            "endTime": 1598985183348,
            "status": "TERMINAL",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }],
    "startTime": 1598985181832,
    "endTime": 1598985183653,
    "status": "TERMINAL",
    "authentication": {
        "user": "mark.a.noe@gmail.com",
        "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"]
    },
    "origin": "api",
    "trigger": {
        "type": "manual",
        "user": "mark.a.noe@gmail.com",
        "parameters": {},
        "artifacts": [],
        "notifications": [],
        "rebake": false,
        "dryRun": false,
        "strategy": false,
        "resolvedExpectedArtifacts": [],
        "expectedArtifacts": [],
        "executionId": "01EH5F35DVKYEFEFBX2B93YKGF",
        "eventId": "9086756f-def2-4e3d-839e-06e1fa6d2da7",
        "enabled": false,
        "preferred": false
    },
    "pipelineConfigId": "650604e3-812e-4cb9-8577-ea44e42898ce",
    "notifications": [],
    "initialConfig": {},
    "systemNotifications": [],
    "spelEvaluator": "v4"
}, {
    "type": "PIPELINE",
    "id": "01EHQXWH4MRAWGPF3G9Z8ADE3C",
    "application": "pattern-test-segments",
    "name": "Artifacts",
    "buildTime": 1599604671773,
    "canceled": false,
    "limitConcurrent": true,
    "keepWaitingPipelines": false,
    "stages": [{
        "id": "01EHQXWH8XVRAK29JBF6S9GV9N",
        "refId": "1",
        "type": "findArtifactFromExecution",
        "name": "Find Artifacts From Execution",
        "startTime": 1599604671934,
        "endTime": 1599604672238,
        "status": "TERMINAL",
        "context": {
            "expectedArtifacts": [{
                "usePriorArtifact": false,
                "displayName": "sweet-shrimp-3",
                "useDefaultArtifact": false,
                "defaultArtifact": {"customKind": true, "id": "cb0c2f86-9cdd-4343-ac75-554bea37c596"},
                "id": "24320361-fc0b-46e6-be8c-02d8baa7cccb",
                "matchArtifact": {"customKind": true, "id": "f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad"}
            }], "pipeline": "650604e3-812e-4cb9-8577-ea44e42898ce", "exception": {
                "exceptionType": "InvalidRequestException", "shouldRetry": false, "details": {
                    "stackTrace": "com.netflix.spinnaker.kork.web.exceptions.InvalidRequestException: Unmatched expected artifact ExpectedArtifact(matchArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=false, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=cb0c2f86-9cdd-4343-ac75-554bea37c596}, artifactAccount=null, provenance=null, uuid=null), id=24320361-fc0b-46e6-be8c-02d8baa7cccb, boundArtifact=null) could not be resolved.\n\tat com.netflix.spinnaker.orca.pipeline.util.ArtifactResolver.lambda$resolveExpectedArtifacts$0(ArtifactResolver.java:128)\n\tat java.base/java.util.Optional.orElseThrow(Optional.java:408)\n\tat com.netflix.spinnaker.orca.pipeline.util.ArtifactResolver.resolveExpectedArtifacts(ArtifactResolver.java:125)\n\tat com.netflix.spinnaker.orca.clouddriver.tasks.artifacts.FindArtifactFromExecutionTask.execute(FindArtifactFromExecutionTask.java:70)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2$1.invoke(RunTaskHandler.kt:131)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withLoggingContext(RunTaskHandler.kt:386)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.access$withLoggingContext(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2.invoke(RunTaskHandler.kt:129)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.AuthenticationAware$sam$java_util_concurrent_Callable$0.call(AuthenticationAware.kt)\n\tat com.netflix.spinnaker.security.AuthenticatedRequest.lambda$wrapCallableForPrincipal$0(AuthenticatedRequest.java:272)\n\tat com.netflix.spinnaker.orca.q.handler.AuthenticationAware$DefaultImpls.withAuth(AuthenticationAware.kt:51)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withAuth(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1.invoke(RunTaskHandler.kt:128)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$withTask$1.invoke(RunTaskHandler.kt:217)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$withTask$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withTask$1.invoke(OrcaMessageHandler.kt:68)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withTask$1.invoke(OrcaMessageHandler.kt:46)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withStage$1.invoke(OrcaMessageHandler.kt:85)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withStage$1.invoke(OrcaMessageHandler.kt:46)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withExecution(OrcaMessageHandler.kt:95)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withExecution(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withStage(OrcaMessageHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withStage(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withTask(OrcaMessageHandler.kt:60)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withTask(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withTask(RunTaskHandler.kt:206)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.handle(RunTaskHandler.kt:89)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.handle(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.q.MessageHandler$DefaultImpls.invoke(MessageHandler.kt:36)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.invoke(OrcaMessageHandler.kt)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.audit.ExecutionTrackingMessageHandlerPostProcessor$ExecutionTrackingMessageHandlerProxy.invoke(ExecutionTrackingMessageHandlerPostProcessor.kt:69)\n\tat com.netflix.spinnaker.q.QueueProcessor$callback$1$1.run(QueueProcessor.kt:89)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\n\tat java.base/java.lang.Thread.run(Thread.java:834)\n",
                    "error": "Unexpected Task Failure",
                    "errors": ["Unmatched expected artifact ExpectedArtifact(matchArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=false, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=cb0c2f86-9cdd-4343-ac75-554bea37c596}, artifactAccount=null, provenance=null, uuid=null), id=24320361-fc0b-46e6-be8c-02d8baa7cccb, boundArtifact=null) could not be resolved."]
                }, "operation": "findArtifactFromExecution", "timestamp": 1599604672140
            }, "application": "pattern-test-segments", "executionOptions": {"successful": true}
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.artifacts.FindArtifactFromExecutionTask",
            "name": "findArtifactFromExecution",
            "startTime": 1599604671991,
            "endTime": 1599604672180,
            "status": "TERMINAL",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }],
    "startTime": 1599604671866,
    "endTime": 1599604672315,
    "status": "TERMINAL",
    "authentication": {
        "user": "mark.a.noe@gmail.com",
        "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"]
    },
    "origin": "api",
    "trigger": {
        "type": "manual",
        "user": "mark.a.noe@gmail.com",
        "parameters": {},
        "artifacts": [],
        "notifications": [],
        "rebake": false,
        "dryRun": false,
        "strategy": false,
        "resolvedExpectedArtifacts": [],
        "expectedArtifacts": [],
        "executionId": "01EHQXWH4MRAWGPF3G9Z8ADE3C",
        "eventId": "0e349b86-9880-4518-8e2c-81bdfb0e379c",
        "enabled": false,
        "preferred": false
    },
    "pipelineConfigId": "c61d6fdb-622a-4b63-aa3b-23810cfc7429",
    "notifications": [],
    "initialConfig": {},
    "systemNotifications": [],
    "spelEvaluator": "v4"
}, {
    "type": "PIPELINE",
    "id": "01EHQXY4E347ZXCTZZS2N5ZN83",
    "application": "pattern-test-segments",
    "name": "Patch Manifest with Strategic Merge Strategy",
    "buildTime": 1599604724294,
    "canceled": false,
    "limitConcurrent": true,
    "keepWaitingPipelines": false,
    "stages": [{
        "id": "01EHQXY4J6K852MCFARD577DQQ",
        "refId": "1",
        "type": "deployManifest",
        "name": "Deploy (Manifest)",
        "status": "NOT_STARTED",
        "context": {
            "namespaceOverride": "dev",
            "cloudProvider": "kubernetes",
            "manifests": [{
                "apiVersion": "v1",
                "kind": "Service",
                "metadata": {"label": "service ${param}", "name": "patch-service-test", "namespace": "dev"},
                "spec": {
                    "ports": [{"name": "http", "port": 80, "protocol": "TCP", "targetPort": 80}],
                    "selector": {"ingress": "service-1"}
                }
            }],
            "trafficManagement": {"enabled": false, "options": {"enableTraffic": false, "services": []}},
            "moniker": {"app": "sample-app"},
            "source": "text",
            "account": "linode",
            "skipExpressionEvaluation": false
        },
        "outputs": {},
        "tasks": [],
        "requisiteStageRefIds": ["2"]
    }, {
        "id": "01EHQXY4RT1MJW40FJRNM6NCSS",
        "refId": "2<1",
        "type": "checkPreconditions",
        "name": "Check precondition (expression)",
        "startTime": 1599604724616,
        "endTime": 1599604724911,
        "status": "TERMINAL",
        "context": {
            "preconditionType": "expression",
            "context": {"expression": false, "expressionResult": "false"},
            "completeOtherBranchesThenFail": false,
            "failPipeline": true,
            "type": "checkPreconditions",
            "continuePipeline": false
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.pipeline.tasks.ExpressionPreconditionTask",
            "name": "checkPrecondition",
            "startTime": 1599604724687,
            "endTime": 1599604724841,
            "status": "TERMINAL",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "syntheticStageOwner": "STAGE_BEFORE",
        "parentStageId": "01EHQXY4J67DMF8MJ96EXYS54T",
        "requisiteStageRefIds": []
    }, {
        "id": "01EHQXY4J67DMF8MJ96EXYS54T",
        "refId": "2",
        "type": "checkPreconditions",
        "name": "Is Deployment",
        "startTime": 1599604724465,
        "endTime": 1599604725000,
        "status": "STOPPED",
        "context": {
            "preconditions": [{"context": {"expression": false}, "failPipeline": true, "type": "expression"}],
            "completeOtherBranchesThenFail": false,
            "failPipeline": false,
            "continuePipeline": false
        },
        "outputs": {},
        "tasks": [],
        "requisiteStageRefIds": []
    }, {
        "id": "01EHQXY4RSTAZW0D8YK0F65R6V",
        "refId": "3<1",
        "type": "checkPreconditions",
        "name": "Check precondition (expression)",
        "startTime": 1599604724624,
        "endTime": 1599604724858,
        "status": "SUCCEEDED",
        "context": {
            "preconditionType": "expression",
            "context": {"expression": true, "expressionResult": "true"},
            "completeOtherBranchesThenFail": false,
            "failPipeline": true,
            "type": "checkPreconditions",
            "continuePipeline": false
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.pipeline.tasks.ExpressionPreconditionTask",
            "name": "checkPrecondition",
            "startTime": 1599604724685,
            "endTime": 1599604724832,
            "status": "SUCCEEDED",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "syntheticStageOwner": "STAGE_BEFORE",
        "parentStageId": "01EHQXY4J6HAC7291AC8TWD5XX",
        "requisiteStageRefIds": []
    }, {
        "id": "01EHQXY4J6HAC7291AC8TWD5XX",
        "refId": "3",
        "type": "checkPreconditions",
        "name": "Is Patch",
        "startTime": 1599604724468,
        "endTime": 1599604725237,
        "status": "SUCCEEDED",
        "context": {
            "preconditions": [{"context": {"expression": true}, "failPipeline": true, "type": "expression"}],
            "completeOtherBranchesThenFail": false,
            "failPipeline": false,
            "continuePipeline": false
        },
        "outputs": {},
        "tasks": [],
        "requisiteStageRefIds": []
    }, {
        "id": "01EHQXY4J67VPA1T0NK5HS34RZ",
        "refId": "4",
        "type": "patchManifest",
        "name": "Patch (Manifest)",
        "startTime": 1599604725293,
        "endTime": 1599604764298,
        "status": "SUCCEEDED",
        "context": {
            "deploy.account.name": "linode",
            "outputs.createdArtifacts": [],
            "deployedManifests": [{"name": "service patch-service-test", "location": "dev", "account": "linode"}],
            "source": "text",
            "processed.scopedManifests": [{
                "name": "service patch-service-test",
                "location": "dev",
                "account": "linode"
            }],
            "mode": "static",
            "stableManifests": [{"manifestName": "service patch-service-test", "location": "dev"}],
            "patchBody": [{
                "metadata": {"name": "patch-service-test", "namespace": "dev"},
                "apiVersion": "v1",
                "kind": "Service",
                "spec": {
                    "selector": {"$patch": "replace", "selector3": "testtesttest"},
                    "ports": [{"protocol": "TCP", "port": 80, "name": "http", "targetPort": 80}]
                }
            }],
            "cloudProvider": "kubernetes",
            "kato.result.expected": true,
            "options": {"mergeStrategy": "strategic", "record": true},
            "deploy.server.groups": {},
            "kato.last.task.id": {"id": "50edb1c8-99e2-4c36-a08d-99e5a68bb7ac"},
            "requiredArtifacts": [],
            "artifacts": [],
            "app": "sample-app",
            "manifestName": "service patch-service-test",
            "kato.task.terminalRetryCount": 0,
            "refreshed.scopedManifests": [{
                "name": "service patch-service-test",
                "location": "dev",
                "account": "linode"
            }],
            "kato.task.firstNotFoundRetry": -1,
            "outputs.manifestNamesByNamespace": {"dev": ["service patch-service-test"]},
            "manifestNamesByNamespaceToRefresh": {"dev": ["service patch-service-test"]},
            "outputs.boundArtifacts": [],
            "allArtifacts": [],
            "manifests": [{
                "metadata": {"name": "patch-service-test", "namespace": "dev"},
                "apiVersion": "v1",
                "kind": "Service",
                "spec": {
                    "selector": {"$patch": "replace", "selector3": "testtesttest"},
                    "ports": [{"protocol": "TCP", "port": 80, "name": "http", "targetPort": 80}]
                }
            }],
            "messages": [],
            "failedManifests": [],
            "location": "dev",
            "kato.tasks": [{
                "resultObjects": [{
                    "createdArtifacts": [],
                    "manifests": [{"metadata": {"name": "patch-service-test", "namespace": "dev"}, "kind": "service"}],
                    "manifestNamesByNamespace": {"dev": ["service patch-service-test"]},
                    "boundArtifacts": []
                }],
                "id": "50edb1c8-99e2-4c36-a08d-99e5a68bb7ac",
                "history": [{
                    "phase": "ORCHESTRATION",
                    "status": "Initializing Orchestration Task"
                }, {
                    "phase": "ORCHESTRATION",
                    "status": "Processing op: KubernetesPatchManifestOperation"
                }, {
                    "phase": "PATCH_KUBERNETES_MANIFEST",
                    "status": "Beginning patching of manifest"
                }, {
                    "phase": "PATCH_KUBERNETES_MANIFEST",
                    "status": "Finding patch handler for KubernetesCoordinates(kind=service, namespace=dev, name=patch-service-test)..."
                }, {
                    "phase": "PATCH_KUBERNETES_MANIFEST",
                    "status": "Swapping out artifacts in KubernetesCoordinates(kind=service, namespace=dev, name=patch-service-test) from context..."
                }, {
                    "phase": "PATCH_KUBERNETES_MANIFEST",
                    "status": "Submitting manifest service patch-service-test to Kubernetes master..."
                }, {"phase": "ORCHESTRATION", "status": "Orchestration completed."}],
                "status": {"retryable": false, "completed": true, "failed": false}
            }],
            "outputs.manifests": [{"metadata": {"name": "patch-service-test", "namespace": "dev"}, "kind": "service"}],
            "kato.task.notFoundRetryCount": 0,
            "shouldRefreshManifestNamesByNamespaceToRefresh": false,
            "account": "linode",
            "errors": [],
            "kato.task.lastStatus": "SUCCEEDED"
        },
        "outputs": {
            "manifests": [{
                "metadata": {"name": "patch-service-test", "namespace": "dev"},
                "apiVersion": "v1",
                "kind": "Service",
                "spec": {
                    "selector": {"$patch": "replace", "selector3": "testtesttest"},
                    "ports": [{"protocol": "TCP", "port": 80, "name": "http", "targetPort": 80}]
                }
            }],
            "requiredArtifacts": [],
            "allArtifacts": [],
            "outputs.createdArtifacts": [],
            "outputs.manifestNamesByNamespace": {"dev": ["service patch-service-test"]},
            "manifestNamesByNamespaceToRefresh": {"dev": ["service patch-service-test"]},
            "outputs.boundArtifacts": [],
            "outputs.manifests": [{"metadata": {"name": "patch-service-test", "namespace": "dev"}, "kind": "service"}],
            "shouldRefreshManifestNamesByNamespaceToRefresh": true,
            "artifacts": []
        },
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.manifest.ResolveTargetManifestTask",
            "name": "resolveTargetManifest",
            "startTime": 1599604725350,
            "endTime": 1599604725419,
            "status": "SUCCEEDED",
            "stageStart": true,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "2",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.manifest.ResolvePatchSourceManifestTask",
            "name": "resolvePatchSourceManifest",
            "startTime": 1599604725506,
            "endTime": 1599604725726,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "3",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.manifest.PatchManifestTask",
            "name": "patchManifest",
            "startTime": 1599604725790,
            "endTime": 1599604727249,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "4",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.MonitorKatoTask",
            "name": "monitorPatch",
            "startTime": 1599604727309,
            "endTime": 1599604732770,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "5",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.manifest.PromoteManifestKatoOutputsTask",
            "name": "promoteOutputs",
            "startTime": 1599604732827,
            "endTime": 1599604732897,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "6",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.manifest.ManifestForceCacheRefreshTask",
            "name": "forceCacheRefresh",
            "startTime": 1599604732964,
            "endTime": 1599604763817,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "7",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.manifest.WaitForManifestStableTask",
            "name": "waitForManifestToStabilize",
            "startTime": 1599604763876,
            "endTime": 1599604764063,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": false,
            "loopStart": false,
            "loopEnd": false
        }, {
            "id": "8",
            "implementingClass": "com.netflix.spinnaker.orca.pipeline.tasks.artifacts.BindProducedArtifactsTask",
            "name": "bindProducedArtifacts",
            "startTime": 1599604764117,
            "endTime": 1599604764243,
            "status": "SUCCEEDED",
            "stageStart": false,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": ["3"]
    }],
    "startTime": 1599604724400,
    "endTime": 1599604764360,
    "status": "SUCCEEDED",
    "authentication": {
        "user": "mark.a.noe@gmail.com",
        "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"]
    },
    "origin": "api",
    "trigger": {
        "type": "manual",
        "user": "mark.a.noe@gmail.com",
        "parameters": {"action": "patch"},
        "artifacts": [],
        "notifications": [],
        "rebake": false,
        "dryRun": false,
        "strategy": false,
        "resolvedExpectedArtifacts": [],
        "expectedArtifacts": [],
        "executionId": "01EHQXY4E347ZXCTZZS2N5ZN83",
        "eventId": "5439270b-5935-40de-b914-25e39e1462e5",
        "enabled": false,
        "preferred": false
    },
    "pipelineConfigId": "cfe1f184-f944-408d-83c6-d0b9457eef0c",
    "notifications": [],
    "initialConfig": {},
    "systemNotifications": [],
    "spelEvaluator": "v4"
}, {
    "type": "PIPELINE",
    "id": "01EHQXZN7SXM38AE9CWNKHHS03",
    "application": "pattern-test-segments",
    "name": "Artifacts",
    "buildTime": 1599604774191,
    "canceled": false,
    "limitConcurrent": true,
    "keepWaitingPipelines": false,
    "stages": [{
        "id": "01EHQXZN9F3ZXZEF9FC404KVNE",
        "refId": "1",
        "type": "findArtifactFromExecution",
        "name": "Find Artifacts From Execution",
        "startTime": 1599604774339,
        "endTime": 1599604774685,
        "status": "TERMINAL",
        "context": {
            "expectedArtifacts": [{
                "usePriorArtifact": false,
                "displayName": "sweet-shrimp-3",
                "useDefaultArtifact": false,
                "defaultArtifact": {"customKind": true, "id": "cb0c2f86-9cdd-4343-ac75-554bea37c596"},
                "id": "24320361-fc0b-46e6-be8c-02d8baa7cccb",
                "matchArtifact": {"customKind": true, "id": "f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad"}
            }], "pipeline": "cfe1f184-f944-408d-83c6-d0b9457eef0c", "exception": {
                "exceptionType": "InvalidRequestException", "shouldRetry": false, "details": {
                    "stackTrace": "com.netflix.spinnaker.kork.web.exceptions.InvalidRequestException: Unmatched expected artifact ExpectedArtifact(matchArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=false, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=cb0c2f86-9cdd-4343-ac75-554bea37c596}, artifactAccount=null, provenance=null, uuid=null), id=24320361-fc0b-46e6-be8c-02d8baa7cccb, boundArtifact=null) could not be resolved.\n\tat com.netflix.spinnaker.orca.pipeline.util.ArtifactResolver.lambda$resolveExpectedArtifacts$0(ArtifactResolver.java:128)\n\tat java.base/java.util.Optional.orElseThrow(Optional.java:408)\n\tat com.netflix.spinnaker.orca.pipeline.util.ArtifactResolver.resolveExpectedArtifacts(ArtifactResolver.java:125)\n\tat com.netflix.spinnaker.orca.clouddriver.tasks.artifacts.FindArtifactFromExecutionTask.execute(FindArtifactFromExecutionTask.java:70)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2$1.invoke(RunTaskHandler.kt:131)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withLoggingContext(RunTaskHandler.kt:386)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.access$withLoggingContext(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2.invoke(RunTaskHandler.kt:129)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.AuthenticationAware$sam$java_util_concurrent_Callable$0.call(AuthenticationAware.kt)\n\tat com.netflix.spinnaker.security.AuthenticatedRequest.lambda$wrapCallableForPrincipal$0(AuthenticatedRequest.java:272)\n\tat com.netflix.spinnaker.orca.q.handler.AuthenticationAware$DefaultImpls.withAuth(AuthenticationAware.kt:51)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withAuth(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1.invoke(RunTaskHandler.kt:128)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$withTask$1.invoke(RunTaskHandler.kt:217)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$withTask$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withTask$1.invoke(OrcaMessageHandler.kt:68)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withTask$1.invoke(OrcaMessageHandler.kt:46)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withStage$1.invoke(OrcaMessageHandler.kt:85)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withStage$1.invoke(OrcaMessageHandler.kt:46)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withExecution(OrcaMessageHandler.kt:95)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withExecution(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withStage(OrcaMessageHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withStage(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withTask(OrcaMessageHandler.kt:60)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withTask(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withTask(RunTaskHandler.kt:206)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.handle(RunTaskHandler.kt:89)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.handle(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.q.MessageHandler$DefaultImpls.invoke(MessageHandler.kt:36)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.invoke(OrcaMessageHandler.kt)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.audit.ExecutionTrackingMessageHandlerPostProcessor$ExecutionTrackingMessageHandlerProxy.invoke(ExecutionTrackingMessageHandlerPostProcessor.kt:69)\n\tat com.netflix.spinnaker.q.QueueProcessor$callback$1$1.run(QueueProcessor.kt:89)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\n\tat java.base/java.lang.Thread.run(Thread.java:834)\n",
                    "error": "Unexpected Task Failure",
                    "errors": ["Unmatched expected artifact ExpectedArtifact(matchArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=false, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=cb0c2f86-9cdd-4343-ac75-554bea37c596}, artifactAccount=null, provenance=null, uuid=null), id=24320361-fc0b-46e6-be8c-02d8baa7cccb, boundArtifact=null) could not be resolved."]
                }, "operation": "findArtifactFromExecution", "timestamp": 1599604774575
            }, "application": "pattern-test-segments", "executionOptions": {"successful": true}
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.artifacts.FindArtifactFromExecutionTask",
            "name": "findArtifactFromExecution",
            "startTime": 1599604774378,
            "endTime": 1599604774623,
            "status": "TERMINAL",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }],
    "startTime": 1599604774279,
    "endTime": 1599604774704,
    "status": "TERMINAL",
    "authentication": {
        "user": "mark.a.noe@gmail.com",
        "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"]
    },
    "origin": "api",
    "trigger": {
        "type": "manual",
        "user": "mark.a.noe@gmail.com",
        "parameters": {},
        "artifacts": [],
        "notifications": [],
        "rebake": false,
        "dryRun": false,
        "strategy": false,
        "resolvedExpectedArtifacts": [],
        "expectedArtifacts": [],
        "executionId": "01EHQXZN7SXM38AE9CWNKHHS03",
        "eventId": "3cc3617b-e4e4-4ed6-bd87-143134503a2f",
        "enabled": false,
        "preferred": false
    },
    "pipelineConfigId": "c61d6fdb-622a-4b63-aa3b-23810cfc7429",
    "notifications": [],
    "initialConfig": {},
    "systemNotifications": [],
    "spelEvaluator": "v4"
}, {
    "type": "PIPELINE",
    "id": "01EHQXX08NRMM6MC49R4CZ4FZV",
    "application": "pattern-test-segments",
    "name": "Call Orca Endpoint with Webhook",
    "buildTime": 1599604687228,
    "canceled": false,
    "limitConcurrent": true,
    "keepWaitingPipelines": false,
    "stages": [{
        "id": "01EHQXX0BWEXG6H0MTKNT4ZC1E",
        "refId": "1",
        "type": "webhook",
        "name": "Webhook",
        "startTime": 1599604687426,
        "endTime": 1599604688618,
        "status": "FAILED_CONTINUE",
        "context": {
            "webhook": {
                "statusCodeValue": 404,
                "body": "\"Not found\"",
                "error": "Error submitting webhook for pipeline 01EHQXX08NRMM6MC49R4CZ4FZV to https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss with status code 404.",
                "statusCode": "NOT_FOUND"
            },
            "method": "GET",
            "statusUrlResolution": "getMethod",
            "completeOtherBranchesThenFail": false,
            "failPipeline": false,
            "waitForCompletion": false,
            "url": "https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss",
            "continuePipeline": true
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.webhook.tasks.CreateWebhookTask",
            "name": "createWebhook",
            "startTime": 1599604687574,
            "endTime": 1599604688551,
            "status": "FAILED_CONTINUE",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }, {
        "id": "01EHQXX0BWXV5KN7HXEFKJR97Z",
        "refId": "2",
        "type": "evaluateVariables",
        "name": "Evaluate Variables",
        "startTime": 1599604688667,
        "endTime": 1599604688922,
        "status": "CANCELED",
        "context": {
            "failOnFailedExpressions": true,
            "variables": [{
                "key": "webhook_status",
                "value": "FAILED_CONTINUE",
                "sourceValue": "{execution.stages.?[name == 'Webhook'][0].status}"
            }]
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.pipeline.tasks.EvaluateVariablesTask",
            "name": "evaluateVariables",
            "startTime": 1599604688721,
            "endTime": 1599604688827,
            "status": "CANCELED",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": ["1"]
    }, {
        "id": "01EHQXX0BW9ZH73YTFM7F6BEMD",
        "refId": "3",
        "type": "webhook",
        "name": "Webhook",
        "startTime": 1599761591649,
        "endTime": 1599761592890,
        "status": "TERMINAL",
        "context": {
            "webhook": {
                "statusCodeValue": 404,
                "body": "<html>\r\n<head><title>404 Not Found</title></head>\r\n<body>\r\n<center><h1>404 Not Found</h1></center>\r\n<hr><center>nginx/1.17.8</center>\r\n</body>\r\n</html>\r\n",
                "error": "Error submitting webhook for pipeline 01EHQXX08NRMM6MC49R4CZ4FZV to https://dev.apps.marqaaron.io/canary with status code 404.",
                "statusCode": "NOT_FOUND"
            },
            "method": "GET",
            "statusUrlResolution": "getMethod",
            "restartDetails": {"restartTime": 1599761591598, "restartedBy": "mark.a.noe@gmail.com"},
            "url": "https://dev.apps.marqaaron.io/canary"
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.webhook.tasks.CreateWebhookTask",
            "name": "createWebhook",
            "startTime": 1599761591706,
            "endTime": 1599761592822,
            "status": "TERMINAL",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }],
    "startTime": 1599761591609,
    "endTime": 1599761592946,
    "status": "TERMINAL",
    "authentication": {
        "user": "mark.a.noe@gmail.com",
        "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"]
    },
    "origin": "api",
    "trigger": {
        "type": "manual",
        "user": "mark.a.noe@gmail.com",
        "parameters": {},
        "artifacts": [],
        "notifications": [],
        "rebake": false,
        "dryRun": false,
        "strategy": false,
        "resolvedExpectedArtifacts": [],
        "expectedArtifacts": [],
        "executionId": "01EHQXX08NRMM6MC49R4CZ4FZV",
        "eventId": "d941a08e-0136-4d55-87f1-bb68363fb6fd",
        "enabled": false,
        "preferred": false
    },
    "pipelineConfigId": "650604e3-812e-4cb9-8577-ea44e42898ce",
    "notifications": [],
    "initialConfig": {},
    "systemNotifications": [],
    "spelEvaluator": "v4"
}, {
    "type": "PIPELINE",
    "id": "01EHWN94SBFJ1Q914E9WRGA5QZ",
    "application": "pattern-test-segments",
    "name": "Call Orca Endpoint with Webhook",
    "buildTime": 1599763420005,
    "canceled": false,
    "limitConcurrent": true,
    "keepWaitingPipelines": false,
    "stages": [{
        "id": "01EHWN94V5XD24BMZTVEVRYQ12",
        "refId": "1",
        "type": "webhook",
        "name": "Webhook",
        "startTime": 1599763420099,
        "endTime": 1599763420754,
        "status": "FAILED_CONTINUE",
        "context": {
            "webhook": {
                "statusCodeValue": 404,
                "body": "\"Not found\"",
                "error": "Error submitting webhook for pipeline 01EHWN94SBFJ1Q914E9WRGA5QZ to https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss with status code 404.",
                "statusCode": "NOT_FOUND"
            },
            "method": "GET",
            "statusUrlResolution": "getMethod",
            "completeOtherBranchesThenFail": false,
            "failPipeline": false,
            "waitForCompletion": false,
            "url": "https://5f032c4d4c6a2b001648fe4e.mockapi.io/userss",
            "continuePipeline": true
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.webhook.tasks.CreateWebhookTask",
            "name": "createWebhook",
            "startTime": 1599763420145,
            "endTime": 1599763420747,
            "status": "FAILED_CONTINUE",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": []
    }, {
        "id": "01EHWN94V5WCFCVQ6FDZ1HD3ZW",
        "refId": "2",
        "type": "evaluateVariables",
        "name": "Evaluate Variables",
        "status": "NOT_STARTED",
        "context": {
            "failOnFailedExpressions": true,
            "variables": [{"key": "webhook_status", "value": "${execution.stages.?[name == 'Webhook'][0].status}"}]
        },
        "outputs": {},
        "tasks": [],
        "requisiteStageRefIds": ["3"]
    }, {
        "id": "01EHWN94V5C54CAT7Z5NJ8A5X5",
        "refId": "3",
        "type": "manualJudgment",
        "name": "Manual Judgment",
        "startTime": 1599763420807,
        "endTime": 1599763457435,
        "status": "TERMINAL",
        "context": {
            "judgmentStatus": "stop",
            "lastModifiedBy": "mark.a.noe@gmail.com",
            "judgmentInputs": [],
            "failPipeline": true,
            "notifications": []
        },
        "outputs": {},
        "tasks": [{
            "id": "1",
            "implementingClass": "com.netflix.spinnaker.orca.echo.pipeline.ManualJudgmentStage.WaitForManualJudgmentTask",
            "name": "waitForJudgment",
            "startTime": 1599763420818,
            "endTime": 1599763457375,
            "status": "TERMINAL",
            "stageStart": true,
            "stageEnd": true,
            "loopStart": false,
            "loopEnd": false
        }],
        "requisiteStageRefIds": ["1"],
        "lastModified": {
            "user": "mark.a.noe@gmail.com",
            "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"],
            "lastModifiedTime": 1599763457250
        }
    }],
    "startTime": 1599763420078,
    "endTime": 1599763457493,
    "status": "TERMINAL",
    "authentication": {
        "user": "mark.a.noe@gmail.com",
        "allowedAccounts": ["linode", "spinnaker", "marqaaron-docker-registry"]
    },
    "origin": "api",
    "trigger": {
        "type": "manual",
        "user": "mark.a.noe@gmail.com",
        "parameters": {},
        "artifacts": [],
        "notifications": [],
        "rebake": false,
        "dryRun": false,
        "strategy": false,
        "resolvedExpectedArtifacts": [],
        "expectedArtifacts": [],
        "executionId": "01EHWN94SBFJ1Q914E9WRGA5QZ",
        "eventId": "9ba56344-ec05-4484-8200-0062fe65e3dd",
        "enabled": false,
        "preferred": false
    },
    "pipelineConfigId": "650604e3-812e-4cb9-8577-ea44e42898ce",
    "notifications": [],
    "initialConfig": {},
    "systemNotifications": [],
    "spelEvaluator": "v4"
}]

export const successfulResults = [{
    "id": "01EHQXWH8XVRAK29JBF6S9GV9N",
    "refId": "1",
    "type": "findArtifactFromExecution",
    "name": "Find Artifacts From Execution",
    "startTime": 1599604671934,
    "endTime": 1599604672238,
    "status": "TERMINAL",
    "context": {
        "expectedArtifacts": [{
            "usePriorArtifact": false,
            "displayName": "sweet-shrimp-3",
            "useDefaultArtifact": false,
            "defaultArtifact": {"customKind": true, "id": "cb0c2f86-9cdd-4343-ac75-554bea37c596"},
            "id": "24320361-fc0b-46e6-be8c-02d8baa7cccb",
            "matchArtifact": {"customKind": true, "id": "f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad"}
        }], "pipeline": "650604e3-812e-4cb9-8577-ea44e42898ce", "exception": {
            "exceptionType": "InvalidRequestException", "shouldRetry": false, "details": {
                "stackTrace": "com.netflix.spinnaker.kork.web.exceptions.InvalidRequestException: Unmatched expected artifact ExpectedArtifact(matchArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=false, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=cb0c2f86-9cdd-4343-ac75-554bea37c596}, artifactAccount=null, provenance=null, uuid=null), id=24320361-fc0b-46e6-be8c-02d8baa7cccb, boundArtifact=null) could not be resolved.\n\tat com.netflix.spinnaker.orca.pipeline.util.ArtifactResolver.lambda$resolveExpectedArtifacts$0(ArtifactResolver.java:128)\n\tat java.base/java.util.Optional.orElseThrow(Optional.java:408)\n\tat com.netflix.spinnaker.orca.pipeline.util.ArtifactResolver.resolveExpectedArtifacts(ArtifactResolver.java:125)\n\tat com.netflix.spinnaker.orca.clouddriver.tasks.artifacts.FindArtifactFromExecutionTask.execute(FindArtifactFromExecutionTask.java:70)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2$1.invoke(RunTaskHandler.kt:131)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withLoggingContext(RunTaskHandler.kt:386)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.access$withLoggingContext(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2.invoke(RunTaskHandler.kt:129)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1$2.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.AuthenticationAware$sam$java_util_concurrent_Callable$0.call(AuthenticationAware.kt)\n\tat com.netflix.spinnaker.security.AuthenticatedRequest.lambda$wrapCallableForPrincipal$0(AuthenticatedRequest.java:272)\n\tat com.netflix.spinnaker.orca.q.handler.AuthenticationAware$DefaultImpls.withAuth(AuthenticationAware.kt:51)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withAuth(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1.invoke(RunTaskHandler.kt:128)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$handle$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$withTask$1.invoke(RunTaskHandler.kt:217)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler$withTask$1.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withTask$1.invoke(OrcaMessageHandler.kt:68)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withTask$1.invoke(OrcaMessageHandler.kt:46)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withStage$1.invoke(OrcaMessageHandler.kt:85)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$withStage$1.invoke(OrcaMessageHandler.kt:46)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withExecution(OrcaMessageHandler.kt:95)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withExecution(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withStage(OrcaMessageHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withStage(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.withTask(OrcaMessageHandler.kt:60)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withTask(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.withTask(RunTaskHandler.kt:206)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.handle(RunTaskHandler.kt:89)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.handle(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.q.MessageHandler$DefaultImpls.invoke(MessageHandler.kt:36)\n\tat com.netflix.spinnaker.orca.q.handler.OrcaMessageHandler$DefaultImpls.invoke(OrcaMessageHandler.kt)\n\tat com.netflix.spinnaker.orca.q.handler.RunTaskHandler.invoke(RunTaskHandler.kt:74)\n\tat com.netflix.spinnaker.orca.q.audit.ExecutionTrackingMessageHandlerPostProcessor$ExecutionTrackingMessageHandlerProxy.invoke(ExecutionTrackingMessageHandlerPostProcessor.kt:69)\n\tat com.netflix.spinnaker.q.QueueProcessor$callback$1$1.run(QueueProcessor.kt:89)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\n\tat java.base/java.lang.Thread.run(Thread.java:834)\n",
                "error": "Unexpected Task Failure",
                "errors": ["Unmatched expected artifact ExpectedArtifact(matchArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=f6bbf3b4-e9d7-482c-a77c-5ea3cf5cb0ad}, artifactAccount=null, provenance=null, uuid=null), usePriorArtifact=false, useDefaultArtifact=false, defaultArtifact=Artifact(type=null, customKind=true, name=null, version=null, location=null, reference=null, metadata={id=cb0c2f86-9cdd-4343-ac75-554bea37c596}, artifactAccount=null, provenance=null, uuid=null), id=24320361-fc0b-46e6-be8c-02d8baa7cccb, boundArtifact=null) could not be resolved."]
            }, "operation": "findArtifactFromExecution", "timestamp": 1599604672140
        }, "application": "pattern-test-segments", "executionOptions": {"successful": true}
    },
    "outputs": {},
    "tasks": [{
        "id": "1",
        "implementingClass": "com.netflix.spinnaker.orca.clouddriver.tasks.artifacts.FindArtifactFromExecutionTask",
        "name": "findArtifactFromExecution",
        "startTime": 1599604671991,
        "endTime": 1599604672180,
        "status": "TERMINAL",
        "stageStart": true,
        "stageEnd": true,
        "loopStart": false,
        "loopEnd": false
    }],
    "requisiteStageRefIds": []
}]

export const failureResults = {
    description: "Failed to evaluate [expression] requested getter stagess not found on type class com.netflix.spinnaker.orca.pipeline.model.PipelineExecutionImpl - EL1021E: A problem occurred whilst attempting to access the property 'stagess': 'requested getter stagess not found on type class com.netflix.spinnaker.orca.pipeline.model.PipelineExecutionImpl'",
    exceptionType: "java.lang.IllegalArgumentException",
    level: "ERROR",
    timestamp: 1601220016491
}