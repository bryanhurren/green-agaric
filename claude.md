# Green Agaric Website - Development Rules

## Project Identity

**Name:** Green Agaric
**Domain:** greenagaric.com
**Tagline:** Ideas Wandering Off Trail
**Identity:** AI-first product studio rooted in the Pacific Northwest, exploring unconventional tools, workflows, and creative systems.

**Visual Identity:**
- Pacific Northwest aesthetic (forest greens, earthy tones, organic shapes)
- Mushroom/mycelial network motif (subtle, not literal)
- Minimal, spacious, confident whitespace
- Modern typography, not corporate

**Voice:**
- Direct and unpretentious
- Curious and exploratory
- Thoughtful without being academic
- NEVER: Corporate jargon, excessive AI hype, forced quirk

---

## Tech Stack - Non-Negotiable

**Framework:** Astro
**Styling:** Tailwind CSS
**Content:** Markdown with front matter
**Hosting:** Vercel
**Version Control:** GitHub

DO NOT propose alternatives. DO NOT suggest "improvements" that change the stack.

---

## Architecture Rules

### 1. Predictable Architecture - ALWAYS

- Pages live in `src/pages/`
- Components live in `src/components/`
- Layouts live in `src/layouts/`
- Project content lives in `src/content/projects/` as Markdown files
- Styles follow Tailwind utility-first patterns
- NO custom CSS files unless absolutely necessary
- NO component libraries (we build from scratch)

**File naming convention:**
- Components: PascalCase (e.g., `ProjectCard.astro`)
- Pages: lowercase with hyphens (e.g., `about.astro`, `index.astro`)
- Content: lowercase with hyphens (e.g., `merchery.md`, `citizenship-ai.md`)

### 2. Consistent Patterns - MANDATORY

**Component Structure (Astro):**
```astro
---
// TypeScript front matter
interface Props {
  // Explicit prop types
}

const { propName } = Astro.props;
---

<!-- HTML with Tailwind classes -->
<div class="container mx-auto px-4">
  <!-- Component content -->
</div>
```

**Every component MUST:**
- Define TypeScript interfaces for props
- Use explicit prop destructuring
- Include semantic HTML
- Follow accessibility patterns
- Use Tailwind utility classes (no inline styles)

**Project Content (Markdown front matter):**
```yaml
---
title: "Project Name"
description: "One-line description"
status: "In Development" | "Early Prototype" | "Live"
order: 1
---
```

ALL project files MUST have these exact fields. NO variations.

### 3. Testable, Modular Code - REQUIRED

