# Claude Code Marketplace

A comprehensive collection of Claude Code plugins including development utilities, planning tools, specialized agents, hooks, and MCP server configurations.

## Overview

This marketplace provides a curated collection of plugins designed to enhance your Claude Code development experience. All plugins are organized by category and can be installed individually or as complete collections.

## Available Plugins

### Development Utilities

**development-utilities** - Essential tools for everyday development tasks

- **containerize** - Containerize applications with optimized Docker configuration, security, and multi-stage builds
- **prompt_writer** - Advanced prompt engineering and writing assistant
- **primer** - Quick project initialization and setup
- **reflection** - Code analysis and reflection tools
- **create-agentsmd-symlink** - Agent configuration management

### Planning Tools

**planning-tools** - Advanced planning and systematic thinking tools

- **planning** - Structured planning workflows
- **ultra-think** - Deep analytical thinking and problem decomposition
- **generate-prp** - Progressive Refinement Plan generation
- **execute-prp** - Execute Progressive Refinement Plans
- **infinite** - Infinite context planning mode

### Parallel Execution

**parallel-execution** - Tools for efficient parallel task execution

- **prep-parallel** - Prepare tasks for parallel execution
- **execute-parallel** - Execute multiple tasks in parallel

### Specialized Agents

#### fullstack-developer

Full-stack development specialist covering frontend, backend, and database technologies. Expertise in React, Node.js, TypeScript, and modern web development practices.

#### documentation-manager

Expert documentation specialist for maintaining comprehensive technical documentation, README files, and API documentation.

#### validation-gates

Testing and validation specialist that proactively runs tests, validates code changes, and ensures quality gates are met.

### Hooks

**tool-usage-logger** - PostToolUse hook that logs all tool usage for tracking and debugging purposes. Creates audit logs in `.claude/logs/tool-usage.log`.

### MCP Server Collections

#### mcp-essentials

Essential MCP servers for core functionality:

- **fetch** - Web content fetching
- **time** - Time and timezone operations (configured for Australia/Perth)
- **playwright** - Browser automation and testing

#### mcp-ai-tools

AI-powered MCP servers:

- **serena** - AI planning assistant
- **gemini-bridge** - Gemini API integration

#### mcp-data-sources

Data and API integrations:

- **open-meteo** - Weather data and forecasts
- **currency-conversion** - Real-time currency conversion
- **coingecko_api** - Cryptocurrency data
- **alphavantage** - Stock market data
- **context7** - Context management
- **firecrawl** - Advanced web scraping
- **google_workspace** - Google Workspace integration
- **notion** - Notion API integration
- **cloudflare-docs** - Cloudflare documentation
- **microsoft_docs** - Microsoft documentation

#### mcp-dev-tools

Development and automation tools:

- **chrome-devtools** - Chrome DevTools integration
- **n8n-mcp** - n8n workflow automation
- **mikrotik** - MikroTik router management
- **mcphub** - MCP hub integration

## Installation

### Add the Marketplace

Add this marketplace to your Claude Code installation:

```bash
/plugin marketplace add henkisdabro/claudecode-marketplace
```

Or for local development:

```bash
/plugin marketplace add /path/to/claudecode-marketplace
```

### Install Plugins

Install individual plugins:

```bash
/plugin install development-utilities@claudecode-marketplace
/plugin install planning-tools@claudecode-marketplace
/plugin install fullstack-developer@claudecode-marketplace
```

Or browse and install interactively:

```bash
/plugin
```

### Team Configuration

Configure automatic marketplace and plugin installation for your team by adding to `.claude/settings.json`:

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

## Plugin Categories

- **productivity** - Tools that enhance development workflow and efficiency
- **agents** - Specialized AI agents for specific development tasks
- **monitoring** - Logging and debugging tools
- **mcp-servers** - MCP server integrations for extended functionality

## Environment Variables

Some MCP servers require environment variables. Create a `.env` file in your project root:

```bash
# API Keys
COINGECKO_DEMO_API_KEY=your_key_here
ALPHAVANTAGEAPIKEY=your_key_here
CONTEXT7_API_KEY=your_key_here
FIRECRAWL_API_KEY=your_key_here
N8N_API_KEY=your_key_here

# OAuth Credentials
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret

# Network Configuration
MIKROTIK_HOST=your_router_ip
MIKROTIK_USER=your_username
MIKROTIK_PASSWORD=your_password

# Cloudflare Access
CF_ACCESS_CLIENT_ID=your_client_id
CF_ACCESS_CLIENT_SECRET=your_client_secret
```

## Plugin Structure

Each plugin follows the standard Claude Code plugin structure:

```
plugin-name/
├── plugin.json          # Plugin manifest
├── commands/            # Slash commands (optional)
├── agents/              # Agent definitions (optional)
├── hooks/               # Hook scripts (optional)
└── README.md           # Plugin documentation (optional)
```

## Development

### Testing Locally

Test the marketplace locally before distribution:

```bash
/plugin marketplace add ./claudecode-marketplace
/plugin install development-utilities@claudecode-marketplace
```

### Validation

Validate the marketplace structure:

```bash
claude plugin validate .claude-plugin
```

## License

MIT License - See individual plugin manifests for specific licensing information.

## Author

Henrik Soederlund

- Email: whom-wealthy.2z@icloud.com
- GitHub: [@henkisdabro](https://github.com/henkisdabro)
- Website: https://www.henriksoderlund.com

## Contributing

Contributions are welcome! Please ensure:

1. Follow the existing plugin structure
2. Include proper metadata in plugin.json
3. Test plugins locally before submitting
4. Update marketplace.json with new plugins
5. Follow semantic versioning

## Support

For issues, questions, or feature requests:

- Create an issue on GitHub
- Email: whom-wealthy.2z@icloud.com

## Version History

### 1.0.0 (2025-10-10)

- Initial marketplace release
- 11 plugins across 5 categories
- 19 MCP server integrations
- Comprehensive documentation

## See Also

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)
- [Plugin Development Guide](https://docs.claude.com/en/docs/claude-code/plugins)
- [Plugin Marketplaces Guide](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)
