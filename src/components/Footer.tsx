import { Phone, Globe, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

const hashtags = [
  "#MobiFoneSonLa",
  "#SimMobiFone",
  "#SimBongSen",
  "#SonLa",
  "#TayBac",
  "#GoiCuocMobiFone",
  "#SimGiaRe",
];

export function Footer() {
  return (
    <footer id="lien-he" className="relative border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-lg font-extrabold text-white">
              5G <span className="text-cyan"></span>
            </span>
            <p className="mt-3 text-sm text-mist/60">{siteConfig.tagline}</p>
            <p className="mt-1 text-xs text-mist/40">
              MobiFone {siteConfig.zone} · Sơn La
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-mist/50">
              Liên hệ
            </div>
            <div className="mt-3 space-y-2 text-sm text-mist/75">
              <a
                href={`tel:${siteConfig.hotline}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone size={14} className="text-cyan" />{" "}
                {siteConfig.hotlineDisplay}
              </a>
              <a
                href={`tel:${siteConfig.tongDai}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone size={14} className="text-cyan" /> Tổng đài{" "}
                {siteConfig.tongDai}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan" /> {siteConfig.address}
              </span>
              <a
                href="https://mobifone.vn"
                target="_blank"
                className="flex items-center gap-2 hover:text-white"
              >
                <Globe size={14} className="text-cyan" /> mobifone.vn
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-mist/50">
              Điều hướng
            </div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-mist/75">
              <a href="#goi-cuoc" className="hover:text-white">
                Gói cước
              </a>
              <a href="#esim" className="hover:text-white">
                eSIM
              </a>
              <a href="#vung-son-la" className="hover:text-white">
                Ưu đãi vùng
              </a>
              <a href="#chon-so" className="hover:text-white">
                Chọn số đẹp
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-mist/50">
              Hashtag
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {hashtags.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-mist/60"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-mist/35">
          © {new Date().getFullYear()} MobiFone Sơn La. Trang giới thiệu phi
          chính thức phục vụ mục đích tư vấn bán hàng — vui lòng xác nhận lại
          chi tiết gói cước tại quầy giao dịch hoặc tổng đài chính thức trước
          khi đăng ký.
        </div>
      </div>
    </footer>
  );
}
