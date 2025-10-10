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

# Planning tools
/plugin install planning-tools@claudecode-marketplace

# MCP server collections
/plugin install mcp-essentials@claudecode-marketplace
```

## Available Plugins

- **development-utilities** - Docker containerization, prompt writing, code reflection
- **planning-tools** - Advanced planning and systematic problem-solving
- **parallel-execution** - Parallel task execution tools
- **fullstack-developer** - Full-stack development agent
- **documentation-manager** - Documentation specialist agent
- **validation-gates** - Testing and validation agent
- **tool-usage-logger** - Tool usage monitoring hook
- **mcp-essentials** - Essential MCP servers (fetch, time, playwright)
- **mcp-ai-tools** - AI-powered MCP servers (Serena, Gemini)
- **mcp-data-sources** - Data and API MCP servers
- **mcp-dev-tools** - Development tools MCP servers

## License

MIT
