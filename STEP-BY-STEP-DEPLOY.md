# Green Agaric - Step-by-Step Deployment Instructions

## 🎯 Overview
You'll complete 3 main tasks:
1. **Formspree** - Contact form backend (2 minutes)
2. **Vercel** - Website hosting (5 minutes)
3. **Domain** - Point greenagaric.com to your site (5 minutes)

Total time: ~12 minutes

---

# STEP 1: Set Up Formspree Contact Form

## 1.1 Create Formspree Account

**Action:** Open your browser and go to:
```
https://formspree.io/
```

**What you'll see:** Formspree homepage

**Click:** The blue "Get Started" button (top right)

---

## 1.2 Sign Up

**Choose one:**
- Click "Sign up with GitHub" (recommended - faster)
- Or enter email and create password

**If using GitHub:**
- Click "Authorize formspree"
- You'll be redirected back to Formspree

**Result:** You're now logged into Formspree dashboard

---

## 1.3 Create Your First Form

**What you'll see:** "Create your first form" page

**Fill in:**
- **Form Name:** `Green Agaric Contact`
- **Your Email:** `your-email@example.com` (where you want to receive messages)

**Click:** "Create Form" button

---

## 1.4 Get Your Form ID

**What you'll see:** Form settings page

**Look for:**
```
Form Endpoint
https://formspree.io/f/XXXXXXXX
```

**The part after `/f/` is your Form ID**

Example: If you see `https://formspree.io/f/xpznabcd`, your form ID is `xpznabcd`

**Copy this ID** - you'll need it in the next step

---

## 1.5 Configure Form Settings (Optional but Recommended)

**In the form settings, you can:**

1. **reCAPTCHA (Recommended):**
   - Scroll to "reCAPTCHA"
   - Toggle ON
   - This prevents spam

2. **Custom Thank You Page:**
   - Scroll to "Redirect After Submit"
   - Enter: `https://greenagaric.com/` (redirects to homepage after submission)

3. **Email Notifications:**
   - Already enabled by default
   - You'll get an email whenever someone submits the form

**Click:** "Save" if you made changes

---

## 1.6 Update Your Website Code

**Come back to your terminal and tell me:**
```
"My Formspree form ID is: xpznabcd"
```
(Replace with your actual ID)

I'll update the code and push the change for you.

---

# STEP 2: Deploy to Vercel

## 2.1 Go to Vercel

**Action:** Open your browser and go to:
```
https://vercel.com/
```

**What you'll see:** Vercel homepage

---

## 2.2 Sign Up / Sign In

**Click:** "Sign Up" button (top right)

**Choose:** "Continue with GitHub" (recommended)

**Authorize:**
- Click "Authorize Vercel"
- You'll be redirected back to Vercel

**Result:** You're now in your Vercel dashboard

---

## 2.3 Import Your Project

**What you'll see:** Vercel dashboard (may show onboarding)

**Click:** "Add New..." button (top right)

**Select:** "Project" from dropdown

**What you'll see:** "Import Git Repository" page

---

## 2.4 Find Your Repository

**Look for:** Your GitHub repositories list

**Find:** `bryanhurren/green-agaric`

**Click:** "Import" button next to it

**If you don't see it:**
- Click "Adjust GitHub App Permissions"
- Select your repositories or "All repositories"
- Click "Save"
- Go back and find `green-agaric`

---

## 2.5 Configure Project

**What you'll see:** "Configure Project" page

**Check these settings (should be auto-detected):**

