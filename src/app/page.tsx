"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ModelCard } from "@/components/ModelCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";

export default function HomePage() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedModality, setSelectedModality] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [compareList, setCompareList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchModels() {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        org: selectedOrg,
        type: selectedType,
        modality: selectedModality,
        sort: sortBy,
      });

      const res = await fetch(`/api/models?${params.toString()}`);
      const json = await res.json();
      if (json.success) setModels(json.data);
      setLoading(false);
    }

    const timer = setTimeout(fetchModels, 200);
    return () => clearTimeout(timer);
  }, [search, selectedOrg, selectedType, selectedModality, sortBy]);

  const handleToggleCompare = (model: any) => {
    if (compareList.find((m) => m.id === model.id)) {
      setCompareList(compareList.filter((m) => m.id !== model.id));
    } else {
      if (compareList.length >= 4) {
        alert("You can compare up to 4 models at once.");
        return;
      }
      setCompareList([...compareList, model]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="relative border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950 px-4 py-12 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Open AI Model Discovery & Intelligence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Discover, Compare & Benchmark <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Frontier AI Models
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive specifications, verified benchmark evaluations, and multi-provider token pricing for engineering teams.
          </p>

          <div className="max-w-xl mx-auto relative pt-4">
            <Search className="absolute left-4 top-7 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by model name, architecture, or capability..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedModality={selectedModality}
          setSelectedModality={setSelectedModality}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Models Catalog <span className="text-zinc-500 text-sm font-normal">({models.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 rounded-xl border border-zinc-800 bg-zinc-900/40 animate-pulse" />
              ))}
            </div>
          ) : models.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-400">No models found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.map((m) => (
                <ModelCard
                  key={m.id}
                  model={m}
                  onSelectCompare={handleToggleCompare}
                  isSelectedForCompare={!!compareList.find((c) => c.id === m.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Compare Floating Drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 border border-cyan-500/50 shadow-2xl p-3 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            {compareList.map((m) => (
              <span key={m.id} className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 flex items-center gap-1">
                {m.name}
                <button onClick={() => handleToggleCompare(m)}>
                  <X className="h-3 w-3 text-zinc-400 hover:text-white" />
                </button>
              </span>
            ))}
          </div>
          <Link
            href={`/compare?ids=${compareList.map((m) => m.id).join(",")}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-400 text-zinc-950 hover:bg-cyan-300"
          >
            Compare Now ({compareList.length}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}