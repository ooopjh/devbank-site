"use client";

import type { KnowledgeBaseArticle } from "@/types/content";
import Link from "next/link";
import { useMemo, useState } from "react";

function scoreArticle(article: KnowledgeBaseArticle, query: string) {
  const q = query.toLowerCase();
  const titleHit = article.title.toLowerCase().includes(q) ? 4 : 0;
  const summaryHit = article.summary.toLowerCase().includes(q) ? 2 : 0;
  const tagHit = article.tags.some((tag) => tag.toLowerCase().includes(q)) ? 3 : 0;
  const bodyHit = article.body.toLowerCase().includes(q) ? 1 : 0;
  return titleHit + summaryHit + tagHit + bodyHit;
}

export function KnowledgeBaseIndex({ articles }: { articles: KnowledgeBaseArticle[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "relevance">("relevance");

  const categories = useMemo(() => ["All", ...new Set(articles.map((article) => article.category))], [articles]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const next = articles
      .filter((article) => (category === "All" ? true : article.category === category))
      .map((article) => ({
        article,
        relevance: normalized ? scoreArticle(article, normalized) : 0,
      }))
      .filter(({ article, relevance }) => {
        if (!normalized) return true;
        return relevance > 0 || article.body.toLowerCase().includes(normalized);
      });

    return next.sort((left, right) => {
      if (sortBy === "newest") {
        return new Date(right.article.publishedAt).getTime() - new Date(left.article.publishedAt).getTime();
      }
      if (right.relevance !== left.relevance) {
        return right.relevance - left.relevance;
      }
      return new Date(right.article.publishedAt).getTime() - new Date(left.article.publishedAt).getTime();
    });
  }, [articles, category, query, sortBy]);

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 md:grid-cols-3">
        <label className="grid gap-1 text-sm text-zinc-200">
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, summary, tags, or content"
            className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          />
        </label>

        <label className="grid gap-1 text-sm text-zinc-200">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm text-zinc-200">
          Sort
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "newest" | "relevance")}
            className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none transition focus:border-[#FF0000]"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
          No knowledge base articles matched your filters. Try a broader search or reset category filters.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map(({ article }) => (
            <li key={article.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{article.category}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                <Link href={`/knowledge-base/${article.slug}`} className="transition hover:text-[#FF0000]">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-zinc-300">{article.summary}</p>
              <p className="mt-3 text-xs text-zinc-400">Published {new Date(article.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
