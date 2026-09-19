import Link from 'next/link';

// A server component that fetches vessels from the API and lists them.
// `force-dynamic` means it fetches fresh on every request (not at build time).
export const dynamic = 'force-dynamic';

type Vessel = {
  id: string;
  imo: string;
  name: string;
  type: string;
  capacityTeu: number | null;
  flag: string | null;
  status: string;
};

async function getVessels(): Promise<{ vessels: Vessel[]; error?: string }> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  try {
    const res = await fetch(`${base}/vessels`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return { vessels: await res.json() };
  } catch {
    return { vessels: [], error: 'Could not reach the API. Is it running on :3001?' };
  }
}

export default async function VesselsPage() {
  const { vessels, error } = await getVessels();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="text-sm text-blue-deep hover:underline">
        &larr; Home
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy">Vessels</h1>
      <p className="mt-1 text-slate-600">The fleet, served live from the API.</p>

      {error ? (
        <p className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800">
          {error}
        </p>
      ) : vessels.length === 0 ? (
        <p className="mt-8 text-slate-500">No vessels yet. Run <code>npm run db:seed</code>.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">IMO</th>
                <th className="px-4 py-3 font-semibold">Capacity (TEU)</th>
                <th className="px-4 py-3 font-semibold">Flag</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {vessels.map((v) => (
                <tr key={v.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-navy">{v.name}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{v.imo}</td>
                  <td className="px-4 py-3">{v.capacityTeu ?? '—'}</td>
                  <td className="px-4 py-3">{v.flag ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                      {v.status}
                    </span>
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
