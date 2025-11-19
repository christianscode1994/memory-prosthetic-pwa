# memory-prosthetic-pwa
Consent‑aware local PWA that stores multimodal memories, surfaces them contextually, and provides auditable ephemeral burn.


# Memory Prosthetic PWA — Hackathon Prototype

Short description
This repository is a prototype Progressive Web App that captures multimodal “memories” (text, images, audio), stores them locally with user consent, surfaces relevant memories contextually, and supports auditable ephemeral deletion (burn). It was prepared as an entry for the Arm AI Hackathon.

Status
- Prototype for demo and evaluation only.
- Minimal viability: capture → local inference → contextual surfacing → auditable burn.
- Not production-ready. See Security.md for limitations and mitigation notes.

Quick demo checklist
1. Build and serve the PWA on your Arm target (see ai_usage.md for model choices).
2. Capture a few sample memories (image + text recommended).
3. Run inference locally (WASM or native helper).
4. Trigger and show auditable burn; open the audit log.

Contents
- src/ — application source
- public/ — PWA manifest, icons, service worker
- build/ — production build output (generated)
- docs/ — this repo’s documentation (ai_usage.md, Security.md)

Getting started (development)
1. Clone:
   git clone git@github.com:christianscode1994/memory-prosthetic-pwa.git
2. Install Node (Arm64 recommended for device):
   nvm install 18 && nvm use 18
3. Install dependencies:
   npm ci
4. Run dev server:
   npm run dev
5. Build for production:
   npm run build
6. Serve production build:
   npx serve build

Running on Arm devices
- Use an Arm64 Node build or cross-compile assets on CI for your device.
- Recommended targets: Raspberry Pi 4 (64-bit OS), Arm64 laptop, or an Arm developer board with enough RAM (4GB+).
- For better inference performance, use a native helper running TFLite/ONNX (see ai_usage.md).

Dependencies and versions
- Node 18+
- npm 9+
- Browser with Service Worker and IndexedDB support (Chromium-based recommended)
- Optional: native helper dependencies (TFLite runtime; see ai_usage.md)

License and legal notice
This prototype is provided "as-is" for hackathon demonstration purposes only. The project contains code generated with the assistance of GitHub Copilot and other AI tools. See AI_USAGE.md for details and attribution. No warranty is provided. Refer to Security.md for known security, privacy, and legal limitations. Consult your legal counsel about contest rules, licensing, and liability.

Contributing
- This repo is a hackathon prototype. For rapid iteration, create feature branches and open pull requests.
- If you reuse or extend code, preserve the AI attribution in AI_USAGE.md and note any third-party licenses required by added dependencies.

Contact
For technical questions about the demo and running it on Arm targets, open an issue or contact the maintainer listed in repo metadata.
