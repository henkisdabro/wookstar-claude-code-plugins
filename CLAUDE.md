# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a Claude Code Plugin Marketplace containing a single comprehensive plugin with commands, agents, and MCP server configurations designed to enhance Claude Code development workflows.

**Official Documentation:** <https://docs.claude.com/en/docs/claude-code/plugin-marketplaces.md>

## Key Commands

### Testing the Marketplace Locally

```bash
# Add marketplace from local directory
/plugin marketplace add /home/henkisdabro/claudecode/claudecode-marketplace

# Or use relative path from project root
/plugin marketplace add .

# Install the main plugin for testing
/plugin install claudecode-marketplace@claudecode-marketplace

# List installed plugins
/plugin list

# Remove marketplace for clean testing
/plugin marketplace remove claudecode-marketplace
```

### Validation

```bash
# Validate marketplace structure and manifest
claude plugin validate .

# Validate from .claude-plugin directory
claude plugin validate .claude-plugin
```

### Publishing Changes

Since there's no build step, changes are immediate. Testing workflow:

1. Make changes to plugin files
2. If marketplace is already added: `/plugin marketplace update claudecode-marketplace`
3. If testing new plugin: `/plugin install claudecode-marketplace@claudecode-marketplace`
4. Test the plugin functionality
5. Commit changes with semantic commit messages

## Architecture Overview

### Directory Structure

```
claudecode-marketplace/              # Repository root (single plugin)
├── .claude-plugin/
│   ├── plugin.json                  # Plugin manifest
│   ├── marketplace.json             # Marketplace manifest
│   ├── hooks/                       # Hook scripts directory
│   ├── README.md                    # User-facing documentation
│   ├── ARCHITECTURE.md              # Detailed architecture guide
│   └── USAGE.md                     # Usage examples and workflows
├── agents/                           # All agents (at plugin root)
│   ├── fullstack-developer.md
│   ├── documentation-manager.md
│   └── validation-gates.md
├── commands/                         # All commands (at plugin root)
│   ├── containerize.md
│   ├── prompt_writer.md
│   ├── planning.md
│   ├── ultra-think.md
│   ├── generate-prp.md
│   ├── execute-prp.md
│   ├── infinite.md
│   ├── prep-parallel.md
│   ├── execute-parallel.md
│   ├── reflection.md
│   ├── primer.md
│   └── create-agentsmd-symlink.md
├── skills/                           # Skills directory (ready for future use)
├── hooks/                            # Hooks directory (ready for future use)
├── CLAUDE.md                         # This file
└── README.md                         # Repository overview
```

### Plugin Structure

This marketplace uses the **standard plugin format** where:
- Plugin manifest lives at `.claude-plugin/plugin.json`
- All components (agents/, commands/, skills/, hooks/) are at the plugin root
- Components are NOT nested inside `.claude-plugin/`
- Default directories are used (Claude Code auto-loads from these)

### Component Types

#### 1. Commands

Slash commands like `/containerize`, `/ultra-think`. Commands are Markdown files with prompt content.

**Location:** `commands/` at repository root
**Auto-loaded:** Yes, all `.md` files in commands/ directory

#### 2. Agents

Specialized AI agents invoked proactively. Agents are Markdown files defining behavior and expertise.

**Location:** `agents/` at repository root
**Auto-loaded:** Yes, all `.md` files in agents/ directory

#### 3. Skills

Agent Skills extend Claude's capabilities (currently unused but directory is ready).

**Location:** `skills/` at repository root
**Auto-loaded:** Yes, when skill directories with `SKILL.md` are added

#### 4. Hooks

Scripts that intercept tool usage for logging/monitoring (currently unused but directory is ready).

**Location:** `hooks/` at repository root
**Auto-loaded:** When configured in plugin.json

#### 5. MCP Servers

MCP server configurations for external tool integrations. These are separate plugins with inline configuration.

**Location:** Defined inline in `marketplace.json`
**No separate files:** Configuration lives entirely in marketplace.json

### Critical Files

#### plugin.json

The plugin manifest at `.claude-plugin/plugin.json`. Contains:

- Plugin metadata (name, version, description, author)
- Keywords for discoverability
- Homepage and repository links

