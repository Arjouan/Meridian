import Link from 'next/link';

// A server component that fetches voyages from the API and lists them.
export const dynamic = 'force-dynamic';

// The shape of one voyage, as returned by GET /voyages (vessel & port calls are included).
type Voyage = {
  id: string;
  reference: string;
  status: string;
  vessel: { name: string };
  portCalls: {
    id: string;
    sequence: number;
    plannedArrival: string | null;
    plannedDeparture: string | null;
    port: { name: string; locode: string };
  }[];
};

async function getVoyages(): Promise<{ voyages: Voyage[]; error?: string }> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  try {
    const res = await fetch(`${base}/voyages`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return { voyages: await res.json() };
  } catch {
    return { voyages: [], error: 'Could not reach the API. Is it running on :3001?' };
  }
}

export default async function VoyagesPage() {
  const { voyages, error } = await getVoyages();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="text-sm text-blue-deep hover:underline">
        &larr; Home
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Voyages</h1>
      <p className="mt-1 text-slate-600">Voyages and their port calls, served live from the API.</p>

      {error ? (
        <p className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800">
          {error}
        </p>
      ) : voyages.length === 0 ? (
        <p className="mt-8 text-slate-500">No voyages yet. Run <code>npm run db:seed</code>.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Reference</th>
                <th className="px-4 py-3 font-semibold">Vessel</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Route</th>
              </tr>
            </thead>
            <tbody>
              {voyages.map((v) => (
                <tr key={v.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono font-medium text-navy">{v.reference}</td>
                  <td className="px-4 py-3">{v.vessel.name}</td>
                  <td className="px-4 py-3">{v.status.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 font-mono">
                    {v.portCalls.map((pc) => pc.port.locode).join(' → ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
