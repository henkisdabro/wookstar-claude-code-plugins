# Claude Code Marketplace

A curated collection of plugins, agents, slash commands, hooks, and MCP server configurations for [Claude Code](https://claude.ai/code).

## Installation

Add this marketplace to your Claude Code configuration:

```bash
/plugin marketplace add github:henkisdabro/claudecode-marketplace
```

## Documentation

For full documentation, plugin catalog, and usage examples, see [.claude-plugin/README.md](.claude-plugin/README.md).

## Quick Start

After adding the marketplace, install plugins:

```bash
# Development utilities
/plugin install development-utilities@claudecode-marketplace

# Essential plugins
/plugin install strategic-planning@claudecode-marketplace
/plugin install fullstack-developer@claudecode-marketplace

# Essential MCP servers
/plugin install mcp-fetch@claudecode-marketplace
/plugin install mcp-time@claudecode-marketplace
```

## Available Plugin Categories

### Commands
- **project-onboarding** - Project initialization and context setup
- **prompt-engineering** - Claude Code prompt and instruction optimization
- **infrastructure-tools** - Application containerization and Docker optimization
- **strategic-planning** - Feature planning and deep problem analysis
- **prp-workflow** - PRP-based feature development workflow
- **experimental-workflows** - Advanced infinite agentic loop
- **parallel-execution** - Parallel task execution tools

### Agents
- **fullstack-developer** - Full-stack development agent
- **documentation-manager** - Documentation specialist agent
- **validation-gates** - Testing and validation agent

### MCP Servers
20+ individual MCP servers for AI, data APIs, documentation, and development tools. See `.claude-plugin/README.md` for full list.

## License

MIT
