# VoiceScribe Pro

A browser-based voice transcription tool with AI-powered Polish, Translate, and Summarize features. No installation required — single HTML file, runs entirely in your browser.

🎙️ **[Live Demo](https://sparks72.github.io/VoiceScribe-Pro/voice-to-text-pro.html)**

---

## Features

- **Three transcription engines** — Web Speech (free, no key), OpenAI Realtime Whisper, and Groq Whisper (chunk-based, near real-time)
- **AI Polish** — fixes punctuation, capitalisation, and paragraph structure using GPT-4o or Groq llama-3.3-70b
- **AI Translate** — translates to 13 languages via DeepL, Groq, or OpenAI (DeepL requires HTTPS hosting)
- **AI Summarize** — extracts key points and action items into a separate panel
- **Export** — Copy, TXT, SRT subtitles, and DOCX Word document (built in-browser, no server needed)
- **Dictation History** — last 30 sessions saved to localStorage, one-click restore
- **Font size slider** — scales the entire UI
- **Cost tracker** — live session cost display for all API calls
- **Mobile responsive** — works on phones and tablets when hosted on HTTPS

---

## Getting Started

1. Download `voice-to-text-pro.html`
2. Open it in Chrome or Edge
3. Click ⚙ to enter your API keys
4. Press **START** or Spacebar to begin dictating

No build step, no dependencies, no server required for basic use.

---

## API Keys

All keys are stored in your browser's `localStorage` only — they never leave your machine except to the chosen API endpoint.

| Service | Used for | Get a key |
|---|---|---|
| **OpenAI** | Realtime Whisper, Polish, Translate | [platform.openai.com](https://platform.openai.com) |
| **Groq** | Whisper transcription, Polish, Translate | [console.groq.com](https://console.groq.com) |
| **DeepL** | High-quality translation | [deepl.com/pro#developer](https://www.deepl.com/pro#developer) |
| **Anthropic** | Claude translation (future) | [console.anthropic.com](https://console.anthropic.com) |

> **Note:** DeepL and Anthropic API calls require HTTPS hosting due to browser CORS policy. They will not work when opening the file directly from your local drive. Host on GitHub Pages (see below) to enable them.

---

## Hosting on GitHub Pages (enables DeepL & mobile)

1. Create a new GitHub repository (e.g. `VoiceScribe-Pro`)
2. Upload `voice-to-text-pro.html` to the repository
3. Go to **Settings → Pages → Source** and select **main branch**
4. Your live URL will be: `https://sparks72.github.io/VoiceScribe-Pro/voice-to-text-pro.html`

That's it — DeepL translation and Anthropic Claude will work immediately from the hosted version.

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
- Audio is sent directly from your browser to the chosen API provider
- No data passes through any intermediate server
- No analytics, no tracking

---

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — free to use and modify for personal/non-commercial purposes. Commercial use not permitted. Credit to Sparks72 required.
