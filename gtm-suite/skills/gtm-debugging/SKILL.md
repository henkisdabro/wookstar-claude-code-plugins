---
name: gtm-debugging
description: Expert guidance for debugging and testing Google Tag Manager implementations using Preview mode, Tag Assistant, debug console, and troubleshooting common issues like tags not firing, undefined variables, or timing problems. Use when debugging GTM, troubleshooting why tags aren't firing, testing GTM configurations, or analyzing GTM issues.
---

# GTM Debugging & Testing

## Overview
This skill provides expertise for debugging and testing Google Tag Manager implementations using Preview mode, Tag Assistant, and systematic troubleshooting approaches.

## When to Use This Skill
Invoke this skill when:
- Debugging why tags aren't firing
- Testing GTM implementations
- Troubleshooting undefined variables
- Investigating timing or sequencing issues
- Using GTM Preview mode
- Working with Tag Assistant
- Validating GTM configurations
- Comparing GTM versions

## Preview Mode & Debug Console

### Enable Preview Mode
1. Open GTM container
2. Click "Preview" button
3. Enter your website URL
4. Debug window opens

### Debug Console Sections
- **Summary** - All events fired on page
- **Tags** - Tags fired and not fired
- **Variables** - All variable values
- **Data Layer** - Data layer state at each event
- **Errors** - JavaScript errors and issues

## Common Debugging Workflows

### Debug Tag Not Firing
1. Enter Preview Mode
2. Trigger the event
3. Check "Tags Not Fired" section
4. Review trigger conditions in Variables tab
5. Inspect Data Layer
6. Fix conditions and retest

### Debug Undefined Variable
1. Find the event where variable is needed
2. Check Variables tab for the variable
3. Verify data layer contains the value
4. Check variable configuration (path, type)
5. Verify timing (is data available when tag fires?)

### Debug Data Layer Issues
1. Open Data Layer tab in debug console
2. Find the event where data should be pushed
3. Verify data structure matches expectations
4. Check for typos in variable names
5. Validate data types (string, number, object)

## Common Issues & Solutions

### Tag Fires on Wrong Pages
- Check trigger conditions
- Verify Page URL or Page Path filters
- Review trigger exceptions
- Test with different URL patterns

### Variable Returns Undefined
- Check data layer path (dot notation)
- Verify timing (pushed before tag fires?)
- Check for typos in variable names
- Validate data layer structure

### Tag Fires Multiple Times
- Check for duplicate triggers
- Review History Change triggers on SPAs
- Verify event deduplication
- Check tag sequencing

### Performance Issues
- Review number of tags firing
- Check custom HTML execution time
- Audit unnecessary triggers
- See gtm-best-practices skill for optimization

## Tag Assistant
- Chrome extension for GTM debugging
- Real-time tag validation
- HTTP request inspection
- GA4 event validation

## Testing Checklist
- [ ] Tags fire on correct pages/events
- [ ] Variables populate with correct values
- [ ] No JavaScript errors in console
- [ ] Data layer pushes correctly
- [ ] Triggers activate as expected
- [ ] No duplicate tag fires
- [ ] Performance is acceptable

## References
- **references/debugging-testing.md** - Debug console, preview mode, testing workflows

## Integration with Other Skills
## Integration with Other Skills
- **gtm-general** - General GTM guidance and concepts
- **gtm-tags** - Understand tag configuration
- **gtm-triggers** - Understand trigger setup
- **gtm-variables** - Understand variable configuration
- **gtm-datalayer** - Debug data layer implementation
- **gtm-setup** - Verify container installation
- **gtm-best-practices** - Testing and optimization best practices
