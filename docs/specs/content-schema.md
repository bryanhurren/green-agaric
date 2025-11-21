# Content Schema Specification

**Status:** Active
**Last Updated:** 2025-11-21
**Base Reference:** [claude.md § Content Management Rules](../../claude.md#content-management-rules)

> **Purpose:** Define content structure, schemas, and validation rules for all content collections.

---

## Overview

Green Agaric uses **Astro Content Collections** for type-safe, validated content management. All content is stored as Markdown files with YAML front matter.

**Benefits:**
- Type safety with TypeScript
- Automatic validation
- Version controlled
- Easy to edit
- No database required

---

## Content Collections

### Projects Collection

**Location:** `src/content/projects/`
**Purpose:** Showcase current and in-progress projects

#### Schema Definition

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(60, 'Title must be 60 characters or less'),
    description: z.string().max(100, 'Description must be 100 characters or less'),
    status: z.enum([
      'In Development',
      'Early Prototype',
      'Live',
      'Archived'
    ]),
    order: z.number().int().positive(),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectsCollection,
};
```

#### Field Specifications

| Field | Type | Required | Validation | Purpose |
|-------|------|----------|------------|---------|
| `title` | string | Yes | Max 60 chars | Project name |
| `description` | string | Yes | Max 100 chars | One-line summary |
| `status` | enum | Yes | One of 4 values | Current state |
| `order` | number | Yes | Positive integer | Display order |
| `link` | string | No | Valid URL | External link |
| `featured` | boolean | No | Default: false | Show on homepage |

#### Status Values

```typescript
type ProjectStatus =
  | 'In Development'   // Actively building
  | 'Early Prototype'  // Experimental stage
  | 'Live'             // Deployed and accessible
  | 'Archived';        // No longer active
```

**Usage guidelines:**
- **In Development:** Active work, regular updates
- **Early Prototype:** Proof of concept, may change significantly
- **Live:** Deployed, users can access
- **Archived:** Historical reference, not displayed on site

---

## File Format

### Template

```markdown
---
title: "Project Name"
description: "Brief one-line description under 100 characters"
status: "In Development"
order: 1
link: "https://example.com"
featured: true
---

## Optional extended description

Longer content here. This body content is optional but can include:
- Additional project details
- Technical stack
- Key features
- Links to demos or documentation

Markdown formatting supported:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `Code snippets`

Keep this section concise. For lengthy documentation, link externally.
```

### Field Requirements

#### Title
- **Max length:** 60 characters
- **Format:** Title case preferred
- **Uniqueness:** Each project must have unique title
- **Examples:**
  - ✓ "Merchery"
  - ✓ "Citizenship AI"
  - ✗ "this is a project in lowercase" (inconsistent casing)
  - ✗ "This Is An Extremely Long Project Name That Exceeds The Sixty Character Limit" (too long)

#### Description
- **Max length:** 100 characters (including spaces)
- **Format:** Sentence case, no period at end
- **Purpose:** Display on project cards, meta descriptions
- **Examples:**
  - ✓ "Direct-to-fan tools for independent musicians"
  - ✓ "Simplifying U.S. immigration workflows with conversational AI"
  - ✗ "This is a project that does many things and has a very long description that exceeds the maximum allowed length" (too long)

#### Status
- **Must match:** Exact enum value (case-sensitive)
- **Default to:** "In Development" when unsure
- **Examples:**
  - ✓ "In Development"
  - ✓ "Live"
  - ✗ "in development" (wrong case)
  - ✗ "WIP" (not in enum)

#### Order
- **Type:** Positive integer (1, 2, 3...)
- **Uniqueness:** Each project should have unique order
- **Purpose:** Controls display sequence
- **Rules:**
  - Start at 1
  - No gaps (1, 2, 3 not 1, 5, 10)
  - Featured projects typically have lower numbers
- **Examples:**
  - ✓ 1
  - ✓ 2
  - ✗ 0 (must be positive)
  - ✗ 1.5 (must be integer)

#### Link (optional)
- **Validation:** Must be valid URL if provided
- **Purpose:** External project link (demo, docs, live site)
- **Examples:**
  - ✓ "https://merchery.app"
  - ✓ "https://github.com/user/repo"
  - ✗ "merchery.app" (missing protocol)
  - ✗ "not a url" (invalid format)

#### Featured (optional)
- **Type:** Boolean
- **Default:** false
- **Purpose:** Show on homepage or featured section
- **Limit:** Maximum 3 featured projects at a time
- **Examples:**
  - ✓ true
  - ✓ false
  - ✗ "yes" (must be boolean)

---

## Example Projects

### Merchery
```markdown
---
title: "Merchery"
description: "Direct-to-fan tools for independent musicians"
status: "In Development"
order: 1
featured: true
---

Merchery helps independent artists build meaningful communities through
direct-to-fan merchandise and engagement tools.

**Key Features:**
- Custom merch generation
- Fan community management
- Direct sales integration
```

### Citizenship AI
```markdown
---
title: "Citizenship AI"
description: "Simplifying U.S. immigration workflows with conversational AI"
status: "Early Prototype"
order: 2
link: "https://citizenship-ai.example.com"
featured: true
---

A conversational agent that helps users navigate complex U.S. immigration
processes through natural language interaction.
```

### AI Developer Tools
```markdown
---
title: "AI Developer Tools"
description: "Experiments with Claude Code and agentic workflows"
status: "In Development"
order: 3
featured: false
---

Exploring new developer workflows, Claude Code experiments, and patterns
for building with modern AI systems.
```

### Music-Tech Utilities
```markdown
---
title: "Music-Tech Utilities"
description: "Small tools for fan engagement and artistic expression"
status: "Early Prototype"
order: 4
featured: false
---

