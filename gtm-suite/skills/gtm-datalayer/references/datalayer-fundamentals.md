# The Data Layer

**Source**: https://developers.google.com/tag-platform/tag-manager/datalayer
**Extracted**: 2025-01-09

The data layer is an object used by Google Tag Manager and gtag.js to pass information to tags. Events or variables can be passed via the data layer, and triggers can be set up based on the values of variables.

For example, if you fire a remarketing tag when the value of `purchase_total` is greater than $100, or based on the specific events, e.g. when a button is clicked, your data layer can be configured to make that data available to your tags. The data layer object is structured as JSON. For example:

```json
{
  "event": "checkout_button",
  "gtm": {
    "uniqueEventId": 2,
    "start": 1639524976560,
    "scrollThreshold": 90,
    "scrollUnits": "percent",
    "scrollDirection": "vertical",
    "triggers": "1_27"
  },
  "value": "120"
}
```

Google tags are designed to easily reference information that is added to the data layer in an organized and predictable way, rather than by parsing variables, transaction information, page categories, and other signals scattered throughout your page. A data layer implementation populated with variables and associated values will help to ensure that relevant data is available when your tags need them.

## Installation

For Tag Manager web page installations, you must create a data layer. The data layer is established before Tag Manager is loaded:

```javascript
<script>
window.dataLayer = window.dataLayer || [];
</script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

In standard gtag.js implementations where the tag has been copied from within the product and added to a web page, the code to establish the data layer is provided. In custom implementations of the Google tag, add the data layer code at the beginning of your script:

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'TAG_ID');
</script>
```

## How Data Layer Information is Processed

When a container is loaded, Tag Manager will begin to process all queued data layer push messages. Tag Manager processes messages on a first-in, first-out basis: Each message is processed one at a time, in the order it was received. If the message is an event, any tags with trigger conditions that have been met will fire before Tag Manager moves on to the next message.

If a `gtag()` or `dataLayer.push()` call is made by code on a page, in a Custom Template, or in a Custom HTML tag, the associated message is queued and processed after all other pending messages are evaluated. This means that any updated data layer values are not guaranteed to be available for the next event. To handle these cases, you should add an event name to a message as it is pushed to the data layer, and then listen for that event name with a Custom Event trigger.

## Use a Data Layer with Event Handlers

The `dataLayer` object uses an `event` command to initiate the sending of events.

The Google tag and Tag Manager use a special data layer variable called `event` that is used by JavaScript event listeners to fire tags when a user interacts with website elements. For example, you may want to fire a conversion tracking tag when a user clicks a purchase confirmation button. Events may be called whenever a user interacts with website elements such as links, buttons, scrolls, etc.

This functionality is accomplished by calling `dataLayer.push()` when an event occurs. The syntax for sending an event with `dataLayer.push()` is as follows:

```javascript
dataLayer.push({'event': 'event_name'});
```

Where `event_name` is a string that describes the event, such as `'login'`, `purchase`, or `search`.

Use `dataLayer.push()` to send event data when an action occurs that you'd like to measure. For example, to send an event when a user clicks a button, modify the button's `onclick` handler:

```html
<button onclick="dataLayer.push({'event': 'login'});">Button 1</button>
```

You can push data layer variables to the data layer dynamically to capture information such as values entered or selected in a form, metadata associated with a video that the visitor is playing, the color of a product (e.g. a car) customized by the visitor, the destination URLs of clicked links, etc.

The basic syntax for setting dynamic data layer variables is as follows:

```javascript
dataLayer.push({'variable_name': 'variable_value'});
```

Where `'variable_name'` is a string indicating the name of the data layer variable to be set, and `'variable_value'` is a string indicating the value of the data layer variable to be set or replaced.

For example, to set a data layer variable with a color preference when a visitor engages with a product customization tool:

```javascript
dataLayer.push({'color': 'red'});
```

## One Push, Multiple Variables

You can push multiple variables and events at once:

```javascript
dataLayer.push({
  'color': 'red',
  'conversionValue': 50,
  'event': 'customize'
});
```

## Persist Data Layer Variables

To persist data layer variables between web pages, call `dataLayer.push()` after the data layer has been instantiated on each page load, and push the variables to the data layer. If you want these data layer variables to be available to Tag Manager when the container is loaded, add a `dataLayer.push()` call above the Tag Manager container code:

