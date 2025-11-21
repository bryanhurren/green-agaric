# ADR-001: Choose Astro as Frontend Framework

**Status:** Accepted
**Date:** 2025-11-21
**Deciders:** Bryan Hurren, Engineering Team

---

## Context

Green Agaric needs a frontend framework for its website that supports:
- Fast page loads (< 2 seconds)
- Minimal JavaScript by default
- Content-focused architecture (projects, about, contact)
- Easy content management (ideally markdown-based)
- Good developer experience
- Modern tooling and TypeScript support

The website is primarily static with limited interactivity (contact form only). Performance and simplicity are more important than rich client-side interactivity.

---

## Decision

We chose **Astro** as the frontend framework for the Green Agaric website.

---

## Alternatives Considered

### Option 1: Next.js (React)
**Pros:**
- Widely adopted, large ecosystem
- Good TypeScript support
- Strong community and documentation
- Flexible rendering (SSR, SSG, ISR)
- Familiar to most developers

**Cons:**
- Ships React by default (unnecessary JavaScript for static content)
- More complex than needed for simple site
- Heavier bundle sizes
- Requires more configuration for optimal performance
- Overkill for content-focused site

### Option 2: Gatsby (React)
**Pros:**
- Static site generation
- GraphQL data layer
- Plugin ecosystem
- Good for content sites

**Cons:**
- Less actively maintained than alternatives
- GraphQL adds complexity for simple use case
- Still ships React hydration bundle
- Build times can be slow
- Steeper learning curve

### Option 3: SvelteKit
**Pros:**
- Excellent performance
- No virtual DOM overhead
- Good developer experience
- Modern architecture
- Smaller bundle sizes than React

**Cons:**
- Smaller ecosystem than React/Next.js
- Less familiar to general developers
- Still ships JavaScript for interactivity
- More than needed for mostly-static site

### Option 4: Astro (Selected)
**Pros:**
- **Zero JavaScript by default** - ships HTML/CSS only
- **Content Collections** - first-class markdown support with type safety
- **Fast by design** - optimized for content sites
- **Framework agnostic** - can use React, Vue, Svelte as needed
- **Island architecture** - hydrate only interactive components
- **Simple** - minimal configuration, focused on content
- **Modern DX** - TypeScript, fast dev server, good docs
- **Perfect fit** - designed exactly for this use case

**Cons:**
- Newer than Next.js (less mature ecosystem)
- Smaller community (but growing rapidly)
- Less suitable for highly interactive apps (not our use case)

---

## Rationale

Astro is **purpose-built for content-focused static sites**, which perfectly matches our requirements:

### 1. Performance
- Ships **zero JavaScript by default** - only HTML/CSS
- Meets performance requirement (< 2s load, LCP < 2.5s) out of the box
- No unnecessary framework overhead
- Lighthouse scores > 90 easily achievable

### 2. Content Management
- **Content Collections** provide type-safe, validated markdown management
- Perfect for our projects showcase (4 markdown files)
- No database needed
- Version controlled content
- Schema validation at build time

### 3. Simplicity
- Minimal configuration needed
- Component syntax is intuitive (like HTML with superpowers)
- No complex state management or routing config
- Matches our "keep it simple" philosophy

### 4. Developer Experience
- TypeScript support built-in
- Fast dev server with HMR
- Clear documentation
- Modern tooling (Vite-based)

### 5. Flexibility
- Can add React/Svelte components later if needed (contact form interactivity)
- Island architecture lets us opt-in to JavaScript only where needed
- Not locked into specific framework ecosystem

### 6. Alignment with Project Philosophy
- **"Ideas Wandering Off Trail"** - Astro is the unconventional choice vs Next.js
- **AI-first studio** - Modern tooling matches modern identity
- **Pacific Northwest aesthetic** - Minimalism reflected in minimal JavaScript

---

## Consequences

### Positive
- ✅ Excellent performance by default
- ✅ Simple architecture (matches claude.md rules)
- ✅ Easy content management (markdown files)
- ✅ Fast builds (< 30 seconds target achievable)
- ✅ Smaller learning curve for content updates
- ✅ Lower hosting costs (static assets only)

### Negative
- ⚠️ Smaller ecosystem than Next.js (fewer plugins/examples)
- ⚠️ Less familiar to some developers (but syntax is simple)
- ⚠️ If we need highly interactive features later, might need to reconsider

### Mitigations
- **Ecosystem size:** Our needs are simple, core features sufficient
- **Familiarity:** Astro syntax is minimal, easy to learn
- **Future interactivity:** Can use Astro islands pattern or add React components selectively

---

## Implementation Notes

### Build Configuration
```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // Static site generation
  site: 'https://greenagaric.com',
});
```

### Content Collections Setup
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['In Development', 'Early Prototype', 'Live', 'Archived']),
    order: z.number(),
  }),
});

export const collections = { projects: projectsCollection };
```

### Deployment
- Static output deploys to Vercel seamlessly
- Build command: `npm run build`
- Output directory: `dist`

---

## Success Metrics

**Performance:**
- Page load < 2 seconds ✓
- Lighthouse score > 90 (all categories) ✓
- Core Web Vitals green ✓

**Developer Experience:**
- Build time < 30 seconds ✓
- Hot reload < 500ms ✓
- Adding new project < 5 minutes ✓

**Maintenance:**
- Content updates require no code changes ✓
- No database to manage ✓
- Version controlled content ✓

---

## Review Date

**Next review:** After 3 months of use (March 2026)

**Trigger for earlier review:**
- Need for complex client-side interactivity
- Performance doesn't meet targets
- Major framework limitations discovered
- Team strongly prefers alternative

---

## References

- **Astro Documentation:** https://docs.astro.build
- **Astro Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **Project Brief:** [Architecture Spec](../specs/architecture.md)
- **Base Rules:** [claude.md](../../claude.md)

---

## Related Decisions

- [ADR-002: Tailwind CSS for Styling](002-tailwind-styling.md)
- [ADR-003: Markdown for Content](003-markdown-content.md)

---

## Appendix: Performance Comparison

**Typical bundle sizes (minimal site):**
- Next.js: ~85 KB JS (gzipped)
- Gatsby: ~100 KB JS (gzipped)
- SvelteKit: ~15 KB JS (gzipped)
- **Astro: 0 KB JS** (our use case)

**Build times (simple 4-page site):**
- Next.js: ~10-20 seconds
- Gatsby: ~20-40 seconds
- SvelteKit: ~5-10 seconds
- **Astro: ~5-10 seconds**

**Lighthouse scores (out of the box):**
- Next.js: 85-95 (requires optimization)
- Gatsby: 85-95 (requires optimization)
- SvelteKit: 90-100
- **Astro: 95-100** (minimal config needed)
