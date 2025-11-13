___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "My Custom Variable",
  "categories": ["UTILITY"],
  "brand": {
    "id": "brand_id",
    "displayName": "My Brand"
  },
  "description": "A custom variable template for...",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "TEXT",
    "name": "cookieName",
    "displayName": "Cookie Name",
    "simpleValueType": true,
    "help": "Name of the cookie to read",
    "valueValidators": [
      {
        "type": "NON_EMPTY"
      }
    ]
  },
  {
    "type": "TEXT",
    "name": "defaultValue",
    "displayName": "Default Value",
    "simpleValueType": true,
    "help": "Value to return if cookie is not found"
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

// Require necessary APIs
const getCookieValues = require('getCookieValues');
const logToConsole = require('logToConsole');

// Access template data
const cookieName = data.cookieName;
const defaultValue = data.defaultValue;

// Get cookie values
const cookies = getCookieValues(cookieName);

// Return first cookie value or default
if (cookies && cookies.length > 0) {
  return cookies[0];
}

return defaultValue;


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "get_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "cookieAccess",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios:
- name: Returns cookie value when exists
  code: |-
    mock('getCookieValues', (name) => {
      if (name === 'testCookie') {
        return ['cookieValue'];
      }
      return [];
    });

    const mockData = {
      cookieName: 'testCookie',
      defaultValue: 'default'
    };

    let result = runCode(mockData);

    assertThat(result).isEqualTo('cookieValue');

- name: Returns default value when cookie does not exist
  code: |-
    mock('getCookieValues', (name) => {
      return [];
    });

    const mockData = {
      cookieName: 'nonExistentCookie',
      defaultValue: 'defaultValue'
    };

    let result = runCode(mockData);

    assertThat(result).isEqualTo('defaultValue');


___NOTES___

Created using Custom Variable Template Boilerplate
