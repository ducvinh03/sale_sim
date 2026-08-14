"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useSelection } from "@/lib/selection-context";

export function FloatingCartButton() {
  const { numbers, plan, openCart } = useSelection();
  const count = numbers.length + (plan ? 1 : 0);

  function handleZalo() {
    window.open(
      `https://zalo.me/${siteConfig.zaloPhone}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function handleEmail() {
    const payload = {
      name: "Khách hàng",
      phone: siteConfig.hotline,
      email: siteConfig.contactEmail,
      note: "Yêu cầu tư vấn qua nút chat nhanh.",
      plan: "SIM MobiFone Sơn La",
      numbers: [],
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

      window.alert(
        "Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm.",
      );
    } catch {
      const subject = encodeURIComponent("Yêu cầu tư vấn SIM MobiFone Sơn La");
      const body = encodeURIComponent(
        [
          "Xin chào,",
          "",
          "Tôi muốn nhận tư vấn về SIM MobiFone Sơn La.",
          "Vui lòng hỗ trợ tôi với chi tiết gói cước và số đẹp phù hợp.",
          "",
          "Cảm ơn!",
        ].join("\n"),
      );

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
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={handleEmail}
          className="group relative inline-flex items-center rounded-full border border-cyan-400/50 bg-[#071c31]/90 px-3 py-2 text-[11px] font-semibold text-cyan-100 shadow-[0_8px_24px_rgba(34,211,238,0.2)] backdrop-blur-sm transition hover:scale-[1.02] hover:border-cyan-300/70 hover:bg-[#0b243a]"
          aria-label="Gửi email để nhận tư vấn"
        >
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
            <MessageCircle size={12} />
          </span>
          Ấn vào đây để nhận tư vấn
          <span className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 border-b border-r border-cyan-400/50 bg-[#071c31]" />
        </button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleZalo}
          aria-label="Liên hệ qua Zalo"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#27d4ff] via-[#00c2ff] to-[#0e86ff] text-white shadow-[0_12px_30px_rgba(39,212,255,0.45)] ring-4 ring-white/10 transition-transform"
        >
          <MessageCircle size={24} strokeWidth={2.4} />
        </motion.button>
      </div>

      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            onClick={openCart}
            className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-5 py-3.5 text-sm font-semibold text-night shadow-2xl shadow-electric/40 lg:hidden"
          >
            <ShoppingBag size={17} />
            Xem yêu cầu ({numbers.length}
            {plan ? " + gói" : ""})
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
