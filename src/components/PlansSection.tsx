"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { prepaidPlans, postpaidPlans, formatVND, type Plan } from "@/lib/plans";
import { useSelection } from "@/lib/selection-context";
import { SectionHeading } from "./SectionHeading";

function PlanCard({ plan, type }: { plan: Plan; type: "Trả trước" | "Trả sau" }) {
  const { plan: selected, setPlan, openCart } = useSelection();
  const isSelected = selected?.code === plan.code;

  return (
    <motion.div
      layout
      className={`relative flex flex-col rounded-3xl p-6 transition ${
        plan.highlight
          ? "glass ring-1 ring-cyan/50"
          : "glass"
      } ${isSelected ? "ring-2 ring-ban" : ""}`}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-ban to-ban-deep px-3 py-1 text-[11px] font-semibold text-white shadow-md">
          <Sparkles size={12} /> Bán chạy
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-xl font-extrabold text-white">{plan.code}</h3>
        <span className="font-num text-lg font-bold text-cyan">{formatVND(plan.price)}</span>
      </div>
      <p className="mt-1 text-xs text-mist/60">{plan.duration}</p>

      <ul className="mt-4 flex-1 space-y-2 text-sm text-mist/80">
        <li className="flex gap-2">
          <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
          {plan.dataPerDay}
        </li>
        {plan.voice && (
          <li className="flex gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
            {plan.voice}
          </li>
        )}
        {plan.sms && (
          <li className="flex gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
            {plan.sms}
          </li>
        )}
        {plan.extra && (
          <li className="flex gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
            {plan.extra}
          </li>
        )}
      </ul>

      <button
        onClick={() => {
          setPlan({ code: plan.code, price: plan.price, type });
          openCart();
        }}
        className={`mt-5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
          isSelected
            ? "bg-ban text-night"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        {isSelected ? "Đã chọn gói này" : "Chọn gói này"}
      </button>
    </motion.div>
  );
}

export function PlansSection() {
  const [tab, setTab] = useState<"prepaid" | "postpaid">("prepaid");
  const plans = tab === "prepaid" ? prepaidPlans : postpaidPlans;
  const type = tab === "prepaid" ? "Trả trước" : "Trả sau";

  return (
    <section id="goi-cuoc" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Gói cước"
          title="Data thả ga, chọn gói theo đúng nhu cầu"
          desc="Từ SIM trả trước linh hoạt đến trả sau nhiều đặc quyền — MobiFone Sơn La có đủ lựa chọn cho mọi kiểu dùng mạng."
        />

        <div className="mt-8 flex justify-center">
          <div className="glass inline-flex rounded-full p-1">
            {(
              [
                { key: "prepaid", label: "SIM trả trước" },
                { key: "postpaid", label: "SIM trả sau" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  tab === t.key ? "text-night" : "text-mist/70 hover:text-white"
                }`}
              >
                {tab === t.key && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-electric to-cyan"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {plans.map((p) => (
              <PlanCard key={p.code} plan={p} type={type} />
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-mist/45">
          Giá gói đã bao gồm VAT. Dung lượng data áp dụng trên mạng MobiFone và khi chuyển vùng
          trong nước sang VNPT–VinaPhone. SIM trả sau yêu cầu cam kết sử dụng tối thiểu 12 tháng.
        </p>
      </div>
    </section>
  );
}
