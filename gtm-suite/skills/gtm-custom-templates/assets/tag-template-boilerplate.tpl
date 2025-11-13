___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "My Custom Tag",
  "categories": ["ANALYTICS", "MARKETING"],
  "brand": {
    "id": "brand_id",
    "displayName": "My Brand",
    "thumbnail": ""
  },
  "description": "A custom tag template for...",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "TEXT",
    "name": "endpoint",
    "displayName": "API Endpoint",
    "simpleValueType": true,
    "help": "Enter the API endpoint URL",
    "valueValidators": [
      {
        "type": "NON_EMPTY"
      },
      {
        "type": "REGEX",
        "args": ["^https?://.*"]
      }
    ]
  },
  {
    "type": "TEXT",
    "name": "eventName",
    "displayName": "Event Name",
    "simpleValueType": true,
    "defaultValue": "custom_event"
  },
  {
    "type": "CHECKBOX",
    "name": "debug",
    "checkboxText": "Enable Debug Mode",
    "simpleValueType": true,
    "defaultValue": false
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

// Require necessary APIs
const sendPixel = require('sendPixel');
const logToConsole = require('logToConsole');
const encodeUriComponent = require('encodeUriComponent');

// Access template data
const endpoint = data.endpoint;
const eventName = data.eventName;
const debug = data.debug;

// Debug logging
if (debug) {
  logToConsole('Custom Tag Firing', {
    endpoint: endpoint,
    eventName: eventName
  });
}

// Build pixel URL
const pixelUrl = endpoint + '?event=' + encodeUriComponent(eventName);

// Fire pixel
sendPixel(pixelUrl, data.gtmOnSuccess, data.gtmOnFailure);


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "debug"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "send_pixel",
        "versionId": "1"
      },
      "param": [
        {
          "key": "allowedUrls",
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
- name: Tag fires successfully
  code: |-
    const mockData = {
      endpoint: 'https://example.com/pixel',
      eventName: 'test_event',
      debug: false
    };

    // Call runCode to run the template's code.
    runCode(mockData);

    // Verify that the tag finished successfully.
    assertApi('gtmOnSuccess').wasCalled();
- name: Debug mode logs to console
  code: |-
    const mockData = {
      endpoint: 'https://example.com/pixel',
      eventName: 'test_event',
      debug: true
    };

    runCode(mockData);

    // Verify logging occurred
    assertApi('logToConsole').wasCalledWith('Custom Tag Firing', {
      endpoint: 'https://example.com/pixel',
      eventName: 'test_event'
    });


___NOTES___

Created using Custom Template Boilerplate
