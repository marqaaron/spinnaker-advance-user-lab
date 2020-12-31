const testerSettingsImageLink = require('./tester-settings.png');
export const testerSettingsFeatureOverview =
`
# Pipeline Expression Test Environment: Test Settings

---

The Test Settings panel is the first point of interaction with the Pipeline Expression Test Environment (PETE). 

![Tester Settings](${testerSettingsImageLink})

In order for PETE to successfully test a pipeline expression, a Pipeline Execution must be selected.  Given that Pipeline Executions are associated with Pipelines that are associated with Applications, the first action in the Tester Settings panel is to select an Application from the drop-down list that is populated upon initial load of PETE.

> **NOTE:** The Applications listed in this drop-down are limited to only those for which the current user has at least READ access to in Spinnaker.

The Application and Pipeline drop-down lists are both sorted alphabetically while the Execution dropdown list is sorted by execution date in descending order (i.e. most recent at the top).

Each item in the Execution drop-down list displays the execution date as a 'time since now' and the Pipeline Execution ID.

---

## Basic Usage
1. Select an Application
    * Auto-populated on initial load of PETE
2. Select a Pipeline
    * Auto-populated on Application selection
3. Select an Execution
    * Auto-populated on Application selection then filtered on Pipeline selection
4. PETE automatically loads the Execution Context for reference and opens the Pipeline Expression Editor panel.

---

## Manually Clear Tester Settings
* Clear all of the current Tester Settings at once by clicking the red trash can button
::: warning
> **WARNING:** This will also clear the following:
> 1. Currently loaded Pipeline Execution in the Execution Context Viewer
> 2. Currently written Pipeline Expression in the Pipeline Expression Editor
> 3. Currently loaded Expression Results in the Expression Results Viewer
:::
   
> **NOTE:** This will not clear previous test results listed in the Test History

---

## Manually Refresh Applications, Pipelines, and Execution Lists
* The Applications, Pipelines, and Execution lists can be individually refreshed by clicking the yellow button at the end of each input.

---

## Auto Refresh of Applications, Pipelines, and Execution Lists
* The Applications, Pipelines, and Execution lists are automatically refreshed any time the Tester Settings is opened after making the initial selections.
    
`