# Green Agaric Documentation Structure

## Overview

This documentation system uses a **base specification** with **dedicated reference documents** for detailed implementation guidance.

---

## Documentation Hierarchy

```
agaric/
├── claude.md                    # BASE SPEC - Read this first
├── docs/
│   ├── README.md                # This file - documentation guide
│   ├── TODO.md                  # Project todos with doc references
│   ├── specs/                   # Detailed specifications
│   │   ├── architecture.md      # Architecture patterns & decisions
│   │   ├── content-schema.md    # Content structure & validation
│   │   ├── styling-guide.md     # Design system & Tailwind patterns
│   │   ├── accessibility.md     # WCAG compliance checklist
│   │   └── deployment.md        # Vercel setup & configuration
│   ├── guides/                  # Step-by-step how-tos
│   │   ├── adding-projects.md   # How to add new projects
│   │   ├── form-setup.md        # Contact form configuration
│   │   └── favicon-creation.md  # Favicon design & implementation
│   └── decisions/               # Architecture Decision Records (ADRs)
│       ├── 001-astro-framework.md
│       ├── 002-tailwind-styling.md
│       └── 003-markdown-content.md
└── src/
    └── ...
```

---

## How to Use This System

### 1. Start with claude.md
**Purpose:** Primary development rules and standards
**When to read:** Before starting any work, when in doubt

The base spec (`claude.md`) contains:
- Non-negotiable tech stack
- Architecture rules (file size, modularity, separation)
- Code patterns and examples
- Quality standards (performance, accessibility)
- What NOT to do

### 2. Check TODO.md
**Purpose:** Track work items with links to relevant documentation
**When to read:** Planning work, checking progress

Format:
```markdown
- [ ] Task name
  - **Spec:** docs/specs/relevant-spec.md
  - **Guide:** docs/guides/how-to-guide.md
  - **Context:** Brief description or blockers
```

### 3. Reference Detailed Specs
**Purpose:** Deep-dive into specific implementation areas
**When to read:** Implementing features, making architecture decisions

### 4. Follow Step-by-Step Guides
**Purpose:** Practical how-to instructions for common tasks
**When to read:** Performing specific operations

### 5. Review Decision Records
**Purpose:** Understand why technical choices were made
**When to read:** Questioning current approach, proposing changes

---

## Documentation Principles

### Keep Base Spec Authoritative
- `claude.md` is the source of truth
- All other docs reference and expand on it
- Never contradict the base spec
- When updating detailed docs, verify alignment with base spec

### Link, Don't Duplicate
- Detailed docs reference base spec sections
- Base spec points to detailed docs for more info
- Use relative links between documents
- Keep cross-references up to date

### One Document, One Purpose
- Each file covers a specific topic
- No overlap between documents
- Clear scope in document header
- Maximum 500 lines per document (split if larger)

### TODO References Documentation
- Every TODO links to relevant docs
- Documentation clarifies TODO requirements
- Update TODOs when completing work
- Archive completed TODOs with completion date

---

## Writing New Documentation

### When to Create a Detailed Spec
- Topic requires > 100 lines to explain
- Multiple code examples needed
- Complex implementation patterns
- Needs regular updates

### When to Create a Guide
- Step-by-step process exists
- Multiple people will perform this task
- Onboarding new developers
- Common support questions

### When to Create a Decision Record
- Made significant technical choice
- Evaluated multiple alternatives
- Need to document trade-offs
- Prevent future re-litigation of decision

### Template for Decision Records (ADR)
```markdown
# ADR-###: Title

**Status:** Accepted | Superseded | Deprecated
**Date:** YYYY-MM-DD
**Deciders:** Names

## Context
What is the issue we're facing?

## Decision
What did we decide to do?

## Alternatives Considered
- Option A: pros/cons
- Option B: pros/cons

## Consequences
What becomes easier or harder?

## References
- Link to discussions
- Related specifications
```

---

## Maintenance Rules

### Review Cadence
- **Weekly:** Check TODO.md for completions
- **Per feature:** Update related specs/guides
- **Per sprint:** Archive completed TODOs
- **Quarterly:** Audit all docs for accuracy

### Deprecation Process
1. Add `[DEPRECATED]` to document title
2. Add deprecation notice at top with replacement link
3. Keep file for 2 sprints
4. Move to `docs/archive/` directory
5. Update all references

### When Documentation Conflicts with Code
**Reality wins.**
1. Document the actual implementation
2. Note if it violates base spec
3. Create TODO to fix code OR update base spec
4. Get approval before changing base spec

---

## Quick Reference

| Need | Read |
|------|------|
| Core development rules | `claude.md` |
| What to work on next | `docs/TODO.md` |
| How content works | `docs/specs/content-schema.md` |
| Design patterns | `docs/specs/styling-guide.md` |
| Accessibility requirements | `docs/specs/accessibility.md` |
| Deploy configuration | `docs/specs/deployment.md` |
| Add new project | `docs/guides/adding-projects.md` |
| Setup contact form | `docs/guides/form-setup.md` |
| Create favicon | `docs/guides/favicon-creation.md` |
| Why we chose X | `docs/decisions/` |

---

## Rules for AI Assistants

When working on this project:

1. **ALWAYS read `claude.md` first** - it contains non-negotiable rules
2. **Check `docs/TODO.md`** for current work items and their documentation references
3. **Reference detailed specs** when implementing complex features
4. **Update TODO.md** as you complete tasks
5. **Link to documentation** when explaining implementation decisions
6. **Never contradict the base spec** - if you disagree, raise it for discussion
7. **Keep documentation synchronized** with code changes

### Documentation Update Workflow
```
Code change → Update TODO.md → Update relevant spec/guide → Verify base spec alignment
```

---

**Remember:** Documentation exists to prevent mistakes, not create busywork. If documentation doesn't help, improve it or remove it.
