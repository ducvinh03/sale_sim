"use client";

import { useMemo, useState } from "react";
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

export function OrderCart() {
  const { numbers, removeNumber, plan, cartOpen, closeCart } = useSelection();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [
      `Yêu cầu tư vấn SIM MobiFone Sơn La`,
      name && `Họ tên: ${name}`,
      phone && `SĐT liên hệ: ${phone}`,
      plan &&
        `Gói cước quan tâm: ${plan.code} (${plan.type}, ${formatVND(plan.price)})`,
      numbers.length > 0 &&
        `Số muốn chọn:\n${numbers.map((n) => "- " + formatSo(n)).join("\n")}`,
      note && `Ghi chú: ${note}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [name, phone, plan, numbers, note]);

  async function handleZalo() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard may be unavailable; user can still copy from summary manually
    }
    window.open(`https://zalo.me/${siteConfig.zaloPhone}`, "_blank");
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
      window.alert(
        "Yêu cầu tư vấn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm.",
      );
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
                <button
                  onClick={handleZalo}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-5 py-3.5 text-sm font-semibold text-night shadow-lg shadow-electric/25 transition hover:brightness-110"
                >
                  {copied ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <MessageCircle size={17} />
                  )}
                  {copied
                    ? "Đã copy nội dung — mở Zalo để gửi"
                    : "Gửi yêu cầu qua Zalo"}
                </button>
                <button
                  onClick={handleEmail}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Mail size={17} />
                  Gửi yêu cầu qua Email
                </button>
                <div className="flex items-start gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-mist/50">
                  <Copy size={14} className="mt-0.5 shrink-0" />
                  Nút Zalo sẽ tự sao chép nội dung yêu cầu vào bộ nhớ tạm — bạn
                  chỉ cần dán (paste) vào khung chat khi Zalo mở lên.
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
