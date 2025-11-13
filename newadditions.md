# GTM Analytics Tagging Hub

**36 production-ready Claude Code skills** for digital analytics, e-commerce tracking, and marketing automation. Deep expertise in Google Tag Manager, Google Analytics 4, Shopify, and Google marketing platforms.

## What's Inside

This repository provides specialized AI skills that supercharge your work with:

- **Google Tag Manager (10 skills)** - Setup, configuration, debugging, custom templates, API automation
- **Google Analytics 4 (15 skills)** - Complete GA4 implementation from setup to BigQuery integration
- **Shopify (6 skills)** - Theme development, Liquid templates, API integration, performance optimization
- **Google Platforms (2 skills)** - Google Ads Scripts and Google Apps Script automation
- **Utilities (3 skills)** - Skill creation, Excel/spreadsheet analysis

## Quick Links

- **Skills Best Practices:** [CLAUDE.md](./CLAUDE.md) - Learn how to build effective Claude Code skills
- **Analytics MCP:** https://github.com/googleanalytics/google-analytics-mcp
- **Legacy Research:** `research/` folder contains historical planning documents

## How It Works

Simply ask Claude Code questions or give it tasks - the AI automatically selects the right skill based on your needs:

```
"Help me install GTM on my React website"
→ Automatically invokes: gtm-setup

"Create a GA4 purchase event for my checkout page"
→ Automatically invokes: ga4-recommended-events

"Build a Shopify section that displays featured products"
→ Automatically invokes: shopify-liquid

"Debug why my form submission tag isn't firing"
→ Automatically invokes: gtm-debugging
```

**Key Features:**
- **Focused expertise:** Each skill addresses one specific capability
- **Smart discovery:** Skills are automatically invoked based on keywords in your requests
- **Progressive loading:** Only loads the documentation you need
- **Complete coverage:** From beginner setup to advanced API automation

## Skills by Platform

### Google Tag Manager (10 skills)

**Setup & Configuration:**
- `gtm-general` - GTM fundamentals and architecture
- `gtm-setup` - Container setup and installation
- `gtm-tags` - Tag configuration (GA4, Google Ads, custom HTML)
- `gtm-triggers` - Trigger patterns (pageview, click, form, custom)
- `gtm-variables` - Variable management and data extraction

**Implementation & Optimization:**
- `gtm-datalayer` - Data layer architecture for SPAs (React/Vue/Angular/Next.js)
- `gtm-debugging` - Preview mode, Tag Assistant, troubleshooting
- `gtm-best-practices` - Performance, security, naming conventions
- `gtm-custom-templates` - Sandboxed JavaScript templates
- `gtm-api` - REST API automation (Python/Node.js)

### Google Analytics 4 (15 skills)

**Foundation (Tier 1):**
- `ga4-setup` - Property setup and data streams
- `ga4-events-fundamentals` - Event architecture and parameters
- `ga4-gtag-implementation` - Direct gtag.js implementation

**Configuration (Tier 2):**
- `ga4-recommended-events` - E-commerce and conversion tracking
- `ga4-custom-events` - Business-specific event tracking
- `ga4-user-tracking` - User ID and cross-device tracking

**Advanced (Tier 3):**
- `ga4-custom-dimensions` - Custom dimensions and metrics
- `ga4-audiences` - Audience building and remarketing
- `ga4-debugview` - Testing and validation

**Integration (Tier 4):**
- `ga4-gtm-integration` - GA4 via Google Tag Manager
- `ga4-measurement-protocol` - Server-side event tracking
- `ga4-privacy-compliance` - GDPR and consent mode

**Analysis (Tier 5):**
- `ga4-reporting` - Reports and Explorations
- `ga4-bigquery` - BigQuery export and SQL analysis
- `ga4-data-management` - Admin settings and data retention

### Shopify (6 skills)

- `shopify-liquid` - Liquid templating language
- `shopify-theme-dev` - Theme development and customization
- `shopify-api` - GraphQL/REST API integration
- `shopify-app-dev` - Custom app development
- `shopify-performance` - Speed and Core Web Vitals optimization
- `shopify-debugging` - Troubleshooting and testing

### Google Platforms (2 skills)

- `google-ads-scripts` - Google Ads automation
- `google-apps-script` - Google Workspace automation

### Utilities (3 skills)

- `skill-creator` - Build your own Claude Code skills
- `xlsx` - Spreadsheet creation and editing
- `excel-analysis` - Data analysis and visualization

---

## Getting Started

### Prerequisites
- [Claude Code](https://claude.com/claude-code) installed
- Basic knowledge of your platform (GTM, GA4, Shopify, etc.)

### Usage

Simply navigate to this repository in Claude Code and ask questions naturally:

```bash
cd gtm-analytics-tagging-hub

# Claude Code will automatically use the right skills
```

**Example prompts:**
- "Help me set up Google Tag Manager on my Next.js website"
- "Create a GA4 e-commerce tracking implementation for add_to_cart"
- "Build a Shopify product recommendation section using Liquid"
- "Debug why my form submission tag isn't firing in Preview mode"
- "Write a Google Ads Script to pause low-performing keywords"

### Skill Discovery

Skills are automatically invoked based on keywords:
- **Platforms:** GTM, GA4, Shopify, Google Ads, Google Apps Script
- **File types:** `.json`, `.tpl`, `.liquid`, `.jsx`, `.tsx`
- **Frameworks:** React, Vue, Angular, Next.js
- **Languages:** JavaScript, Python, Node.js
- **Actions:** setup, debug, implement, create, optimize

## Repository Structure

```
.claude/skills/
├── gtm-*/              # 10 Google Tag Manager skills
├── ga4-*/              # 15 Google Analytics 4 skills
├── shopify-*/          # 6 Shopify development skills
├── google-*/           # 2 Google platform skills
└── */                  # 3 utility skills

research/               # Legacy planning documents (historical reference)
```

Each skill contains:
- `SKILL.md` - Core instructions (<5k words)
- `references/` - Detailed documentation
- `assets/` - Templates and examples

## Key Resources

**Official Documentation:**
- [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Shopify Developers](https://shopify.dev/)
- [Google Ads Scripts](https://developers.google.com/google-ads/scripts)
- [Google Apps Script](https://developers.google.com/apps-script)

**Expert Content:**
- [Simo Ahava's Blog](https://www.simoahava.com/) - GTM and GA4 expertise
- [Analytics MCP](https://github.com/googleanalytics/google-analytics-mcp) - Official Google Analytics MCP server

## For Skill Developers

Want to create your own Claude Code skills? This repository follows best practices for building high-quality skills:

**Key Principles:**
- **One skill, one capability** - Focused expertise beats monolithic documentation
- **Progressive disclosure** - Keep SKILL.md concise (<5k words), use references/ for details
- **Smart descriptions** - "What + When" formula with trigger keywords
- **Cross-referencing** - Link related skills for complex workflows

**Learn More:**
- See [CLAUDE.md](./CLAUDE.md) for comprehensive guidelines
- Check existing skills in `.claude/skills/` for examples
- Use the `skill-creator` skill to build your own

## Contributing

Contributions welcome! To improve existing skills or add new ones:

1. Fork the repository
2. Follow the guidelines in [CLAUDE.md](./CLAUDE.md)
3. Test your changes with Claude Code
4. Submit a pull request

## About

**Created by:** Henrik Soederlund ([@henkisdabro](https://github.com/henkisdabro))
**Location:** Perth, Australia
**Stack:** React, Vite, TypeScript, Cloudflare Workers

---

**Status:** ✅ Production Ready - 36 skills covering GTM, GA4, Shopify, and Google platforms