Creative experiments at the intersection of music, technology, and
audience engagement.
```

---

## Adding New Projects

**Step-by-step guide:** See [docs/guides/adding-projects.md](../guides/adding-projects.md)

**Quick checklist:**
1. Create new `.md` file in `src/content/projects/`
2. Use slug naming: `project-name.md` (lowercase, hyphens)
3. Copy front matter template
4. Fill all required fields
5. Validate against schema (build will catch errors)
6. Set appropriate `order` value
7. Run `npm run build` to verify
8. Commit to repository

---

## Fetching Content

### In Pages (Astro)

```typescript
// Get all projects
import { getCollection } from 'astro:content';
const projects = await getCollection('projects');

// Get single project by slug
import { getEntry } from 'astro:content';
const project = await getEntry('projects', 'merchery');

// Filter projects
const liveProjects = await getCollection('projects', ({ data }) => {
  return data.status === 'Live';
});
```

### Type Safety

```typescript
import type { CollectionEntry } from 'astro:content';

// Type for a single project
type Project = CollectionEntry<'projects'>;

// Use in function signatures
function sortProjects(projects: Project[]): Project[] {
  return projects.sort((a, b) => a.data.order - b.data.order);
}
```

### Rendering Content

```astro
---
import { getEntry } from 'astro:content';
const project = await getEntry('projects', 'merchery');
const { Content } = await project.render();
---

<article>
  <h1>{project.data.title}</h1>
  <p>{project.data.description}</p>
  <Content /> <!-- Renders markdown body -->
</article>
```

---

## Validation

### Build-Time Validation

Astro validates content against schema during build:

```bash
npm run build
```

**Catches:**
- Missing required fields
- Wrong data types
- Invalid enum values
- String length violations
- Invalid URLs

**Example error:**
```
[ERROR] [projects] merchery.md frontmatter does not match collection schema.
  - "description" is too long (120 characters, max 100)
```

### Schema Updates

**When to update schema:**
- Adding new required/optional fields
- Changing validation rules
- Adding new status values
- Modifying field types

**Process:**
1. Update schema in `src/content/config.ts`
2. Run `npm run build` to check existing content
3. Fix any validation errors in content files
4. Update this documentation
5. Update guide: `docs/guides/adding-projects.md`
6. Commit schema and content changes together

---

## Business Logic Integration

### Extract Data Transformations

**DON'T** put logic in pages/components:
```astro
---
// ❌ BAD
const projects = await getCollection('projects');
const active = projects.filter(p => p.data.status !== 'Archived')
                       .sort((a, b) => a.data.order - b.data.order);
---
```

**DO** create utilities in `src/lib/projects.ts`:
```typescript
// ✅ GOOD
export function getActiveProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.data.status !== 'Archived');
}

export function sortProjectsByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.data.featured === true);
}
```

Then use in pages:
```astro
---
import { getCollection } from 'astro:content';
import { getActiveProjects, sortProjectsByOrder } from '@/lib/projects';

const allProjects = await getCollection('projects');
const displayProjects = sortProjectsByOrder(getActiveProjects(allProjects));
---
```

**Reference:** [claude.md § API and Business Logic Separation](../../claude.md#5-api-and-business-logic-separation---absolute)

---

## Common Patterns

### Display All Active Projects
```typescript
const allProjects = await getCollection('projects');
const activeProjects = getActiveProjects(allProjects);
const sortedProjects = sortProjectsByOrder(activeProjects);
```

### Display Featured Projects Only
```typescript
const allProjects = await getCollection('projects');
const featuredProjects = getFeaturedProjects(allProjects);
const sortedFeatured = sortProjectsByOrder(featuredProjects);
```

### Display by Status
```typescript
const allProjects = await getCollection('projects');
const liveProjects = allProjects.filter(p => p.data.status === 'Live');
const inDevProjects = allProjects.filter(p => p.data.status === 'In Development');
```

### Generate Project URLs (if needed)
```typescript
// If we add individual project pages later
const projectUrl = `/projects/${project.slug}/`;
```

---

## Future Considerations

### Possible Schema Extensions

**If needed later:**
- `tags: z.array(z.string())` - Categorize projects
- `publishDate: z.date()` - When project was announced
- `image: z.string()` - Project thumbnail
- `github: z.string().url().optional()` - GitHub repo link
- `stats: z.object({...})` - Project metrics

**Before adding:**
1. Verify it's needed (don't add "just in case")
2. Update schema in `src/content/config.ts`
3. Update existing project files
4. Update this spec
5. Update guides

### Multiple Collections

**If website grows:**
- `blog` collection for updates/posts
- `team` collection for team members
- `press` collection for media mentions

Each collection gets:
- Its own schema in `src/content/config.ts`
- Its own directory in `src/content/`
- Its own utilities in `src/lib/[collection-name].ts`
- Its own spec doc in `docs/specs/[collection-name]-schema.md`

---

## Troubleshooting

### Build fails with schema validation error
1. Read the error message carefully
2. Check the project file mentioned
3. Verify front matter matches schema exactly
4. Check for typos in field names
5. Verify enum values match exactly (case-sensitive)

### Project not appearing on site
1. Verify file is in `src/content/projects/`
2. Check status is not "Archived"
3. Verify front matter is valid YAML
4. Run build to check for schema errors
5. Check filtering logic in page

### Order numbers conflict
1. List all projects and their order values
2. Ensure each project has unique order
3. Re-number sequentially (1, 2, 3, 4...)
4. Update and rebuild

---

## References

- **Base spec:** [claude.md § Content Management](../../claude.md#content-management-rules)
- **Architecture:** [architecture.md](architecture.md)
- **Adding projects guide:** [guides/adding-projects.md](../guides/adding-projects.md)
- **Astro Content Collections:** https://docs.astro.build/en/guides/content-collections/
