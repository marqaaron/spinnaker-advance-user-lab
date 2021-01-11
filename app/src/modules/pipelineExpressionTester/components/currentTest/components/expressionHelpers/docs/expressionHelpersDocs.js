const expressionSyntaxHelperBasicImageLink = require('./expression-helper-basic.png');
export const expressionSyntaxHelperFeatureOverview =
`
# Pipeline Expression Test Environment: Expression Syntax Helpers

---

The Expression Helper panel is the fourth point of interaction with the Pipeline Expression Test Environment (PETE) that appears below the Pipeline Expression Editor panel when a property of the pipeline execution is clicked in the Execution Context Viewer. 

![Expression Syntax Helper Basic View](${expressionSyntaxHelperBasicImageLink})

---

## Basic Usage
The Expression Syntax Helpers are intended provide information necessary to rapidly create syntactically correct Pipeline Expressions.

By default, the Expression Syntax Helper panel is in 'Copy' mode whereby the information in the helpers can be copied to the clipboard by clicking the blue copy button at the end of its input.

Alternatively, the Expression Syntax Helper can be placed into 'Insert at Cursor' mode by toggling the switch at the top of the panel.

> **NOTE:** More details about 'Insert at Cursor' mode below

Default Syntax Helpers displayed for all property types:
* Direct Path
* Property Name

> **NOTE:** Additional details about each of these as well as other syntax helpers below

---

## Insert at Cursor Mode
While PETE allows for quick copying the syntax from the helpers by default, this mode allows for increased ease in building pipeline expressions by replacing the copy buttons at the end of each helper with an insert at cursor button.

When enabled, PETE will place the contents of the helper at the location of the cursor in the Pipeline Expression Editor.

If the cursor is not currently in the Pipeline Expression Editor, PETE will place the contents of the helper at the end of the current expression string.

If a section of text is currently highlighted, PETE will replace the highlighted string with the contents of the helper.

---

## Syntax Helper: Direct Path
**Displayed:** Always

This helper provides the full direct path to the selected property from the Execution Context Viewer. Since the root path of the context is \`execution\`, PETE will always prepend \`execution.\` the beginning of the direct path.

While this is generally apparent when reviewing the pipeline context in the Execution Context Viewer, it is also true when a property is selected from the Expression Result Viewer even though the full pipeline context is no longer visible.  

PETE accomplishes this by keep track of the relative location of the resulting match to the expression then prepending that location to the selected property.

::: warning
> **WARNING:** When selecting the property contained within an array the direct path with contain a strict reference to the location within the array. While there are times when this is appropriate, be sure to filter the array by a property value when appropriate to ensure the desired match is consistently achieved.
:::

___

## Syntax Helper: Property Name
**Displayed:** Always

There are times, such as when creating Map Filters, that the Property Name is required in the expression syntax. This syntax helper provides the name to be copied so as to reduce the possibility of typos.

---

## Syntax Helper: Property Value
**Displayed:** String, Integers, & Booleans

There are times, such as when creating Map Filters, that the Property Value is required in the expression syntax. This syntax helper provides the name to be copied so as to reduce the possibility of typos.

---

## Syntax Helper: Filter Array by Property Match
**Displayed:** Arrays Only

This helper provides a default structure for conducting a map filtering against an array using a string match against a property's value.  The syntax contains placeholders for the property name \`propertyName\` and property value \`propertyValue\` that must be replaced.

::: warning
> **WARNING:** The regular expression used for the match must match the entire value contained in the property. If searching for a partial string place \`.*\` at the beginning and end of the regular expression.
:::

::: warning
> **WARNING:** The default syntax for the regular expression is set to a 'case insensitive' search.  If strict case matching is desired, remove the \`(?i)\` from the syntax.
:::

If using 'Insert at Cursor' mode, both the Property Name and Property Value helpers will display 'Overwrite' buttons to replace the placeholders with their respective values in the text that is in the Pipeline Expression Editor.

--- 

## Syntax Helper: Filter Array by Property Regex
**Displayed:** Arrays Only

This helper provides a default structure for conducting a map filtering against an array using a regular expression against a property's value.  The syntax contains placeholders for the property name \`propertyName\` and regular expression pattern \`regexHere\` that must be replaced.

If using 'Insert at Cursor' mode, both the Property Name and Property Value helpers will display 'Overwrite' buttons to replace the placeholders with their respective values in the text that is in the Pipeline Expression Editor.

--- 

## Syntax Helper: Array Size/Count
**Displayed:** Arrays Only

This helper provides the size/count of an array whether contained in the pipeline context or as the result of a pipeline expression.

`