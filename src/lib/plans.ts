export type Plan = {
  code: string;
  price: number; // VNĐ
  duration: string;
  dataPerDay: string;
  voice?: string;
  sms?: string;
  extra?: string;
  highlight?: boolean;
};

export const prepaidPlans: Plan[] = [
  {
    code: "ATS60",
    price: 60000,
    duration: "30 ngày",
    dataPerDay: "4 GB/ngày",
  },
  {
    code: "ATS79",
    price: 79000,
    duration: "30 ngày",
    dataPerDay: "4 GB/ngày",
    voice: "Miễn phí nội mạng <10 phút (tối đa 1.000 phút), 100 phút liên mạng",
    extra: "Free data Facebook, YouTube, TikTok",
    highlight: true,
  },
  {
    code: "6ATS60",
    price: 360000,
    duration: "180 ngày",
    dataPerDay: "5 GB/ngày",
  },
  {
    code: "6ATS79",
    price: 474000,
    duration: "180 ngày",
    dataPerDay: "5 GB/ngày",
    extra: "Ưu đãi thoại & data như ATS79, dùng nửa năm khỏi nạp lại",
  },
  {
    code: "12ATS60",
    price: 720000,
    duration: "360 ngày",
    dataPerDay: "6 GB/ngày",
  },
  {
    code: "12ATS79",
    price: 948000,
    duration: "360 ngày",
    dataPerDay: "6 GB/ngày",
    extra: "Ưu đãi thoại & data như ATS79, trọn 1 năm an tâm",
    highlight: true,
  },
];

export const postpaidPlans: Plan[] = [
  {
    code: "S160",
    price: 160000,
    duration: "31 ngày / chu kỳ",
    dataPerDay: "7 GB/ngày",
    voice: "Miễn phí nội mạng <20 phút (tối đa 1.500 phút), 200 phút liên mạng",
    sms: "200 SMS nội mạng",
  },
  {
    code: "S200",
    price: 200000,
    duration: "31 ngày / chu kỳ",
    dataPerDay: "8 GB/ngày",
    voice: "Miễn phí nội mạng <20 phút (tối đa 2.000 phút), 300 phút liên mạng",
    sms: "300 SMS nội mạng",
    extra: "Free data Facebook, YouTube, TikTok",
    highlight: true,
  },
  {
    code: "S250",
    price: 250000,
    duration: "31 ngày / chu kỳ",
    dataPerDay: "10 GB/ngày",
    voice: "Miễn phí nội mạng <20 phút (tối đa 2.000 phút), 300 phút liên mạng",
    sms: "300 SMS nội mạng",
    extra: "Free data Facebook, YouTube, TikTok",
    highlight: true,
  },
  {
    code: "MF159",
    price: 159000,
    duration: "31 ngày",
    dataPerDay: "6 GB/ngày",
    voice: "Miễn phí gọi nội mạng <10 phút (tối đa 1.500 phút), 200 phút liên mạng",
    extra: "Free Facebook, YouTube trong 6 tháng",
  },
  {
    code: "MF219",
    price: 219000,
    duration: "31 ngày",
    dataPerDay: "9 GB/ngày",
    voice: "Miễn phí gọi nội mạng <10 phút (tối đa 2.000 phút), 250 phút liên mạng",
    extra: "Free Facebook, YouTube trong 6 tháng",
  },
  {
    code: "MF329",
    price: 329000,
    duration: "31 ngày",
    dataPerDay: "10 GB/ngày",
    voice: "Miễn phí gọi nội mạng <10 phút (tối đa 3.000 phút), 500 phút liên mạng",
    extra: "Free Facebook, YouTube trong 6 tháng",
  },
];

export const zoneRates = [
  { label: "Gọi nội mạng trong Zone", value: "~100đ/phút" },
  { label: "Gọi liên mạng trong Zone", value: "~590đ/phút" },
  { label: "Gọi ngoài Zone", value: "~1.880đ/phút" },
  { label: "SMS nội/liên mạng", value: "250đ/tin" },
];

export function formatVND(value: number) {
  return value.toLocaleString("vi-VN") + "đ";
}
