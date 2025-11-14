import { useEffect, useState } from 'react';

export default function useTriggers() {
  const [recentTriggers, setRecentTriggers] = useState<string[]>([]);

  useEffect(() => {
    // simple simulated geofence trigger after 3s for demo
    const t = setTimeout(() => {
      setRecentTriggers((p) => ['geofence:cafe', ...p].slice(0, 5));
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  return { recentTriggers };
}
