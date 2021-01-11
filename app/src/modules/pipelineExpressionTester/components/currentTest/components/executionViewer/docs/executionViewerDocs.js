const executionContextViewerEmptyImageLink = require('./execution-context-viewer-empty.png');
const executionContextViewerImageLink = require('./execution-context-viewer.png');
export const executionContextViewerFeatureOverview =
    `
# Pipeline Expression Test Environment: Execution Context Viewer

---

The Execution Context Viewer panel is the second point of interaction with the Pipeline Expression Test Environment (PETE). 

![Execution Context Viewer Empty](${executionContextViewerEmptyImageLink})

By default, PETE does not have a pipeline execution context loaded so the Execution Context Viewer will display the above message.

![Execution Context Viewer](${executionContextViewerImageLink})

After configuring the Test Settings the Execution Context Viewer will load the selected pipeline execution to be used as reference.

---

## Basic Usage
1. Review the Execution Context for the desired property that will be targeted by the Pipeline Expression Editor

    ::: warning
    > **WARNING:** The root property of the entire Pipeline Execution is \`execution\`.
    > If the objective is to return the type of the pipeline, simply enter \`execution.type\` into the Pipeline Expression Editor.
    :::
    
    > **NOTE:** The JSON Object displayed in the Execution Context Viewer is dynamic. Arrays and Objects can be expanded or collapsed by clicking on the square braces or curly brackets.
    
    > **NOTE:** Clicking on a property name will open up the Expression Syntax Helpers relevant to the property and its data type.
2. Enter a Pipeline Expression into the Pipeline Expression Editor input that targets the desired property from the Execution Context
    
`