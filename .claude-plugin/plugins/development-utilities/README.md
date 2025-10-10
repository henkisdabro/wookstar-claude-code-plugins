# Development Utilities Plugin

Essential development utilities for everyday coding tasks.

## Commands

### /containerize

Containerize applications with optimized Docker configuration, security, and multi-stage builds.

**Usage:**
```bash
/containerize --node          # Node.js application
/containerize --python        # Python application
/containerize --java          # Java application
/containerize --go            # Go application
/containerize --multi-stage   # Multi-stage build
```

**Features:**
- Multi-stage builds for optimization
- Security best practices
- Minimal base images
- Production-ready configuration
- Docker Compose setup
- Kubernetes preparation

### /prompt_writer

Advanced prompt engineering and writing assistant.

**Features:**
- Optimized prompt generation
- Context-aware suggestions
- Best practices integration

### /primer

Quick project initialization and setup.

**Features:**
- Project scaffolding
- Dependency setup
- Configuration generation

### /reflection

Code analysis and reflection tools.

**Features:**
- Code quality analysis
- Improvement suggestions
- Refactoring recommendations

### /create-agentsmd-symlink

Agent configuration management and symlink creation.

**Features:**
- Agent setup automation
- Configuration linking

## Installation

```bash
/plugin install development-utilities@claudecode-marketplace
```

## Requirements

- Docker (for containerize command)
- Node.js or Python (depending on project type)

## License

MIT
