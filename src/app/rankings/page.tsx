"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Trophy } from "lucide-react";
export default function RankingsPage() {
  const [benchmarks, setBenchmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/benchmarks")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setBenchmarks(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Evaluations</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Leaderboards & Benchmarks</h1>
          <p className="text-zinc-400 text-sm mt-1">Comparative performance scores across industry standard evaluations.</p>
        </div>
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-xl border border-zinc-800 bg-zinc-900/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {benchmarks.map((bench) => (
              <div key={bench.id} className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-400" />
                      {bench.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{bench.description}</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-zinc-800 text-zinc-300 rounded">
                    {bench.category}
                  </span>
                </div>
                <div className="p-4">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs font-mono text-zinc-500 uppercase border-b border-zinc-800/80 pb-2">
                        <th className="pb-2 w-12">Rank</th>
                        <th className="pb-2">Model</th>
                        <th className="pb-2">Lab</th>
                        <th className="pb-2 text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {bench.scores?.map((s: any, index: number) => (
                        <tr key={s.id} className="hover:bg-zinc-800/20">
                          <td className="py-2.5 font-mono text-zinc-400">
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                          </td>
                          <td className="py-2.5 font-semibold text-white">{s.model.name}</td>
                          <td className="py-2.5 text-zinc-400">{s.model.organization.name}</td>
                          <td className="py-2.5 text-right font-mono font-bold text-cyan-400">
                            {s.score} {bench.maxScore ? ` / ${bench.maxScore}` : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}