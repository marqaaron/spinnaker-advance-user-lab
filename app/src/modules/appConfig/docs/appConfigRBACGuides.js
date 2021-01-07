const defaultAdminViewMenuItemImageLink = require('./admin-view-menu-item-default.png');
const rbacAdminViewMenuItemImageLink = require('./admin-view-menu-item-rbac.png');
export const configuringRBACOnAdminView =
`
# SAUL Configuration: Role-based Access Control (RBAC) on the Administrator View

---

As defined by the manifests distributed in the code repository, SAUL is not configured to enforce roles-based access control (RBAC) on the Administrator View. This is due to the customizable nature of role naming within Spinnaker when Fiat is enabled.  By default, the Administrator View link in the menu list as follows:

![Default Administrator View Menu Item Display](${defaultAdminViewMenuItemImageLink})

SAUL can be configured to enforce RBAC on the Administrator View using a **single role** defined in the ConfigMap used when deploying SAUL. Once RBAC is configured, the Administrator View link in the menu list will be displayed with a lock icon as follows:

![RBAC Administrator View Menu Item Display](${rbacAdminViewMenuItemImageLink})

## Spinnaker Requirements

In order to enable RBAC in SAUL, Authorization (i.e. RBAC via Fiat) but be configured in Spinnaker to work in concert with Authentication through Gate.  Ensure you have Spinnaker configured properly prior to configuring SAUL.
* <a href="https://spinnaker.io/setup/security/authorization/" target="_blank">Spinnaker.io Authorization Guide</a>
* <a href="https://docs.armory.io/docs/installation/operator-reference/security/" target="_blank">Armory Spinnaker Operator: Security Reference</a>

## Configure RBAC on the Administrator View

To enable RBAC, add the following property to your ConfigMap substituting your desired admin role in place of the default text \`spin-admin\` and redeploy SAUL:

\`\`\`
RBAC_ROLE_ADMIN_VIEW: 'spin-admin'
\`\`\`

* Property Requirements:
    * Data Type: String
    * Required for SAUL to Function: No
    
::: warning
> **WARNING:** If the \`RBAC_ROLE_ADMIN_VIEW\` ConfigMap parameter is set to an empty string or removed from the ConfigMap used to deploy SAUL, RBAC will not be enforced on the Administrator View.
:::
    
`