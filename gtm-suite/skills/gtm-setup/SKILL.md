---
name: gtm-setup
description: Expert guidance for Google Tag Manager container setup, installation, account management, workspaces, environments, and version publishing. Use when setting up new GTM containers, installing GTM snippets, managing workspaces, configuring environments, or publishing GTM versions.
---

# GTM Container Setup & Management

## Overview
This skill provides expertise for setting up and managing Google Tag Manager containers, including installation, workspace management, and deployment workflows.

## When to Use This Skill
Invoke this skill when:
- Setting up a new GTM container (web, mobile, server-side)
- Installing GTM snippet code
- Managing workspaces for different projects
- Configuring environments (Development, Staging, Production)
- Publishing GTM versions
- Managing container permissions and user access
- Setting up multiple containers on one site

## Container Types

### Web Containers
- Install GTM snippet in `<head>` and `<body>`
- Configure container for single-page applications (SPAs)
- Set up multiple containers on one site
- Manage container permissions and user access

### Server-Side Containers
- Deploy to Cloudflare Workers, Google Cloud, or other platforms
- Configure server-side clients and tags
- Set up custom tag templates for server endpoints
- Implement first-party data collection

### Mobile Containers
- Configure Firebase integration
- Set up mobile-specific triggers and variables

## Workspace Management
- Use workspaces for different projects
- Create versions with detailed notes
- Compare versions and test in different environments
- Maintain version history and rollback capability

## Publishing Workflow
1. Create changes in workspace
2. Test in Preview mode
3. Create version with detailed notes
4. Publish to appropriate environment
5. Verify deployment

## References
- **references/gtm-overview.md** - GTM fundamentals, architecture, account structure

## Integration with Other Skills
- **gtm-general** - General GTM guidance and concepts
- **gtm-tags** - Configure tags for tracking
- **gtm-triggers** - Set up triggers for tags
- **gtm-variables** - Create variables for dynamic data
- **gtm-debugging** - Debug and test your GTM setup
- **gtm-best-practices** - Follow GTM implementation best practices
- **gtm-datalayer** - Implement data layer for tracking
- **gtm-custom-templates** - Build custom templates
- **gtm-api** - Programmatic container management
