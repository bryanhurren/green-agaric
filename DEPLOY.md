# Green Agaric Deployment Guide

## ✅ Step 1: Generate Favicons (5 minutes)

### Quick Option: RealFaviconGenerator
1. Visit https://realfavicongenerator.net/
2. Upload `public/favicon.svg` (or create a 512x512 PNG)
3. Configure:
   - iOS: Enable, use forest green (#3D7C47) background
   - Android: Enable, use "Green Agaric"
   - Windows: Enable
   - macOS Safari: Enable
4. Click "Generate favicons"
5. Download zip file
6. Extract contents to `/public/` directory
7. Update `site.webmanifest` if needed

### Required Files
After generation, verify these files exist in `/public/`:
- [ ] favicon.ico
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] apple-touch-icon.png
- [ ] favicon-192x192.png (optional, for manifest)
- [ ] favicon-512x512.png (optional, for manifest)

---

## ✅ Step 2: Configure Formspree (2 minutes)

1. Go to https://formspree.io/
2. Sign up (free account works)
3. Create new form
   - Name: "Green Agaric Contact"
   - Email: your email address
4. Copy form ID (looks like: `xpznabcd`)
5. Update `/src/pages/contact.astro` line 19:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Replace `YOUR_FORM_ID` with your actual form ID
6. Save and commit:
   ```bash
   git add src/pages/contact.astro
   git commit -m "feat: configure Formspree form"
   ```

---

## ✅ Step 3: Create GitHub Repository (1 minute)

### Option A: Using GitHub CLI (gh)
```bash
gh repo create green-agaric --public --source=. --remote=origin --push
```

### Option B: Using GitHub Web UI
1. Go to https://github.com/new
2. Repository name: `green-agaric`
3. Description: "Green Agaric website - AI-first product studio"
4. Public repository
5. Don't initialize with README (we have files already)
6. Click "Create repository"
7. Run these commands:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/green-agaric.git
   git branch -M main
   git push -u origin main
   ```

---

## ✅ Step 4: Deploy to Vercel (5 minutes)

### Initial Setup
1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import `green-agaric` repository
5. Configure build settings:
   - **Framework Preset:** Astro (should auto-detect)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)
6. Click "Deploy"
7. Wait 2-3 minutes for first deployment

### Verify Deployment
- Click the deployment URL (e.g., `green-agaric.vercel.app`)
- Test all pages: Home, Projects, About, Contact
- Verify navigation works
- Test form submission (should redirect to Formspree)

---

## ✅ Step 5: Configure Custom Domain (5 minutes)

### In Vercel
1. Go to project settings
2. Click "Domains" tab
3. Click "Add Domain"
4. Enter: `greenagaric.com`
5. Vercel will provide DNS records

### Update Your Domain Registrar
Add these DNS records (values from Vercel):

**For apex domain (greenagaric.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)
- TTL: 3600

**For www subdomain (www.greenagaric.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 3600

### DNS Propagation
- Changes take 5 minutes to 24 hours
- Check status: https://dnschecker.org/
- Vercel will auto-configure SSL certificate

### Configure Redirect (Optional)
In Vercel, set www → non-www redirect:
1. Settings → Domains
2. Find `www.greenagaric.com`
3. Click "..." → "Redirect to greenagaric.com"

---

## 🎯 Post-Deployment Checklist

### Immediate Testing
- [ ] Visit https://greenagaric.com
- [ ] Test all navigation links
- [ ] Test form submission
- [ ] Check mobile responsiveness
- [ ] Verify favicon appears in browser tab

### Performance & Quality
- [ ] Run Lighthouse audit (target: >90 all categories)
- [ ] Run axe DevTools accessibility scan
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Check page load speed

### SEO & Analytics (Optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Vercel Analytics (or Plausible)
- [ ] Verify Open Graph tags (share on social media)
- [ ] Set up monitoring (Vercel auto-monitors)

---

## 🚨 Troubleshooting

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Ensure all dependencies in package.json
- Check Node.js version (should use 18.x or 20.x)

### Domain Not Resolving
- Wait 1-2 hours for DNS propagation
- Verify DNS records at registrar
- Check https://dnschecker.org/
- Ensure SSL is "Active" in Vercel

### Form Not Working
- Verify Formspree form ID is correct
- Check Formspree dashboard for submissions
- Ensure form action URL is complete
- Test form directly on Formspree

### Favicon Not Showing
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
- Clear browser cache
- Verify files exist in /public/
- Check browser dev tools Network tab

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Astro Docs:** https://docs.astro.build
- **Formspree Docs:** https://help.formspree.io/
- **DNS Help:** https://vercel.com/docs/concepts/projects/domains

---

## ✅ Success Criteria

Deployment is complete when:
- ✅ greenagaric.com loads successfully
- ✅ All 4 pages accessible
- ✅ Navigation works
- ✅ Contact form submits to email
- ✅ Favicon displays in browser
- ✅ Mobile responsive
- ✅ HTTPS active
- ✅ Lighthouse score >85

---

**Estimated total time:** 15-20 minutes
**Difficulty:** Easy (mostly clicking through UIs)