```
Framework Preset: Astro
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**If Astro isn't detected:**
- Click "Framework Preset" dropdown
- Select "Astro"

**Environment Variables:** Leave empty (none needed for now)

**Click:** Big blue "Deploy" button

---

## 2.6 Wait for Deployment

**What you'll see:** Deployment progress screen

**You'll see:**
1. "Building..." with a progress indicator
2. Running `npm install`
3. Running `npm run build`
4. Deploying to Vercel's edge network

**Wait:** 2-3 minutes (first deploy takes longer)

**Look for:**
```
🎉 Congratulations!
Your project has been deployed
```

---

## 2.7 Test Your Site

**What you'll see:** Deployment success page

**Look for:** Your deployment URL
```
https://green-agaric.vercel.app
```
or
```
https://green-agaric-[random].vercel.app
```

**Click:** "Visit" button or the URL

**Test these pages:**
- Homepage: Should show "Green Agaric" hero
- Click "Projects": Should show 4 project cards
- Click "About": Should show founder bio
- Click "Contact": Should show form

**Try the form:**
- Fill out name, email, message
- Click "Send Message"
- Should redirect to Formspree confirmation (or your custom redirect)
- Check your email for the form submission

**If everything works:** ✅ Your site is live!

---

# STEP 3: Connect Custom Domain (greenagaric.com)

## 3.1 Add Domain in Vercel

**Go to:** Your Vercel dashboard

**Click:** Your `green-agaric` project

**Click:** "Settings" tab (top navigation)

**Click:** "Domains" in the left sidebar

---

## 3.2 Add Your Domain

**What you'll see:** "Domains" settings page

**Find:** Input field that says "example.com"

**Type:** `greenagaric.com`

**Click:** "Add" button

---

## 3.3 Get DNS Instructions

**What you'll see:** Domain configuration page showing:

```
⚠️ Invalid Configuration
```

**Vercel will show you DNS records to add:**

**For Apex Domain (greenagaric.com):**
```
Type:  A
Name:  @
Value: 76.76.21.21
```

**For WWW Subdomain (www.greenagaric.com):**
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
```

**Keep this tab open** - you'll need these values

---

## 3.4 Configure DNS at Your Domain Registrar

**Action:** Figure out where you registered greenagaric.com

Common registrars:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare
- Hover
- Name.com

**Log in to your domain registrar**

---

## 3.5 Find DNS Settings

**Look for one of these menu items:**
- "DNS Settings"
- "DNS Management"
- "Nameservers"
- "Advanced DNS"
- "Domain Settings"

**Common locations by registrar:**

**Namecheap:**
1. Dashboard → Domain List
2. Click "Manage" next to greenagaric.com
3. Click "Advanced DNS" tab

**GoDaddy:**
1. My Products → Domains
2. Click "DNS" next to greenagaric.com

**Google Domains:**
1. My domains → greenagaric.com
2. Click "DNS" in left sidebar

**Cloudflare:**
1. Select greenagaric.com
2. Click "DNS" tab

---

## 3.6 Add DNS Records

### Add the A Record (for greenagaric.com)

**Click:** "Add New Record" or "Add Record" button

**Fill in:**
```
Type:  A
Host:  @ (or leave blank, or "greenagaric.com")
Value: 76.76.21.21
TTL:   Automatic (or 3600 or 1 hour)
```

**Click:** "Save" or "Add Record"

---

### Add the CNAME Record (for www.greenagaric.com)

**Click:** "Add New Record" or "Add Record" button again

**Fill in:**
```
Type:  CNAME
Host:  www
Value: cname.vercel-dns.com
TTL:   Automatic (or 3600 or 1 hour)
```

**Click:** "Save" or "Add Record"

---

### Remove Conflicting Records (if needed)

**Look for existing records that might conflict:**
- Old A records pointing to different IPs
- Old CNAME records for @ or www
- URL redirects or forwarding rules

**Delete them** if they point to old hosting

---

## 3.7 Wait for DNS Propagation

**Go back to Vercel** (the tab you left open)

**What you'll see:**
- May still show "Invalid Configuration" (this is normal)

**Wait:** 5-60 minutes for DNS to propagate

**Vercel will automatically:**
1. Detect the DNS changes
2. Issue an SSL certificate
3. Enable HTTPS
4. Change status to "Valid Configuration ✓"

**Refresh the Vercel page** every few minutes to check

---

## 3.8 Check DNS Propagation Status

**While waiting, check propagation:**

**Go to:** https://dnschecker.org/

**Enter:** `greenagaric.com`

**Select:** "A" record type

**Click:** "Search"

**What to look for:**
- Green checkmarks from multiple locations
- IP address showing: `76.76.21.21`

**If you see red X's:** DNS hasn't propagated yet (wait more)

**If you see green checks:** DNS is working!

---

## 3.9 Test Your Custom Domain

**Try these URLs in your browser:**

```
https://greenagaric.com
```
Should load your homepage

```
https://www.greenagaric.com
```
Should also work (Vercel handles www automatically)