```javascript
<script>
window.dataLayer = window.dataLayer || [];

dataLayer.push({
 'event': 'Pageview',
 'pagePath': 'https://www.googleanalytics.dev/pancakes',
 'pageTitle': 'Pancake Event Signup',
 'visitorType': 'customer'
});
</script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

Each variable declared within the data layer object will persist only as long as the visitor remains on the current page. Data layer variables that are relevant across pages (e.g. `visitorType`) must be declared in the data layer on each page of your website. While you don't need to put the same set of variables in the data layer on every page, you should use a consistent naming convention. In other words: if you set the page category on the signup page using a variable called `pageCategory`, your product and purchase pages should use the `pageCategory` variable as well.

## Troubleshooting

Here are some data layer troubleshooting tips:

**Do not overwrite the `window.dataLayer` variable:** When you use the data layer directly (e.g. `dataLayer = [{'item': 'value'}]`), it will overwrite any existing values in the `dataLayer`. Tag Manager installations should instantiate the data layer as high up in the source code as possible, above the container snippet, using `window.dataLayer = window.dataLayer || [];`. After the `dataLayer` has been declared, use `dataLayer.push({'item': 'value'})` to add additional values to it, and if those values need to be available to Tag Manager when the page loads, then that `dataLayer.push()` call needs to be above the Tag Manager container code as well.

**The `dataLayer` object name is case-sensitive:** If you try to push a variable or event without the proper casing, the push will not work.

```javascript
datalayer.push({'pageTitle': 'Home'});    // Bad (datalayer in lowercase)
dataLayer.push({'pageTitle': 'Home'});    // Good (dataLayer in camel case)
```

`dataLayer.push` must be called with valid JavaScript objects. All data layer variable names should be enclosed in quotes.

```javascript
dataLayer.push({new-variable: 'value'});      // Bad - no quote marks
dataLayer.push({'new-variable': 'value'});    // Good - proper quote marks
```

**Keep variable names consistent across pages:** If you use different variable names for the same concept on different pages, your tags will be unable to consistently fire in all desired locations.

Bad:
```javascript
// Homepage:
dataLayer.push({'visitorType': 'low-value'});

// Checkout Page:
dataLayer.push({'visitor_type': 'high-value'});
```

Good:
```javascript
// Homepage:
dataLayer.push({'visitorType': 'low-value'});

// Checkout Page:
dataLayer.push({'visitorType': 'high-value'});
```

## Rename the Data Layer

The default name of the data layer object initiated by the Google tag or Tag Manager is `dataLayer`. If you'd prefer to use a different name for your data layer, you may do so by editing the data layer parameter value in your Google tag or Tag Manager container snippet with the name of your choice.

### For gtag.js

Add a query parameter named "l" to the URL to set the new data layer name, e.g. `l=myNewName`. Update all instances of `dataLayer` in the Google tag snippet to the new name:

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID&l=myNewName"></script>
<script>
  window.myNewName = window.myNewName || [];
  function gtag(){myNewName.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'TAG_ID');
</script>
```

### For Tag Manager

Replace the data layer parameter value in your container snippet with the name of your choice:

```javascript
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','myNewName','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

Once renamed, all references to your data layer (i.e. when declaring the data layer above the snippet, or when pushing events or dynamic data layer variables to the data layer with the `.push()` command) must be adjusted to reflect your custom data layer name:

```javascript
<script>
  myNewName = window.dataLayer || [];
  myNewName.push({'variable_name': 'variable_value'});
</script>
```

## Custom Data Layer Methods

If you push a function to the data layer, it will be invoked with this set to an abstract data model. This abstract data model can get and set values to a key value store, and also provides a way to reset the data layer.

### Set

The `set` function on the abstract data model lets you set values to retrieve through get:

```javascript
window.dataLayer.push(function() {
  this.set('time', new Date());
});
```

### Get

The `get` function on the abstract data model lets you retrieve values that were set:

```javascript
window.dataLayer.push(function() {
  const existingTime = this.get('time');
  if (existingTime !== null) {
    // Change behavior based on whether or not this value exists...
  } else {
    // ...
  }
})
```

### Reset

The `reset` function on the abstract data model lets you reset the data in the data layer. This is most useful with a page that will remain open and the data layer size continues to grow over time:

```javascript
window.dataLayer.push(function() {
  this.reset();
})
```
