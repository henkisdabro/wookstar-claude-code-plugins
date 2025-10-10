# Claude Code Marketplace

A curated collection of plugins, agents, slash commands, hooks, and MCP server configurations for [Claude Code](https://claude.ai/code).

## What is this?

This repository is a **Claude Code Plugin Marketplace** - a centralized registry of productivity tools, specialized AI agents, and integrations that extend Claude Code's capabilities. Whether you're a solo developer or part of a team, this marketplace provides battle-tested plugins to enhance your development workflow.

## Quick Start

### Installation

Add this marketplace to your Claude Code installation:

```bash
/plugin marketplace add henkisdabro/claudecode-marketplace
```

### Browse & Install Plugins

```bash
# Interactive browser
/plugin

# Install specific plugins
/plugin install development-utilities@claudecode-marketplace
/plugin install planning-tools@claudecode-marketplace
```

## What's Included

### 🛠️ Development Utilities (5 commands)

- **containerize** - Production-ready Docker configuration with multi-stage builds
- **prompt_writer** - Advanced prompt engineering assistant
- **primer** - Quick project initialization
- **reflection** - Code analysis and improvement suggestions
- **create-agentsmd-symlink** - Agent configuration management

### 🧠 Planning Tools (5 commands)

- **ultra-think** - Deep analytical thinking for complex problems
- **planning** - Structured planning workflows
- **generate-prp** - Progressive Refinement Plan generation
- **execute-prp** - Execute Progressive Refinement Plans
- **infinite** - Extended context planning mode

### ⚡ Parallel Execution (2 commands)

- **prep-parallel** - Prepare tasks for parallel execution
- **execute-parallel** - Execute multiple tasks simultaneously

### 🤖 Specialized Agents (3 agents)

- **fullstack-developer** - Full-stack specialist (React, Node.js, TypeScript, databases)
- **documentation-manager** - Technical documentation expert
- **validation-gates** - Testing and quality assurance specialist

### 🪝 Hooks (1 hook)

- **tool-usage-logger** - Audit trail for all tool usage

### 🔌 MCP Server Collections (19 servers)

Four curated collections of MCP servers:

- **essentials** - Core functionality (fetch, time, playwright)
- **ai-tools** - AI integrations (Serena, Gemini)
- **data-sources** - APIs (weather, crypto, stocks, workspace)
- **dev-tools** - Automation (Chrome DevTools, n8n, MikroTik)

## Team Setup

Enable automatic plugin installation for your team by adding to `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "claudecode-marketplace": {
      "source": {
        "source": "github",
        "repo": "henkisdabro/claudecode-marketplace"
      }
    }
  },
  "enabledPlugins": [
    "development-utilities@claudecode-marketplace",
    "planning-tools@claudecode-marketplace",
    "fullstack-developer@claudecode-marketplace"
  ]
}
```

When team members trust the repository, plugins install automatically.

## Environment Variables

Some MCP servers require API keys. Create a `.env` file in your project root:

```bash
# API Keys
COINGECKO_DEMO_API_KEY=your_key
ALPHAVANTAGEAPIKEY=your_key
FIRECRAWL_API_KEY=your_key
N8N_API_KEY=your_key

# OAuth Credentials
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret

# Network Configuration
MIKROTIK_HOST=192.168.88.1
MIKROTIK_USER=admin
MIKROTIK_PASSWORD=your_password

# Cloudflare Access
CF_ACCESS_CLIENT_ID=your_client_id
CF_ACCESS_CLIENT_SECRET=your_client_secret
```

## Documentation

Comprehensive documentation is available in the `.claude-plugin/` directory:

- **[README.md](.claude-plugin/README.md)** - User-facing plugin catalog and installation guide
- **[ARCHITECTURE.md](.claude-plugin/ARCHITECTURE.md)** - Design decisions and marketplace architecture
- **[USAGE.md](.claude-plugin/USAGE.md)** - Practical examples and workflows

## Example Workflows

### Setting Up a New Project

```bash
/plugin install development-utilities@claudecode-marketplace
/containerize --node --multi-stage
# Fullstack developer agent helps build features
# Documentation manager keeps docs updated
```

### Complex Planning Session

```bash
/plugin install planning-tools@claudecode-marketplace
/ultra-think "Design a real-time collaboration system"
/generate-prp
/execute-prp
```

### Quality Assurance Pipeline

```bash
/plugin install validation-gates@claudecode-marketplace
# Validation agent automatically runs tests after changes
# Tool logger creates audit trail
```

## Repository Structure

```
claudecode-marketplace/
├── README.md              # This file (GitHub-facing overview)
├── CLAUDE.md              # Instructions for Claude Code instances
└── .claude-plugin/
    ├── README.md          # Marketplace user documentation
    ├── ARCHITECTURE.md    # Architecture and design decisions
    ├── USAGE.md           # Usage examples and workflows
    ├── marketplace.json   # Central plugin registry
    └── plugins/           # Plugin packages
        ├── development-utilities/
        ├── planning-tools/
        ├── parallel-execution/
        ├── agents/
        ├── hooks/
        └── mcp-collections/
```

## Contributing

Contributions welcome! To add a plugin:

1. Follow the existing plugin structure
2. Include complete metadata in `plugin.json`
3. Test locally with `/plugin marketplace add ./claudecode-marketplace`
4. Update `marketplace.json` with your plugin entry
5. Use semantic versioning
6. Submit a pull request

See [ARCHITECTURE.md](.claude-plugin/ARCHITECTURE.md) for detailed guidelines.

## Version History

### 1.0.0 (2025-10-10)

- Initial marketplace release
- 11 plugins across 5 categories
- 19 MCP server integrations
- Comprehensive documentation

## License

MIT License

## Author

**Henrik Soederlund**

- Email: whom-wealthy.2z@icloud.com
- GitHub: [@henkisdabro](https://github.com/henkisdabro)
- Website: [henriksoderlund.com](https://www.henriksoderlund.com)

## Resources

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)
- [Plugin Development Guide](https://docs.claude.com/en/docs/claude-code/plugins)
- [Plugin Marketplaces Guide](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)

## Support

- **Issues**: [GitHub Issues](https://github.com/henkisdabro/claudecode-marketplace/issues)
- **Email**: whom-wealthy.2z@icloud.com

---

**Ready to supercharge your Claude Code workflow?**

```bash
/plugin marketplace add henkisdabro/claudecode-marketplace
```