**Check for:**
- ✅ Green padlock icon (HTTPS is working)
- ✅ Homepage loads correctly
- ✅ All pages work (Projects, About, Contact)
- ✅ No certificate warnings

---

## 3.10 Configure WWW Redirect (Optional)

**In Vercel:**

**Go to:** Settings → Domains

**Find:** `www.greenagaric.com` in the domains list

**Click:** Three dots menu (•••) next to it

**Select:** "Redirect to greenagaric.com"

**Result:** www automatically redirects to non-www version

---

# ✅ Deployment Complete!

## Final Checklist

Go through each of these:

### Website Works
- [ ] Visit https://greenagaric.com
- [ ] Homepage displays correctly
- [ ] Navigation works (Home, Projects, About, Contact)
- [ ] All 4 pages load
- [ ] Projects page shows 4 project cards
- [ ] About page shows founder bio
- [ ] Contact form displays

### Form Works
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Receive confirmation
- [ ] Email arrives in your inbox

### Domain & SSL
- [ ] greenagaric.com loads (no www)
- [ ] www.greenagaric.com works
- [ ] Green padlock shows (HTTPS)
- [ ] No certificate warnings
- [ ] Vercel shows "Valid Configuration ✓"

### Mobile
- [ ] Open site on phone
- [ ] Pages display correctly
- [ ] Navigation works on mobile
- [ ] Form works on mobile

---

# 🎉 You're Live!

Your Green Agaric website is now:
- ✅ Live at https://greenagaric.com
- ✅ Secure (HTTPS)
- ✅ Fast (Vercel edge network)
- ✅ Form working (Formspree)
- ✅ Ready for visitors

---

# 📞 Troubleshooting

## Form Isn't Working

**Problem:** Form submission fails or doesn't send email

**Solutions:**
1. Check Formspree dashboard for submissions
2. Verify form ID is correct in code
3. Check spam folder for form emails
4. Try submitting directly from Formspree dashboard (test mode)

## Domain Not Working

**Problem:** greenagaric.com shows error or doesn't load

**Solutions:**
1. Wait longer (DNS can take up to 24 hours)
2. Check DNS records at registrar (make sure A and CNAME are correct)
3. Use https://dnschecker.org/ to verify propagation
4. Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+F5 on Windows)
5. Try incognito/private browsing mode

## SSL Certificate Issues

**Problem:** "Not secure" warning or certificate error

**Solutions:**
1. Wait 10-15 minutes after DNS propagates
2. Vercel auto-issues SSL certificates (be patient)
3. Check Vercel dashboard - should show SSL status
4. Try hard refresh (Ctrl+Shift+R)

## Build Failed on Vercel

**Problem:** Deployment shows red X or "Build failed"

**Solutions:**
1. Click into the failed deployment
2. Read the build logs (scroll to first error)
3. Common issues:
   - Missing dependency: Run `npm install` locally
   - TypeScript error: Run `npm run build` locally to see error
   - Wrong Node version: Set to 18.x in Vercel settings
4. Fix locally, commit, and push - Vercel auto-deploys

## Can't Find Repository in Vercel

**Problem:** green-agaric repo doesn't show up in Vercel

**Solutions:**
1. Click "Adjust GitHub App Permissions"
2. Select "All repositories" or manually select green-agaric
3. Click "Save" and go back
4. Repository should now appear

---

# 🚀 Next Steps (Optional)

After your site is live, consider:

1. **Analytics**
   - Enable Vercel Analytics (Settings → Analytics → Enable)
   - Or add Plausible/Fathom for privacy-friendly analytics

2. **Performance**
   - Run Lighthouse audit (Chrome DevTools)
   - Target: >90 score in all categories
   - Fix any issues found

3. **SEO**
   - Submit sitemap to Google Search Console
   - Add Google Analytics (optional)
   - Share on social media (test Open Graph tags)

4. **Monitoring**
   - Vercel automatically monitors uptime
   - Set up email alerts in Vercel settings
   - Monitor Formspree for spam submissions

5. **Improvements**
   - Generate proper PNG favicons (use RealFaviconGenerator.net)
   - Add more content to About page
   - Add project images to project cards
   - Write blog posts or updates

---

**Need help?** Run into issues? Let me know what step you're on and what error you're seeing!
