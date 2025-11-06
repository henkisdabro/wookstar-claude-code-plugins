---
allowed-tools: Bash(ls:*), Bash(ln s:*), Bash(touch:*), Bash(echo:*)
model: claude-3-5-haiku-latest
---

# Pre-run Command

!`[ -f "CLAUDE.md" ] || { touch "CLAUDE.md" && echo "A new empty CLAUDE.md file has been created including the AGENTS.md symlink. Run the Claude Code /init command in your project folder to populate CLAUDE.md (and hence AGENTS.md) with project information and knowledge"; }; ln -sf "CLAUDE.md" "AGENTS.md" && echo "The AGENTS.md symlink has been created!"`
