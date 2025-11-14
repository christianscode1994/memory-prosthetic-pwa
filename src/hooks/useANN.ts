// src/hooks/useANN.ts
type Entry = { id: string; vec: Float32Array };

export default function useANN() {
  const store: Entry[] = [];

  function add(id: string, vec: Float32Array) {
    store.push({ id, vec });
  }

  function distance(a: Float32Array, b: Float32Array) {
    let s = 0;
    for (let i = 0; i < a.length; i++) {
      const d = a[i] - b[i];
      s += d * d;
    }
    return Math.sqrt(s);
  }

  function search(query: Float32Array, k = 5) {
    const scored = store.map((e) => ({ id: e.id, dist: distance(query, e.vec) }));
    scored.sort((x, y) => x.dist - y.dist);
    return scored.slice(0, k).map((s) => ({ id: s.id, score: s.dist }));
  }

  return { add, search, _store: store };
}
