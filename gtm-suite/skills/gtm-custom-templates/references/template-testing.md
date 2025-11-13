# Tests

**Source**: https://developers.google.com/tag-platform/tag-manager/templates/tests
**Extracted**: 2025-01-09

## Overview

Unit tests for Google Tag Manager custom templates help you validate the functionality of your templates. You can create a set of tests for each template that can be run without needing to deploy your tag, which allows you to continuously test your template's behavior during development. Each test can provide sample input values, mock function calls, and assert code behavior.

## Limitations

- Unit tests do not check validation rules but you can manually check validation using the **Run Code** button.
- Permission checks do not happen on mocked APIs in unit tests.

## Step-by-Step Guide: Creating a Variable Template with Tests

This guide creates a variable template that takes an input string and returns the uppercase version of that string.

### Steps 1-3: Create Template and Add Field
1. Create a new variable template. Click **Templates** in the left navigation and click **New** under the **Variable Templates** section.
2. Click **Fields**.
3. Click **Add Field** and select **Text input**. Name the field \`text1\` and set the display name to _"Text 1"_.

### Step 4: Add Template Code

In the **Code** tab, replace the default code with this sandboxed JavaScript:

\`\`\`javascript
let input = data.text1;
return input.toUpperCase();
\`\`\`

### Steps 5-7: Create First Test

5. Click **Tests** to open the testing tab.
6. Click **Add Test** and change the test's name from _"Untitled test 1"_ to _"Handles strings"_.
7. Click on the expand icon to reveal the test's sandboxed JavaScript editor. Replace the code with:

\`\`\`javascript
// Call runCode to run the template's code with a lowercase string
let variableResult = runCode({text1: 'this is a test'});
// Validate that the result of runCode is an uppercase string.
assertThat(variableResult).isEqualTo('THIS IS A TEST');
\`\`\`

This test passes the string \`'this is a test'\` to the variable and verifies that the variable returns the expected value of \`'THIS IS A TEST'\`. The \`runCode\` API is used to run the template code in the **Code** tab. The argument to \`runCode\` is an object that is used as the data global. The \`assertThat\` API returns an object that can be used to fluently make assertions about a subject's value.

### Step 8: Run Tests

Click **▶ Run Tests** to run the test. The output of the test will appear in the Console.

The **▶ Run Tests** button runs all of the enabled tests in the template, in the order shown. To change the order, use the drag icon. A test can be temporarily enabled or disabled by clicking on the circle to the left of the test name. To run a single test, click the ▶ button that appears when you move the mouse over the test.

The console should print the total number of tests run and the number of tests that failed, if any. In this case, only one test was run and it should pass.

### Steps 9-11: Create Second Test for Edge Cases

9. Click **Add Test** again to add a second test. Change the test's name from _"Untitled test 2"_ to _"Handles undefined"_.
10. Click on the test to expand it and reveal the sandboxed JavaScript editor. Enter:

\`\`\`javascript
let variableResult = runCode({});
assertThat(variableResult).isEqualTo(undefined);
\`\`\`

11. Click **▶ Run Tests** to run all of the tests at once. The output of the test will appear in the console.

The _Handles undefined_ test should fail. Congratulations, you found a bug!

### Steps 12-14: Fix Code and Re-test

12. Click **Code** to go back and edit the template's sandboxed JavaScript code. Update the code as follows:

\`\`\`javascript
const getType = require('getType');

let input = data.text1;
if (getType(input) !== 'string') {
  return input;
}
return input.toUpperCase();
\`\`\`

The updated code follows the best practice of validating the \`input\` variable before using it.

13. Click **Tests** to go back to the list of test cases.
14. Click **▶ Run Tests** to run all of the test cases again. This time the _Handles undefined_ test should pass.
15. Click **Save**, and close the Template Editor.

## Core APIs

### runCode
Executes the template's code with provided sample data object. Arguments are merged into the data global variable used in the template code.

### assertThat
Returns an object that can be used to fluently make assertions about a subject's value. Used for validation in tests.
