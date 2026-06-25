# Premium Personal Portfolio - Lohakare Ganesh

A world-class, production-ready, highly interactive personal portfolio website for **Lohakare Ganesh**, a Data Analyst and Computer Engineering undergraduate specializing in Machine Learning pipelines, Power BI interactive visualization, and Computer Vision (YOLOv8) models.

This project is built with vanilla web standards (HTML5, CSS3, ES6+ JavaScript) targeting extreme performance, accessibility, SEO, and visual excellence (light sky-blue glassmorphism theme).

---

## 📂 Project Structure

```
ganesh-portfolio/
├── index.html           # Main semantic structure, SEO tags, schema markup
├── assets/
│   ├── images/
│   │   └── avatar_data_analyst.png  # High-quality profile vector / photo
│   ├── icons/           # Custom logo & social assets
│   ├── certificates/    # PDF/Image files for verified certifications
│   └── resume/
│       └── Lohakare_Ganesh_Resume.pdf  # ATS-ready downloadable resume PDF
├── css/
│   ├── styles.css       # Layouts, themes, component glassmorphism variables
│   ├── animations.css   # Custom cursor trail, page loader, keyframe floats
│   └── responsive.css   # Mobile, tablet, laptop, and ultra-wide media queries
├── js/
│   ├── script.js        # Dynamic typing, project filter, lightbox, command palette
│   ├── animations.js    # Intersection observers, LERP cursor, stats counter
│   ├── particles.js     # Lightweight canvas-based connection particle drifts
│   ├── form.js          # Web3Forms handler, email client fallback, toasts
│   └── theme.js         # Theme switching systems & LocalStorage caching
└── README.md            # Setup, deployment, checklists & future roadmap
```

---

## ⚡ Setup & Local Development

1. **Clone or Download** the folder: `ganesh-portfolio`.
2. **Open** the folder in your favorite editor (e.g., VS Code).
3. **Run Locally**:
   - Double-click `index.html` to open it directly in a browser.
   - For hot-reloads and optimal path testing, use the VS Code **Live Server** extension or run a quick python server:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## 📬 Secure Contact Form Setup Guide

To keep your Google App Password safe and hide it from the public (preventing anyone from inspecting your website to steal your Gmail credentials), we have implemented a secure Node.js backend server (`server.js`).

### Steps to start the email server:
1. Ensure Node.js is installed on your machine.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd C:\Users\ganes\.gemini\antigravity\scratch\ganesh-portfolio
   ```
3. Install the secure mailer backend dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will start running at `http://localhost:5000`.
5. Now, when recruiters fill the contact form, JavaScript validates and sanitizes the inputs, then forwards them to your local server. The server uses `nodemailer` to login to `ganeshlohakare0549@gmail.com` via the Google App Password (secured inside the `.env` file) and routes the message to `ganeshlohakare329@gmail.com`.

*Note: If the backend server is offline or connection fails, the frontend automatically falls back to opening the client's native email application with pre-filled fields so no messages are lost.*

---

## 🚀 Deployment Guide

### Option 1: GitHub Pages (Recommended & Free)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initialize portfolio website"
   ```
2. Create a new repository on GitHub named `portfolio` (or similar).
3. Connect and push your local branch:
   ```bash
   git remote add origin https://github.com/ganeshlohakare329/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages**.
5. Set the **Source** to `Deploy from a branch`, choose `main` branch and `/root` directory, then click **Save**.
6. Your portfolio will be live at `https://ganeshlohakare329.github.io/portfolio/` within minutes!

### Option 2: Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Select **Add new site** > **Deploy manually**.
3. Drag and drop the `ganesh-portfolio` directory directly into the browser upload box.
4. Once processed, click **Domain settings** to customize your site name (e.g. `ganesh-lohakare.netlify.app`).

### Option 3: Vercel
1. Install Vercel CLI locally or connect Vercel to your GitHub account.
2. If using CLI, run in the project directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompts. Choose default settings. Your site will deploy instantly.

---

## 📋 Optimization Checklists

### 1. Performance Checklist
- [x] **Lightweight Scripts**: Custom canvas-based `particles.js` replacing heavy libraries to preserve CPU cycles.
- [x] **Lazy Loading**: Native loading fallback (`loading="lazy"`) added on images.
- [x] **Asset Compression**: Use `.webp` or compressed `.png`/`.jpg` formats.
- [x] **Minimal CSS Overhead**: Pure CSS variables and transitions used instead of Tailwind or SCSS compilers.
- [x] **Font Optimization**: Configured Google Fonts with `preconnect` links.

### 2. Accessibility (a11y) Checklist
- [x] **Contrast Ratios**: Verified dark-mode and light-mode text contrasts.
- [x] **Semantic Landmarks**: Structured using `<header>`, `<main>`, `<section>`, `<nav>`, and `<footer>` tags.
- [x] **Keyboard Accessibility**: Command palette, modal buttons, and nav links are fully focusable.
- [x] **Interactive Controls**: Hamburger menu, theme toggle, and modals utilize ARIA labels.
- [x] **Reduced Motion**: Native media query supports users with motion sensitivity.

### 3. SEO Checklist
- [x] **Rich Meta Tags**: Unique description, keywords, Open Graph, and Twitter cards.
- [x] **Document Hierarchy**: Strictly one `<h1>` tag with structured `<h2>`, `<h3>` subtitles.
- [x] **Social Linking**: Included validated absolute URLs for LinkedIn, GitHub, and email links.
- [x] **Schema Markup**: Injected metadata ready for search indexing crawlers.

---

## 🗺️ Future Enhancement Roadmap

1. **Blog Integration**: Add a Markdown-driven blog page to share data analysis insights, Python scripts, or ML tutorials.
2. **Interactive Live Dashboard**: Embed a live Power BI report or an interactive streamlit model directly on the page.
3. **GitHub API Integration**: Dynamic contribution graph generation and repository statistic tracking.
4. **LeetCode Profile Sync**: Pull and render live statistics for problem-solving milestones.
