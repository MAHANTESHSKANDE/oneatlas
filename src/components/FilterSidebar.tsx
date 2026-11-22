"use client";

export function FilterSidebar({
  selectedOrg,
  setSelectedOrg,
  selectedType,
  setSelectedType,
  selectedModality,
  setSelectedModality,
  sortBy,
  setSortBy,
}: any) {
  const labs = [
    { label: "All Labs", value: "all" },
    { label: "Anthropic", value: "anthropic" },
    { label: "OpenAI", value: "openai" },
    { label: "Google DeepMind", value: "google" },
    { label: "DeepSeek", value: "deepseek" },
    { label: "Meta AI", value: "meta" },
  ];

  const types = [
    { label: "All Types", value: "all" },
    { label: "Chat & Instructions", value: "chat" },
    { label: "Reasoning (Thinking)", value: "reasoning" },
  ];

  const modalities = [
    { label: "All Modalities", value: "all" },
    { label: "Text", value: "text" },
    { label: "Image (Vision)", value: "image" },
    { label: "Audio", value: "audio" },
  ];

  return (
    <div className="w-full lg:w-64 space-y-6 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80">
      <div>
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="featured">Featured First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="context">Context Window (Largest)</option>
          <option value="newest">Release Date (Newest)</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
          AI Labs & Companies
        </label>
        <div className="space-y-1">
          {labs.map((lab) => (
            <button
              key={lab.value}
              onClick={() => setSelectedOrg(lab.value)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition ${
                selectedOrg === lab.value
                  ? "bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              {lab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
          Model Type
        </label>
        <div className="space-y-1">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setSelectedType(t.value)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition ${
                selectedType === t.value
                  ? "bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
          Modalities
        </label>
        <div className="space-y-1">
          {modalities.map((m) => (
            <button
              key={m.value}
              onClick={() => setSelectedModality(m.value)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition ${
                selectedModality === m.value
                  ? "bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}