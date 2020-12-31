const expressionEditorImageLink = require('./expression-editor.png');
export const expressionEditorFeatureOverview =
    `
# Pipeline Expression Test Environment: Pipeline Expression Editor

---

The Pipeline Expression Editor panel is the third point of interaction with the Pipeline Expression Test Environment (PETE). 

![Pipeline Expression Editor](${expressionEditorImageLink})

PETE does not evaluate the written expressions locally at the client browser. Instead, PETE makes a request to 'evaluateExpression' Spinnaker GATE API with the written expression. The 'evaluateExpression' endpoint returns one of two types of results:
1. Success that contains the resulting match of the written expression
2. Failure that contains an error message

This means that syntax validation is handled by Spinnaker instead of PETE.  If a syntactically incorrect expression is submitted for evaluation, PETE will provide the error response and a failure indication in the Expression Results Viewer.
> **NOTE:** Both Successful and Failure expression tests are listed in the Test History

---

## Basic Usage
1. Review the Execution Context for the desired property
2. Enter a Pipeline Expression into the text input that targets the desired property from the Execution Context
    > **NOTE:** Must be written without the dollar sign '$' and the opening/closing curly braces '{}'
    
    > **NOTE:** If the expression provided is wrapped in '\\$\\{\\}', PETE will remove these characters prior to evaluating
3. Press 'Evaluate Expression' button
4. PETE automatically opens the Expression Results Viewer panel and loads the result returned from Spinnaker.
    > **NOTE:** The Expression is evaluated by Spinnaker at the following Gate endpoint:
    > * https://{baseGateURL}/pipelines/{pipelineId}/evaluateExpression

---

## Manually Clear Pipeline Expression Editor
* Clear the currently written Pipeline Expression by clicking the red trash can button
::: warning
> **WARNING:** This will also clear the following:
> 1. Expression Syntax Helpers for the currently selected Execution Context property
:::
    
> **NOTE:** This will not clear previous test results listed in the Test History

___

## Copy Current Pipeline Expression
* Copy the current Pipeline Expression by clicking the blue copy button
> **NOTE:** This will copy the entire expression (with the surrounding '\\$\\{\\}') to the clipboard for easy of moving the expression to a Spinnaker Pipeline

---

## Additional References
1. <a href="https://spinnaker.io/guides/user/pipeline/expressions/" target="_blank">Spinnaker.io Pipeline Expression Guide</a>
2. <a href="https://spinnaker.io/reference/pipeline/expressions/" target="_blank">Spinnaker.io Pipeline Expression Reference</a>
3. <a href="https://www.baeldung.com/spring-expression-language" target="_blank">Baeldung Spring Expression Guide</a>
4. <a href="https://docs.spring.io/spring-integration/docs/5.3.0.RELEASE/reference/html/spel.html" target="_blank">Spring.io Spring Expression Guide</a>
5. <a href="http://www.springframework.net/doc-latest/reference/html/expressions.html" target="_blank">Springframework.net Expression Reference</a>
    
`