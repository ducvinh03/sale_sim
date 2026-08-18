"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { zoneRates } from "@/lib/plans";

export function ZoneSection() {
  return (
    <section id="vung-son-la" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tea/10 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-tea/20 px-3 py-1 text-xs font-semibold text-tea">
              <MapPin size={13} /> Ưu đãi riêng khu vực
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Người Sơn La gọi trong khu vực {siteConfig.zone} — giá rẻ bất ngờ
            </h2>
            <p className="mt-4 max-w-lg text-mist/75">
              SIM Bông Sen thuộc khu vực {siteConfig.zone}, gồm 7 tỉnh:{" "}
              <span className="text-white">
                {siteConfig.zoneAreas.join(", ")}
              </span>
              . Gọi cho người thân, bạn bè, đối tác trong vùng — cước rẻ gấp
              nhiều lần so với gọi ngoài khu vực.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {siteConfig.zoneAreas.map((a) => (
                <span
                  key={a}
                  className="glass rounded-full px-3 py-1.5 text-xs text-mist/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass overflow-hidden rounded-3xl"
          >
            <div className="border-b border-white/10 px-6 py-4">
              <span className="font-display text-sm font-bold text-white">
                Bảng cước thoại &amp; SMS — Khu vực {siteConfig.zone}
              </span>
            </div>
            <div className="divide-y divide-white/10">
              {zoneRates.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <span className="text-sm text-mist/70">{r.label}</span>
                  <span className="font-num text-base font-bold text-cyan">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
