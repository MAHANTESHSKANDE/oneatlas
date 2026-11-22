import Link from "next/link";
import { formatPrice, formatTokens } from "@/lib/utils";
import { Eye, Zap, Layers } from "lucide-react";

export function ModelCard({ model, onSelectCompare, isSelectedForCompare }: any) {
  const eloScore = model.scores?.find((s: any) => s.benchmark?.name.includes("Arena"))?.score;

  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/80 p-5 transition-all flex flex-col justify-between shadow-sm hover:shadow-cyan-950/20">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-mono font-medium text-cyan-400 tracking-wider uppercase">
              {model.organization?.name}
            </span>
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
              <Link href={`/models/${model.slug}`}>{model.name}</Link>
            </h3>
          </div>

          {eloScore && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="h-3 w-3" /> Elo {eloScore}
            </span>
          )}
        </div>

        <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {model.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {model.modalities.map((m: string) => (
            <span key={m} className="px-2 py-0.5 rounded text-xs bg-zinc-800/80 text-zinc-300 font-mono capitalize">
              {m}
            </span>
          ))}
          <span className="px-2 py-0.5 rounded text-xs bg-zinc-800/80 text-zinc-400 font-mono">
            {model.license}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800/80">
        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
          <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/50">
            <span className="text-zinc-500 block text-[10px]">Context</span>
            <span className="font-semibold text-zinc-200">{formatTokens(model.contextWindow)}</span>
          </div>
          <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/50">
            <span className="text-zinc-500 block text-[10px]">Input / 1M</span>
            <span className="font-semibold text-emerald-400">{formatPrice(model.inputPricePerM)}</span>
          </div>
          <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/50">
            <span className="text-zinc-500 block text-[10px]">Output / 1M</span>
            <span className="font-semibold text-emerald-400">{formatPrice(model.outputPricePerM)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/models/${model.slug}`}
            className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            <Eye className="h-3.5 w-3.5" /> Details
          </Link>
          <button
            onClick={() => onSelectCompare(model)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
              isSelectedForCompare
                ? "bg-cyan-500 text-zinc-950 font-bold"
                : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            {isSelectedForCompare ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}