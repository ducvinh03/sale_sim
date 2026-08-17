"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  MessageCircle,
  Mail,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { useSelection } from "@/lib/selection-context";
import { siteConfig } from "@/lib/config";
import { formatVND } from "@/lib/plans";

function formatSo(so: string) {
  return `${so.slice(0, 4)}.${so.slice(4, 7)}.${so.slice(7, 10)}`;
}

function buildZaloMessage({
  name,
  phone,
  plan,
  numbers,
  note,
}: {
  name: string;
  phone: string;
  plan?: { code: string; type: string; price: number } | null;
  numbers: string[];
  note: string;
}) {
  const lines = [
    "Xin chào MobiFone Sơn La,",
    "",
    "Tôi muốn tư vấn SIM/ gói cước MobiFone Sơn La.",
    name ? `Họ tên: ${name}` : "",
    phone ? `Số điện thoại: ${phone}` : "",
    plan
      ? `Gói cước quan tâm: ${plan.code} (${plan.type}, ${formatVND(plan.price)})`
      : "",
    numbers.length > 0
      ? `Số muốn chọn: ${numbers.map((n) => formatSo(n)).join(", ")}`
      : "",
    note ? `Ghi chú: ${note}` : "",
    "",
    "Vui lòng hỗ trợ tư vấn chi tiết và báo giá phù hợp.",
  ].filter(Boolean);

  return lines.join("\n");
}

export function OrderCart() {
  const { numbers, removeNumber, plan, cartOpen, closeCart } = useSelection();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const message = useMemo(
    () =>
      buildZaloMessage({
        name,
        phone,
        plan,
        numbers,
        note,
      }),
    [name, phone, plan, numbers, note],
  );

  async function handleCopyZaloText() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setToast("Đã sao chép tin nhắn cho Zalo");
    } catch {
      setCopied(false);
      setToast("Không thể copy tự động, vui lòng dán thủ công vào Zalo");
    }

    setTimeout(() => setCopied(false), 2500);
  }

  function handleOpenZalo() {
    const zaloLink = `https://zalo.me/${siteConfig.zaloPhone}`;
    const newTab = window.open(zaloLink, "_blank", "noopener,noreferrer");

    if (!newTab) {
      window.location.href = zaloLink;
    }
  }

  async function handleEmail() {
    const payload = {
      name,
      phone,
      email: "",
      note,
      plan: plan ? `${plan.code} (${plan.type})` : "",
      numbers: numbers.map((n) => n),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gửi email thất bại.");
      }

      closeCart();
      setToast("Yêu cầu tư vấn đã được gửi thành công.");
    } catch {
      const subject = encodeURIComponent("Yêu cầu tư vấn SIM MobiFone Sơn La");
      const body = encodeURIComponent(message);
      const mailtoLink = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.contactEmail}&su=${subject}&body=${body}`;

      try {
        const emailWindow = window.open(
          gmailLink,
          "_blank",
          "noopener,noreferrer",
        );
        if (!emailWindow) {
          window.location.href = mailtoLink;
        }
      } catch {
        window.location.href = mailtoLink;
      }
    }
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-night/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md overflow-y-auto bg-night-2 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h3 className="font-display text-lg font-bold text-white">
                Yêu cầu tư vấn
              </h3>
              <button
                onClick={closeCart}
                aria-label="Đóng"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-mist/70 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              {plan && (
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-mist/50">
                    Gói cước đã chọn
                  </div>
                  <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
                    <span className="font-num font-semibold text-white">
                      {plan.code}
                    </span>
                    <span className="text-sm text-cyan">
                      {formatVND(plan.price)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-mist/50">
                  <span>Số đã chọn ({numbers.length})</span>
                </div>
                {numbers.length === 0 ? (
                  <p className="text-sm text-mist/50">
                    Chưa có số nào. Quay lại mục &ldquo;Chọn số đẹp&rdquo; để
                    thêm số bạn thích.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {numbers.map((n) => (
                      <div
                        key={n}
                        className="glass flex items-center justify-between rounded-2xl px-4 py-2.5"
                      >
                        <span className="tabular font-num text-sm text-white">
                          {formatSo(n)}
                        </span>
                        <button
                          onClick={() => removeNumber(n)}
                          aria-label="Xoá số"
                          className="text-mist/40 hover:text-ban-deep"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-mist/50">
                  Thông tin liên hệ
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên"
                  className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-mist/40 focus:outline-none"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại liên hệ"
                  inputMode="tel"
                  className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-mist/40 focus:outline-none"
                />
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú thêm (không bắt buộc)"
                  rows={3}
                  className="w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-mist/40 focus:outline-none"
                />
              </div>

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleOpenZalo}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-4 py-3 text-sm font-semibold text-night shadow-lg shadow-electric/25 transition hover:brightness-110"
                  >
                    <MessageCircle size={17} />
                    Mở Zalo
                  </button>
                  <button
                    onClick={handleCopyZaloText}
                    className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    {copied ? <CheckCircle2 size={17} /> : <Copy size={17} />}
                    {copied ? "Đã copy" : "Copy tin nhắn"}
                  </button>
                </div>

                <button
                  onClick={handleEmail}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Mail size={17} />
                  Gửi yêu cầu qua Email
                </button>
                <div className="flex items-start gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-mist/50">
                  <Copy size={14} className="mt-0.5 shrink-0" />
                  Mở Zalo để chat nhanh hoặc bấm Copy tin nhắn để dán vào khung
                  chat.
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-cyan-400/30 bg-slate-950/90 px-4 py-2 text-sm font-medium text-cyan-100 shadow-lg shadow-cyan-500/20 backdrop-blur"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
