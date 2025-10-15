# Welcome to the Claude Code Marketplace

You're browsing a curated collection of productivity-enhancing plugins, specialized AI agents, and powerful integrations for Claude Code.

## What You'll Find Here

This marketplace contains 11 plugins organized into practical categories to enhance your development workflow. Each plugin has been designed to solve real problems and streamline common tasks.

## Quick Navigation

- **[Development Utilities](#development-utilities)** - Essential tools for containerization, prompts, and code analysis
- **[Planning Tools](#planning-tools)** - Advanced thinking and planning workflows
- **[Parallel Execution](#parallel-execution)** - Run multiple tasks simultaneously
- **[Specialized Agents](#specialized-agents)** - AI experts for full-stack, docs, and testing
- **[Hooks](#hooks)** - Monitor and audit tool usage
- **[MCP Collections](#mcp-server-collections)** - Data sources and external integrations

---

## Development Utilities

**Plugin Name:** `development-utilities`

Essential commands for everyday development tasks. Perfect for project setup, containerization, and code improvement.

### Available Commands

#### `/containerize`

Containerize your application with production-ready Docker configuration. Supports multi-stage builds, security hardening, and optimization.

**Usage:**

```bash
/containerize --node              # Node.js application
/containerize --python            # Python application
/containerize --multi-stage       # Optimized multi-stage build
```

**What it does:**

- Analyzes your application architecture
- Creates optimized Dockerfile with security best practices
- Generates docker-compose.yaml for local development
- Configures health checks and graceful shutdown
- Sets up proper layer caching

#### `/prompt_writer`

Advanced prompt engineering assistant. Helps craft effective prompts for Claude to get better results.

**Usage:**

```bash
/prompt_writer "Create a function that validates email addresses"
```

**What it does:**

- Analyzes your request for clarity
- Structures prompts for optimal Claude responses
- Suggests context and constraints
- Improves specificity and detail

#### `/reflection`

Code analysis and reflection tool. Reviews your current codebase and suggests improvements.

**Usage:**

```bash
/reflection
```

**What it does:**

- Analyzes recent code changes
- Identifies patterns and anti-patterns
- Suggests refactoring opportunities
- Highlights potential bugs or issues

#### `/primer`

Quick project initialization and setup. Gets new projects started with proper structure.

#### `/create-agentsmd-symlink`

Manages agent configuration symlinks. Useful for team setups with shared agent configurations.

---

## Planning Tools

**Plugin Name:** `planning-tools`

Advanced planning and systematic thinking tools for tackling complex problems. Use these when you need deep analysis or structured planning.

### Available Commands

#### `/ultra-think`

Deep analytical thinking mode for complex problems. Breaks down challenges systematically.

**Usage:**

```bash
/ultra-think "Design a real-time collaboration system with WebSockets"
```

**What it does:**

- Multi-layered problem analysis
- Considers edge cases and constraints
- Evaluates multiple approaches
- Provides detailed reasoning and tradeoffs

**Best for:** Architecture decisions, complex algorithm design, system design

#### `/planning`

Structured planning workflows for feature development and project tasks.

**Usage:**

```bash
/planning "Build user authentication module"
```

**What it does:**

- Creates step-by-step implementation plans
- Identifies dependencies and prerequisites
- Breaks down tasks into manageable chunks
- Estimates complexity and effort

#### `/generate-prp`

Generate a Progressive Refinement Plan. Creates iterative development plans that build complexity gradually.

**Usage:**

```bash
/generate-prp "Build a recommendation engine"
```

**What it does:**

- Creates phased implementation plan
- Defines milestones and deliverables
- Prioritizes core functionality first
- Plans for iterative refinement

#### `/execute-prp`

Execute a previously generated Progressive Refinement Plan. Works through the plan systematically.

**Usage:**

```bash
/execute-prp
```

**What it does:**

- Implements plan phase by phase
- Validates each milestone
- Adapts plan based on learnings
- Maintains focus on current phase

#### `/infinite`

Extended context planning mode for large-scale projects and architectural decisions.

**Usage:**

```bash
/infinite "Design microservices architecture for e-commerce platform"
```

---

## Parallel Execution

**Plugin Name:** `parallel-execution`

Execute multiple independent tasks simultaneously for improved efficiency.

### Available Commands

#### `/prep-parallel`

Prepare and analyze tasks for parallel execution. Identifies which tasks can run concurrently.

**Usage:**

```bash
/prep-parallel "Run tests, build frontend, compile backend, lint code"
```

**What it does:**

- Analyzes task dependencies
- Groups independent tasks
- Optimizes execution order
- Estimates time savings

#### `/execute-parallel`

Execute prepared tasks in parallel. Runs multiple tasks concurrently with proper coordination.

**Usage:**

```bash
/execute-parallel
```

**What it does:**

- Runs independent tasks simultaneously
- Monitors progress of each task
- Aggregates results
- Handles failures gracefully

---

## Specialized Agents

These agents proactively assist with specific aspects of development. Once installed, they activate automatically when relevant.

### Full-Stack Developer

**Plugin Name:** `fullstack-developer`

Expert full-stack development specialist covering frontend, backend, and database technologies.

**Expertise:**

- Frontend: React, TypeScript, Vue, modern CSS
- Backend: Node.js, Express, FastAPI, REST/GraphQL APIs
- Databases: PostgreSQL, MongoDB, Redis
- Architecture: Microservices, serverless, monoliths

**When it activates:**

- Building web applications
- API development
- Database schema design
- Full-stack feature implementation

**Example:** "Build a REST API for user management with React frontend"

### Documentation Manager

**Plugin Name:** `documentation-manager`

Technical documentation specialist. Maintains comprehensive and accurate documentation throughout development.

**Expertise:**

- README files and getting started guides
- API documentation
- Architecture diagrams and decisions
- Code comments and JSDoc
- Technical specifications

**When it activates:**

- After implementing new features
- When code structure changes
- Creating new projects
- API modifications

**Example:** "Update documentation for the new authentication module"

### Validation Gates

**Plugin Name:** `validation-gates`

Testing and quality assurance specialist. Proactively ensures code quality and runs tests.

**Expertise:**

- Unit testing (Jest, pytest, etc.)
- Integration testing
- Build validation
- Code quality checks
- Test coverage analysis

**When it activates:**

- After feature implementation
- Before commits
- During refactoring
- When tests are requested

**Example:** "Implement user registration feature" - Agent will test automatically

---

## MCP Servers

MCP (Model Context Protocol) servers extend Claude Code with external data sources and integrations. Each server is installed individually.

### Core Utilities

Essential servers for most projects:

- **mcp-fetch** - Web content fetching and scraping
- **mcp-time** - Time and timezone operations (configured for Australia/Perth)
- **mcp-playwright** - Browser automation and testing

### AI & Planning

AI-powered assistants and integrations:

- **mcp-serena** - AI planning assistant for complex problem-solving
- **mcp-gemini-bridge** - Access Gemini API capabilities
- **mcp-perplexity** - AI-powered search and information retrieval

### Data & APIs

External data sources (most require API keys - see [Environment Variables](#environment-variables)):

- **mcp-open-meteo** - Weather data and forecasts (no key required)
- **mcp-currency-conversion** - Real-time currency exchange rates
- **mcp-coingecko** - Cryptocurrency prices and market data
- **mcp-alphavantage** - Stock market data and financial information
- **mcp-context7** - Context and workspace management
- **mcp-firecrawl** - Advanced web scraping
- **mcp-google-workspace** - Gmail, Calendar, Drive integration
- **mcp-notion** - Notion workspace integration

### Documentation

Quick access to technical documentation:

- **mcp-cloudflare-docs** - Cloudflare documentation search
- **mcp-microsoft-docs** - Microsoft documentation search

### Development Tools

Development automation and infrastructure:

- **mcp-chrome-devtools** - Chrome DevTools protocol integration
- **mcp-n8n** - n8n workflow automation
- **mcp-mikrotik** - MikroTik router management

---

## Installation

### Install Individual Plugins

```bash
/plugin install development-utilities@claudecode-marketplace
/plugin install planning-tools@claudecode-marketplace
/plugin install fullstack-developer@claudecode-marketplace
```

### Recommended Starting Set

```bash
# Core plugins
/plugin install project-onboarding@claudecode-marketplace
/plugin install prompt-engineering@claudecode-marketplace
/plugin install strategic-planning@claudecode-marketplace
/plugin install fullstack-developer@claudecode-marketplace

# Essential MCP servers
/plugin install mcp-fetch@claudecode-marketplace
/plugin install mcp-time@claudecode-marketplace
/plugin install mcp-perplexity@claudecode-marketplace
```

### Install All Command Plugins

```bash
/plugin install project-onboarding@claudecode-marketplace
/plugin install prompt-engineering@claudecode-marketplace
/plugin install infrastructure-tools@claudecode-marketplace
/plugin install strategic-planning@claudecode-marketplace
/plugin install prp-workflow@claudecode-marketplace
/plugin install experimental-workflows@claudecode-marketplace
/plugin install parallel-execution@claudecode-marketplace
```

### Install All Agent Plugins

```bash
/plugin install fullstack-developer@claudecode-marketplace
/plugin install documentation-manager@claudecode-marketplace
/plugin install validation-gates@claudecode-marketplace
```

---

## Environment Variables

Some MCP servers require API keys and credentials. Create a `.env` file in your project root with required values:

```bash
# Cryptocurrency data (CoinGecko)
COINGECKO_DEMO_API_KEY=your_key_here

# Stock market data (Alpha Vantage)
ALPHAVANTAGEAPIKEY=your_key_here

# Workspace management (Context7)
CONTEXT7_API_KEY=your_key_here

# Web scraping (Firecrawl)
FIRECRAWL_API_KEY=your_key_here

# Workflow automation (n8n)
N8N_API_KEY=your_key_here

# Google Workspace integration
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret

# Network management (MikroTik)
MIKROTIK_HOST=192.168.88.1
MIKROTIK_USER=admin
MIKROTIK_PASSWORD=your_password

# Cloudflare Access (mcphub)
CF_ACCESS_CLIENT_ID=your_client_id
CF_ACCESS_CLIENT_SECRET=your_client_secret
```

**Tip:** Most services offer free tiers or demo API keys. Check their documentation for signup details.

---

## Common Workflows

### New Project Setup

```bash
/plugin install development-utilities@claudecode-marketplace
/plugin install fullstack-developer@claudecode-marketplace
/plugin install documentation-manager@claudecode-marketplace

/containerize --node --multi-stage
# Fullstack agent implements features
# Documentation agent maintains docs
```

### Complex Feature Development

```bash
/plugin install planning-tools@claudecode-marketplace
/plugin install validation-gates@claudecode-marketplace

/ultra-think "Design authentication system with OAuth2"
/generate-prp
/execute-prp
# Validation agent tests implementation
```

### Data Integration Project

```bash
# Install needed MCP data servers
/plugin install mcp-coingecko@claudecode-marketplace
/plugin install mcp-open-meteo@claudecode-marketplace
/plugin install mcp-alphavantage@claudecode-marketplace

# Set up .env with API keys
# Query external data sources naturally
"Show me Bitcoin price trends and weather correlation"
```

---

## Getting Help

### Command Help

```bash
/containerize --help
/ultra-think --help
```

### Plugin Management

```bash
/plugin list                    # Show installed plugins
/plugin uninstall plugin-name   # Remove a plugin
/plugin marketplace update      # Refresh marketplace
```

### Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Design decisions and technical details
- **[USAGE.md](./USAGE.md)** - Detailed examples and troubleshooting

---

## Support

- **GitHub Issues:** [Report bugs or request features](https://github.com/henkisdabro/claudecode-marketplace/issues)
- **Email:** whom-wealthy.2z@icloud.com
- **Claude Code Docs:** [docs.claude.com/claude-code](https://docs.claude.com/en/docs/claude-code)

---

## Version

**Marketplace Version:** 1.1.0

All plugins use semantic versioning. Check individual plugin manifests for specific versions.

---

**Happy coding with Claude Code!**
