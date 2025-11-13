---
name: gtm-triggers
description: Expert guidance for configuring Google Tag Manager triggers including page view triggers, click triggers (all elements, just links), form submission triggers, scroll depth tracking, element visibility triggers, video triggers (YouTube), custom event triggers, timer triggers, history change triggers for SPAs, JavaScript error triggers, trigger conditions, RegEx patterns, trigger exceptions, auto-event variables, and combining multiple trigger conditions. Use when creating triggers, setting up click tracking, configuring form submit tracking, implementing scroll tracking, working with custom events, debugging trigger conditions, using RegEx in triggers, setting trigger exceptions, or troubleshooting why triggers aren't firing.
---

# GTM Triggers Configuration

## Overview
Expert guidance for configuring all types of triggers in Google Tag Manager that control when tags fire, from simple page views to complex conditional triggers with RegEx patterns.

## When to Use This Skill
Invoke this skill when:
- Creating or configuring GTM triggers
- Setting up page view or DOM-based triggers
- Implementing click tracking (buttons, links, elements)
- Configuring form submission tracking
- Setting up scroll depth or element visibility triggers
- Working with custom event triggers from data layer
- Creating timer or history change triggers
- Using RegEx patterns in trigger conditions
- Setting up trigger exceptions (when NOT to fire)
- Combining multiple conditions in triggers
- Debugging why triggers aren't firing
- Optimizing trigger performance

## Trigger Types

### Pageview Triggers
- **Page View** - Fires on every page load (including virtual pages)
- **DOM Ready** - Fires when DOM is ready (before images load)
- **Window Loaded** - Fires when page fully loads (including images)

Use cases:
- Page View: Most common for tracking page views
- DOM Ready: Fire tags before full page load for performance
- Window Loaded: When you need all page resources loaded

### Click Triggers
- **All Elements** - Track clicks on any element (buttons, divs, images, etc.)
- **Just Links** - Track clicks only on `<a>` tags

Auto-Event Variables available:
- Click Element, Click Classes, Click ID
- Click URL, Click Text
- Click Target

### Form Triggers
- **Form Submission** - Fires when form is submitted

Auto-Event Variables available:
- Form Element, Form Classes, Form ID
- Form Target, Form URL
- Form Text

### User Engagement Triggers
- **Scroll Depth** - Track when users scroll to specific depths
  - Vertical Scroll Depths: 25%, 50%, 75%, 90%, etc.
  - Horizontal scrolling also supported
- **Element Visibility** - Fire when element becomes visible
  - Minimum visibility percentage
  - On-screen duration requirements
- **YouTube Video** - Track video plays, pauses, progress
  - Requires YouTube videos to have enablejsapi=1

### Custom Event Triggers
- **Custom Event** - Fire when specific data layer event occurs
- Event name must match `dataLayer.push({'event': 'event_name'})`
- Most flexible trigger type for custom implementations

### Timer Triggers
- **Timer** - Fire repeatedly at intervals
- Set interval (milliseconds)
- Set limit on number of times to fire
- Use for tracking time on page, polling, etc.

### History Triggers
- **History Change** - Fire on URL changes without page reload
- Essential for Single Page Applications (SPAs)
- Tracks pushState, replaceState, and hash changes

### Other Triggers
- **JavaScript Error** - Fire when JavaScript errors occur
- **Trigger Group** - Combine multiple triggers with AND logic
- **Window Resize** - Fire when browser window resizes (custom via Custom HTML)

## Trigger Configuration

### Basic Configuration
1. **Trigger Type** - Select the type of trigger
2. **Trigger Name** - Use clear naming convention
3. **Trigger Conditions** - Define when to fire
4. **Trigger Exceptions** - Define when NOT to fire

### Trigger Conditions (Filters)
Combine multiple conditions with AND/OR logic:

**Condition Structure:**
- Variable (e.g., Click URL, Page Path)
- Operator (equals, contains, matches RegEx, etc.)
- Value (static text or variable)

**Common Operators:**
- `equals` - Exact match
- `contains` - Substring match
- `matches RegEx` - Pattern matching
- `starts with` - Prefix match
- `ends with` - Suffix match
- `less than` / `greater than` - Numeric comparison
- `CSS selector` - Match element with selector

**Example Conditions:**
```
Click URL contains /checkout
Page Path equals /thank-you
Click Classes matches RegEx ^btn-primary$
Form ID equals contact-form
```

### Trigger Exceptions
Prevent trigger from firing in specific cases:
- Same format as conditions
- Useful for excluding specific pages, elements, or scenarios

**Example:**
Trigger on all clicks EXCEPT:
- Click URL contains /admin
- Click Classes contains no-track

