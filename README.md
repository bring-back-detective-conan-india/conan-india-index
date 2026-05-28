# Detective Conan India Index 🔍🇮🇳

> The definitive watch guide and streaming catalog for **Detective Conan** (Case Closed) content available in India — tracking Netflix, ETV Bal Bharat, Anime Times, and more.

🔗 **Live Site:** [bring-back-detective-conan-india.github.io/conan-india-index](https://bring-back-detective-conan-india.github.io/conan-india-index)

---

## 🙌 Want to Contribute?

We warmly welcome contributions from the community! Whether you're a developer, a long-time Conan fan, or just spotted a mistake — there's a way for you to help.

### Quick Ways to Help (No Coding Required)
- 🐛 **Found a bug or wrong info?** → [Open an Issue](https://github.com/bring-back-detective-conan-india/conan-india-index/issues)
- ✏️ **Spot a typo or outdated streaming status?** → [Open an Issue](https://github.com/bring-back-detective-conan-india/conan-india-index/issues) and describe what needs fixing
- 📢 **Want to join the advocacy movement?** → Visit the [Advocacy section](https://bring-back-detective-conan-india.github.io/conan-india-index/#/advocacy)

### Contribution via Pull Request (Code/Data)
If you'd like to submit a fix or new data directly:

1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/conan-india-index.git`
3. Make your changes (see the guides below)
4. **Commit** with a clear message, e.g. `Add episode 1222 air dates`
5. Open a **Pull Request** — describe what you changed and why

> No complex build process needed. This is a plain HTML/JS/CSS project. Open `index.html` in a browser and you're good to go!

---

## 📂 Project Structure

```
conan-india-index/
├── index.html          # App entry point and HTML skeleton
├── app.js              # Central router and all page-rendering logic
├── data.js             # Platform info, movies, spinoffs, hero slides
├── episodes.js         # The episode database (~1,100+ entries)
├── watch-guide-v2.js   # Interactive chronological watch order logic
├── watch-guide-v2.css  # Styles specific to the watch guide
├── style.css           # Main design system and global styles
└── js/
    ├── api.js          # External data handlers (TMDB, manga covers)
    ├── router.js       # Hash-based SPA navigation
    └── utils.js        # Shared UI templates (footer, header, modals)
```

---

## 📝 How to Update Data

Most contributions just involve editing one of two files: `episodes.js` or `data.js`. No framework knowledge required.

---

### ➕ Adding a New Episode

Open `episodes.js` and append a new object to the `EPISODES` array:

```javascript
{
  "n": 1222,              // Japanese episode number
  "title": "The Scarlet Alibi",  // English title
  "season": "S31",        // Year-based season label (S31 = 2026)
  "aired": "2026-05-10",  // Japanese air date (YYYY-MM-DD)
  "etv": null,            // ETV Bal Bharat date (YYYY-MM-DD) or null if not aired
  "src": "V107 - F1-3"   // Manga source (Volume/File) or "TV Original"
}
```

**Field reference:**

| Field | Type | Description |
|---|---|---|
| `n` | `number` | Official Japanese episode number |
| `title` | `string` | English episode title |
| `season` | `string` | Season label, format `SYY` (last 2 digits of year) |
| `aired` | `string` | Japanese premiere date in `YYYY-MM-DD` format |
| `etv` | `string \| null` | ETV Bal Bharat air date, or `null` |
| `src` | `string` | Manga volume/file source, or `"TV Original"` |

---

### 🎬 Adding a New Movie

Open `data.js` and add an entry to the `MOVIES` array:

```javascript
{
  "id": "movie28",          // Unique ID, format: "movieN"
  "n": 28,                  // Movie number
  "title": "The Million-Dollar Pentagram",
  "year": 2024,
  "netflix": false,         // true if on Netflix India
  "animetimes": true,       // true if on Anime Times (Amazon/Apple TV)
  "description": "A short plot summary goes here.",
  "relatedEpisodes": []     // Optional: array of prequel episode IDs to link
}
```

---

### 📡 Updating Platform Availability

Platform summaries (shown on the Browse and Platforms pages) live in the `PLATFORMS` object inside `data.js`. Update the `tagline` or `description` field when a service adds new seasons or changes its catalog.

---

## 🎨 Tech Stack

This project is intentionally simple — no bundlers, no frameworks, no `npm install`.

| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Logic | Vanilla JavaScript (ES6+) |
| Styling | Custom CSS3 with CSS Variables |
| Routing | Hash-based SPA (`#/page`) |
| Data | Local JS objects (fast, offline-ready) |

---

## 🚀 Running Locally

Since there's no build step, just open the file directly:

```bash
# Option 1: Open in browser
# Double-click index.html, or drag it into your browser

# Option 2: Use a local server (avoids any CORS quirks)
npx serve .
# Then open http://localhost:3000
```

> All page navigation uses URL hashes (e.g. `#/movies`), so refreshing from a local file works fine.

---

## 🌟 About BBDCI

**Bring Back Detective Conan India (BBDCI)** was established in **2013** as a community advocacy group dedicated to making *Detective Conan* accessible to Indian audiences.

### Our Mission
- 📺 **Accessibility** — Lobby for the series on Netflix India, Anime Times, ETV Bal Bharat, and Apple TV
- 🎬 **Theatrical** — Promote *Detective Conan* movie releases in Indian cinemas
- 🗣️ **Localization** — Advocate for Hindi, Tamil, Telugu, and other regional dubs
- 🤝 **Community** — Central hub for **12,000+ fans** across India

**Connect with us:**

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=flat&logo=Instagram&logoColor=white)](https://www.instagram.com/bringbackdetectiveconanindia/)

---

*Maintained with ❤️ by the fans for the fans.*
