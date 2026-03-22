# VoiceScribe Pro

A browser-based voice transcription tool with AI-powered Polish, Translate, and Summarize features. No installation required — single HTML file, runs entirely in your browser.

🎙️ **[Live Demo](https://sparks72.github.io/VoiceScribe-Pro/voice-to-text-pro.html)**

---

## Features

- **Three transcription engines** — Web Speech (free, no key), OpenAI Realtime Whisper, and Groq Whisper (chunk-based, near real-time)
- **AI Polish** — fixes punctuation, capitalisation, and paragraph structure using GPT-4o or Groq llama-3.3-70b
- **AI Translate** — DeepL (best quality), Claude Sonnet 4.6, Groq, or OpenAI. DeepL and Claude require the local proxy or GitHub Pages.
- **AI Summarize** — extracts key points and action items into a separate panel
- **Export** — Copy, TXT, SRT subtitles, and DOCX Word document (built in-browser, no server needed)
- **Dictation History** — last 30 sessions saved to localStorage, one-click restore
- **Font size slider** — scales the entire UI
- **Cost tracker** — live session cost display for all API calls
- **Mobile responsive** — works on phones and tablets when hosted on HTTPS

---

## Getting Started

### Simple (no proxy)
1. Download `voice-to-text-pro.html`
2. Open it in Chrome or Edge
3. Click ⚙ to enter your API keys
4. Press **START** or Spacebar to begin dictating

Transcription, Polish, Summarize, and Groq/OpenAI translation all work without a proxy.

### With Local Proxy (enables DeepL & Claude translation)
1. Download both `voice-to-text-pro.html` and `proxy.js` into the same folder
2. Run: `node proxy.js`
3. Open: `http://localhost:3000`

No npm install needed — the proxy uses only Node.js built-in modules.

---

## API Keys

All keys are stored in your browser's `localStorage` only — they never leave your machine except to the chosen API endpoint. When using the proxy, DeepL and Anthropic keys are forwarded server-side so they are never exposed in browser requests.

| Service | Used for | Get a key |
|---|---|---|
| **Groq** | Whisper transcription, Polish, Translate | [console.groq.com](https://console.groq.com) |
| **OpenAI** | Realtime Whisper, Polish, Translate | [platform.openai.com](https://platform.openai.com) |
| **DeepL** | Best quality translation (proxy or GitHub Pages) | [deepl.com/pro#developer](https://www.deepl.com/pro#developer) |
| **Anthropic** | Claude Sonnet 4.6 translation (proxy or GitHub Pages) | [console.anthropic.com](https://console.anthropic.com) |

> **Note:** DeepL blocks all direct browser API calls by design — it requires a server-side proxy. The included `proxy.js` handles this transparently. On GitHub Pages, Claude translation works via the `anthropic-dangerous-allow-cors` header but DeepL still requires the proxy.

---

## Local Proxy

The included `proxy.js` is a lightweight Node.js server (no dependencies) that:

- Serves `voice-to-text-pro.html` at `http://localhost:3000`
- Proxies DeepL translation requests server-side (bypasses CORS)
- Proxies Anthropic/Claude requests server-side

The app auto-detects whether it is running via the proxy and routes requests accordingly. No configuration needed.

```
node proxy.js          # default port 3000
node proxy.js 8080     # custom port
```

---

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `VoiceScribe-Pro`)
2. Upload `voice-to-text-pro.html`, `proxy.js`, `README.md` and `LICENSE`
3. Go to **Settings → Pages → Source** and select **main branch**
4. Your live URL will be: `https://sparks72.github.io/VoiceScribe-Pro/voice-to-text-pro.html`

---

## Transcription Engines

### Web Speech (Free)
Uses the browser's built-in speech recognition. No API key needed. Works well in Chrome and Edge. Best for quick notes.

### OpenAI Realtime
Streams via WebSocket to OpenAI's API. Words appear as you speak with ~150ms latency. Requires an OpenAI key.

### Groq Whisper (Recommended)
Records in configurable chunks (3–30 seconds) and sends to Groq's ultra-fast Whisper API. Near real-time at 5s chunks. Excellent accuracy, very low cost (~$0.0007 per 10 minutes).

| Model | Price | Best for |
|---|---|---|
| whisper-large-v3 | $0.111/hr | Highest accuracy, multilingual |
| whisper-large-v3-turbo | $0.04/hr | Fast, great accuracy |
| distil-whisper-large-v3-en | $0.02/hr | English only, cheapest |

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Toggle recording (when not typing) |
| `Esc` | Stop recording |
| `Ctrl+K` | Clear transcript |
| `Ctrl+,` | Open settings |

---

## Browser Compatibility

| Browser | Web Speech | Groq Whisper | OpenAI Realtime |
|---|---|---|---|
| Chrome | ✅ | ✅ | ✅ |
| Edge | ✅ Best for German | ✅ | ✅ |
| Firefox | ❌ | ✅ | ✅ |
| Safari (macOS/iOS) | ✅ | ✅ | ✅ |

---

## Privacy

- All API keys stored in `localStorage` in your browser only
- When using the proxy, keys are used server-side and never exposed in browser traffic
- Audio is sent directly from your browser to the chosen API provider
- No analytics, no tracking

---

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — free to use and modify for personal/non-commercial purposes. Commercial use not permitted. Credit to Sparks72 required.
