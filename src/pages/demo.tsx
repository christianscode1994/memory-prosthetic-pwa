import React, { useEffect, useState } from 'react';
import RecallCard from '../components/RecallCard';
import WhyPanel from '../components/WhyPanel';
import AuditPanel from '../components/AuditPanel';
import EphemeralControls from '../components/EphemeralControls';
import { addDemoItems, listMemories } from '../utils/idb';
import useTriggers from '../hooks/useTriggers';
import useANN from '../hooks/useANN';
import useEmbeddings from '../hooks/useEmbeddings';

export default function DemoPage() {
  const [memories, setMemories] = useState<any[]>([]);
  const { embedText } = useEmbeddings();
  const ann = useANN();
  const triggers = useTriggers();

  useEffect(() => {
    addDemoItems().then(async () => {
      const all = await listMemories();
      setMemories(all);
      // build index
      for (const m of all) {
        ann.add(m.id, new Float32Array(m.embedding));
      }
    });
  }, []);

  async function runQuery(q: string) {
    const v = await embedText(q);
    const hits = ann.search(v, 5);
    const found = hits.map((h: any) => memories.find((m) => m.id === h.id));
    setMemories(found.filter(Boolean));
  }

  return (
    <div className="app">
      <header>
        <h1>Memory Prosthetic (PWA) — Demo</h1>
      </header>

      <main>
        <section className="controls">
          <input
            id="query"
            placeholder="Search memories (try: pick up, invoice, blue logo)"
          />
          <button
            onClick={async () => {
              const q = (document.getElementById('query') as HTMLInputElement)
                .value;
              await runQuery(q);
            }}
          >
            Search
          </button>
          <button
            onClick={async () => {
              await addDemoItems(true);
              const all = await listMemories();
              setMemories(all);
            }}
          >
            Reset demo data
          </button>
          <EphemeralControls onBurn={() => setMemories([])} />
        </section>

        <section className="results">
          <h2>Results</h2>
          {memories.length === 0 && <p>No results yet.</p>}
          {memories.map((m) => (
            <RecallCard key={m.id} memory={m} />
          ))}
        </section>

        <aside>
          <WhyPanel triggers={triggers.recentTriggers} />
          <AuditPanel />
        </aside>
      </main>
    </div>
  );
}
