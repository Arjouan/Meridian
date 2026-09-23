import Link from 'next/link';

// A server component that fetches containers from the API and lists them.
export const dynamic = 'force-dynamic';

// The shape of one container, as returned by GET /containers (vessel & port are included).
type Container = {
  id: string;
  isoNumber: string;
  type: string;
  ownerCode: string | null;
  status: string;
  vessel: { name: string } | null;
  currentPort: { name: string; locode: string } | null;
};

async function getContainers(): Promise<{ containers: Container[]; error?: string }> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  try {
    const res = await fetch(`${base}/containers`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return { containers: await res.json() };
  } catch {
    return { containers: [], error: 'Could not reach the API. Is it running on :3001?' };
  }
}

export default async function ContainersPage() {
  const { containers, error } = await getContainers();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="text-sm text-blue-deep hover:underline">
        &larr; Home
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Containers</h1>
      <p className="mt-1 text-slate-600">Containers and where they are, served live from the API.</p>

      {error ? (
        <p className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800">
          {error}
        </p>
      ) : containers.length === 0 ? (
        <p className="mt-8 text-slate-500">No containers yet. Run <code>npm run db:seed</code>.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">ISO number</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Vessel</th>
                <th className="px-4 py-3 font-semibold">Port</th>
              </tr>
            </thead>
            <tbody>
              {containers.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono font-medium text-navy">{c.isoNumber}</td>
                  <td className="px-4 py-3">{c.type.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{c.ownerCode ?? '—'}</td>
                  <td className="px-4 py-3">{c.status.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3">{c.vessel?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    {c.currentPort ? `${c.currentPort.name} (${c.currentPort.locode})` : '—'}
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
