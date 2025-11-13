---
name: gtm-best-practices
description: Expert guidance for Google Tag Manager best practices including naming conventions, performance optimization, security, privacy compliance, container organization, and deployment strategies. Use when optimizing GTM performance, implementing security best practices, setting up naming conventions, auditing GTM containers, or ensuring privacy compliance.
---

# GTM Best Practices

## Overview
This skill provides best practices for Google Tag Manager including naming conventions, performance optimization, security, privacy, and deployment strategies.

## When to Use This Skill
Invoke this skill when:
- Optimizing GTM container performance
- Implementing security best practices
- Setting up naming conventions
- Auditing GTM containers
- Ensuring privacy compliance
- Planning deployment strategies
- Reviewing GTM implementations

## Naming Conventions

### Tags
Format: `[Platform] - [Type] - [Description]`
Examples:
- `GA4 - Event - Form Submit`
- `Google Ads - Conversion - Purchase`
- `FB - Pixel - Page View`

### Triggers
Format: `[Event Type] - [Description]`
Examples:
- `Click - CTA Button`
- `Page View - Homepage`
- `Form Submit - Contact Form`

### Variables
Format: `[Type] - [Description]`
Examples:
- `DL - User ID`
- `CJS - Format Price`
- `Cookie - Session ID`

## Performance Optimization

### Minimize Tag Load Time
- Use native tag templates instead of custom HTML
- Minimize custom JavaScript
- Implement async loading
- Configure appropriate timeouts
- Remove unused elements

### Container Optimization
- Regular container audits
- Remove duplicate tags
- Consolidate similar tags
- Minimize trigger complexity
- Use tag sequencing wisely

### Page Performance
- Defer non-critical tags
- Use async snippet
- Minimize container size
- Optimize custom HTML
- Monitor loading time

## Security Best Practices

### Tag Security
- Vet all custom HTML tags
- Review third-party templates
- Use template permissions
- Restrict custom JavaScript
- Validate input data

### Data Privacy
- Avoid PII in data layer
- Implement consent mode
- Block tags based on consent
- Hash sensitive identifiers
- Review data collection policies

### Access Control
- Use appropriate permission levels
- Review user access regularly
- Limit container admin access
- Audit permission changes
- Use workspaces for isolation

## Deployment Strategies

### Environment Setup
- Development environment for testing
- Staging environment for validation
- Production environment for live traffic
- Use container versions properly

### Version Management
- Create versions with detailed notes
- Test thoroughly before publishing
- Maintain version history
- Document changes clearly
- Enable quick rollback capability

### Publishing Workflow
1. Make changes in workspace
2. Test in Preview mode
3. Validate in development environment
4. Create version with notes
5. Publish to production
6. Monitor for issues
7. Document deployment

## Container Organization

### Folder Structure
- Group related tags by platform or purpose
- Use folders for triggers by type
- Organize variables by category
- Keep structure logical and consistent

### Documentation
- Add notes to complex configurations
- Document custom JavaScript logic
- Maintain change log
- Share knowledge with team

## Audit Checklist
- [ ] Naming conventions followed
- [ ] No unused tags, triggers, or variables
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Privacy compliance verified
- [ ] Proper version management
- [ ] Documentation complete

## References
- **references/best-practices.md** - Naming conventions, organization, deployment strategies

## Integration with Other Skills
## Integration with Other Skills
- **gtm-general** - General GTM guidance and concepts
- **gtm-setup** - Proper container setup and installation
- **gtm-tags** - Efficient tag configuration practices
- **gtm-triggers** - Trigger optimization and best practices
- **gtm-variables** - Variable naming and structure best practices
- **gtm-debugging** - Testing and validation workflows
- **gtm-datalayer** - Data layer naming and structure best practices
- **gtm-custom-templates** - Template development best practices
- **gtm-api** - API automation best practices
