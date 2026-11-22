import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  console.log("Cleaning existing records...");
  await prisma.benchmarkScore.deleteMany({});
  await prisma.modelProvider.deleteMany({});
  await prisma.model.deleteMany({});
  await prisma.benchmark.deleteMany({});
  await prisma.organization.deleteMany({});
  console.log("Seeding Organizations...");
  const anthropic = await prisma.organization.create({
    data: {
      name: "Anthropic",
      slug: "anthropic",
      website: "https://anthropic.com",
      description: "AI safety and research company building reliable, steerable frontier systems.",
      isLab: true,
      isProvider: true,
    },
  });
  const openai = await prisma.organization.create({
    data: {
      name: "OpenAI",
      slug: "openai",
      website: "https://openai.com",
      description: "AI research organization focusing on AGI that benefits all humanity.",
      isLab: true,
      isProvider: true,
    },
  });
  const google = await prisma.organization.create({
    data: {
      name: "Google DeepMind",
      slug: "google",
      website: "https://deepmind.google",
      description: "World leader in artificial intelligence research and frontier multimodal models.",
      isLab: true,
      isProvider: true,
    },
  });
  const meta = await prisma.organization.create({
    data: {
      name: "Meta AI",
      slug: "meta",
      website: "https://ai.meta.com",
      description: "Pioneer in open-weights frontier LLMs and AI infrastructure.",
      isLab: true,
      isProvider: false,
    },
  });
  const deepseek = await prisma.organization.create({
    data: {
      name: "DeepSeek",
      slug: "deepseek",
      website: "https://deepseek.com",
      description: "Innovative open-weights AI lab pushing frontiers in reasoning and efficiency.",
      isLab: true,
      isProvider: true,
    },
  });
  const groq = await prisma.organization.create({
    data: {
      name: "Groq",
      slug: "groq",
      website: "https://groq.com",
      description: "Ultra-fast LPU inference engine provider.",
      isLab: false,
      isProvider: true,
    },
  });
  const together = await prisma.organization.create({
    data: {
      name: "Together AI",
      slug: "together",
      website: "https://together.ai",
      description: "Cloud platform for training and running open-source AI models at scale.",
      isLab: false,
      isProvider: true,
    },
  });
  console.log("Seeding Benchmarks...");
  const mmlu = await prisma.benchmark.create({
    data: { name: "MMLU", category: "General Reasoning", maxScore: 100, description: "Massive Multitask Language Understanding across 57 subjects." },
  });
  const humanEval = await prisma.benchmark.create({
    data: { name: "HumanEval", category: "Coding", maxScore: 100, description: "Python code generation and logic problem solving." },
  });
  const mathBench = await prisma.benchmark.create({
    data: { name: "MATH", category: "Mathematics", maxScore: 100, description: "Challenging high school and competition math problems." },
  });
  const arenaElo = await prisma.benchmark.create({
    data: { name: "Chatbot Arena Elo", category: "Human Preference", maxScore: null, description: "Crowdsourced blind battle rankings." },
  });
  console.log("Seeding Models...");
  const modelsData = [
    {
      name: "Claude 3.5 Sonnet",
      slug: "claude-3-5-sonnet",
      organizationId: anthropic.id,
      description: "Industry-leading intelligence and coding capabilities with 200K context window.",
      type: "chat",
      modalities: ["text", "image"],
      contextWindow: 200000,
      maxOutputTokens: 8192,
      inputPricePerM: 3.0,
      outputPricePerM: 15.0,
      releaseDate: new Date("2024-10-22"),
      license: "Proprietary",
      isFeatured: true,
      scores: [
        { benchmarkId: mmlu.id, score: 88.7 },
        { benchmarkId: humanEval.id, score: 93.7 },
        { benchmarkId: mathBench.id, score: 78.3 },
        { benchmarkId: arenaElo.id, score: 1283 },
      ],
      providers: [
        { orgId: anthropic.id, inputP: 3.0, outputP: 15.0, latency: 420, tps: 82 },
      ],
    },
    {
      name: "GPT-4o",
      slug: "gpt-4o",
      organizationId: openai.id,
      description: "Flagship multimodal model with native voice, vision, and text processing.",
      type: "chat",
      modalities: ["text", "image", "audio"],
      contextWindow: 128000,
      maxOutputTokens: 16384,
      inputPricePerM: 2.5,
      outputPricePerM: 10.0,
      releaseDate: new Date("2024-05-13"),
      license: "Proprietary",
      isFeatured: true,
      scores: [
        { benchmarkId: mmlu.id, score: 88.6 },
        { benchmarkId: humanEval.id, score: 90.2 },
        { benchmarkId: mathBench.id, score: 76.6 },
        { benchmarkId: arenaElo.id, score: 1286 },
      ],
      providers: [
        { orgId: openai.id, inputP: 2.5, outputP: 10.0, latency: 380, tps: 110 },
      ],
    },
    {
      name: "Gemini 1.5 Pro",
      slug: "gemini-1-5-pro",
      organizationId: google.id,
      description: "Breakthrough 2-million-token context window with deep multimodal reasoning.",
      type: "chat",
      modalities: ["text", "image", "audio", "video"],
      contextWindow: 2000000,
      maxOutputTokens: 8192,
      inputPricePerM: 1.25,
      outputPricePerM: 5.0,
      releaseDate: new Date("2024-09-24"),
      license: "Proprietary",
      isFeatured: true,
      scores: [
        { benchmarkId: mmlu.id, score: 85.9 },
        { benchmarkId: humanEval.id, score: 84.1 },
        { benchmarkId: mathBench.id, score: 67.7 },
        { benchmarkId: arenaElo.id, score: 1261 },
      ],
      providers: [
        { orgId: google.id, inputP: 1.25, outputP: 5.0, latency: 450, tps: 90 },
      ],
    },
    {
      name: "DeepSeek R1",
      slug: "deepseek-r1",
      organizationId: deepseek.id,
      description: "Open-weights reasoning model matching o1 performance at revolutionary low cost.",
      type: "reasoning",
      modalities: ["text"],
      contextWindow: 128000,
      maxOutputTokens: 8192,
      inputPricePerM: 0.55,
      outputPricePerM: 2.19,
      releaseDate: new Date("2025-01-20"),
      license: "MIT",
      isFeatured: true,
      scores: [
        { benchmarkId: mmlu.id, score: 90.8 },
        { benchmarkId: humanEval.id, score: 92.4 },
        { benchmarkId: mathBench.id, score: 97.3 },
        { benchmarkId: arenaElo.id, score: 1310 },
      ],
      providers: [
        { orgId: deepseek.id, inputP: 0.55, outputP: 2.19, latency: 950, tps: 45 },
        { orgId: groq.id, inputP: 0.75, outputP: 2.49, latency: 190, tps: 280 },
        { orgId: together.id, inputP: 0.8, outputP: 2.5, latency: 310, tps: 135 },
      ],
    },
    {
      name: "Llama 3.3 70B Instruct",
      slug: "llama-3-3-70b-instruct",
      organizationId: meta.id,
      description: "High-efficiency 70B open-weights model delivering 405B-grade performance.",
      type: "chat",
      modalities: ["text"],
      contextWindow: 128000,
      maxOutputTokens: 4096,
      inputPricePerM: 0.4,
      outputPricePerM: 0.8,
      releaseDate: new Date("2024-12-06"),
      license: "Llama 3.3 Community",
      isFeatured: false,
      scores: [
        { benchmarkId: mmlu.id, score: 86.4 },
        { benchmarkId: humanEval.id, score: 81.7 },
        { benchmarkId: mathBench.id, score: 68.4 },
        { benchmarkId: arenaElo.id, score: 1225 },
      ],
      providers: [
        { orgId: groq.id, inputP: 0.59, outputP: 0.79, latency: 140, tps: 310 },
        { orgId: together.id, inputP: 0.88, outputP: 0.88, latency: 260, tps: 140 },
      ],
    },
  ];
  for (const m of modelsData) {
    const createdModel = await prisma.model.create({
      data: {
        name: m.name,
        slug: m.slug,
        organizationId: m.organizationId,
        description: m.description,
        type: m.type,
        modalities: m.modalities,
        contextWindow: m.contextWindow,
        maxOutputTokens: m.maxOutputTokens,
        inputPricePerM: m.inputPricePerM,
        outputPricePerM: m.outputPricePerM,
        releaseDate: m.releaseDate,
        license: m.license,
        isFeatured: m.isFeatured,
        scores: {
          create: m.scores.map((s) => ({
            benchmarkId: s.benchmarkId,
            score: s.score,
          })),
        },
        providers: {
          create: m.providers.map((p) => ({
            organizationId: p.orgId,
            inputPricePerM: p.inputP,
            outputPricePerM: p.outputP,
            latencyMs: p.latency,
            throughputTps: p.tps,
          })),
        },
      },
    });
    console.log(`Created model: ${createdModel.name}`);
  }
  console.log("Seeding complete!");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
