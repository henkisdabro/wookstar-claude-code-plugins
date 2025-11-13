# Google Tag Manager - Best Practices

## Foundational Technical Constraints

### JavaScript in Google Tag Manager (ES5 Requirement)

**Critical:** Google Tag Manager primarily uses **ECMAScript 5 (ES5)** for JavaScript code, not modern ES6+.

#### Where ES5 is Required

1. **Custom JavaScript Variables** - Must use ES5 syntax only
2. **Custom HTML Tags** - Standard `<script>` tags must use ES5
3. **Trigger conditions using JavaScript** - ES5 only

#### ES6 Features NOT Supported in Standard GTM

```javascript
// ❌ WILL FAIL - ES6 syntax
const myVar = 'value';
let count = 0;
const arrow = () => console.log('test');
const template = `Hello ${name}`;

// ✅ CORRECT - ES5 syntax
var myVar = 'value';
var count = 0;
var regularFunc = function() { console.log('test'); };
var concatenated = 'Hello ' + name;
```

#### Custom Templates Exception

**Custom Templates** (Sandboxed JavaScript) support some ES6 features:
- `const` and `let` declarations
- Template literals
- Limited modern JavaScript features

Running in a controlled sandboxed environment based on ECMAScript 5.1 with selective ES6 support.

#### Workarounds for Modern JavaScript

**Option 1: Transpilation (Recommended)**

Use BabelJS to transpile ES6+ to ES5 before pasting into GTM:

```javascript
// Write in ES6
const getData = () => {
  const data = dataLayer.filter(item => item.event === 'purchase');
  return data;
};

// Transpile to ES5 with Babel, then paste into GTM
var getData = function() {
  var data = dataLayer.filter(function(item) {
    return item.event === 'purchase';
  });
  return data;
};
```

**Option 2: text/gtmscript Tag**

Bypass GTM's syntax checking (use with caution):

```html
<script type="text/gtmscript">
  // Modern JavaScript here - no syntax validation in GTM UI
  const myModernCode = () => {
    // ...
  };
</script>
```

**Caveats:**
- No syntax highlighting in GTM interface
- No error checking until runtime
- Harder to debug
- Only use when absolutely necessary

### Regular Expressions in Google Tag Manager (RE2 Format)

**Critical:** GTM uses **RE2 (GoLang regex)**, NOT standard JavaScript/PCRE regex.

#### Key Differences from Standard Regex

**NOT Supported in RE2:**
- ❌ Backreferences: `\1`, `\2`, `\g{name}`
- ❌ Lookahead assertions: `(?=...)`, `(?!...)`
- ❌ Lookbehind assertions: `(?<=...)`, `(?<!...)`
- ❌ Conditional expressions: `(?(condition)yes|no)`
- ❌ Possessive quantifiers: `*+`, `++`

**Supported in RE2:**
- ✅ Character classes: `[abc]`, `[^abc]`, `[a-z]`
- ✅ Quantifiers: `*`, `+`, `?`, `{n,m}`
- ✅ Anchors: `^`, `$`, `\A`, `\z`
- ✅ Perl character classes: `\d`, `\w`, `\s` (and negations)
- ✅ Groups: `(...)`, `(?:...)` (non-capturing)
- ✅ Named groups: `(?P<name>...)`
- ✅ Alternation: `|`
- ✅ Case-insensitive flag: `(?i)`

#### Common RE2 Patterns for GTM

**Match URLs:**

```regex
# Exact match
^https://example\.com/page$

# Contains path
/checkout/

# Query parameter present
\?utm_source=

# Multiple domains
^https://(www\.)?example\.(com|net)
```

**Match Page Paths:**

```regex
# Product pages
^/products/[^/]+$

# Category with ID
^/category/\d+

# Blog posts
^/blog/[\w-]+$
```

**Case-Insensitive Matching:**

```regex
# Case-insensitive flag at start
(?i)^/checkout

# Matches: /checkout, /Checkout, /CHECKOUT, etc.
```

**Character Classes:**

```regex
# Digits only
^\d+$

# Alphanumeric
^[\w-]+$

# Specific characters
^[A-Z]{2,3}$
```

#### Where Regex is Used in GTM

1. **Trigger Conditions** - Page URL, Click URL, etc.
2. **Variable Formatting** - Regex Table variables
3. **Filter Conditions** - Various matching rules

#### Full RE2 Syntax Reference

Complete RE2 regex syntax is available in:
`.claude/skills/gtm-core/gtm-core/references/google-rew-regular-expressions-syntax.txt`

