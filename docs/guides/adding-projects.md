# Guide: Adding New Projects

**Purpose:** Step-by-step instructions for adding new projects to the Green Agaric website
**Base Reference:** [claude.md § Content Management](../../claude.md#content-management-rules)
**Schema Reference:** [specs/content-schema.md](../specs/content-schema.md)

---

## Overview

This guide walks through adding a new project to the website. Projects appear on the Projects page and optionally on the homepage if featured.

**Time required:** ~5 minutes
**Prerequisites:** Basic markdown knowledge, text editor

---

## Step-by-Step Instructions

### Step 1: Create the Project File

Navigate to the projects directory:
```bash
cd src/content/projects/
```

Create a new markdown file using slug naming (lowercase with hyphens):
```bash
touch my-new-project.md
```

**Naming rules:**
- Use lowercase letters
- Separate words with hyphens
- No spaces or special characters
- Keep it short but descriptive
- Examples: `merchery.md`, `citizenship-ai.md`, `ai-dev-tools.md`

---

### Step 2: Add Front Matter

Open the file and add the required front matter:

```markdown
---
title: "My New Project"
description: "Brief one-line description under 100 characters"
status: "In Development"
order: 5
featured: false
---
```

**Fill in each field:**

#### title
- **Required:** Yes
- **Max:** 60 characters
- **Format:** Title case
- **Example:** "Merchery", "Citizenship AI"

#### description
- **Required:** Yes
- **Max:** 100 characters (including spaces)
- **Format:** Sentence case, no ending period
- **Purpose:** Shows on project cards
- **Example:** "Direct-to-fan tools for independent musicians"

#### status
- **Required:** Yes
- **Options:**
  - `"In Development"` - Actively building
  - `"Early Prototype"` - Proof of concept
  - `"Live"` - Deployed and accessible
  - `"Archived"` - Historical, not shown on site
- **Important:** Must match exactly (case-sensitive)

#### order
- **Required:** Yes
- **Type:** Positive integer (1, 2, 3...)
- **Purpose:** Controls display sequence (lowest first)
- **Rule:** Check existing projects, use next available number
- **Check current projects:**
  ```bash
  grep "^order:" src/content/projects/*.md
  ```

#### featured (optional)
- **Required:** No
- **Default:** false
- **Type:** Boolean (true/false)
- **Purpose:** Shows on homepage
- **Limit:** Maximum 3 featured projects
- **Check current featured count:**
  ```bash
  grep "featured: true" src/content/projects/*.md | wc -l
  ```

#### link (optional)
- **Required:** No
- **Type:** Valid URL
- **Purpose:** External link to demo, docs, or live site
- **Format:** Must include protocol (https://)
- **Example:** `link: "https://merchery.app"`

---

### Step 3: Add Optional Body Content

Below the front matter, add extended description (optional):

```markdown
---
title: "My New Project"
description: "Brief one-line description under 100 characters"
status: "In Development"
order: 5
featured: false
---

## Extended Description

Longer description of the project here. This is optional but can provide
additional context that doesn't fit in the 100-character limit above.

**Key Features:**
- Feature one
- Feature two
- Feature three

This content supports markdown formatting:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `Code snippets`
```

**Body content tips:**
- Keep it concise (< 200 words)
- Use markdown formatting
- Bullet points for features
- Link externally for detailed docs
- No embedded media (images, videos) - keep it lightweight

---

### Step 4: Validate the Schema

Run the build command to validate:

```bash
npm run build
```

**If successful:**
```
✓ Content collections built successfully
```

**If errors:**
```
[ERROR] [projects] my-new-project.md frontmatter does not match collection schema.
  - "description" is too long (120 characters, max 100)
```

Common validation errors:
- **Description too long:** Trim to 100 characters or less
- **Invalid status value:** Must match enum exactly
- **Invalid URL format:** Add https:// protocol
- **Missing required field:** Add title, description, status, or order
- **Wrong field type:** Check order is number, featured is boolean

Fix errors and re-run build until successful.

---

### Step 5: Preview Locally

Start the dev server:
```bash
npm run dev
```

Navigate to `http://localhost:4321/projects` and verify:
- [ ] Project appears in list
- [ ] Title displays correctly
- [ ] Description displays correctly
- [ ] Status indicator shows
- [ ] Order is correct (sorted properly)
- [ ] If featured=true, appears on homepage

---

### Step 6: Commit Changes

Once validated and previewed:

```bash
git add src/content/projects/my-new-project.md
git commit -m "feat: add my-new-project to projects collection"
git push
```

**Commit message format:**
- Use conventional commits: `feat:`, `fix:`, `docs:`
- Be descriptive but concise
- Example: `feat: add Merchery project to collection`

---

## Complete Example

```markdown
---
title: "Merchery"
description: "Direct-to-fan tools for independent musicians"
status: "In Development"
order: 1
link: "https://merchery.app"
featured: true
---

Merchery helps independent artists build meaningful communities through
direct-to-fan merchandise and engagement tools.

**Key Features:**
- Custom merch generation
- Fan community management
- Direct sales integration
- Artist analytics dashboard

Built with modern AI systems to help artists focus on creativity while
automating community engagement.
```

---

## Updating Existing Projects

### Change Status
1. Open the project file
2. Update the `status` field
3. Run `npm run build` to validate
4. Commit with message: `fix: update [project] status to [status]`

### Change Order
1. Decide new display sequence
2. Update `order` values (may need to update multiple files)
3. Ensure no duplicate order numbers
4. Run `npm run build` to validate
5. Preview to verify correct order
6. Commit with message: `fix: reorder projects`

### Feature/Unfeature
1. Update `featured` field (true/false)
2. Verify no more than 3 featured projects total
3. Run `npm run build` to validate
4. Preview homepage to verify
5. Commit with message: `feat: feature [project] on homepage`

### Archive Project
1. Change `status` to `"Archived"`
2. Set `featured` to `false`
3. Run build and preview (should not appear on site)
4. Commit with message: `fix: archive [project]`

---

## Troubleshooting

### Project not appearing on projects page
**Possible causes:**
- Status is "Archived" - only active statuses show
- File not in `src/content/projects/` directory
- Build failed with validation errors
- Filtering logic excludes it

**Solutions:**
1. Check file location
2. Verify status is not "Archived"
3. Run build and check for errors
4. Review `src/lib/projects.ts` filtering logic

### Order seems wrong
**Possible causes:**
- Duplicate order numbers
- Gaps in order sequence
- Caching issue in dev server

**Solutions:**
1. List all order values: `grep "^order:" src/content/projects/*.md`
2. Ensure sequential (1, 2, 3, 4...) or at least unique
3. Restart dev server
4. Clear browser cache

### Build fails with schema error
**Possible causes:**
- Missing required field
- Field type mismatch
- String too long
- Invalid enum value
- Invalid URL format

**Solutions:**
1. Read error message carefully
2. Check field requirements in [specs/content-schema.md](../specs/content-schema.md)
3. Verify exact spelling of enum values
4. Count characters in title/description
5. Test URL format includes protocol

### Featured project not on homepage
**Possible causes:**
- `featured` is false
- Homepage component not fetching featured projects
- More than 3 featured projects (might be filtered)

**Solutions:**
1. Verify `featured: true` in front matter
2. Check homepage implementation in `src/pages/index.astro`
3. Count total featured projects, ensure ≤ 3
4. Check console for JavaScript errors

---

## Best Practices

### Descriptions
- **Be concise:** Use all 100 characters if needed, but no more
- **Action-oriented:** Focus on what the project does
- **Avoid jargon:** Write for general audience
- **No redundancy:** Don't repeat the title in description

**Examples:**
- ✓ "Direct-to-fan tools for independent musicians"
- ✗ "A tool for musicians to do direct-to-fan sales" (wordy)
- ✗ "Merchery is a platform for selling merchandise" (repeats title)

### Status Selection
- **Be honest:** "Early Prototype" is better than overselling
- **Update regularly:** Change status as project evolves
- **Archive when done:** Don't leave inactive projects as "In Development"

### Ordering
- **Feature first:** Featured projects get lower order numbers (1-3)
- **Priority next:** Active projects before prototypes
- **Consistent logic:** Maintain a clear ordering strategy

### Featured Projects
- **Limit to 3:** More than 3 dilutes focus
- **Update seasonally:** Rotate featured projects quarterly
- **Balance status:** Mix of Live and In Development shows progress

---

## References

- **Schema specification:** [specs/content-schema.md](../specs/content-schema.md)
- **Base rules:** [claude.md § Content Management](../../claude.md#content-management-rules)
- **Architecture:** [specs/architecture.md](../specs/architecture.md)
- **Astro Content Collections Docs:** https://docs.astro.build/en/guides/content-collections/
