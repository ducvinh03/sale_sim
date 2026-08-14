"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useSelection } from "@/lib/selection-context";
import { SectionHeading } from "./SectionHeading";

type NumberItem = {
  id: number;
  so: string;
  dau: string;
  giua: string;
  duoi: string;
  camKetLabel: string;
  camKetPhi: number;
  tags: string[];
};

type ApiResult = {
  items: NumberItem[];
  total: number;
  page: number;
  totalPages: number;
};

function formatSo(so: string) {
  // 0798000994 -> 0798.000.994
  return `${so.slice(0, 4)}.${so.slice(4, 7)}.${so.slice(7, 10)}`;
}

export function NumberPicker() {
  const { numbers, addNumber, removeNumber, openCart } = useSelection();

  const [q, setQ] = useState("");
  const [dau, setDau] = useState("all");
  const [camKet, setCamKet] = useState("all");
  const [tag, setTag] = useState("all");
  const [page, setPage] = useState(1);

  const [dauList, setDauList] = useState<{ dau: string; count: number }[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [data, setData] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/numbers?meta=1")
      .then((r) => r.json())
      .then((d) => {
        setDauList(d.dauList ?? []);
        setTags(d.tags ?? []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setPage(1);
  }, [q, dau, camKet, tag]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const t = setTimeout(() => {
      const params = new URLSearchParams({
        q,
        dau: dau === "all" ? "" : dau,
        camKet,
        tag,
        page: String(page),
        pageSize: "24",
      });
      fetch(`/api/numbers?${params.toString()}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((d) => setData(d))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 280);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [q, dau, camKet, tag, page]);

  const selectedSet = useMemo(() => new Set(numbers), [numbers]);

  return (
    <section id="chon-so" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Kho số đẹp"
          title="Chọn số đúng gu, đúng phong thuỷ"
          desc="Hơn 27.000 số thuê bao đang chờ chủ nhân mới — lọc theo đầu số, mức cam kết, hoặc kiểu số bạn thích."
        />

        {/* Filters */}
        <div className="glass mt-10 rounded-3xl p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
              <Search size={16} className="text-mist/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                inputMode="numeric"
                placeholder="Tìm theo dãy số bất kỳ, VD: 79 hoặc 6868"
                className="w-full bg-transparent text-sm text-white placeholder:text-mist/40 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={dau}
                onChange={(e) => setDau(e.target.value)}
                className="rounded-full bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none [&>option]:bg-night-2"
              >
                <option value="all">Tất cả đầu số</option>
                {dauList.map((d) => (
                  <option key={d.dau} value={d.dau}>
                    {d.dau} ({d.count})
                  </option>
                ))}
              </select>

              <select
                value={camKet}
                onChange={(e) => setCamKet(e.target.value)}
                className="rounded-full bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none [&>option]:bg-night-2"
              >
                <option value="all">Mọi mức cam kết</option>
                <option value="khong">Không cam kết</option>
                <option value="150">Cam kết 150.000đ/24 tháng</option>
                <option value="300">Cam kết 300.000đ/24 tháng</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setTag("all")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                tag === "all" ? "bg-cyan text-night" : "bg-white/5 text-mist/70 hover:bg-white/10"
              }`}
            >
              Tất cả kiểu số
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  tag === t ? "bg-cyan text-night" : "bg-white/5 text-mist/70 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 flex items-center justify-between text-xs text-mist/50">
          <span>
            {loading ? "Đang tìm..." : `${data?.total.toLocaleString("vi-VN") ?? 0} số phù hợp`}
          </span>
          {numbers.length > 0 && (
            <button onClick={openCart} className="text-cyan hover:underline">
              Xem {numbers.length} số đã chọn →
            </button>
          )}
        </div>

        <div className="relative mt-3 min-h-[320px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-cyan" size={28} />
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={page + q + dau + camKet + tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0.3 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data?.items.map((n) => {
                const isSelected = selectedSet.has(n.so);
                return (
                  <div
                    key={n.id}
                    className={`glass flex items-center justify-between rounded-2xl px-4 py-3.5 transition ${
                      isSelected ? "ring-1 ring-ban" : ""
                    }`}
                  >
                    <div>
                      <div className="tabular font-num text-base font-semibold text-white sm:text-lg">
                        {formatSo(n.so)}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {n.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-cyan/10 px-2 py-0.5 text-[10px] font-medium text-cyan"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-mist/50">
                          {n.camKetPhi === 0 ? "Không cam kết" : n.camKetLabel}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => (isSelected ? removeNumber(n.so) : addNumber(n.so))}
                      aria-label={isSelected ? "Bỏ chọn số" : "Chọn số này"}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                        isSelected
                          ? "bg-ban text-night"
                          : "bg-white/10 text-white hover:bg-cyan hover:text-night"
                      }`}
                    >
                      {isSelected ? <Check size={16} /> : <Plus size={16} />}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {!loading && data?.items.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-mist/50">
              <span>Không tìm thấy số phù hợp.</span>
              <span className="text-xs">Thử bỏ bớt bộ lọc hoặc đổi từ khoá tìm kiếm.</span>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-white disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-mist/60">
              Trang {data.page} / {data.totalPages.toLocaleString("vi-VN")}
            </span>
            <button
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-white disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