- Components MUST be single-purpose
- Components MUST NOT have side effects
- Components MUST NOT fetch data directly (use Astro's content collections)
- Functions MUST be pure where possible
- NO tightly coupled components
- NO god components that do everything

**Maximum component size:** 100 lines. If larger, split it.

### 4. File Size Limits - STRICT

**Maximum file sizes:**
- Components: 100 lines (including imports and types)
- Pages: 150 lines (including data fetching)
- Utilities: 50 lines per file
- Layouts: 100 lines

**If you exceed these limits:**
- Split into smaller, focused files
- Extract reusable logic to utilities
- Break down complex components into sub-components
- Create composition patterns instead of monoliths

**NEVER:**
- Create files over 200 lines for any reason
- Put multiple responsibilities in one file
- Justify bloat with "it's related"
- Create "misc" or "utils" catch-all files

**ALWAYS:**
- Keep files focused on single responsibility
- Extract when approaching limit
- Name extracted files descriptively
- Question if the file is doing too much

### 5. API and Business Logic Separation - ABSOLUTE

**Clear boundaries:**
```
Data Layer → Business Logic → Presentation
(Astro content) → (Utilities/transforms) → (Components)
```

**Data layer (src/content/, Astro collections):**
- ONLY raw content and schemas
- NO business logic
- NO presentation logic
- NO data transformation beyond schema validation

**Business logic (src/lib/ or src/utils/):**
- Data transformations
- Filtering and sorting logic
- Status calculations
- Date formatting
- Project ordering algorithms
- NO direct DOM manipulation
- NO component-specific code
- NO side effects

**Presentation (src/components/, src/pages/):**
- ONLY UI rendering
- ONLY user interaction handling
- Call business logic, don't implement it
- NO data fetching in components (do in pages)
- NO complex calculations in templates

**Example - CORRECT:**
```typescript
// src/lib/projects.ts (Business Logic)
export function sortProjectsByStatus(projects: Project[]) {
  return projects.sort((a, b) => a.order - b.order);
}

export function getActiveProjects(projects: Project[]) {
  return projects.filter(p => p.status !== 'Archived');
}

// src/pages/projects.astro (Data + Presentation)
---
import { getCollection } from 'astro:content';
import { sortProjectsByStatus, getActiveProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard.astro';

const allProjects = await getCollection('projects');
const activeProjects = getActiveProjects(allProjects);
const sortedProjects = sortProjectsByStatus(activeProjects);
---

{sortedProjects.map(project => <ProjectCard project={project} />)}
```

**Example - WRONG:**
```astro
// src/components/ProjectList.astro
---
// DON'T DO THIS - fetching in component
const projects = await getCollection('projects');

// DON'T DO THIS - business logic in component
const sorted = projects.filter(p => p.status !== 'Archived')
  .sort((a, b) => a.order - b.order);
---
```

**NEVER:**
- Mix data fetching and business logic
- Put business logic in components
- Put presentation logic in utilities
- Access content collections from components
- Perform calculations in templates

**ALWAYS:**
- Keep layers separate
- Pass processed data as props
- Extract logic to utilities
- Make functions pure and testable
- Document utility function purpose

### 6. Modularity - NON-NEGOTIABLE

**Every module MUST:**
- Have a single, clear purpose
- Be independently testable
- Have explicit dependencies (imports at top)
- Export only what's necessary
- Be reusable without modification

**Module composition rules:**
```
Small modules → Composed into larger features → Assembled into pages
```

**Utility modules (src/lib/):**
- One utility = one file
- Related utilities = one directory
- Each file exports 1-3 functions maximum
- NO default exports (use named exports)
- Pure functions preferred

**Component modules:**
- One component = one file
- Sub-components in same directory if tightly coupled
- Shared components in src/components/
- Page-specific components in src/components/[page-name]/

**Example structure:**
```
src/
├── lib/
│   ├── projects.ts         # Project utilities
│   ├── dates.ts            # Date formatting
│   └── validation.ts       # Form validation
├── components/
│   ├── ProjectCard.astro   # Reusable
│   ├── Navigation.astro    # Reusable
│   └── contact/
│       ├── ContactForm.astro
│       └── FormField.astro
```

**Testing modularity:**
- Can this be imported elsewhere without side effects? ✓
- Can this be tested without mocking 5+ dependencies? ✓
- Does this file have one clear responsibility? ✓
- Can I explain this module's purpose in one sentence? ✓

**If ANY answer is NO → refactor.**

**NEVER:**
- Create modules with side effects
- Export everything "just in case"
- Mix concerns in one module
- Create circular dependencies
- Use default exports (makes refactoring harder)

**ALWAYS:**
- One purpose per module
- Named exports only
- Explicit imports (no `import *`)
- Document module purpose if not obvious
- Extract when scope creeps

### 7. Zero "AI Drift" - ENFORCE STRICTLY

**NEVER:**
- Add features not explicitly requested
- "Improve" code that works
- Refactor without explicit instruction
- Add comments to code you didn't change
- Add error handling for scenarios that can't happen
- Create abstractions for one-time operations
- Add "helpful" utilities or helpers unprompted

**ALWAYS:**
- Make only requested changes
- Preserve existing patterns
- Ask before refactoring
- Keep solutions minimal

### 8. No Code That Quietly Breaks Production - ABSOLUTE

**Before ANY change:**
- Verify the file exists and read it completely
- Understand the current implementation
- Test the change locally
- Check for breaking changes in dependencies

**NEVER:**
- Guess at file contents or structure
- Make changes without reading the file first
- Assume API compatibility
- Skip testing after changes
- Commit broken code

**Build verification:**
- `npm run build` MUST pass before committing
- NO build warnings (fix them)
- NO console errors in browser
- NO broken links

### 9. No Layering Violations - STRICT HIERARCHY

**Dependency flow (one direction only):**
```
Pages → Layouts → Components → Utilities
```

**NEVER:**
- Import pages into components
- Import components into utilities
- Create circular dependencies
- Bypass layers

**Content collections:**
- Content MUST be accessed via Astro's `getCollection()`
- NO direct file system access to content
- NO parsing Markdown manually

### 10. No Brittle Refactors - SAFETY FIRST

**When refactoring (only when explicitly requested):**
- Change ONE thing at a time
- Run build after each change
- Test affected pages manually
- Verify no regressions

**NEVER:**
- Rename multiple files at once
- Change file structure and code simultaneously
- Refactor dependencies together
- Skip verification steps

**Safe refactoring checklist:**
1. Read all affected files completely
2. Make single, focused change
3. Run `npm run build`
4. Test in browser
5. Verify no console errors
6. Check all pages still load
7. Commit

---

## Content Management Rules

### Project Pages (Markdown)

**Location:** `src/content/projects/[slug].md`

**Required structure:**
```markdown
---
title: "Project Name"
description: "One-line description (max 100 chars)"
status: "In Development" | "Early Prototype" | "Live"
order: 1
---

Optional longer project description here.
```

**Adding new projects:**
1. Create new `.md` file in `src/content/projects/`
2. Use slug naming (lowercase, hyphens)
3. Follow exact front matter schema
4. Increment `order` field appropriately
5. Run build to verify schema validation

**NEVER:**
- Skip required front matter fields
- Use inconsistent status values
- Duplicate order numbers
- Add custom front matter fields without updating schema

---

## Design & Styling Rules

### Tailwind Usage

**Color palette (define in `tailwind.config.mjs`):**
```javascript
colors: {
  'forest-dark': '#2C5530',
  'forest-base': '#3D7C47',
  'forest-light': '#5A9B62',
  'earth-dark': '#4A4238',
  'earth-base': '#6B5D52',
  'moss': '#7B8D5C',
  // Extend as needed
}
```

**Typography scale:**
- Use Tailwind's default scale
- Define custom fonts in config if needed
- NO arbitrary values like `text-[17px]`
- Use semantic sizing (`text-lg`, `text-xl`, etc.)

**Responsive breakpoints:**
- Mobile-first approach ALWAYS
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test all breakpoints before committing

**NEVER:**
- Write custom CSS unless absolutely necessary
- Use `@apply` excessively (defeats Tailwind's purpose)
- Mix inline styles with Tailwind classes
- Ignore responsive design

---

## Performance Rules - NON-NEGOTIABLE

**Requirements:**
- Lighthouse score > 90 (all categories)
- Page load < 2 seconds
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

**Image optimization:**
- Use Astro's `<Image>` component ALWAYS
- Provide explicit width/height
- Use WebP format with fallbacks
- Lazy load below-the-fold images

**JavaScript:**
- Ship ZERO JS by default (Astro's strength)
- Only add client-side JS when absolutely necessary
- Use `client:load`, `client:idle`, or `client:visible` directives appropriately
- NO unnecessary hydration

**NEVER:**
- Import heavy libraries for simple tasks
- Add client-side JS for static content
- Skip image optimization
- Ignore performance budgets

---

## Accessibility Rules - WCAG 2.1 AA MINIMUM

**Required on every component:**
- Semantic HTML elements
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Alt text on all images (decorative images: `alt=""`)
- Color contrast ratio ≥ 4.5:1 for text
- Keyboard navigation support
- Focus indicators visible
- ARIA labels where needed (but prefer semantic HTML)

**Forms MUST have:**
- Associated labels (using `for` attribute)
- Clear error messages
- Keyboard navigable
- Screen reader announcements

**Test with:**
- Keyboard only (tab navigation)
- Screen reader (VoiceOver or NVDA)
- axe DevTools (no violations)

**NEVER:**
- Use divs for buttons (use `<button>`)
- Skip alt text
- Remove focus indicators
- Ignore contrast ratios
- Create keyboard traps

---

## Contact Form Rules

**Implementation:**
- Use Formspree or Vercel's form handling
- NO custom backend
- Include honeypot for spam protection
- Validate on client and server

**Required fields:**
- Name (text input)
- Email (email input with validation)
- Message (textarea)

**Validation:**
- Required field indicators
- Email format validation
- Character limits on textarea
- Clear error messages

**NEVER:**
- Build custom form backend
- Skip spam protection
- Store form data locally
- Expose API keys in client code

---

## Favicon Implementation - COMPLETE PACKAGE

**Required files:**
```
public/
  favicon.ico
  favicon-16x16.png
  favicon-32x32.png
  apple-touch-icon.png (180x180)
  site.webmanifest
```

**Design requirements:**
- Simple mushroom or organic shape
- Recognizable at 16x16
- Forest green primary color
- Works on light and dark backgrounds

**Integration in layout:**
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

---

## Git & Deployment Rules

**Commit messages:**
- Use conventional commits format
- Examples: `feat: add project card component`, `fix: correct navigation spacing`
- NO vague messages like "updates" or "fixes"

**Branch strategy:**
- `main` branch deploys to production automatically via Vercel
- Feature branches for new work
- NO direct commits to main without review

**Before pushing:**
- `npm run build` succeeds
- No TypeScript errors
- No linting errors
- Tested locally in browser

**Vercel configuration:**
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18.x or 20.x

---

## Project Structure - ENFORCE

```
agaric/
├── src/
│   ├── components/        # Reusable UI components
│   ├── content/
│   │   └── projects/      # Project markdown files
│   ├── layouts/           # Page layouts
│   ├── lib/               # Business logic utilities
│   │   ├── projects.ts   # Project transformations
│   │   ├── dates.ts      # Date utilities
│   │   └── validation.ts # Form validation
│   ├── pages/             # Route pages
│   │   ├── index.astro   # Home
│   │   ├── projects.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   └── styles/            # Global styles (minimal)
├── public/                # Static assets (favicon, etc.)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

**NEVER:**
- Create additional top-level directories
- Mix content with components
- Put components in pages directory
- Nest pages more than necessary

---

## What Success Looks Like

**When you've done this right:**
- Another developer can understand the code immediately
- Adding a new project takes < 5 minutes (create markdown file, done)
- Build time is fast (< 30 seconds)
- No surprises in production
- Accessibility audits pass
- Performance metrics are green
- Code review is quick because patterns are consistent

**When you've done this wrong:**
- "I added a helper to make it more flexible"
- "I refactored while I was in there"
- "I thought this would be better"
- "It works on my machine"
- Build succeeds but site is broken
- Accessibility violations appear
- Performance regresses

---

## Final Rules - READ THIS EVERY TIME

1. **ALWAYS** read the file before editing
2. **NEVER** add features not requested
3. **ALWAYS** test the build after changes
4. **NEVER** break existing functionality
5. **ALWAYS** follow established patterns
6. **NEVER** create abstractions prematurely
7. **ALWAYS** prioritize accessibility
8. **NEVER** sacrifice performance for convenience
9. **ALWAYS** write semantic HTML
10. **NEVER** assume—verify

---

## When In Doubt

**Ask yourself:**
1. Was this change explicitly requested?
2. Does this follow existing patterns?
3. Will this break anything?
4. Have I tested it?
5. Is this the simplest solution?

**If any answer is "no" or "I don't know":**
→ STOP and ask for clarification.

---

**Remember:** This is a small, focused website. Keep it simple, keep it fast, keep it accessible. Don't overthink it.
