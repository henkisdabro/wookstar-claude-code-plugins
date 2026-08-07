# wookstar-claude-plugins

A Claude Code plugin marketplace. No build step, no tests: every plugin is a directory under
`plugins/`, and it does not exist until it also has an entry in `.claude-plugin/marketplace.json`.

Verify a change with `claude plugin validate .` (clean at HEAD), then exercise it:
`/plugin marketplace add .`, `/plugin install <plugin>@wookstar-claude-plugins`, and
`/plugin marketplace update wookstar` to pick up later edits. Bump the plugin's `version` in
marketplace.json whenever its content changes - that is what busts the install cache for people who
already have it.

## This repo is public

Henrik's real name, email, phone and client paths must never land here. The handle `henkisdabro` and
the throwaway address `whom-wealthy.2z@icloud.com` are the correct stand-ins and already fill every
author block. His global instructions hand you his real name every session, so this is easy to get
wrong by being helpful.

Before committing, expect zero hits from:

```bash
grep -rEin 'henrik ?so[ei]derlund|[a-z0-9._%+-]+@(henriksoderlund|gmail|icloud|outlook)\.[a-z]{2,}' \
  plugins/ scripts/ tools/ README.md .claude-plugin/ | grep -v 'whom-wealthy.2z@icloud.com'
```

## Two things that are declared in two places

**MCP servers** belong in the plugin's own `.mcp.json`, referenced from its marketplace entry as
`"mcpServers": "./.mcp.json"`. Never repeat them in `plugin.json` - one source of truth, and the
marketplace decides what loads.

**LSP servers** are the opposite and do need duplicating: each `plugins/lsp-*/` has its `lspServers`
block in both `.claude-plugin/plugin.json` and its marketplace entry. Change one and you must change
the other.

## Skill descriptions are the only trigger surface

Nothing validates them and a bad one fails silently, so keep every new `SKILL.md` to the house
formula: a declarative one-line summary, then `Use when` with 5-10 explicit trigger phrases, then
`Do NOT use for` with the scenarios that should route elsewhere. Both halves matter - the negative
signals are what stop a skill firing on unrelated requests.
