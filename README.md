# ✏️ Renu K G — Art Portfolio Website

A personal art portfolio website to showcase pencil sketches and pen artworks. Built with plain HTML, CSS, and JavaScript — no complicated tools required. Just open the files and start customising.

---

## Table of Contents

1. [What This Website Includes](#1-what-this-website-includes)
2. [Project Folder Structure](#2-project-folder-structure)
3. [How to Run the Website Locally](#3-how-to-run-the-website-locally)
4. [How to Edit Your Profile Information](#4-how-to-edit-your-profile-information)
5. [How to Replace Your Profile Image](#5-how-to-replace-your-profile-image)
6. [How to Add New Artworks](#6-how-to-add-new-artworks)
7. [How to Edit Artwork Descriptions](#7-how-to-edit-artwork-descriptions)
8. [How to Change Featured Artworks](#8-how-to-change-featured-artworks)
9. [How to Change Social Links](#9-how-to-change-social-links)
10. [How to Customise Colors and Fonts](#10-how-to-customise-colors-and-fonts)
11. [How to Set Up the Contact Form](#11-how-to-set-up-the-contact-form)
12. [How to Set Up Analytics](#12-how-to-set-up-analytics)
13. [How to Deploy on GitHub Pages](#13-how-to-deploy-on-github-pages)
14. [How to Deploy on Netlify](#14-how-to-deploy-on-netlify)
15. [How to Update the Website After Making Changes](#15-how-to-update-the-website-after-making-changes)
16. [Troubleshooting](#16-troubleshooting)
17. [Frequently Asked Questions](#17-frequently-asked-questions)

---

## 1. What This Website Includes

- **Home page** — Your name, photo, introduction, and a few featured artworks
- **Gallery page** — All artworks displayed in a Pinterest-style masonry grid
- **Contact page** — A form where visitors can send you messages
- **Dark / Light mode** — Toggle between dark and light themes
- **Lightbox** — Click any artwork to view it fullscreen with title, medium, year, and description
- **Smooth animations** — Images fade in as you scroll
- **Mobile-friendly** — Works on phones, tablets, and desktops
- **Google Analytics** — (Optional) Track how many people visit your site
- **Accessibility** — Screen reader friendly, keyboard navigable

---

## 2. Project Folder Structure

```
myArtGallery/
│
├── index.html          ← Home page
├── gallery.html        ← Gallery page
├── contact.html        ← Contact page
├── artworks.json       ← YOUR ARTWORK DATA — edit this to add/update artworks
├── README.md           ← This file
│
├── css/
│   ├── style.css       ← Colors, fonts, layout
│   ├── nav.css         ← Navigation bar
│   ├── hero.css        ← Home page hero section
│   ├── gallery.css     ← Gallery grid and lightbox
│   └── contact.css     ← Contact form styles
│
├── js/
│   ├── theme.js        ← Dark/light mode toggle
│   ├── nav.js          ← Navigation (mobile menu, scroll)
│   ├── animations.js   ← Scroll-reveal animations
│   ├── home.js         ← Featured artworks on home page
│   ├── gallery.js      ← Gallery grid and lightbox logic
│   └── analytics.js    ← Google Analytics (optional)
│
└── images/
    ├── profile.jpg     ← Your profile photo
    ├── artwork-01.jpg  ← Artwork images
    ├── artwork-02.jpg
    └── ...
```

> **The most important file is `artworks.json`.** Almost everything in the gallery — images, titles, descriptions, categories, featured status — is controlled from this single file.

---

## 3. How to Run the Website Locally

> **Important:** You cannot open the HTML files directly by double-clicking them. The gallery uses a feature (`fetch`) that requires the site to be served through a small local server.

**The easiest way — using Node.js:**

1. Make sure Node.js is installed. Check by opening a terminal and typing:
   ```
   node --version
   ```
   If you see a version number (e.g. `v20.x.x`), you are good. If not, download it from [nodejs.org](https://nodejs.org).

2. Open a terminal in the `myArtGallery` folder.

3. Run this command:
   ```bash
   npx serve .
   ```

4. Open your browser and go to: `http://localhost:3000`

**Alternative — using Python:**
```bash
python -m http.server 8080
```
Then open: `http://localhost:8080`

**Alternative — VS Code Live Server:**
If you use VS Code, install the "Live Server" extension. Right-click `index.html` → "Open with Live Server".

---

## 4. How to Edit Your Profile Information

Your name, tagline, introduction text, and location appear in three places. Here is where to edit each one:

### Name in the navigation bar and page title

Open `index.html`, `gallery.html`, and `contact.html` in a text editor (VS Code recommended).

In each file, search for `Renu K G` and update it wherever it appears. Specifically:
- The `<title>` tag near the top
- The `<span class="logo-text">` inside the navigation
- Meta description and Open Graph tags

### Hero section (Home page only)

Open `index.html`. Find the hero section (search for `hero-content`). Update:

```html
<!-- Your eyebrow text (small label above your name) -->
<p class="hero-eyebrow">CSE Student &amp; Pencil · Pen Artist</p>

<!-- Your name -->
<h1 class="hero-title">
  Renu <span class="hero-title-line accent">K G</span>
</h1>

<!-- Your tagline -->
<p class="hero-subtitle">Capturing emotions and moments — one stroke at a time.</p>

<!-- Your introduction paragraph -->
<p class="hero-description">
  Hi! I'm Renu K G, a Computer Science Engineering student ...
</p>
```

### About section (below the hero on the Home page)

Find the section with `class="about-teaser"` in `index.html`. Update the paragraph inside `about-teaser-text`:

```html
<p class="about-teaser-text" data-reveal>
  I'm a Computer Science Engineering student from Davanagere...
</p>
```

The quote `"Every blank page is a universe waiting to remember itself."` can also be customized.

### Footer (appears on all pages)

Each page has a footer. Search for `footer-logo` in each HTML file and update the name and tagline:

```html
<span class="footer-logo">Renu K G</span>
<p class="footer-tagline">Computer Science Engineering Student • Pencil & Pen Artist</p>
```

Also update the email and location in the footer contact section:

```html
<a href="mailto:kgrenu1@gmail.com">kgrenu1@gmail.com</a>
<span>Davanagere, Karnataka, India</span>
```

---

## 5. How to Replace Your Profile Image

1. Take a photo or choose an image you want to use as your profile picture.

2. Rename the file to `profile2.png` or `profile.jpg`.

3. Copy it into the `images/` folder, replacing the existing profile picture.

4. Make sure the filename in `index.html` matches (`images/profile2.png` or `images/profile.jpg`).


> **Tips for the best result:**
> - Use a square or portrait-orientation image (taller than wide works best)
> - Resolution: at least 800 × 800 pixels
> - File size: keep it under 500 KB for fast loading (use [squoosh.app](https://squoosh.app) to compress)
> - Format: JPEG is best for photographs

---

## 6. How to Add New Artworks

Adding a new artwork is a two-step process. **You do not need to touch any HTML or JavaScript.**

### Step 1 — Copy your image to the `images/` folder

Name the file something descriptive, like `my-new-artwork.jpg` or follow the numbered pattern `artwork-13.jpg`.

Recommended image settings:
- Format: JPEG
- Width: 1200–2400 pixels
- File size: under 1.5 MB for fast loading

### Step 2 — Add an entry to `artworks.json`

Open `artworks.json` in a text editor. You will see a list of artwork objects inside `[ ]`. Add a new entry to the list following this format:

```json
{
  "id": 13,
  "title": "Name of Your Artwork",
  "image": "images/my-new-artwork.jpg",
  "medium": "Pencil Sketch",
  "category": "portrait",
  "year": 2025,
  "featured": false,
  "description": "Write a description of your artwork here. Talk about the technique, inspiration, or any story behind it."
}
```

> **Important:** Make sure to add a comma after the closing `}` of the previous artwork, but NOT after the last entry in the list.

**Field guide:**

| Field | What it is | Example |
|---|---|---|
| `id` | A unique number. Use the next number in sequence. | `13` |
| `title` | The artwork's name | `"Whispering Winds"` |
| `image` | The path to the image file | `"images/artwork-13.jpg"` |
| `medium` | How it was made | `"Pencil Sketch"` or `"Fineliner Pen"` |
| `category` | Used to label the artwork in the lightbox | see table below |
| `year` | The year it was created | `2025` |
| `featured` | Show it on the home page? | `true` or `false` |
| `description` | Full description shown in the lightbox | Any text |

**Category values:**

| Value | What it means |
|---|---|
| `pencil` | Pencil sketch artwork |
| `pen` | Pen/ink artwork |
| `portrait` | A portrait drawing |
| `nature` | Nature scene |
| `animal` | Animal drawing |
| `other` | Anything else |

After saving `artworks.json`, refresh the browser — your artwork appears in the gallery automatically.

---

## 7. How to Edit Artwork Descriptions

All artwork descriptions are in `artworks.json`. 

1. Open `artworks.json`
2. Find the artwork by its `"title"` field
3. Update the `"description"` field
4. Save the file
5. Refresh the browser

Example:
```json
"description": "A detailed pencil sketch of an oak tree in winter..."
```

---

## 8. How to Change Featured Artworks

Featured artworks appear on the **Home page** in the "Featured Works" section.

To feature an artwork:
1. Open `artworks.json`
2. Find the artwork you want to feature
3. Change `"featured": false` to `"featured": true`

To un-feature an artwork:
1. Change `"featured": true` to `"featured": false`

**Recommendation:** Keep 3–6 artworks featured at most for the best home page layout.

---

## 9. How to Change Social Links

Social links appear in three places: the hero section (Home page), the footer (all pages), and the Contact page.

To update a link, open the file and search for the platform name (e.g. `github.com/renu-kg`) and replace the URL.

**Current links:**
| Platform | Current URL | Where to change |
|---|---|---|
| GitHub | `https://github.com/renu-kg` | `index.html`, `gallery.html`, `contact.html` |
| LinkedIn | `https://www.linkedin.com/in/renu-k-g-9aaa152a6/` | Same files |
| Pinterest | `https://pin.it/g6fN6bqMo` | Same files |

To add a new platform (e.g. Instagram), copy an existing social link block and update the `href`, `aria-label`, and the SVG icon. Free SVG icons for social platforms can be found at [simpleicons.org](https://simpleicons.org).

---

## 10. How to Customise Colors and Fonts

### Changing the Accent Color

The accent color (currently a warm amber/gold) is used for highlighted text, hover effects, and buttons.

Open `css/style.css` and find the `:root` section near the top. Update these values:

```css
:root {
  /* Dark theme accent */
  --color-accent:       hsl(35, 82%, 56%);   /* ← change this */
  --color-accent-hover: hsl(35, 82%, 48%);   /* slightly darker */
}

[data-theme="light"] {
  /* Light theme accent (usually darker for contrast) */
  --color-accent:       hsl(35, 82%, 42%);   /* ← and this */
  --color-accent-hover: hsl(35, 82%, 35%);
}
```

Colors use HSL format: `hsl(hue, saturation%, lightness%)`
- Hue 0 = red, 120 = green, 240 = blue, 35 = amber/gold

### Changing the Background Color

In `css/style.css`, under `:root`:
```css
--color-bg: hsl(220, 16%, 7%);   /* Dark background */
```

Under `[data-theme="light"]`:
```css
--color-bg: hsl(40, 25%, 98%);   /* Light background */
```

### Changing Fonts

The website uses two Google Fonts: **Cormorant Garamond** (headings) and **Inter** (body text).

To change them:
1. Go to [fonts.google.com](https://fonts.google.com) and pick your fonts
2. Open `css/style.css`
3. Find the `@import url(...)` line near the top and update it
4. Update the font variables:

```css
--font-display: 'Your Heading Font', Georgia, serif;
--font-body:    'Your Body Font', system-ui, sans-serif;
```

---

## 11. How to Set Up the Contact Form

By default, the contact form does not send emails anywhere — it needs a free service to forward messages to your inbox.

### Option A — Formspree (Recommended — free, works everywhere)

[Formspree](https://formspree.io) handles form submissions and emails them to you. Free plan allows 50 submissions per month.

**Step 1: Create an account**
1. Go to [formspree.io](https://formspree.io)
2. Click **Get Started** and sign up with your email (`kgrenu1@gmail.com`)
3. Verify your email address

**Step 2: Create a form**
1. After logging in, click **+ New Form**
2. Give it a name (e.g. `Portfolio Contact`)
3. Click **Create Form**
4. Copy the **Form Endpoint** URL — it looks like:
   ```
   https://formspree.io/f/xpwzabcd
   ```

**Step 3: Update the website**
1. Open `contact.html`
2. Find this line (search for `YOUR_FORM_ID`):
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
3. Replace `YOUR_FORM_ID` with your actual form ID:
   ```html
   action="https://formspree.io/f/xpwzabcd"
   ```
4. Save the file

**Step 4: Test it**
1. Deploy the website (or run locally via `npx serve .`)
2. Fill in the contact form and submit it
3. Check your email — you should receive the message within a minute
4. You can also see all submissions in your Formspree dashboard

**Free plan limits:** 50 submissions/month, forms expire after 30 days of inactivity. Upgrade to Pro ($10/month) for unlimited submissions.

### Option B — Netlify Forms (Only if hosting on Netlify)

If you deploy on Netlify (see Section 14), the contact form is already configured with `data-netlify="true"`. Netlify detects and processes the form automatically.

To receive emails:
1. Log in to [app.netlify.com](https://app.netlify.com)
2. Go to your site → **Site configuration → Forms**
3. Click the `contact` form
4. Add **Form notifications → Email notification** → enter `kgrenu1@gmail.com`

No Formspree setup needed if you use this option.

### Easier alternative: Web3Forms

[Web3Forms](https://web3forms.com) is similar to Formspree but the free plan has no monthly limit.

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email → get an Access Key
3. Change the form `action` in `contact.html` to:
   ```html
   action="https://api.web3forms.com/submit"
   ```
4. Add a hidden field inside the form:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```

---

## 12. How to Set Up Analytics

Google Analytics lets you see how many people visit your website, where they come from, what device they use, and which artworks are most popular.

**Analytics is disabled until you add your own ID.** The placeholder `G-XXXXXXXXXX` in the code ensures nothing is tracked until you set it up.

### Step 1: Create a Google Analytics account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click **Start measuring**
4. Fill in your account name (e.g. `Renu Art Portfolio`)
5. Fill in property name (e.g. `Portfolio Website`)
6. Choose **India** as your country, **Indian Rupee** as currency
7. Describe your business → select **Other**
8. Click **Create**

### Step 2: Set up a data stream

1. After creating the property, click **Web**
2. Enter your website URL (e.g. `https://renu-kg.github.io/art-portfolio/`)
3. Enter a stream name (e.g. `Portfolio Website`)
4. Click **Create stream**

### Step 3: Copy your Measurement ID

After creating the stream, you will see a **Measurement ID** that looks like:
```
G-A1B2C3D4E5
```
Copy this ID.

### Step 4: Paste it into the website

1. Open `js/analytics.js`
2. Find this line near the top:
   ```js
   var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
   ```
3. Replace `G-XXXXXXXXXX` with your ID:
   ```js
   var GA_MEASUREMENT_ID = 'G-A1B2C3D4E5';
   ```
4. Save the file
5. Commit and push (if using GitHub)

### Step 5: Verify it's working

1. Visit your live website in a browser
2. Go back to Google Analytics → **Reports → Realtime**
3. You should see **1 active user** (yourself)

If you see yourself, analytics is working. It may take 24–48 hours to see full data.

### What information is collected

| What is tracked | Example |
|---|---|
| Page views | Home page visited 42 times |
| Unique visitors | 30 different people visited |
| Country | India, USA, UK |
| Device type | Mobile 70%, Desktop 30% |
| Artwork opens | "Gentle Giant" opened 15 times |
| Dark/light mode toggle | 10 switches |
| Contact form submitted | 3 submissions |
| Social link clicks | GitHub clicked 8 times |

### What is NEVER collected

- ❌ Your visitors' names or email addresses
- ❌ Full IP addresses (only approximate location is recorded)
- ❌ What visitors typed into the contact form
- ❌ Passwords or any sensitive information
- ❌ Cross-site tracking or advertisement data

### How to view your analytics

In Google Analytics, go to **Reports**:
- **Realtime** → See who's on your site right now
- **Acquisition → Traffic acquisition** → Where visitors come from (Google search, Instagram, direct link)
- **Engagement → Pages and screens** → Which pages are most popular
- **User → User attributes → Demographic details** → Countries and cities
- **Tech → Tech overview** → Device types (mobile, tablet, desktop)

Custom events like `artwork_open` can be viewed under **Events** in the Explore section.

---

## 13. How to Deploy on GitHub Pages

GitHub Pages is a free service from GitHub that hosts your website publicly. Here is how to use it step by step.

### Before you start

Make sure you have:
- A GitHub account. Sign up free at [github.com](https://github.com)
- Git installed on your computer. Download from [git-scm.com](https://git-scm.com)

### Step 1: Create a GitHub repository

1. Log in to GitHub
2. Click the **+** icon in the top right corner → **New repository**
3. Fill in:
   - **Repository name:** `art-portfolio` (or any name you like)
   - **Visibility:** Public
   - **Do NOT tick** "Add a README file" (you already have one)
4. Click **Create repository**

### Step 2: Upload your files

Open a terminal (Command Prompt or PowerShell on Windows, Terminal on Mac) and navigate to your `myArtGallery` folder:

```bash
cd "C:\Users\kgren\OneDrive\Desktop\myArtGallery"
```

Then run these commands one by one:

```bash
git init
git add .
git commit -m "First commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/renu-kg/art-portfolio.git
git push -u origin main
```

> Replace `renu-kg` with your GitHub username and `art-portfolio` with your repository name.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (the gear icon in the top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose branch: **main**, folder: **/ (root)**
6. Click **Save**

### Step 4: Access your live website

After a minute, your website will be live at:
```
https://renu-kg.github.io/art-portfolio/
```

> Replace `renu-kg` with your GitHub username and `art-portfolio` with your repository name.

You will also see a banner in the Pages settings showing your live URL.

### Important note about the contact form on GitHub Pages

GitHub Pages is a static host — it cannot process form submissions on its own.

**You must set up Formspree** (see Section 11, Option A) before your contact form will work on GitHub Pages.

---

## 14. How to Deploy on Netlify

Netlify is another free hosting option. It is slightly simpler than GitHub Pages and has built-in contact form handling.

### Option A — Drag and Drop (fastest, no setup required)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in (use your GitHub account)
2. Drag the entire `myArtGallery` folder onto the screen that says "Drag and drop your site folder"
3. Netlify deploys it instantly and gives you a URL like `cheerful-name-abc123.netlify.app`

That's it. Your site is live.

### Option B — Connect to GitHub (recommended for regular updates)

1. Push your files to GitHub first (see Section 13, Steps 1–2)
2. In Netlify: click **Add new site → Import an existing project**
3. Click **GitHub**
4. Select your repository
5. Leave **Build command** empty (it's not needed for this site)
6. Set **Publish directory** to `.` (a single dot, meaning the root)
7. Click **Deploy site**

Netlify will automatically redeploy every time you push changes to GitHub.

### Enable contact form on Netlify

The contact form already has `data-netlify="true"` set. Netlify detects this automatically.

To receive emails when someone submits the form:
1. In Netlify: go to your site → **Site configuration → Forms**
2. Click the form named **contact**
3. Click **Add notification → Email notification**
4. Enter your email: `kgrenu1@gmail.com`
5. Click **Save**

### Set a custom domain on Netlify

1. In Netlify: **Site configuration → Domain management → Add a domain**
2. Type your domain (e.g. `renukgart.com`)
3. Follow the DNS instructions Netlify shows you
4. Netlify adds HTTPS (SSL) automatically for free

---

## 15. How to Update the Website After Making Changes

### If you used drag-and-drop on Netlify

1. Make your changes to the files
2. Go back to [app.netlify.com](https://app.netlify.com)
3. Open your site → **Deploys** tab
4. Drag the updated `myArtGallery` folder onto the deploy area

### If you connected to GitHub (GitHub Pages or Netlify)

After making changes, run these commands in your terminal:

```bash
git add .
git commit -m "Add new artwork: Name of Your Artwork"
git push
```

Your website updates automatically within 1–2 minutes.

**What to check after updating:**
- Refresh your browser (press Ctrl+Shift+R or Cmd+Shift+R to force refresh)
- Make sure the new artwork appears in the gallery
- Click the artwork to verify the lightbox shows correct information
- Check the home page to see if featured artworks updated correctly

---

## 16. Troubleshooting

### The gallery shows "Could not load artworks" or is empty

**Cause:** You opened `index.html` or `gallery.html` directly by double-clicking it. Browsers block `fetch()` on local files.

**Fix:** Run the site through a local server:
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

---

### I added a new artwork but it doesn't appear

Check these things in order:

1. **Is the image file in the `images/` folder?** The filename must match exactly what you wrote in `artworks.json` (including uppercase/lowercase letters).

2. **Is the JSON valid?** Open `artworks.json` in VS Code. If any text is red or the file has a warning icon, there is a syntax error. Common mistakes:
   - Missing comma between two artwork entries
   - Extra comma after the last entry
   - Missing quotation marks around text values

3. **Hard refresh the browser.** Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac).

---

### Images are not showing (broken image icon)

**Possible causes:**
- The image file is in the wrong folder (should be inside `images/`)
- The filename in `artworks.json` doesn't match the actual filename (check spelling and extension — `.jpg` vs `.jpeg` vs `.png`)
- The image file is corrupted

**Fix:** Double-check the `"image"` field in `artworks.json` matches the exact filename and path.

---

### The contact form doesn't send emails

**Cause:** The Formspree Form ID hasn't been set up yet.

**Fix:** Follow Section 11 to create a free Formspree account and update the form `action` URL in `contact.html`.

---

### The dark/light mode toggle isn't working

**Cause:** JavaScript may be blocked or `js/theme.js` failed to load.

**Fix:** Open browser DevTools (F12) → Console tab. Look for any error messages. Make sure `js/theme.js` exists in the project.

---

### Analytics are not working

**Cause 1:** The GA Measurement ID is still the placeholder `G-XXXXXXXXXX`.
**Fix:** Replace it with your real ID in `js/analytics.js` (see Section 12).

**Cause 2:** You are running from a local file (`file://` URL). Analytics only works on a live server.
**Fix:** It will work when the site is deployed online.

---

### The website looks broken on mobile

**Fix:** Make sure you have this line in the `<head>` section of all HTML files:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### Images look blurry

**Cause:** The original image resolution is too low.

**Fix:** Use images that are at least 1200px wide. You can check the resolution by right-clicking the image file → Properties.

---

### Pages show old content after an update (caching)

**Fix:** Force a hard refresh:
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

If deployed on Netlify or GitHub Pages, wait 1–2 minutes after pushing changes.

---

## 17. Frequently Asked Questions

**Q: Do I need to know coding to use this website?**

A: Only basic text editing. To add artworks and update your information, you only need to edit `artworks.json` and the HTML files in a text editor. The code itself does not need to be changed.

---

**Q: Can I use any image format — not just JPEG?**

A: Yes. PNG, WEBP, and GIF also work. Just make sure the `"image"` path in `artworks.json` uses the correct extension (e.g. `"images/artwork-13.png"`).

---

**Q: Will portrait images (tall), landscape images (wide), and square images all look good?**

A: Yes. The gallery is designed with a Pinterest-style masonry layout that shows every image at its natural size and shape — no cropping, no distortion, no stretched or squashed images.

---

**Q: How many artworks can I add?**

A: There is no limit. Add as many as you like to `artworks.json`. The gallery loads them all automatically.

---

**Q: Can I change the artist name to something else?**

A: Yes. Search for `Renu K G` across the HTML files (index.html, gallery.html, contact.html) and replace it with the new name. Also update the `<title>` tag and meta tags.

---

**Q: Is my visitors' data private?**

A: Yes. The analytics setup:
- Never collects names, emails, or passwords
- Anonymises IP addresses
- Never reads form content
- Does not use cross-site advertising tracking

---

**Q: Can I host this on a paid hosting provider instead of GitHub Pages or Netlify?**

A: Yes. This is a completely static website (just HTML, CSS, and JavaScript files). Any web hosting provider that serves static files will work — including GoDaddy, Hostinger, Bluehost, or any cPanel hosting. Just upload all the files to the `public_html` folder.

---

**Q: The lightbox says "1 / 12" but I have 15 artworks. Why?**

A: Make sure all 15 entries are correctly added to `artworks.json`. Open the file and count the entries. Also check the JSON for syntax errors (a missing comma or bracket can cut the list short).

---

**Q: Can I add a video instead of a photo in the gallery?**

A: Not by default. The gallery is designed for images only. Adding video would require custom JavaScript changes.

---

**Q: How do I delete an artwork?**

A: Open `artworks.json`, find the entry for that artwork, and delete the entire `{ ... }` block (including the commas between entries). Also delete the image file from the `images/` folder if you no longer need it.

---

**Q: I accidentally broke the website. What do I do?**

A: If you are using GitHub:
```bash
git log --oneline
```
This shows your recent commits. To go back to a working version:
```bash
git revert HEAD
git push
```

If you are not using GitHub, check if you have a backup. Going forward, always keep a backup copy of `artworks.json` before editing it.

---

*Built with ✏️ and ❤ — Renu K G*
