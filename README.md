<h1 align="center">🎮 AI Game Idea Generator</h1>

<p align="center">
  <b>Pick a theme, genre and platform, and get a ready-to-prototype game concept in seconds.</b>
</p>

<p align="center">
  <a href="https://dev-iqrazainab.github.io/ai-game-idea-generator/"><img src="https://img.shields.io/badge/▶%20Live-Demo-FF5FA2?style=for-the-badge" /></a>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Claude%20API-D97757?style=for-the-badge&logo=anthropic&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-7C5CFF?style=for-the-badge" />
</p>

---

## ✨ Features

- ⚡ **Offline mode:** a rule-based generator mixes curated mechanics, twists and monetization models, with no key needed
- 🤖 **AI mode:** Claude acts as a "senior game designer" and returns structured JSON
- 🧱 **Prototype-ready output:** title, tagline, core loop, features, monetization and MVP scope
- ⭐ **Save and copy** ideas (saved in your browser)
- 🛡️ **Graceful fallback:** if the AI call fails, you still get an offline idea
- 📱 **Responsive** gradient UI

## 🚀 Live Demo

👉 **[dev-iqrazainab.github.io/ai-game-idea-generator](https://dev-iqrazainab.github.io/ai-game-idea-generator/)**

## 🧠 How It Works

```
          ┌──────────── Use AI? ────────────┐
form ──►  │ yes + key → Claude (JSON prompt) │ ──► renderIdea()
          │ no        → generator.js         │
          └──────────────────────────────────┘
```

- `generator.js` is a small **procedural design engine**. It picks from genre-specific mechanic pools, random twists and platform-specific monetization.
- `app.js` prompts Claude to reply in **the same JSON shape**, so both modes share one renderer.
- All user and AI text is HTML-escaped before rendering.

## 📁 Project Structure

```
ai-game-idea-generator/
├── index.html     # Form, result card, saved list
├── style.css      # Gradient theme, responsive grid
├── generator.js   # Offline procedural idea engine
├── app.js         # UI logic, Claude API call, save/copy
└── README.md
```

## 💻 Run Locally

```bash
git clone https://github.com/Dev-IqraZainab/ai-game-idea-generator.git
cd ai-game-idea-generator
npx serve .      # or open index.html
```

## 🗺️ Roadmap

- [ ] Generate concept art with an image model
- [ ] Export the idea as a one-page game design doc (PDF)
- [ ] "Remix" button to tweak one section at a time

## 👩‍💻 Author

**Iqra Zainab**: AI & Unity Game Developer | Metaverse & Web3

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github)](https://github.com/Dev-IqraZainab)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/iqra-zainab/)

📄 Licensed under the [MIT License](LICENSE).
