const debugModeExampleOutput = require('./debug-mode-example-output.png');
export const configuringDebugMode =
    `
# SAUL Configuration: Enabling Debug Mode in Production Builds

---

As defined by the manifests distributed in the code repository, SAUL is not configured to configured to be in Debug Mode in production.  Much of SAUL's code base contains console.log messages visible in the console of a browser's Developer Tools when working with the code locally when the Vue application is considered to be in a non-production environment.  An example of the messages is displayed below.

![Example Debug Mode Output](${debugModeExampleOutput})

## Spinnaker Requirements

* None

## Configure Debug Mode in Production Builds

To enable the Debug Mode, add the following property to your ConfigMap and redeploy SAUL:

\`\`\`
DEBUG_MODE: 'true'
\`\`\`

* Property Requirements:
    * Data Type: String
    * Required for SAUL to Function: No
    
::: warning
> **WARNING:** If the \`DEBUG_MODE\` ConfigMap parameter is set to an empty string, removed from the ConfigMap used to deploy SAUL, or set to anything other than \`'true'\`, Debug Mode will not be enabled.
:::
    
`