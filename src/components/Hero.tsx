"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Gauge, Wifi, PlayCircle, Users, ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { RiverBackdrop } from "./RiverBackdrop";

const badges = [
  { icon: Gauge, title: "Tốc độ vượt trội", desc: "Lướt web, xem phim mượt mà không gián đoạn" },
  { icon: Wifi, title: "Kết nối ổn định", desc: "Độ phủ rộng khắp, trải nghiệm liền mạch" },
  { icon: PlayCircle, title: "Công nghệ hiện đại", desc: "Tiên phong 5G cho cuộc sống thông minh" },
  { icon: Users, title: "Đồng hành cùng Sơn La", desc: "Kết nối cộng đồng, phát triển bền vững" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.png"
          alt="Kết nối siêu tốc 5G MobiFone Sơn La"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/80 to-night" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/40 to-transparent" />
      </div>

      <RiverBackdrop className="opacity-70" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8">
        <motion.div initial="hidden" animate="show" className="max-w-3xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-cyan"
          >
            <MapPin size={14} />
            MobiFone {siteConfig.zone} · Sơn La – Tây Bắc
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-display text-4xl font-extrabold leading-[1.08] text-gradient sm:text-5xl md:text-6xl"
          >
            Kết nối siêu tốc,
            <br />
            bứt phá mọi giới hạn
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="mt-5 max-w-xl text-base text-mist/80 sm:text-lg">
            Data thả ga, gọi thoải mái, ưu đãi riêng cho khách hàng Sơn La — cùng kho số đẹp
            chọn theo sở thích. MobiFone đồng hành cùng bạn vươn xa cùng công nghệ.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#chon-so"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-6 py-3 text-sm font-semibold text-night shadow-xl shadow-electric/30 transition hover:brightness-110"
            >
              Chọn số đẹp ngay
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#goi-cuoc"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Xem gói cước
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:max-w-4xl"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              custom={i + 4}
              variants={fadeUp}
              className="glass rounded-2xl p-4"
            >
              <b.icon size={20} className="text-cyan" />
              <div className="mt-3 font-display text-sm font-bold text-white">{b.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-mist/65">{b.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
