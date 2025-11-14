import React, { useEffect, useState } from 'react';
import { getAuditSnapshot } from '../utils/perf';

export default function AuditPanel() {
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const s = await getAuditSnapshot();
      setSnap(s);
    }
    load();
  }, []);

  return (
    <div style={{ padding: '0.75rem', marginTop: '0.75rem', background: 'white', border: '1px solid #e2e8f0' }}>
      <h3>Audit</h3>
      {snap ? (
        <div>
          <div><strong>Network inference calls:</strong> {snap.networkModelCalls}</div>
          <div><strong>IndexedDB size (approx):</strong> {snap.dbSizeMB} MB</div>
          <div><strong>Model binary cached:</strong> {snap.modelCached ? 'yes' : 'no'}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
