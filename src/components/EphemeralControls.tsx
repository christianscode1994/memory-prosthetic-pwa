import React, { useState } from 'react';
import { createEphemeralMemory, burnEphemeral } from '../utils/idb';

export default function EphemeralControls({ onBurn }: { onBurn?: () => void }) {
  const [ephemeralId, setEphemeralId] = useState<string | null>(null);

  return (
    <div style={{ display: 'inline-block', marginLeft: '1rem' }}>
      <button
        onClick={async () => {
          const id = await createEphemeralMemory();
          setEphemeralId(id);
          alert('Created ephemeral memory: ' + id);
        }}
      >
        Create Ephemeral
      </button>
      <button
        onClick={async () => {
          if (!ephemeralId) {
            alert('No ephemeral item created');
            return;
          }
          await burnEphemeral(ephemeralId);
          setEphemeralId(null);
          if (onBurn) onBurn();
          alert('Ephemeral burned');
        }}
      >
        Burn Ephemeral
      </button>
    </div>
  );
}
