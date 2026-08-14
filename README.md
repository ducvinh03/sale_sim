# MobiFone Sơn La — Website bán SIM

Website Next.js giới thiệu gói cước, eSIM, ưu đãi vùng Zone CT4 và công cụ chọn số đẹp
từ kho hơn 27.000 số thuê bao, gửi yêu cầu tư vấn qua Zalo hoặc Email.

## 1. Cài đặt

Yêu cầu: Node.js 18.18 trở lên (khuyến nghị 20+).

```bash
npm install
```

## 2. Cấu hình trước khi chạy

Mở file `src/lib/config.ts` và cập nhật:

- `contactEmail` — **bắt buộc đổi** sang email kinh doanh thật của bạn (hiện đang để
  giá trị mẫu `kinhdoanh.sonla@mobifone.vn`)
- `hotline`, `tongDai`, `zaloPhone` — đổi nếu số điện thoại thay đổi
- `zaloPhone` dùng để tạo link `https://zalo.me/<số>` mở khung chat Zalo

## 3. Chạy thử (development)

```bash
npm run dev
```

Mở http://localhost:3000

## 4. Build & chạy bản production

```bash
npm run build
npm run start
```

## 5. Deploy lên Vercel (khuyến nghị, miễn phí, nhanh nhất)

1. Đẩy project lên GitHub (repo riêng hoặc private)
2. Vào https://vercel.com → New Project → chọn repo vừa tạo
3. Vercel tự nhận diện Next.js, chỉ cần bấm Deploy
4. Sau khi deploy xong, có thể gắn domain riêng (VD: simmobifonesonla.vn) trong mục
   Settings → Domains

Không cần biến môi trường (API key) nào — toàn bộ dữ liệu số/gói cước đọc từ file JSON
có sẵn trong project (`data/numbers.json`).

## 6. Cập nhật dữ liệu kho số

Danh sách số hiện tại được chuyển đổi từ file `Dải_số_đến_ngày_13_08_2026.xlsx`
sang `data/numbers.json`. Khi có dải số mới, chỉnh sửa/xuất lại file Excel theo đúng
cấu trúc cột (STT, Số TB, Đầu, 3 số giữa, 3 số đuôi, Ngày thay đổi, Mã số, Mức cam kết),
rồi nhờ chuyển đổi lại thành `data/numbers.json` (script Python dùng thư viện `openpyxl`,
đọc từ dòng 6 trở đi).

## 7. Cập nhật gói cước

Sửa trực tiếp trong `src/lib/plans.ts` — mỗi gói là một object trong mảng
`prepaidPlans` (SIM trả trước) hoặc `postpaidPlans` (SIM trả sau).

## 8. Cấu trúc thư mục chính

```
data/numbers.json              Dữ liệu 27.242 số thuê bao
src/lib/config.ts              Hotline, Zalo, Email, thông tin Zone
src/lib/plans.ts               Dữ liệu gói cước trả trước/trả sau
src/lib/numbers.ts             Xử lý tìm kiếm/lọc/gắn nhãn số đẹp (server)
src/app/api/numbers/route.ts   API trả dữ liệu số theo bộ lọc
src/lib/selection-context.tsx  State giỏ số/gói đã chọn (React Context)
src/components/                Toàn bộ giao diện (Hero, PlansSection, NumberPicker...)
public/images/hero-banner.png  Ảnh banner nền hero
```

## 9. Ghi chú quan trọng trước khi vận hành chính thức

- Đã build production thành công, không lỗi.
- Nút "Gửi yêu cầu qua Zalo" mở `zalo.me/<số điện thoại>` và tự copy nội dung yêu cầu
  vào clipboard (Zalo không hỗ trợ điền sẵn tin nhắn qua URL nên người dùng cần dán
  thủ công — đã có hướng dẫn ngay trong giao diện).
- Nút "Gửi yêu cầu qua Email" dùng `mailto:` — mở ứng dụng email mặc định của khách,
  không cần server gửi mail, không cần cấu hình SMTP.
- Trước khi chạy quảng cáo thật, nên kiểm tra lại giá/gói cước với dữ liệu chính thức
  mới nhất từ MobiFone vì chương trình khuyến mãi có thể thay đổi theo thời gian.
