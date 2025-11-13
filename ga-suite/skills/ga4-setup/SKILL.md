---
name: ga4-setup
description: Expert guidance for Google Analytics 4 property setup, data stream configuration, and installation methods including gtag.js, Google Tag Manager, and CMS plugins. Use when creating new GA4 properties, setting up data streams, installing tracking code, configuring measurement IDs (G-XXXXXXXXXX format), troubleshooting installation issues, working with WordPress/Shopify/CMS platforms, or verifying GA4 implementation with Realtime reports and Tag Assistant.
---

# GA4 Property Setup & Installation

## Overview

Setting up Google Analytics 4 requires creating an account hierarchy, configuring data streams, and installing tracking code. This skill provides step-by-step guidance for all GA4 setup methods from initial property creation through implementation verification.

## When to Use This Skill

Invoke this skill when:

- Creating new GA4 properties for websites or apps
- Setting up data streams (web, iOS, or Android)
- Installing GA4 tracking code via any method
- Configuring Measurement IDs (G-XXXXXXXXXX format)
- Troubleshooting installation issues or missing data
- Working with CMS platforms (WordPress, Shopify, Wix, Squarespace)
- Verifying GA4 implementation before launch
- Migrating from Universal Analytics to GA4
- Setting up GA4 for the first time

## Core Capabilities

### Property Creation & Configuration

Create GA4 accounts, properties, and data streams with proper hierarchy and settings:

- Account structure (organization-level container)
- Property configuration (timezone, currency, industry category)
- Business objectives selection
- Data stream creation for web and app platforms

### Data Stream Setup

Configure three platform types with unique Measurement IDs:

- **Web Data Streams**: Website tracking with G-XXXXXXXXXX format
- **iOS Data Streams**: Apple app tracking with Firebase integration
- **Android Data Streams**: Android app tracking with Firebase integration

Each data stream receives a unique Measurement ID used for implementation.

### Installation Methods

Implement GA4 using one of three methods based on technical requirements:

**Method 1: Native Integration/Plugin (Easiest)**
- WordPress plugins (GA4WP, Analytify)
- Shopify native integration
- CMS platform built-in GA4 support
- Best for: Non-technical users, quick setup

**Method 2: Manual gtag.js Installation**
- Direct code placement in website head section
- Requires HTML/code access
- Lightweight, Google-only tracking
- Best for: Developers, custom implementations

**Method 3: Google Tag Manager (Recommended)**
- Centralized tag management
- No code changes for future updates
- Multiple tag support
- Best for: Most use cases, marketing teams

### Implementation Verification

Validate installation using multiple verification methods:

- Real-time reports (Admin → Realtime)
- DebugView (Admin → DebugView)
- Google Tag Assistant Chrome extension
- Preview mode testing (GTM)
- Event parameter validation

### Troubleshooting

Diagnose and resolve common installation issues:

- No data in GA4 reports
- Data only in DebugView
- Duplicate events from multiple codes
- Incorrect Measurement ID configuration
- Enhanced Measurement not working
- Missing automatic events

## Quick Start

### Creating Your First GA4 Property

1. Navigate to analytics.google.com
2. Admin → Create → Property
3. Enter property details (name, timezone, currency)
4. Select business category and objectives
5. Accept terms and create property
6. Add data stream (Web, iOS, or Android)
7. Note Measurement ID (G-XXXXXXXXXX)

### Installing via GTM (Recommended)

1. Install GTM container on website
2. Copy GA4 Measurement ID from Data Streams
3. In GTM: Tags → New → Google Tag
4. Enter Measurement ID in Tag ID field
5. Trigger: Initialization - All Pages
6. Save and publish container
7. Verify in DebugView

### Verifying Installation

1. Enable Google Analytics Debugger extension
2. Visit website in Chrome
3. Admin → DebugView
4. Confirm events appearing (session_start, page_view)
5. Check Realtime report shows active users
6. Validate event parameters in DebugView

## Integration with Other Skills

- **ga4-events-fundamentals** - Next step after setup to understand event architecture
- **ga4-gtag-implementation** - Detailed gtag.js implementation guidance
- **ga4-gtm-integration** - Complete GTM configuration for GA4
- **ga4-debugview** - Advanced debugging and testing techniques
- **gtm-setup** (existing skill) - General GTM container installation

## References

Detailed implementation guidance available in references:

- **references/property-creation-guide.md** - Step-by-step property and account setup with visual guidance
- **references/data-streams-configuration.md** - Complete data stream configuration for web, iOS, and Android platforms
- **references/installation-methods.md** - All three installation methods with code examples and CMS-specific instructions
- **references/verification-checklist.md** - Post-installation validation procedures and troubleshooting guide

## Assets

Ready-to-use templates and checklists:

- **assets/gtag-installation-template.html** - Complete gtag.js installation snippet with Measurement ID placeholder

## Key Concepts

**Account Hierarchy**: Google Account → Analytics Account → Property → Data Stream

**Measurement ID Format**: G-XXXXXXXXXX (10 alphanumeric characters after G-)

**Data Stream Types**: Web (websites), iOS (Apple apps), Android (Android apps)

**Installation Methods**: CMS/Plugin, gtag.js, Google Tag Manager

**Verification Tools**: DebugView, Realtime reports, Tag Assistant

## Common Issues

Address frequently encountered setup problems:

- **No data appearing**: Verify code placement and Measurement ID
- **Data only in DebugView**: Remove debug_mode parameter
- **Duplicate events**: Check for multiple tracking implementations
- **Wrong Measurement ID**: Confirm using correct Data Stream ID
- **Events not firing**: Validate Enhanced Measurement settings

## Best Practices

Follow recommended practices for successful GA4 setup:

- Create separate properties for test and production environments
- Use GTM for most implementations (flexibility and maintainability)
- Enable Enhanced Measurement for automatic event collection
- Verify installation before promoting to production
- Document Measurement IDs and configuration decisions
- Set up internal traffic filters from day one
- Configure data retention settings appropriately
- Test with DebugView before relying on standard reports
