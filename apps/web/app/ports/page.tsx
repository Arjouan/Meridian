import Link from 'next/link';

// A server component that fetches ports from the API and lists them.
export const dynamic = 'force-dynamic';

// The shape of one port, as returned by GET /ports.
type Port = {
  id: string;
  locode: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

async function getPorts(): Promise<{ ports: Port[]; error?: string }> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  try {
    const res = await fetch(`${base}/ports`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return { ports: await res.json() };
  } catch {
    return { ports: [], error: 'Could not reach the API. Is it running on :3001?' };
  }
}

export default async function PortsPage() {
  const { ports, error } = await getPorts();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="text-sm text-blue-deep hover:underline">
        &larr; Home
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Ports</h1>
      <p className="mt-1 text-slate-600">Ports of call, served live from the API.</p>

      {error ? (
        <p className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800">
          {error}
        </p>
      ) : ports.length === 0 ? (
        <p className="mt-8 text-slate-500">No ports yet. Run <code>npm run db:seed</code>.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">LOCODE</th>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {ports.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-navy">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{p.locode}</td>
                  <td className="px-4 py-3">{p.country}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {p.latitude}, {p.longitude}
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