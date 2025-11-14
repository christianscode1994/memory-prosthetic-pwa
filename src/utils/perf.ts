import { openDB } from 'idb';

export async function getAuditSnapshot() {
  // network inference calls are tracked by in-app counters; for demo return 0
  const d = await openDB('memory_prosthetic_v1', 1);
  const all = await d.getAll('memories');
  // crude size estimate
  let approxBytes = 0;
  for (const m of all) {
    approxBytes += (m.text?.length || 0) * 2;
    if (m.embedding) approxBytes += m.embedding.length * 4;
  }
  return {
    networkModelCalls: 0,
    dbSizeMB: Math.round((approxBytes / (1024 * 1024)) * 100) / 100,
    modelCached: false
  };
}
