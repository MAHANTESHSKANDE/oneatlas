"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { formatPrice, formatTokens } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompare() {
      if (!ids) {
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/compare?ids=${ids}`);
      const json = await res.json();
      if (json.success) setModels(json.data);
      setLoading(false);
    }
    loadCompare();
  }, [ids]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Models
      </Link>

      <h1 className="text-3xl font-extrabold text-white mb-2">Model Comparison Matrix</h1>
      <p className="text-zinc-400 text-sm mb-8">Side-by-side technical evaluation across context, pricing, modalities, and benchmarks.</p>

      {loading ? (
        <div className="h-80 border border-zinc-800 rounded-xl bg-zinc-900/40 animate-pulse" />
      ) : models.length === 0 ? (
        <div className="text-center py-20 border border-zinc-800 rounded-xl">
          <p className="text-zinc-400">No models selected for comparison. Please go to Explore and select up to 4 models.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-zinc-800 rounded-xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-300">
                <th className="p-4 w-48 font-mono text-xs uppercase text-zinc-500">Feature</th>
                {models.map((m) => (
                  <th key={m.id} className="p-4 min-w-[220px]">
                    <span className="text-xs font-mono text-cyan-400 block">{m.organization.name}</span>
                    <span className="text-lg font-bold text-white block">{m.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr>
                <td className="p-4 font-medium text-zinc-400">Context Window</td>
                {models.map((m) => (
                  <td key={m.id} className="p-4 font-mono font-semibold text-white">{formatTokens(m.contextWindow)}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-zinc-400">Input Price / 1M</td>
                {models.map((m) => (
                  <td key={m.id} className="p-4 font-mono text-emerald-400">{formatPrice(m.inputPricePerM)}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-zinc-400">Output Price / 1M</td>
                {models.map((m) => (
                  <td key={m.id} className="p-4 font-mono text-emerald-400">{formatPrice(m.outputPricePerM)}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-zinc-400">Modalities</td>
                {models.map((m) => (
                  <td key={m.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {m.modalities.map((mod: string) => (
                        <span key={mod} className="px-2 py-0.5 rounded text-xs bg-zinc-800 text-zinc-300 capitalize">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-zinc-400">License</td>
                {models.map((m) => (
                  <td key={m.id} className="p-4 text-zinc-300">{m.license}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-amber-400">Chatbot Arena Elo</td>
                {models.map((m) => {
                  const score = m.scores?.find((s: any) => s.benchmark?.name?.includes("Arena"))?.score;
                  return <td key={m.id} className="p-4 font-bold text-amber-400">{score ?? "—"}</td>;
                })}
              </tr>
              <tr>
                <td className="p-4 font-medium text-cyan-400">HumanEval (Coding)</td>
                {models.map((m) => {
                  const score = m.scores?.find((s: any) => s.benchmark?.name === "HumanEval")?.score;
                  return <td key={m.id} className="p-4 font-bold text-cyan-400">{score ? `${score}%` : "—"}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400">
          Loading comparison matrix...
        </div>
      }>
        <CompareContent />
      </Suspense>
    </div>
  );
}