## Naming Conventions

### Tag Naming

Use descriptive, consistent naming patterns:

```
[Platform] - [Type] - [Purpose] - [Trigger Condition]
```

**Examples:**
- `GA4 - Event - Purchase Complete - Thank You Page`
- `Google Ads - Conversion - Form Submit - Contact Form`
- `Facebook - Pixel - Page View - All Pages`
- `Custom - LinkedIn Insight - Page View - Career Pages`

**Benefits:**
- Easy to find tags in large containers
- Clear purpose at a glance
- Sortable and filterable
- Easier collaboration

### Trigger Naming

```
[Type] - [Condition] - [Description]
```

**Examples:**
- `Pageview - URL Contains - Checkout`
- `Click - Element ID - CTA Button`
- `Custom Event - purchase_complete`
- `Form Submit - Contact Form`

### Variable Naming

```
[Type] - [Purpose]
```

**Examples:**
- `DLV - User ID`
- `JS - Page Category`
- `Constant - GA4 Measurement ID`
- `Regex Table - Page Type Mapping`

**Prefixes:**
- `DLV` - Data Layer Variable
- `JS` - Custom JavaScript
- `Constant` - Constant value
- `1P Cookie` - First Party Cookie
- `URL` - URL variable

### Folder Organization

Group related items:

```
├── Analytics
│   ├── GA4 Tags
│   ├── GA4 Triggers
│   └── GA4 Variables
├── Advertising
│   ├── Google Ads
│   ├── Facebook
│   └── LinkedIn
├── Utilities
│   ├── Error Tracking
│   └── Performance Monitoring
└── Testing
    └── Development Tags
```

## Container Organization

### Workspace Management

**Development Workflow:**

1. Create workspace for each feature/change
2. Name workspace descriptively: `Add GA4 Ecommerce Tracking`
3. Work in isolation
4. Test thoroughly in Preview mode
5. Submit for review
6. Merge and publish

**Workspace Best Practices:**

- One feature per workspace
- Regular cleanup of abandoned workspaces
- Clear workspace descriptions
- Resolve conflicts promptly
- Use descriptive workspace names

### Version Control

**Version Naming:**

```
v[Major].[Minor] - [Description]
```

**Examples:**
- `v1.0 - Initial GTM Setup`
- `v1.1 - Add GA4 Ecommerce`
- `v2.0 - Major Restructure`
- `v2.1 - Fix Checkout Tracking`

**Version Notes:**

Include detailed notes:
```
Changes:
- Added GA4 purchase event tracking
- Updated data layer structure for checkout
- Fixed duplicate page view issue

Testing:
- Verified in dev environment
- Tested all checkout flows
- Confirmed data in GA4 DebugView

Tags Added:
- GA4 - Event - Purchase Complete

Tags Modified:
- GA4 - Event - Add to Cart (updated parameters)
```

### Multi-User Collaboration

**Permissions:**

- **No Access** - External users
- **Read** - Stakeholders, analysts (view only)
- **Edit** - Developers, marketers
- **Approve** - Senior developers, managers
- **Publish** - Select trusted users only

**Collaboration Best Practices:**

- Communicate workspace usage
- Regular team syncs
- Document changes thoroughly
- Use workspace approval workflow
- Maintain change log

## Performance Optimization

### Tag Load Order

**Priority System:**

Use tag firing priority (higher numbers fire first):

```
100 - Critical tags (error tracking, consent)
50  - Analytics tags (GA4, Adobe)
25  - Marketing tags (ads pixels)
10  - Third-party tags
0   - Default
```

**Tag Sequencing:**

Set up tag firing order:
1. Tag that must fire first
2. Configure "Tag Sequencing" in advanced settings
3. Setup tag fires after cleanup tag completes

### Minimize Custom HTML

**Prefer:**
1. Built-in tags (GA4, Google Ads)
2. Community Gallery templates
3. Custom templates
4. Custom HTML (last resort)

**Why:**
- Built-in tags are optimized
- Less maintenance
- Better performance
- Reduced security risk

### Async vs Sync Loading

**Asynchronous Loading (Default - Recommended):**

```javascript
// GTM loads async by default
<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXX"></script>
```

**Benefits:**
- Non-blocking
- Better page performance
- Parallel loading

**Synchronous (Use Sparingly):**

Only when tag MUST execute before page renders.

### Tag Timeout

**Configure Timeout:**

Admin → Container Settings → Tag Settings
- Default: 2000ms (2 seconds)
- Recommended: 3000-5000ms for complex tags

