# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a Claude Code Plugin Marketplace containing a curated collection of plugins, agents, slash commands, hooks, and MCP server configurations designed to enhance Claude Code development workflows.

**Official Documentation:** <https://docs.claude.com/en/docs/claude-code/plugin-marketplaces.md>

## Key Commands

### Testing the Marketplace Locally

```bash
# Add marketplace from local directory
/plugin marketplace add /home/henkisdabro/claudecode/claudecode-marketplace

# Or use relative path from project root
/plugin marketplace add .

# Install a specific plugin for testing
/plugin install development-utilities@claudecode-marketplace

# List installed plugins
/plugin list

# Remove marketplace for clean testing
/plugin marketplace remove claudecode-marketplace
```

### Validation

```bash
# Validate marketplace structure and manifest
claude plugin validate .claude-plugin

# Validate individual plugin manifests
claude plugin validate .claude-plugin/plugins/development-utilities
```

### Publishing Changes

Since there's no build step, changes are immediate. Testing workflow:

1. Make changes to plugin files
2. If marketplace is already added: `/plugin marketplace update claudecode-marketplace`
3. If testing new plugin: `/plugin install <plugin-name>@claudecode-marketplace`
4. Test the plugin functionality
5. Commit changes with semantic commit messages

## Architecture Overview

### Directory Structure

```
.claude-plugin/
├── marketplace.json              # Central registry of all plugins
├── README.md                      # User-facing documentation
├── ARCHITECTURE.md                # Detailed architecture guide
├── USAGE.md                       # Usage examples and workflows
└── plugins/
    ├── development-utilities/     # Slash commands for dev tasks
    │   ├── plugin.json
    │   └── commands/
    │       ├── containerize.md
    │       ├── prompt_writer.md
    │       └── ...
    ├── planning-tools/            # Advanced planning commands
    │   ├── plugin.json
    │   └── commands/
    ├── parallel-execution/        # Parallel task execution
    ├── agents/                    # Specialized AI agents
    │   ├── fullstack-developer/
    │   ├── documentation-manager/
    │   └── validation-gates/
    ├── hooks/                     # Hook scripts for tool interception
    │   └── tool-logger/
    └── mcp-collections/           # Bundled MCP server configs
        ├── essentials/
        ├── ai-tools/
        ├── data-sources/
        └── dev-tools/
```

### Plugin Types and Components

#### 1. Command Plugins

Provide slash commands like `/containerize`, `/ultra-think`. Commands are Markdown files with prompt content.

**Path convention:** `plugins/<plugin-name>/commands/<command-name>.md`

#### 2. Agent Plugins

Specialized AI agents invoked proactively. Agents are Markdown files defining behavior and expertise.

**Path convention:** `plugins/agents/<agent-name>/<agent-name>.md`

#### 3. Hook Plugins

Scripts that intercept tool usage for logging/monitoring. Currently only PostToolUse hooks.

**Path convention:** `plugins/hooks/<hook-name>/<script-name>.sh`

#### 4. MCP Collection Plugins

Bundled MCP server configurations. No separate files needed - configuration lives entirely in marketplace.json.

**No plugin.json required** when using `strict: false` in marketplace.json.

### Critical Files

#### marketplace.json

The single source of truth for the marketplace. Contains:

- Marketplace metadata (name, owner, description, version)
- Complete plugin registry with all metadata
- Plugin sources (relative paths or GitHub repos)
- MCP server configurations
- Command/agent/hook definitions

**Key Design Decision:** Uses `strict: false` which means plugins don't need individual `plugin.json` files if the marketplace.json entry is complete. This reduces duplication for MCP collection plugins.

**Environment Variable Resolution:** Uses `${CLAUDE_PLUGIN_ROOT}` for path resolution within plugin configurations and `${VAR_NAME}` for user-provided environment variables.

## Adding New Plugins

### Adding a Command Plugin

1. Create plugin directory: `.claude-plugin/plugins/<plugin-name>/`
2. Create `plugin.json`:

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "Plugin description",
  "category": "productivity",
  "commands": ["${CLAUDE_PLUGIN_ROOT}/commands/command-name.md"]
}
```

3. Create command files in `commands/` directory
4. Add entry to `marketplace.json` plugins array
5. Test locally

### Adding an Agent Plugin

1. Create directory: `.claude-plugin/plugins/agents/<agent-name>/`
2. Create agent definition: `<agent-name>.md`
3. Create `plugin.json` with `agents` field
4. Add to marketplace.json
5. Test locally

### Adding an MCP Collection Plugin

For MCP collections, you can skip creating plugin.json entirely:

1. Add entry directly to `marketplace.json` with `mcpServers` configuration
2. Use `strict: false` in the entry
3. Set source path (even if empty, e.g., `./plugins/mcp-collections/<name>`)
4. Define all MCP servers in the `mcpServers` object

Example:

```json
{
  "name": "mcp-essentials",
  "source": "./plugins/mcp-collections/essentials",
  "description": "Essential MCP servers",
  "version": "1.0.0",
  "category": "mcp-servers",
  "strict": false,
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}
```

## Environment Variables

Many MCP servers require API keys and credentials. Users should create a `.env` file in their project root with required values. The marketplace uses `${VAR_NAME}` syntax in marketplace.json which gets resolved from user environment.

See README.md for complete list of required environment variables.

## Metadata Standards

All plugins must include:

- `name`: kebab-case identifier
- `version`: Semantic versioning (major.minor.patch)
- `description`: Clear, concise description
- `author`: Name and email
- `category`: One of: productivity, agents, monitoring, mcp-servers
- `keywords`: Array of searchable tags
- `license`: "MIT" (or appropriate license)

## Version Management

Follow semantic versioning strictly:

- **MAJOR**: Breaking changes (incompatible with previous versions)
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Update both the plugin version AND the marketplace metadata version when making significant marketplace-wide changes.

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
    "development-utilities@claudecode-marketplace",
    "planning-tools@claudecode-marketplace"
  ]
}
```

When team members trust the repository, plugins install automatically.

## Important Constraints

1. **No Build Process**: This is a pure marketplace - no compilation or build steps
2. **Relative Paths**: All plugin sources use relative paths from marketplace root
3. **Environment Variable Security**: Never commit API keys or secrets to the repository
4. **Markdown Format**: Commands and agents are Markdown files, not code
5. **Plugin Isolation**: Each plugin should be independent and self-contained

## Documentation Files

- **README.md**: User-facing overview, installation instructions, plugin catalog
- **ARCHITECTURE.md**: Deep dive into design decisions, plugin types, structure
- **USAGE.md**: Practical examples, workflows, troubleshooting, best practices
- **CLAUDE.md** (this file): Quick reference for Claude Code instances

When making changes to plugins, consider whether documentation needs updating to reflect new functionality or changed behavior.
