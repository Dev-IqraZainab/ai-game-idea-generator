/**
 * AI Game Idea Generator: UI + optional Claude integration.
 * Author: Iqra Zainab (https://github.com/Dev-IqraZainab)
 */

const $ = (id) => document.getElementById(id);
const form = $("ideaForm");
const result = $("result");
const useAI = $("useAI");
const keyWrap = $("keyWrap");
const apiKeyInput = $("apiKey");
const savedList = $("savedList");

const MODEL = "claude-sonnet-4-5";

const store = {
  get(k, f) { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
};

apiKeyInput.value = store.get("gig_key", "");
useAI.addEventListener("change", () => keyWrap.classList.toggle("hidden", !useAI.checked));

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/** Ask Claude for an idea in the same JSON shape as the offline generator. */
async function generateWithAI({ theme, genre, platform }, apiKey) {
  const prompt = `You are a senior mobile game designer. Create ONE original game concept.
Theme: ${theme}. Genre: ${genre}. Platform: ${platform}.
Reply with ONLY valid JSON, no markdown, in this exact shape:
{"title": string, "tagline": string, "coreLoop": [3 strings], "features": [3 strings],
 "monetization": [2 strings], "mvpScope": string, "tags": [4 short strings]}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 800, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `Request failed (${res.status})`);

  const text = data.content.map((b) => b.text || "").join("");
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  return { ...JSON.parse(json), source: "ai" };
}

const list = (items) => `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;

function renderIdea(idea) {
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>${escapeHtml(idea.title)}</h2>
    <p class="tagline">${escapeHtml(idea.tagline)}</p>
    <div class="tags">${idea.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      <span class="tag">${idea.source === "ai" ? "🤖 AI generated" : "⚡ Offline mode"}</span></div>
    <h3>Core loop</h3>${list(idea.coreLoop)}
    <h3>Key features</h3>${list(idea.features)}
    <h3>Monetization</h3>${list(idea.monetization)}
    <h3>MVP scope</h3><p>${escapeHtml(idea.mvpScope)}</p>
    <div class="result-actions">
      <button class="ghost" id="saveBtn">⭐ Save</button>
      <button class="ghost" id="copyBtn">📋 Copy</button>
    </div>`;

  $("saveBtn").onclick = () => saveIdea(idea);
  $("copyBtn").onclick = async () => {
    const text = `${idea.title}\n${idea.tagline}\n\nCore loop:\n- ${idea.coreLoop.join("\n- ")}\n\nFeatures:\n- ${idea.features.join("\n- ")}`;
    try { await navigator.clipboard.writeText(text); $("copyBtn").textContent = "✅ Copied"; } catch { /* ignore */ }
  };
}

function saveIdea(idea) {
  const saved = store.get("gig_saved", []);
  saved.unshift({ title: idea.title, tagline: idea.tagline });
  store.set("gig_saved", saved.slice(0, 10));
  renderSaved();
}

function renderSaved() {
  const saved = store.get("gig_saved", []);
  if (!saved.length) {
    savedList.innerHTML = `<p class="muted">No saved ideas yet.</p>`;
    return;
  }
  savedList.innerHTML = saved
    .map((s, i) => `
      <div class="saved-item">
        <div><strong>${escapeHtml(s.title)}</strong><small>${escapeHtml(s.tagline)}</small></div>
        <button class="ghost" data-i="${i}">✕</button>
      </div>`)
    .join("");
  savedList.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      const list = store.get("gig_saved", []);
      list.splice(Number(b.dataset.i), 1);
      store.set("gig_saved", list);
      renderSaved();
    })
  );
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const opts = { theme: $("theme").value, genre: $("genre").value, platform: $("platform").value };
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "⏳ Generating…";

  try {
    const key = apiKeyInput.value.trim();
    if (useAI.checked && key) {
      store.set("gig_key", key);
      renderIdea(await generateWithAI(opts, key));
    } else {
      renderIdea(GameIdeaGenerator.generate(opts));
    }
  } catch (err) {
    result.classList.remove("hidden");
    result.innerHTML = `<p class="error">⚠️ ${escapeHtml(err.message)}. Showing an offline idea instead.</p>`;
    setTimeout(() => renderIdea(GameIdeaGenerator.generate(opts)), 1200);
  } finally {
    btn.disabled = false;
    btn.textContent = "✨ Generate idea";
  }
});

renderSaved();