**Prevent:**
- Tags blocking page indefinitely
- Poor user experience
- False abandonment metrics

## Security Best Practices

### Custom HTML Security

**Review All Custom HTML:**

```javascript
// ❌ DANGEROUS - Eval and dynamic script loading
eval(userInput);
document.write('<script src="' + untrustedURL + '"></script>');

// ✅ SAFE - Controlled execution
var allowedScripts = {
  'analytics': 'https://analytics.trusted.com/script.js'
};
```

**Security Checklist:**
- [ ] No `eval()` with user input
- [ ] No `document.write()` with external sources
- [ ] Validate all external script sources
- [ ] Review third-party tag code
- [ ] Use CSP (Content Security Policy) headers

### Data Layer Security

**Never Push PII to Data Layer:**

```javascript
// ❌ NEVER DO THIS
dataLayer.push({
  'email': 'user@example.com',
  'phone': '+1234567890',
  'ssn': '123-45-6789'
});

// ✅ HASH OR PSEUDONYMIZE
dataLayer.push({
  'userIdHash': sha256('user@example.com'),
  'hasPhone': true
});
```

### Template Permissions

**Custom Template Security:**

Review template permissions:
- Access to APIs
- Access to global variables
- Access to local storage
- Network requests

Grant minimum necessary permissions.

## Quality Assurance

### Testing Checklist

**Before Publishing:**

- [ ] Preview mode testing completed
- [ ] All triggers fire correctly
- [ ] Data layer variables populate
- [ ] Tags send expected data
- [ ] No console errors
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Edge case scenarios tested

### Debug Workflow

1. **Enable Preview Mode**
2. **Navigate to test page**
3. **Verify in Debug Panel:**
   - Tags Fired
   - Tags Not Fired
   - Data Layer
   - Variables
4. **Check receiving platform** (GA4, Google Ads, etc.)
5. **Test edge cases**

### Automated Testing

**Tag Manager API + Testing Framework:**

```python
# Pseudo-code
def test_purchase_tag():
    trigger_purchase_event()
    assert ga4_tag_fired()
    assert correct_parameters_sent()
```

## Deployment Best Practices

### Publishing Workflow

1. **Development** → Test in development workspace
2. **Staging** → Test in staging environment
3. **Preview** → Final check in preview mode
4. **Publish** → Publish to live container
5. **Monitor** → Watch for errors/issues

### Emergency Rollback

**Quick Rollback:**

Versions → Previous Version → Actions → Publish

**Keep:**
- Last 3 working versions readily accessible
- Emergency contact list
- Rollback documentation

### Production Deployment Checklist

- [ ] Workspace approved by team lead
- [ ] All tests passing
- [ ] Change documented in version notes
- [ ] Stakeholders notified
- [ ] Monitoring in place
- [ ] Rollback plan ready

## Maintenance

### Regular Audits

**Quarterly Review:**

- Remove unused tags/triggers/variables
- Update deprecated features
- Review tag performance
- Check for duplicate tracking
- Verify naming consistency

### Performance Monitoring

**Monitor:**
- Page load time impact
- Tag load time
- Failed tags
- Timeout events
- Error rates

**Tools:**
- Google Tag Assistant
- Chrome DevTools
- GTM Debug Panel
- GA4 DebugView

### Version Cleanup

**Retention Policy:**

- Keep last 10-15 versions
- Archive old versions
- Document reason for major changes
- Maintain change history

## Documentation

### External Documentation

**Maintain:**

1. **GTM Implementation Guide**
   - Container architecture
   - Tag inventory
   - Trigger mapping
   - Variable dictionary
   - Data layer specification

2. **Change Log**
   - Date of change
   - Description
   - Who made the change
   - Reason for change

3. **Troubleshooting Guide**
   - Common issues
   - Solutions
   - Contact information

### Version Notes Template

```markdown
## Version X.X - [Description]

### Changes Made
- List of changes

### Tags Added
- Tag names and purposes

### Tags Modified
- What changed and why

### Tags Removed
- What was removed and why

### Testing Completed
- Test scenarios
- Results

### Known Issues
- Any limitations or issues
```

## Resources

- [GTM Developer Documentation](https://developers.google.com/tag-platform/tag-manager)
- [GTM Help Center](https://support.google.com/tagmanager)
- [GTM Community](https://support.google.com/tagmanager/community)
- [RE2 Regex Syntax Reference](.claude/skills/gtm-core/gtm-core/references/google-rew-regular-expressions-syntax.txt)
