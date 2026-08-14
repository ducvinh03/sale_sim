"use client";

import { motion } from "framer-motion";
import { Smartphone, QrCode, Zap, ShieldCheck } from "lucide-react";

const steps = [
  { icon: QrCode, title: "Đăng ký online", desc: "Gửi yêu cầu eSIM qua Zalo/hotline, không cần ra cửa hàng" },
  { icon: Zap, title: "Kích hoạt vài phút", desc: "Quét mã QR MobiFone gửi về, có số dùng ngay lập tức" },
  { icon: Smartphone, title: "Dùng song song 2 số", desc: "Giữ nguyên SIM cũ, thêm số MobiFone trên cùng một máy" },
  { icon: ShieldCheck, title: "Đủ mọi ưu đãi", desc: "Áp dụng toàn bộ gói cước ATS, S, MF như SIM vật lý" },
];

export function EsimSection() {
  return (
    <section id="esim" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cyan">
              Dành cho máy 1 khe SIM
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Không muốn tháo SIM cũ?
              <br />
              Dùng ngay eSIM MobiFone
            </h2>
            <p className="mt-4 max-w-md text-mist/75">
              Nhiều dòng điện thoại hiện đại (iPhone, các flagship đời mới) chỉ có một khe SIM
              vật lý. Với eSIM, bạn giữ nguyên số cũ và có thêm số MobiFone chỉ trong vài phút —
              không cần tháo lắp, không lo mất SIM.
            </p>
            <a
              href="#lien-he"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-6 py-3 text-sm font-semibold text-night shadow-lg shadow-electric/30 transition hover:brightness-110"
            >
              Đăng ký eSIM ngay
            </a>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15">
                  <s.icon size={18} className="text-cyan" />
                </div>
                <div className="mt-3 font-display text-sm font-bold text-white">{s.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-mist/60">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
