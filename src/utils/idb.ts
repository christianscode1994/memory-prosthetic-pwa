import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import useEmbeddings from '../hooks/useEmbeddings';

const DB_NAME = 'memory_prosthetic_v1';
const DB_VERSION = 1;

async function db() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains('memories')) {
        const store = upgradeDb.createObjectStore('memories', { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
      }
      if (!upgradeDb.objectStoreNames.contains('audit')) {
        upgradeDb.createObjectStore('audit', { keyPath: 'ts' });
      }
    }
  });
}

export async function addMemory(mem: any) {
  const d = await db();
  await d.put('memories', mem);
}

export async function listMemories() {
  const d = await db();
  return (await d.getAll('memories')).sort((a: any, b: any) => b.createdAt - a.createdAt);
}

export async function addDemoItems(force = false) {
  const emb = useEmbeddings();
  const existing = await listMemories();
  if (existing.length > 0 && !force) return;
  const samples = [
    { title: 'Pick up Alex order', text: 'Alex order: latte + croissant, table 5', tags: ['pickup', 'cafe'] },
    { title: 'Invoice with blue logo', text: 'Invoice number 2023-07-14 with blue company logo', tags: ['invoice'] },
    { title: 'Repair note', text: 'Use 4mm wrench, oil after 10 minutes', tags: ['repair'] },
    { title: 'Business card Tom', text: 'Tom - VP Sales - tom@acme.example', tags: ['contact'] }
  ];
  for (const s of samples) {
    const id = uuidv4();
    const embedding = await emb.embedText(s.text);
    const mem = {
      id,
      title: s.title,
      text: s.text,
      createdAt: Date.now(),
      embedding: Array.from(embedding),
      ephemeral: false,
      triggersMeta: []
    };
    await addMemory(mem);
  }
}

export async function createEphemeralMemory() {
  const emb = useEmbeddings();
  const id = uuidv4();
  const text = 'Temporary secret: code 1234';
  const embedding = await emb.embedText(text);
  const mem = {
    id,
    title: 'Ephemeral',
    text,
    createdAt: Date.now(),
    embedding: Array.from(embedding),
    ephemeral: true,
    triggersMeta: []
  };
  await addMemory(mem);
  return id;
}

export async function burnEphemeral(id: string) {
  const d = await db();
  // overwrite memory content if present, then delete
  const mem = await d.get('memories', id);
  if (mem) {
    try {
      // try to securely overwrite array buffers
      if (mem.embedding && Array.isArray(mem.embedding)) {
        for (let i = 0; i < mem.embedding.length; i++) mem.embedding[i] = 0;
      }
    } catch (e) {}
    await d.delete('memories', id);
    await logAudit({ action: 'burn', id, ts: Date.now() });
  }
}

export async function logAudit(entry: any) {
  const d = await db();
  await d.put('audit', entry);
}

export async function getAuditLog() {
  const d = await db();
  return await d.getAll('audit');
}
