import React from 'react';

export default function RecallCard({ memory }: { memory: any }) {
  return (
    <div className="recall-card" role="article" aria-label="memory">
      <div><strong>{memory.title}</strong></div>
      <div style={{ fontSize: '0.9rem', color: '#334155' }}>
        {memory.text}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
        {new Date(memory.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
