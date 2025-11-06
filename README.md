# Claude Code Marketplace

A comprehensive plugin for [Claude Code](https://claude.ai/code) providing slash commands, specialized agents, and MCP server integrations.

## Installation

Add this marketplace to your Claude Code configuration:

```bash
/plugin marketplace add github:henkisdabro/claudecode-marketplace
```

Then install the main plugin:

```bash
/plugin install claudecode-marketplace@claudecode-marketplace
```

## What's Included

This single plugin provides:

### Commands (13 total)
- `/containerize` - Docker containerization with best practices
- `/prompt_writer` - Advanced prompt engineering
- `/planning` - Structured feature planning
- `/ultra-think` - Deep analytical thinking
- `/generate-prp` - Progressive refinement plans
- `/execute-prp` - Execute refinement plans
- `/infinite` - Extended context planning
- `/prep-parallel` - Prepare parallel execution
- `/execute-parallel` - Run tasks in parallel
- `/reflection` - Code analysis and review
- `/primer` - Project initialization
- `/create-agentsmd-symlink` - Agent configuration management

### Agents (3 specialists)
- **fullstack-developer** - Full-stack development expert
- **documentation-manager** - Technical documentation specialist
- **validation-gates** - Testing and quality assurance

### MCP Servers (20+ integrations)
Individual MCP servers for AI, data APIs, documentation, and development tools.

See [.claude-plugin/README.md](.claude-plugin/README.md) for complete documentation.

## Quick Start

```bash
# Install the main plugin
/plugin install claudecode-marketplace@claudecode-marketplace

# Try some commands
/containerize --node
/ultra-think "Design authentication system"
/planning "Build user dashboard"

# Install MCP servers as needed
/plugin install mcp-fetch@claudecode-marketplace
/plugin install mcp-perplexity@claudecode-marketplace
```

## Documentation

- **[User Guide](.claude-plugin/README.md)** - Complete feature documentation
- **[Architecture](.claude-plugin/ARCHITECTURE.md)** - Technical design details
- **[Usage Examples](.claude-plugin/USAGE.md)** - Workflows and troubleshooting

## License

MIT
