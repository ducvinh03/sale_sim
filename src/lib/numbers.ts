import fs from "fs";
import path from "path";

export type PhoneNumber = {
  id: number;
  so: string;
  dau: string;
  giua: string;
  duoi: string;
  maSo: string;
  mucCamKet: string;
  camKetLabel: string;
  camKetPhi: number;
  camKetThang: number;
  tags: string[];
};

let cache: PhoneNumber[] | null = null;
let dauListCache: { dau: string; count: number }[] | null = null;

function detectTags(so: string): string[] {
  const tags: string[] = [];
  const last3 = so.slice(-3);
  const last4 = so.slice(-4);
  const last6 = so.slice(-6);

  // Tứ quý: 4 chữ số cuối giống nhau
  if (/^(\d)\1{3}$/.test(last4)) tags.push("Tứ quý");
  // Tam hoa: 3 chữ số cuối giống nhau
  else if (/^(\d)\1{2}$/.test(last3)) tags.push("Tam hoa");

  // Lộc phát: chứa hoặc kết thúc 78 / 68
  if (last3.endsWith("78") || last4.endsWith("78")) tags.push("Lộc phát");
  if (last3.endsWith("68")) tags.push("Phát lộc");

  // Thần tài: kết thúc 79
  if (last3.endsWith("79")) tags.push("Thần tài");
  // Ông địa: kết thúc 39
  if (last3.endsWith("39")) tags.push("Ông địa");

  // Soi gương: 4 số cuối đối xứng, VD 1221, 4884
  if (last4.length === 4 && last4[0] === last4[3] && last4[1] === last4[2] && last4[0] !== last4[1]) {
    tags.push("Soi gương");
  }

  // Taxi: dạng aabb hoặc abab lặp cặp, VD 1212, 6767, 9090
  if (/^(\d)(\d)\1\2$/.test(last4) || /^(\d)(\d)\2\1$/.test(last4)) {
    tags.push("Taxi");
  }

  // Tiến lên (đồng tiến): 4 số cuối tăng dần liên tiếp, VD 1234, 6789
  const digits = last4.split("").map(Number);
  if (
    digits.length === 4 &&
    digits[1] === digits[0] + 1 &&
    digits[2] === digits[1] + 1 &&
    digits[3] === digits[2] + 1
  ) {
    tags.push("Tiến lên");
  }

  // Lộc phát trọn đời: 6 số cuối chứa nhiều 68/78/79
  if (/6[68]|7[89]/.test(last6) && tags.length === 0) {
    tags.push("Số gánh");
  }

  return tags;
}

function loadAll(): PhoneNumber[] {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "data", "numbers.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as Omit<PhoneNumber, "tags">[];
  cache = parsed.map((n) => ({ ...n, tags: detectTags(n.so) }));
  return cache;
}

export function getDauList(): { dau: string; count: number }[] {
  if (dauListCache) return dauListCache;
  const all = loadAll();
  const map = new Map<string, number>();
  for (const n of all) {
    map.set(n.dau, (map.get(n.dau) ?? 0) + 1);
  }
  dauListCache = Array.from(map.entries())
    .map(([dau, count]) => ({ dau, count }))
    .sort((a, b) => a.dau.localeCompare(b.dau));
  return dauListCache;
}

export type NumberQuery = {
  q?: string; // tìm theo chuỗi số bất kỳ
  dau?: string;
  camKet?: string; // "khong" | "150" | "300" | "" (tất cả)
  tag?: string;
  page?: number;
  pageSize?: number;
};

export function queryNumbers(query: NumberQuery) {
  const all = loadAll();
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(60, Math.max(6, query.pageSize ?? 24));

  let filtered = all;

  if (query.q && query.q.trim()) {
    const q = query.q.replace(/\D/g, "");
    if (q) filtered = filtered.filter((n) => n.so.includes(q));
  }
  if (query.dau) {
    filtered = filtered.filter((n) => n.dau === query.dau);
  }
  if (query.camKet && query.camKet !== "all") {
    if (query.camKet === "khong") {
      filtered = filtered.filter((n) => n.camKetPhi === 0);
    } else if (query.camKet === "150") {
      filtered = filtered.filter((n) => n.camKetPhi === 150000);
    } else if (query.camKet === "300") {
      filtered = filtered.filter((n) => n.camKetPhi === 300000);
    }
  }
  if (query.tag && query.tag !== "all") {
    filtered = filtered.filter((n) => n.tags.includes(query.tag!));
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export function getAllTags(): string[] {
  return [
    "Tứ quý",
    "Tam hoa",
    "Lộc phát",
    "Phát lộc",
    "Thần tài",
    "Ông địa",
    "Soi gương",
    "Taxi",
    "Tiến lên",
    "Số gánh",
  ];
}
