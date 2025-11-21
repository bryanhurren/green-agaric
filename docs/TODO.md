# Green Agaric - Project TODOs

**Last Updated:** 2025-11-21

> **How to use this file:**
> - Check boxes as tasks complete: `- [x] Task name`
> - Reference relevant documentation for implementation guidance
> - Add context, blockers, or notes under each task
> - Archive completed sections to `docs/archive/TODO-YYYY-MM-DD.md` monthly

---

## Phase 1: Foundation Setup

### Project Initialization
- [ ] Initialize Astro project with Tailwind
  - **Spec:** [docs/specs/architecture.md](specs/architecture.md)
  - **Guide:** n/a (standard Astro setup)
  - **Context:** Use latest Astro 4.x, Node 20.x
  - **Command:** `npm create astro@latest`

- [ ] Configure Tailwind with Green Agaric color palette
  - **Spec:** [docs/specs/styling-guide.md](specs/styling-guide.md)
  - **Reference:** claude.md § Design & Styling Rules
  - **Context:** Forest greens, earth tones, Pacific Northwest aesthetic

- [ ] Set up GitHub repository
  - **Spec:** [docs/specs/deployment.md](specs/deployment.md#git-setup)
  - **Reference:** claude.md § Git & Deployment Rules
  - **Context:** Conventional commits, feature branches

- [ ] Configure Vercel deployment
  - **Spec:** [docs/specs/deployment.md](specs/deployment.md#vercel-configuration)
  - **Reference:** claude.md § Git & Deployment Rules
  - **Context:** Auto-deploy from main branch, greenagaric.com domain

### Project Structure
- [ ] Create base directory structure
  - **Reference:** claude.md § Project Structure
  - **Context:** src/components, src/content, src/layouts, src/lib, src/pages, public

- [ ] Set up content collections schema
  - **Spec:** [docs/specs/content-schema.md](specs/content-schema.md)
  - **Reference:** claude.md § Content Management Rules
  - **Context:** Define Project schema with status, order, etc.

- [ ] Create base layout component
  - **Reference:** claude.md § Consistent Patterns
  - **Context:** Include favicon links, metadata, navigation

### Design System
- [ ] Design favicon (mushroom/organic motif)
  - **Guide:** [docs/guides/favicon-creation.md](guides/favicon-creation.md)
  - **Reference:** claude.md § Favicon Implementation
  - **Context:** Forest green, works at 16x16, light/dark backgrounds

- [ ] Implement favicon package (ico, png variants, manifest)
  - **Guide:** [docs/guides/favicon-creation.md](guides/favicon-creation.md)
  - **Reference:** claude.md § Favicon Implementation
  - **Context:** All required sizes, proper linking in layout

- [ ] Define typography system
  - **Spec:** [docs/specs/styling-guide.md](specs/styling-guide.md#typography)
  - **Context:** Modern, not corporate, readable at all sizes

---

## Phase 2: Core Pages

### Home Page
- [ ] Build hero section with tagline
  - **Spec:** [docs/specs/styling-guide.md](specs/styling-guide.md#hero-patterns)
  - **Reference:** claude.md § Project Identity
  - **Context:** "Ideas Wandering Off Trail"

- [ ] Add studio introduction copy
  - **Content:** Project identity brief
  - **Context:** AI-first, Pacific Northwest, curious tone

### Projects Page
- [ ] Create ProjectCard component
  - **Reference:** claude.md § Consistent Patterns
  - **Context:** Show title, description, status, single-purpose, < 100 lines

- [ ] Implement projects data fetching
  - **Spec:** [docs/specs/content-schema.md](specs/content-schema.md)
  - **Reference:** claude.md § API and Business Logic Separation
  - **Context:** Fetch in page, pass to components as props

- [ ] Create project filtering/sorting utilities
  - **Reference:** claude.md § API and Business Logic Separation
  - **Context:** Business logic in src/lib/projects.ts

- [ ] Add project content (Merchery, Citizenship AI, etc.)
  - **Guide:** [docs/guides/adding-projects.md](guides/adding-projects.md)
  - **Reference:** claude.md § Content Management Rules
  - **Context:** 4 initial projects with status indicators

### About Page
- [ ] Build founder bio section
  - **Content:** Founder role from brief
  - **Context:** Adapted from LinkedIn bio, professional but curious

- [ ] Add studio origins story
  - **Content:** Company description from brief
  - **Context:** November 2025, Seattle, why "Ideas Wandering Off Trail"

### Contact Page
- [ ] Create ContactForm component
  - **Guide:** [docs/guides/form-setup.md](guides/form-setup.md)
  - **Reference:** claude.md § Contact Form Rules
  - **Context:** Name, email, message fields

- [ ] Integrate Formspree or Vercel forms
  - **Guide:** [docs/guides/form-setup.md](guides/form-setup.md)
  - **Reference:** claude.md § Contact Form Rules
  - **Context:** Include honeypot, validation, error handling

- [ ] Add validation utilities
  - **Reference:** claude.md § Modularity
  - **Context:** Email validation in src/lib/validation.ts

### Navigation
- [ ] Create Navigation component
  - **Reference:** claude.md § Consistent Patterns
  - **Context:** Links to all 4 pages, accessible, keyboard navigable

- [ ] Add active page indicator
  - **Spec:** [docs/specs/accessibility.md](specs/accessibility.md#navigation)
  - **Context:** aria-current="page"

---

## Phase 3: Polish & Quality

### Responsive Design
- [ ] Test and fix mobile layout (320px-767px)
  - **Spec:** [docs/specs/styling-guide.md](specs/styling-guide.md#responsive)
  - **Context:** Mobile-first, all breakpoints

- [ ] Test and fix tablet layout (768px-1023px)
  - **Spec:** [docs/specs/styling-guide.md](specs/styling-guide.md#responsive)

- [ ] Test and fix desktop layout (1024px+)
  - **Spec:** [docs/specs/styling-guide.md](specs/styling-guide.md#responsive)

### Accessibility Audit
- [ ] Run axe DevTools scan and fix violations
  - **Spec:** [docs/specs/accessibility.md](specs/accessibility.md)
  - **Reference:** claude.md § Accessibility Rules
  - **Context:** WCAG 2.1 AA minimum, zero violations

- [ ] Keyboard navigation testing
  - **Spec:** [docs/specs/accessibility.md](specs/accessibility.md#keyboard-nav)
  - **Context:** Tab through all interactive elements

- [ ] Screen reader testing (VoiceOver/NVDA)
  - **Spec:** [docs/specs/accessibility.md](specs/accessibility.md#screen-readers)
  - **Context:** All content accessible and logical

- [ ] Color contrast verification
  - **Spec:** [docs/specs/accessibility.md](specs/accessibility.md#color-contrast)
  - **Context:** All text ≥ 4.5:1 ratio

### Performance Optimization
- [ ] Run Lighthouse audit
  - **Reference:** claude.md § Performance Rules
  - **Context:** Target > 90 all categories

- [ ] Optimize images
  - **Reference:** claude.md § Performance Rules
  - **Context:** Use Astro Image component, WebP format

- [ ] Verify zero unnecessary JavaScript
  - **Reference:** claude.md § Performance Rules
  - **Context:** Static by default, hydrate only if needed

- [ ] Test page load times
  - **Reference:** claude.md § Performance Rules
  - **Context:** < 2 seconds, LCP < 2.5s, FID < 100ms, CLS < 0.1

### SEO & Metadata
- [ ] Add page titles and meta descriptions
  - **Context:** Unique for each page, descriptive

- [ ] Configure Open Graph and Twitter Card tags
  - **Context:** Social media sharing previews

- [ ] Generate sitemap.xml
  - **Context:** Astro can auto-generate

- [ ] Create robots.txt
  - **Context:** Allow all

### Cross-Browser Testing
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome

---

## Phase 4: Deployment

### Domain Configuration
- [ ] Configure greenagaric.com in Vercel
  - **Spec:** [docs/specs/deployment.md](specs/deployment.md#domain-setup)
  - **Context:** Add custom domain, verify DNS

- [ ] Verify SSL certificate active
  - **Spec:** [docs/specs/deployment.md](specs/deployment.md#ssl)
  - **Context:** HTTPS enforced

- [ ] Test production deployment
  - **Context:** Verify all pages load, no broken assets

### Final Verification
- [ ] Run complete test plan
  - **Reference:** Project brief § Test Plan
  - **Context:** All checklist items must pass

- [ ] Stakeholder review
  - **Context:** Marketing, engineering, founder approval

- [ ] Launch site
  - **Context:** Merge to main, auto-deploy via Vercel

---

## Backlog / Future Enhancements

- [ ] Add blog or updates section
  - **Context:** Not in initial scope, defer post-launch

- [ ] Implement project detail pages
  - **Context:** Only if projects need more than card description

- [ ] Add analytics (Plausible or Vercel Analytics)
  - **Context:** Privacy-friendly option, optional for v1

- [ ] Create custom 404 page
  - **Context:** Nice to have, not critical

---

## Blocked / Needs Decision

_No blocked items currently_

---

## Completed (Archive monthly)

_No completed items yet_

---

## Notes

- Maintain focus on minimal, clean implementation
- Don't over-engineer - this is a small site
- Follow claude.md rules strictly - no AI drift
- Update this TODO as you work, check off items immediately after completion
- Link new documentation as it's created
