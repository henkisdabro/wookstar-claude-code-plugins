---
name: gtm-tags
description: Expert guidance for configuring Google Tag Manager tags including GA4 configuration tags, GA4 event tags, Google Ads conversion tracking, Google Ads remarketing, custom HTML tags, third-party marketing tags (Facebook Pixel, LinkedIn Insight, TikTok Pixel), community template tags, tag sequencing, tag firing priority, consent settings, and tag timeout configuration. Use when creating tags, configuring GA4 tags, setting up Google Ads tracking, implementing marketing pixels, working with custom HTML, configuring tag firing order, setting up tag dependencies, implementing consent mode for tags, or troubleshooting tag configuration issues.
---

# GTM Tags Configuration

## Overview
Expert guidance for configuring all types of tags in Google Tag Manager, from Google Analytics 4 and Google Ads to custom HTML and third-party marketing platforms.

## When to Use This Skill
Invoke this skill when:
- Creating or configuring GTM tags of any type
- Setting up GA4 Configuration or Event tags
- Implementing Google Ads conversion tracking or remarketing
- Adding third-party marketing tags (Facebook, LinkedIn, TikTok, etc.)
- Writing custom HTML tags
- Configuring tag firing priority and sequencing
- Setting up tag timeout or consent settings
- Implementing tag dependencies or firing conditions
- Troubleshooting why a tag isn't configured correctly
- Optimizing tag configuration for performance

## Common Tag Types

### Google Analytics 4 Tags
- **GA4 Configuration Tag** - Base tag for GA4 tracking
- **GA4 Event Tag** - Custom events and conversions
- Event parameters and user properties
- E-commerce events (purchase, add_to_cart, view_item, etc.)
- Debug mode configuration

### Google Ads Tags
- **Conversion Tracking** - Track conversions and assign values
- **Remarketing** - Build audiences for retargeting
- Enhanced conversions setup
- Conversion linker tag

### Marketing Platform Tags
- Facebook Pixel (Meta Pixel)
- LinkedIn Insight Tag
- TikTok Pixel
- Twitter/X Pixel
- Pinterest Tag
- Snapchat Pixel

### Custom Tags
- Custom HTML tags for any JavaScript
- Custom Image tags
- Community Template Gallery tags

## Tag Configuration Settings

### Core Settings
- Tag Type selection
- Configuration fields (varies by tag type)
- Trigger assignment (when the tag fires)
- Exception configuration (when NOT to fire)

### Advanced Settings
- **Tag Firing Priority** - Control execution order (higher numbers fire first)
- **Tag Sequencing** - Setup tags that must fire before/after this tag
- **Tag Firing Options** - Once per event, once per page, unlimited
- **Consent Settings** - Require consent for tag firing
- **Tag Scheduling** - Set start/end dates for tag activity

### Performance Settings
- **Timeout** - Maximum time to wait for tag to complete
- **Advanced Tag Firing** - Fire in DOM Ready, Page View, or Window Loaded

## Common Workflows

### Create a GA4 Event Tag
1. Click "New Tag" in GTM workspace
2. Select "Google Analytics: GA4 Event" tag type
3. Enter Measurement ID or reference GA4 Configuration tag
4. Set Event Name (e.g., "form_submit")
5. Add Event Parameters as needed
6. Select trigger (when to fire the tag)
7. Save and test in Preview mode

### Set Up Google Ads Conversion Tag
1. Create new tag → Google Ads Conversion Tracking
2. Enter Conversion ID and Conversion Label from Google Ads
3. Set conversion value (static or variable)
4. Configure transaction ID for deduplication
5. Assign trigger (e.g., purchase completion page)
6. Test and publish

### Add Custom HTML Tag
1. Create new tag → Custom HTML
2. Paste JavaScript code in HTML field
3. Ensure code is properly formatted
4. Consider security implications
5. Set appropriate trigger
6. Test thoroughly before publishing

### Configure Tag Sequencing
1. Open tag that should fire first
2. Go to Advanced Settings → Tag Sequencing
3. Add "Setup Tag" (fires before this tag)
4. Add "Cleanup Tag" (fires after this tag)
5. Configure "pause" settings if needed
6. Test firing order in Preview mode

## Best Practices

### Tag Organization
- Use clear, consistent naming: `[Platform] - [Type] - [Description]`
- Example: `GA4 - Event - Form Submit`, `Google Ads - Conversion - Purchase`
- Group related tags in folders
- Document complex configurations in tag notes

### Performance Optimization
- Prefer native tag templates over custom HTML
- Minimize custom JavaScript in tags
- Set appropriate timeouts (avoid overly long waits)
- Remove unused tags regularly
- Consolidate similar tags when possible

### Security & Privacy
- Vet all custom HTML code carefully
- Review third-party tag templates before use
- Implement consent mode for privacy compliance
- Avoid sending PII (Personally Identifiable Information)
- Use tag permissions to control access

## References
- **references/tags.md** - Comprehensive tag configuration guide with all tag types, parameters, and advanced configuration
- **references/google-rew-regular-expressions-syntax.txt** - RegEx syntax for tag firing conditions

Search reference files for specific topics:
```bash
grep -r "GA4 Event" references/
grep -r "consent" references/
grep -r "Custom HTML" references/
```

## Integration with Other Skills
- **gtm-triggers** - Configure when tags fire
- **gtm-variables** - Use variables in tag configuration
- **gtm-debugging** - Debug tags that aren't firing correctly
- **gtm-setup** - Container setup and workspace management
- **gtm-datalayer** - Advanced data layer implementation for event tags
- **gtm-best-practices** - Tag naming conventions and optimization strategies
- **gtm-custom-templates** - Build custom tag templates

## Quick Reference

### Common Tag Types Quick List
- GA4 Configuration
- GA4 Event
- Google Ads Conversion Tracking
- Google Ads Remarketing
- Conversion Linker
- Custom HTML
- Custom Image
- Community Template (various)

### Tag Firing Priority
- Higher number = fires first (e.g., 100 fires before 50)
- Default priority = no value set
- Use for ensuring setup tags fire before tracking tags

### Consent Settings
- **No additional consent required** - Tag fires immediately
- **Require additional consent for tag to fire** - Block until consent given
- Map to consent types (analytics_storage, ad_storage, etc.)
