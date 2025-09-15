# Jazz Web Project Information

## Project Overview
This project's detailed information is consolidated in the **Serena** memory system.

### Available Memory Files
- `project_overview.md` - Project purpose, features, system architecture
- `tech_stack.md` - Technology stack details
- `codebase_structure.md` - Source code structure
- `code_style_conventions.md` - Coding conventions
- `suggested_commands.md` - Development and operation commands
- `task_completion_checklist.md` - Required checklist items when completing tasks

### How to Check Project Information
You can reference project information using Serena's memory functionality:
```
List memories: mcp__serena__list_memories
Read memory: mcp__serena__read_memory
```

### Important Commands
```bash
# Development server
npm run dev

# Code quality check
npm run lint
npm run lint:fix
npm run format

# Build
npm run build
```

### Git Commit Rules
- **コミットメッセージは日本語で書く**
- コミット時は必ず日本語でメッセージを作成すること

## About This Project
Tokyo jazz live house information search system with:
- Search by instrument, location, and date
- Cloudflare + Google authentication (personal use)
- Weekly crawler data updates
- Next.js + TypeScript + Tailwind CSS
- D1 (SQLite) database
- replace_symbol_bodyはファイルを破壊する可能性があるので使用しないこと