# Architecture Specification

**Status:** Active
**Last Updated:** 2025-11-21
**Base Reference:** [claude.md § Architecture Rules](../../claude.md#architecture-rules)

> **Purpose:** Detailed architecture patterns, file organization, and layer boundaries for the Green Agaric website.

---

## Overview

The Green Agaric website follows a **layered, modular architecture** with strict separation of concerns:

```
Data Layer (Content Collections)
       ↓
Business Logic Layer (src/lib/)
       ↓
Presentation Layer (Components/Pages)
```

This architecture ensures:
- Testable, isolated business logic
- Reusable components
- Predictable data flow
- Easy maintenance

---

## Directory Structure

```
src/
├── components/              # Presentation components
│   ├── Navigation.astro     # Global nav (< 100 lines)
│   ├── ProjectCard.astro    # Project display (< 100 lines)
│   ├── Footer.astro         # Global footer (< 100 lines)
│   └── contact/             # Contact-specific components
│       ├── ContactForm.astro
│       └── FormField.astro
│
├── content/                 # Content collections (data layer)
│   ├── config.ts            # Content collection schemas
│   └── projects/            # Project markdown files
│       ├── merchery.md
│       ├── citizenship-ai.md
│       ├── ai-dev-tools.md
│       └── music-tech.md
│
├── layouts/                 # Page layouts
│   └── BaseLayout.astro     # Main layout (< 100 lines)
│
├── lib/                     # Business logic layer
│   ├── projects.ts          # Project utilities (< 50 lines)
│   ├── dates.ts             # Date formatting (< 50 lines)
│   └── validation.ts        # Form validation (< 50 lines)
│
├── pages/                   # Routes (data fetching + rendering)
│   ├── index.astro          # Home page (< 150 lines)
│   ├── projects.astro       # Projects page (< 150 lines)
│   ├── about.astro          # About page (< 150 lines)
│   └── contact.astro        # Contact page (< 150 lines)
│
└── styles/                  # Global styles (minimal)
    └── global.css           # Only for @font-face, resets
```

### File Naming Conventions

**Components:** PascalCase
```
ProjectCard.astro
Navigation.astro
ContactForm.astro
```

**Pages:** lowercase-with-hyphens
```
index.astro
projects.astro
about.astro
contact.astro
```

**Utilities:** camelCase
```
projects.ts
validation.ts
dateHelpers.ts
```

**Content:** lowercase-with-hyphens
```
merchery.md
citizenship-ai.md
ai-dev-tools.md
```

---

## Layer Responsibilities

### Data Layer (src/content/)

**Purpose:** Store raw content with validation schemas

**Contains:**
- Markdown files with front matter
- Content collection schemas (config.ts)
- NO business logic
- NO data transformation

**Example:**
```markdown
---
title: "Merchery"
description: "Direct-to-fan tools for independent musicians"
status: "In Development"
order: 1
---

Merchery helps independent artists build meaningful communities
through direct-to-fan merchandise and engagement tools.
```

**Rules:**
- Content MUST match schema exactly
- NO computed fields in content files
- NO JavaScript in markdown
- Keep descriptions concise (< 100 chars for meta)

---

### Business Logic Layer (src/lib/)

**Purpose:** Transform and process data

**Contains:**
- Pure functions (no side effects)
- Data filtering and sorting
- Status calculations
- Date/time formatting
- Validation logic
- Type definitions

**Example:**
```typescript
// src/lib/projects.ts
import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Filter projects by status, excluding archived
 */
export function getActiveProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.data.status !== 'Archived');
}

/**
 * Sort projects by order field (ascending)
 */
export function sortProjectsByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get featured projects (first 3 by order)
 */
export function getFeaturedProjects(projects: Project[]): Project[] {
  return sortProjectsByOrder(getActiveProjects(projects)).slice(0, 3);
}
```

**Rules:**
- One file = one concern (projects, dates, validation)
- Maximum 50 lines per file
- Pure functions only (no side effects)
- Named exports only (NO default exports)
- Explicit return types
- Document function purpose if not obvious

---

### Presentation Layer (src/components/, src/pages/)

**Purpose:** Render UI and handle user interaction

#### Components (src/components/)

**Purpose:** Reusable UI elements

**Contains:**
- Astro components (or React if hydration needed)
- Tailwind utility classes
- Semantic HTML
- TypeScript prop interfaces
- NO data fetching
- NO business logic

**Example:**
```astro
---
// src/components/ProjectCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const { title, description, status } = project.data;
---

<article class="border border-forest-light rounded-lg p-6 hover:shadow-lg transition-shadow">
  <h3 class="text-xl font-semibold text-forest-dark mb-2">{title}</h3>
  <p class="text-earth-base mb-4">{description}</p>
  <span class="inline-block px-3 py-1 bg-moss text-white text-sm rounded">
    {status}
  </span>
</article>
```

**Rules:**
- Maximum 100 lines per component
- Single responsibility only
- NO data fetching (receive via props)
- NO business logic (import from src/lib/)
- TypeScript interface for props
- Semantic HTML elements
- Tailwind classes only (no inline styles)

#### Pages (src/pages/)

**Purpose:** Route handlers - fetch data and coordinate rendering

**Contains:**
- Data fetching (Astro.props, getCollection())
- Business logic imports
- Component composition
- Layout wrapping
- SEO metadata

**Example:**
```astro
---
// src/pages/projects.astro
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import ProjectCard from '@/components/ProjectCard.astro';
import { getActiveProjects, sortProjectsByOrder } from '@/lib/projects';

// Data fetching (pages only)
const allProjects = await getCollection('projects');

// Business logic (from lib)
const activeProjects = getActiveProjects(allProjects);
const sortedProjects = sortProjectsByOrder(activeProjects);

// Metadata
const pageTitle = 'Projects | Green Agaric';
const pageDescription = 'Explore our current projects and experiments';
---

<BaseLayout title={pageTitle} description={pageDescription}>
  <main class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-forest-dark mb-8">Projects</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedProjects.map(project => (
        <ProjectCard project={project} />
      ))}
    </div>
  </main>
</BaseLayout>
```

**Rules:**
- Maximum 150 lines per page
- Data fetching happens here (not in components)
- Import business logic from src/lib/
- Coordinate components, don't implement logic
- Include SEO metadata

---

## Data Flow Patterns

### Pattern: Fetch → Transform → Render

```
Page (fetch) → Business Logic (transform) → Component (render)
```

**Example: Projects Page**
```typescript
// 1. FETCH (in page)
const allProjects = await getCollection('projects');

// 2. TRANSFORM (business logic)
const activeProjects = getActiveProjects(allProjects);
const sortedProjects = sortProjectsByOrder(activeProjects);

// 3. RENDER (component)
<ProjectCard project={project} />
```

### Pattern: Validation → Process → Display

```
User Input → Validation (lib) → Processing (page/API) → UI Feedback (component)
```

**Example: Contact Form**
```typescript
// 1. VALIDATION (in lib/validation.ts)
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 2. PROCESSING (in page or endpoint)
if (!validateEmail(formData.email)) {
  return { error: 'Invalid email format' };
}

// 3. DISPLAY (in component)
{error && <span class="text-red-600">{error}</span>}
```

---

## Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/layouts/*": ["./src/layouts/*"]
    }
  }
}
```

**Usage:**
```typescript
import ProjectCard from '@/components/ProjectCard.astro';
import { getActiveProjects } from '@/lib/projects';
import BaseLayout from '@/layouts/BaseLayout.astro';
```

**Benefits:**
- No relative path hell (`../../../`)
- Easy refactoring
- Clear layer identification

---

## Dependency Rules

### Allowed Imports

```
✓ Pages → Layouts, Components, Lib, Content
✓ Layouts → Components, Lib
✓ Components → Other Components, Lib
✓ Lib → Other Lib files, Types
✗ Lib → Components, Pages, Layouts
✗ Components → Pages, Layouts
✗ Content → Anything (pure data)
```

### Testing Layer Boundaries

Ask these questions:
1. Does this component import from src/lib/? ✓ (Good)
2. Does this component call getCollection()? ✗ (Bad - pages only)
3. Does this lib file import a component? ✗ (Bad - wrong direction)
4. Does this page implement business logic? ✗ (Bad - extract to lib)

---

## File Size Enforcement

**Automatic checks** (add to package.json scripts):

```json
{
  "scripts": {
    "lint:size": "find src -name '*.astro' -o -name '*.ts' | xargs wc -l | awk '$1 > 150 && $2 !~ /total/ {print \"File too large:\", $2, \"(\" $1, \"lines)\"}'"
  }
}
```

Run before commits:
```bash
npm run lint:size
```

**Manual check:**
```bash
wc -l src/components/ProjectCard.astro
# Should show < 100 lines
```

---

## Modularity Checklist

Before committing a file, verify:

- [ ] File has single, clear purpose
- [ ] Can be tested independently
- [ ] No side effects (for utilities)
- [ ] Dependencies are explicit (imports at top)
- [ ] Exports only what's necessary
- [ ] Named exports (not default)
- [ ] File size within limits
- [ ] Follows layer boundaries

If ANY checkbox is unchecked → refactor before committing.

---

## Common Violations & Fixes

### ❌ WRONG: Business logic in component
```astro
---
const projects = await getCollection('projects');
const active = projects.filter(p => p.status !== 'Archived');
---
```

### ✅ CORRECT: Business logic in lib, data in page
```typescript
// src/lib/projects.ts
export function getActiveProjects(projects: Project[]) {
  return projects.filter(p => p.status !== 'Archived');
}

// src/pages/projects.astro
import { getActiveProjects } from '@/lib/projects';
const active = getActiveProjects(await getCollection('projects'));
```

---

### ❌ WRONG: Large monolithic component
```astro
<!-- 250 lines of form fields, validation, styling -->
```

### ✅ CORRECT: Composed from small components
```astro
<!-- src/components/contact/ContactForm.astro (50 lines) -->
<form>
  <FormField name="email" type="email" />
  <FormField name="message" type="textarea" />
  <SubmitButton />
</form>

<!-- src/components/contact/FormField.astro (30 lines) -->
<!-- src/components/contact/SubmitButton.astro (20 lines) -->
```

---

## Architecture Decision Records

See `docs/decisions/` for detailed rationale:
- [ADR-001: Why Astro](../decisions/001-astro-framework.md)
- [ADR-002: Why Tailwind](../decisions/002-tailwind-styling.md)
- [ADR-003: Why Markdown Content](../decisions/003-markdown-content.md)

---

## Questions?

- **Base spec:** [claude.md](../../claude.md)
- **Content schema:** [content-schema.md](content-schema.md)
- **Styling patterns:** [styling-guide.md](styling-guide.md)
- **Deployment:** [deployment.md](deployment.md)
