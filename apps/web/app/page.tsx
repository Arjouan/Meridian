import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <div className="mb-6">
        <svg viewBox="0 0 64 64" width="72" height="72" role="img" aria-label="Meridian icon">
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 41 C 17 30, 26 30, 32 40 C 38 50, 47 50, 55 40" stroke="#15294C" strokeWidth="5" />
            <path d="M33 29 C 41 22, 50 23, 56 30" stroke="#1E88E5" strokeWidth="4.2" />
          </g>
          <path d="M26 44 Q 32 58 38 44 Z" fill="#15294C" />
        </svg>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-blue">
        Vessel Management System
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight text-navy">Meridian</h1>
      <p className="mt-3 max-w-xl text-lg text-slate-600">
        Vessel Management System (VMS) for maritime logistics — real-time container visibility
        &amp; vessel emissions for small and regional carriers. This is the Phase&nbsp;0 skeleton —
        the map, tracking, and dashboards come next.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/vessels"
          className="rounded-lg bg-navy px-4 py-2 font-semibold text-white hover:bg-navy-2"
        >
          View vessels
        </Link>
        <a
          href="http://localhost:3001/docs"
          className="rounded-lg bg-blue px-4 py-2 font-semibold text-white hover:bg-blue-deep"
        >
          API docs
        </a>
        <a
          href="http://localhost:3001/health"
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-navy hover:bg-slate-100"
        >
          API health
        </a>
      </div>

      <p className="mt-10 text-sm text-slate-500">
        See <code className="rounded bg-slate-100 px-1.5 py-0.5">ROADMAP.md</code> for what&apos;s
        next and <code className="rounded bg-slate-100 px-1.5 py-0.5">docs/</code> for architecture.
      </p>
    </main>
  );
}
