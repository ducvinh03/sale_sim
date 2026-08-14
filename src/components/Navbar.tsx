"use client";

import { Phone, ShoppingBag, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useSelection } from "@/lib/selection-context";

const links = [
  { href: "#goi-cuoc", label: "Gói cước" },
  { href: "#esim", label: "eSIM" },
  { href: "#vung-son-la", label: "Ưu đãi vùng" },
  { href: "#chon-so", label: "Chọn số đẹp" },
  { href: "#lien-he", label: "Liên hệ" },
];

const marqueeText =
  "Quý khách hàng có nhu cầu chọn sim số đẹp liên hệ CV Đinh Đức Vình số điện thoại 0907279196 để được tư vấn tận nơi!";

export function Navbar() {
  const { numbers, toggleCart } = useSelection();

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
            <span className="font-display text-sm font-extrabold tracking-wide text-white">
              5G <span className="text-cyan">MobiFone</span>
            </span>
            <span className="hidden text-xs text-mist/70 sm:inline">
              · Sơn La
            </span>
          </div>

          <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-mist/85 transition hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.tongDai}`}
              className="glass hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15 sm:flex"
            >
              <Phone size={15} className="text-cyan" />
              {siteConfig.tongDai}
            </a>
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-4 py-2 text-sm font-semibold text-night shadow-lg shadow-electric/30 transition hover:brightness-110"
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline">Số đã chọn</span>
              {numbers.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ban-deep text-[11px] font-bold text-white">
                  {numbers.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="fixed left-0 top-[72px] z-40 w-full border-b border-cyan-400/30 bg-[#071a31]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <div className="marquee-track flex min-w-max items-center gap-8 px-4 py-2 text-[12px] font-medium text-cyan-100">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Sparkles size={12} className="text-cyan" />
              {marqueeText}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Sparkles size={12} className="text-cyan" />
              {marqueeText}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
