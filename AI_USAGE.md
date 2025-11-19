# AI Usage, Attribution, and Provenance

Purpose
This document records where and how AI assistance (Copilot and other tools) was used to produce code, content, or documentation in this repository. It also documents provenance decisions you might need for hackathon rules and legal review.

Summary of AI usage
- GitHub Copilot (pair-programming style) was used to generate, suggest, and accelerate code snippets, tests, and documentation throughout the prototype.
- AI assistance was used for:
  - Boilerplate code and glue (service worker wiring, IndexedDB helpers)
  - Example model integration snippets (WASM/TFLite invocation examples)
  - README and in-repo documentation drafts
  - Non-critical UI elements and demo helpers
- Human review and edits were applied across all AI-generated outputs.

Files and areas with AI-assisted content
- src/utils/indexeddb.js — helper patterns and wrappers
- src/services/modelClient.js — initial client for localhost/native inference helper
- docs/README.md, docs/Security.md — documentation drafts and security notes
- UI components for demo: demo controls, sample instrumentation endpoints

Attribution and provenance
- AI tool used: GitHub Copilot (referred to in contest materials as "Copilot").
- Date range of use: development occurred during the hackathon sprint (retain timestamps or commit history for proof).
- Extent: Copilot suggested code that was then curated/modified by human developers; no wholesale black-box commits were accepted without review.

Licensing and third-party code
- Copilot-suggested code may resemble public code patterns. You remain responsible for ensuring any AI-suggested code does not violate third-party licenses.
- If you add third-party libraries, record their licenses in package.json and preserve license files in the repo.

Model and inference notes (recommended for demo)
- Preferred on-device options:
  - WASM TFLite or ONNX runtime for browser-side inference
  - Native helper running TFLite int8 builds for better performance
- Recommended models for hackathon prototype:
  - Small image embedding model (e.g., MobileNet v2 distilled → quantized to int8)
  - Lightweight text embedding (small SentenceTransformer distilled then quantized)
- Conversion and quantization:
  - Use post-training quantization to produce .tflite int8 artifacts
  - Test accuracy/behaviour after quantization and add regression test fixtures

Risks and caveats related to AI usage
- Copilot may suggest code patterns similar to publicly licensed snippets. Validate all suggested code for license compatibility.
- AI suggestions can introduce subtle bugs or insecure patterns. All AI-generated code was human-reviewed, but further review is recommended before production.

Recommended checklist before any external release
- Preserve this AI_USAGE.md in the top-level docs to satisfy hackathon disclosure rules.
- Keep commit history showing human edits after AI suggestions.
- If contest rules require, prepare a short slide or README section that declares the use of Copilot and what parts were human-reviewed.

Quick declaration for hackathon submission
This prototype used GitHub Copilot to generate code snippets and documentation. All outputs were reviewed and edited by the development team. The project is a prototype and not intended for production use.
