const testHistoryListImageLink = require('./test-history-list.png');
export const testHistoryFeatureOverview =
    `
# Pipeline Expression Test Environment: Test History

---

The Execution Context Viewer panel is the final point of interaction with the Pipeline Expression Test Environment (PETE). 

::: warning
> **WARNING:** The Spinnaker Advanced User Lab (SAUL) does not currently a backing persistent storage capability.  Due to the lack of persistent storage, PETE only mains a list of previous test results for the current browser session.  Once the browser or browser tab is closed, the Test History listed is lost.
:::

![Test History List](${testHistoryListImageLink})

Each Pipeline Expression tested during the current session is listed as above with key information about the test displayed.


---

## Basic Usage
1. Review previously submitted expressions as well as the evaluated test results.
2. If necessary, reload the entire test into the current test panels to include:
    * Test Settings
    * Pipeline Expression
    * Execution Context
    * Evaluation Results
3. Copy the Pipeline Expression by clicking the blue copy button
> **NOTE:** This will copy the entire expression (with the surrounding '\\$\\{\\}') to the clipboard for easy of moving the expression to a Spinnaker Pipeline
    
`