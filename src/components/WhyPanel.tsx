import React from 'react';

export default function WhyPanel({ triggers }: { triggers: string[] }) {
  return (
    <div style={{ padding: '0.75rem', background: 'white', border: '1px solid #e2e8f0' }}>
      <h3>Why this appeared</h3>
      {triggers.length === 0 && <div>No recent triggers</div>}
      <ul>
        {triggers.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
