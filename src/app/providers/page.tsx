import { Navbar } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Globe, Cpu } from "lucide-react";

export const revalidate = 60;

export default async function ProvidersPage() {
  const organizations = await prisma.organization.findMany({
    include: {
      models: true,
      providers: { include: { model: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Ecosystem</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">AI Labs & Inference Providers</h1>
          <p className="text-zinc-400 text-sm mt-1">Directory of leading foundational labs and high-performance inference platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-cyan-400" />
                    {org.name}
                  </h3>
                  <div className="flex gap-1.5">
                    {org.isLab && (
                      <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                        Lab
                      </span>
                    )}
                    {org.isProvider && (
                      <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        Provider
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-zinc-400 mb-4">{org.description}</p>

                {org.models.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs text-zinc-500 font-mono uppercase block mb-1.5">Developed Models:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {org.models.map((m) => (
                        <Link
                          key={m.id}
                          href={`/models/${m.slug}`}
                          className="px-2.5 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:text-white hover:bg-zinc-700 transition"
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" /> Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}