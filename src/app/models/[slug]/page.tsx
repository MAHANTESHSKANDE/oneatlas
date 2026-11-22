import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { formatPrice, formatTokens } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Server, Award } from "lucide-react";
async function getModel(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/models/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = await getModel(slug);
  if (!model) notFound();
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest">{model.organization?.name}</span>
          <h1 className="text-4xl font-extrabold text-white mt-1 mb-3">{model.name}</h1>
          <p className="text-zinc-400 text-base max-w-3xl leading-relaxed">{model.description}</p>
        </div>
        {/* Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <span className="text-xs text-zinc-500 uppercase font-mono">Context Window</span>
            <p className="text-xl font-bold text-white mt-1">{formatTokens(model.contextWindow)} tokens</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <span className="text-xs text-zinc-500 uppercase font-mono">Max Output</span>
            <p className="text-xl font-bold text-white mt-1">{formatTokens(model.maxOutputTokens)} tokens</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <span className="text-xs text-zinc-500 uppercase font-mono">Input Price</span>
            <p className="text-xl font-bold text-emerald-400 mt-1">{formatPrice(model.inputPricePerM)} / 1M</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <span className="text-xs text-zinc-500 uppercase font-mono">Output Price</span>
            <p className="text-xl font-bold text-emerald-400 mt-1">{formatPrice(model.outputPricePerM)} / 1M</p>
          </div>
        </div>
        {/* Benchmark Scores */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-amber-400" /> Benchmark Evaluations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {model.scores?.map((s: any) => (
              <div key={s.id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
                <span className="text-xs font-medium text-zinc-400 block">{s.benchmark.name}</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{s.score}</span>
                <span className="text-[11px] text-zinc-500 mt-1 block">{s.benchmark.category}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Supported Inference Providers */}
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Server className="h-5 w-5 text-blue-400" /> Available Inference Providers
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/20">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/80 text-zinc-400 text-xs uppercase font-mono">
                <tr>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Input / 1M</th>
                  <th className="py-3 px-4">Output / 1M</th>
                  <th className="py-3 px-4">Latency (TTFT)</th>
                  <th className="py-3 px-4">Throughput</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {model.providers?.map((p: any) => (
                  <tr key={p.id} className="hover:bg-zinc-800/30">
                    <td className="py-3 px-4 font-semibold text-white">{p.organization.name}</td>
                    <td className="py-3 px-4 text-emerald-400">{formatPrice(p.inputPricePerM)}</td>
                    <td className="py-3 px-4 text-emerald-400">{formatPrice(p.outputPricePerM)}</td>
                    <td className="py-3 px-4 text-zinc-300">{p.latencyMs ? `${p.latencyMs} ms` : "—"}</td>
                    <td className="py-3 px-4 text-zinc-300">{p.throughputTps ? `${p.throughputTps} tps` : "—"}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}