### RegEx in Triggers
Use Regular Expressions for complex pattern matching:
- `.*` - Match any characters
- `^` - Start of string
- `$` - End of string
- `|` - OR operator
- `[a-z]` - Character range
- `\d` - Any digit

**Examples:**
```
Page Path matches RegEx: ^/(products|services)/.*
Click URL matches RegEx: \.(pdf|docx?)$
Custom Event equals: purchase|checkout|lead
```

See references/google-rew-regular-expressions-syntax.txt for complete RegEx syntax.

## Common Workflows

### Create Click Trigger for Specific Button
1. Create new trigger → Click - All Elements
2. Set condition: Click Classes contains "cta-button"
3. Or use: Click ID equals "signup-btn"
4. Test in Preview mode by clicking button
5. Verify in Tags Fired section

### Set Up Form Submission Trigger
1. Create new trigger → Form Submission
2. Set condition: Form ID equals "contact-form"
3. Or use: Page Path equals /contact
4. Set exception if needed (e.g., exclude test forms)
5. Test by submitting form in Preview mode

### Configure Scroll Depth Trigger
1. Create new trigger → Scroll Depth
2. Select Vertical Scroll Depths
3. Choose percentages: 25, 50, 75, 90
4. Set Page Path condition if needed (specific pages only)
5. Test by scrolling on page

### Create Custom Event Trigger
1. Ensure data layer push is implemented: `dataLayer.push({'event': 'add_to_cart'})`
2. Create new trigger → Custom Event
3. Set Event name: add_to_cart
4. Add conditions as needed (e.g., fire only on specific pages)
5. Test in Preview mode, check Data Layer tab

### Set Up History Change Trigger for SPA
1. Create new trigger → History Change
2. Add condition: Page Path matches RegEx (if needed)
3. Test by navigating within SPA
4. Verify trigger fires on URL changes without page reload

## Best Practices

### Trigger Naming
Use consistent format: `[Event Type] - [Description]`

Examples:
- `Click - CTA Button`
- `Page View - Homepage`
- `Form Submit - Contact Form`
- `Custom Event - Add to Cart`

### Trigger Optimization
- Use specific conditions to avoid over-firing
- Set exceptions to exclude unwanted scenarios
- Test thoroughly in Preview mode
- Use built-in variables when possible (faster than custom JS)
- Avoid overly complex RegEx patterns

### Common Pitfalls
- **Click triggers not firing**: Element might be removed before click registers
  - Solution: Use "Wait for Tags" or increase timeout
- **Form triggers not firing**: Form submits via AJAX without traditional submit
  - Solution: Use custom event trigger instead
- **History triggers over-firing**: Fires on every URL parameter change
  - Solution: Add specific Page Path conditions

### Auto-Event Variables
Enable relevant built-in variables for triggers:
- Click triggers: Click Element, Click Classes, Click ID, Click URL, Click Text
- Form triggers: Form Element, Form Classes, Form ID, Form URL, Form Text
- Scroll triggers: Scroll Depth Threshold, Scroll Depth Units
- Video triggers: Video Provider, Video Status, Video URL, Video Title

## References
- **references/triggers.md** - Comprehensive trigger configuration guide with all trigger types, conditions, and advanced patterns
- **references/google-rew-regular-expressions-syntax.txt** - RegEx syntax for trigger conditions

Search reference files for specific topics:
```bash
grep -r "Custom Event" references/
grep -r "scroll depth" references/
grep -r "RegEx" references/
```

## Integration with Other Skills
- **gtm-tags** - Configure tags that use these triggers
- **gtm-variables** - Use variables in trigger conditions
- **gtm-debugging** - Debug triggers that aren't firing
- **gtm-datalayer** - Implement custom events for custom event triggers
- **gtm-setup** - Container setup and built-in variables
- **gtm-best-practices** - Trigger naming conventions and optimization

## Quick Reference

### Trigger Type Selection Guide
- **Simple page tracking**: Page View
- **Button/link clicks**: Click triggers
- **Form submissions**: Form Submission
- **User engagement**: Scroll Depth, Element Visibility
- **Custom implementation**: Custom Event
- **SPA navigation**: History Change
- **Polling/time-based**: Timer
- **Error monitoring**: JavaScript Error

### Common Condition Patterns
```
// Homepage only
Page Path equals /

// All product pages
Page Path starts with /products/

// PDF downloads
Click URL ends with .pdf

// Multiple pages with RegEx
Page Path matches RegEx ^/(about|contact|services)$

// Exclude admin pages
Page Path does not contain /admin/
```

### Debugging Checklist
- [ ] Trigger type is correct for event
- [ ] Trigger conditions are specific enough
- [ ] Built-in variables are enabled
- [ ] No conflicting trigger exceptions
- [ ] Testing in Preview mode
- [ ] Checking Variables tab for condition values
