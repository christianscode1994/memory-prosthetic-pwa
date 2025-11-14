// src/hooks/useEmbeddings.ts
export default function useEmbeddings() {
  // simple deterministic text embedder (hash -> float32 vector)
  function embedText(text: string) {
    const seed = Array.from(text).reduce((s, c) => s + c.charCodeAt(0), 0);
    const vec = new Float32Array(64);
    for (let i = 0; i < 64; i++) {
      vec[i] = Math.sin(seed + i) * 0.5 + 0.5;
    }
    return Promise.resolve(vec);
  }

  // placeholder for image/audio embedder
  function embedImage(_blob: Blob) {
    const vec = new Float32Array(64);
    for (let i = 0; i < 64; i++) vec[i] = Math.random();
    return Promise.resolve(vec);
  }

  return { embedText, embedImage };
}