#### marketplace.json

The marketplace manifest at `.claude-plugin/marketplace.json`. Contains:

- Marketplace metadata (name, owner, description, version)
- Plugin registry with main plugin and MCP servers
- Plugin sources (relative paths)
- MCP server configurations (inline)

**Key Design Decision:**
- Main plugin uses `"source": "./"` which points to repository root
- MCP servers use `"source": "./.claude-plugin"` with inline config and `strict: false`

**Path Resolution:**
- Main plugin source: `"./"`  → Repository root
- Components auto-loaded from: `agents/`, `commands/`, `skills/`, `hooks/` at root
- MCP servers: Inline configuration in marketplace.json

## Adding New Components

### Adding a Command

1. Create command file: `commands/<command-name>.md`
2. File is auto-loaded by Claude Code (no marketplace.json update needed)
3. Test locally with `/plugin marketplace update claudecode-marketplace`

### Adding an Agent

1. Create agent file: `agents/<agent-name>.md`
2. File is auto-loaded by Claude Code (no marketplace.json update needed)
3. Test locally with `/plugin marketplace update claudecode-marketplace`

### Adding a Skill

1. Create skill directory: `skills/<skill-name>/`
2. Create skill file: `skills/<skill-name>/SKILL.md`
3. File is auto-loaded by Claude Code (no marketplace.json update needed)
4. Test locally

### Adding a Hook

1. Create hook configuration in `.claude-plugin/plugin.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/hooks/my-hook.sh"
          }
        ]
      }
    ]
  }
}
```

2. Create hook script: `hooks/my-hook.sh`
3. Make executable: `chmod +x hooks/my-hook.sh`
4. Test locally

### Adding an MCP Server

1. Add entry to `marketplace.json` plugins array:

```json
{
  "name": "mcp-my-server",
  "source": "./.claude-plugin",
  "description": "MCP server description",
  "keywords": ["mcp", "integration"],
  "category": "mcpServers",
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["my-mcp-package"]
    }
  },
  "strict": false
}
```

2. Test locally with `/plugin install mcp-my-server@claudecode-marketplace`

## Environment Variables

Many MCP servers require API keys and credentials. Users should create a `.env` file in their project root with required values. The marketplace uses `${VAR_NAME}` syntax in marketplace.json which gets resolved from user environment.

See README.md for complete list of required environment variables.

## Metadata Standards

All plugins must include:

- `name`: kebab-case identifier
- `description`: Clear, concise description
- `category`: One of: commands, agents, hooks, mcpServers
- `keywords`: Array of searchable tags

## Version Management

Follow semantic versioning strictly:

- **MAJOR**: Breaking changes (incompatible with previous versions)
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Update both the plugin version AND the marketplace metadata version when making significant changes.

## Team Configuration

This marketplace is designed for team adoption. Users can add to `.claude/settings.json`:

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
    "claudecode-marketplace@claudecode-marketplace"
  ]
}
```

When team members trust the repository, the main plugin installs automatically.

## Important Constraints

1. **No Build Process**: This is a pure marketplace - no compilation or build steps
2. **Standard Plugin Structure**: Follows Claude Code standard plugin format
3. **Auto-Loading**: Components in default directories load automatically
4. **Single Main Plugin**: All commands and agents in one plugin
5. **Separate MCP Plugins**: Each MCP server is a separate plugin with inline config
6. **Environment Variable Security**: Never commit API keys or secrets
7. **Markdown Format**: Commands and agents are Markdown files

## Documentation Files

- **README.md**: User-facing overview, installation instructions
- **.claude-plugin/README.md**: Complete plugin catalog and feature documentation
- **.claude-plugin/ARCHITECTURE.md**: Deep dive into design decisions
- **.claude-plugin/USAGE.md**: Practical examples, workflows, troubleshooting
- **CLAUDE.md** (this file): Quick reference for Claude Code instances

When making changes to components, consider whether documentation needs updating to reflect new functionality or changed behavior.

## Category Values

In marketplace.json, plugin entries "category" field can only have these values:
- `"commands"` - For command-based plugins
- `"agents"` - For agent-based plugins
- `"hooks"` - For hook-based plugins
- `"mcpServers"` - For MCP server integrations
