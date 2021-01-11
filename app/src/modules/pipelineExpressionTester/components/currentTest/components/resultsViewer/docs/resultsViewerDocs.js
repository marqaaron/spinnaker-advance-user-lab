const expressionResultsViewerSuccessfulImageLink = require('./expression-results-viewer-successful.png');
const expressionResultsViewerFailureImageLink = require('./expression-results-viewer-failure.png');
export const expressionResultsViewerFeatureOverview =
    `
# Pipeline Expression Test Environment: Expression Results Viewer

---

The Execution Context Viewer panel is the fifth point of interaction with the Pipeline Expression Test Environment (PETE). 

![Expression Results Viewer Successful](${expressionResultsViewerSuccessfulImageLink})

When a submitted Pipeline Expression is evaluated successfully the results will be displayed as above.

![Expression Results Viewer Failure](${expressionResultsViewerFailureImageLink})

When a submitted Pipeline Expression fails to be evaluated the results will be displayed as above.

---

## Basic Usage
1. Review the Expression Results for the desired match that was targeted by the Pipeline Expression Editor.

    ::: warning
    > **WARNING:** The root property of the entire Pipeline Execution is \`execution\`.
    > If the objective is to return the type of the pipeline, simply enter \`execution.type\` into the Pipeline Expression Editor.
    :::
    
    > **NOTE:** The JSON Object displayed in the Execution Results Viewer is dynamic. Arrays and Objects can be expanded or collapsed by clicking on the square braces or curly brackets.
    
    > **NOTE:** Clicking on a property name will open up the Expression Syntax Helpers relevant to the property and its data type.
    
2. Refine pipeline expression as necessary.
    
`