# MC Portfolio — Website MC sự kiện (giao diện "Prism Aurora")

Website một trang cho MC sự kiện: HTML + Tailwind CSS v4 + JavaScript thuần, không framework, không bundler.
Toàn bộ nội dung nằm trong **một file duy nhất: `site.config.js`**.

Giao diện thiết kế cho **điện thoại 390px trước**, máy tính là bản mở rộng:
nền tím đêm, viền ánh sáng lăng kính xoay quanh khung hero, chùm đèn sân khấu, thẻ kính kiểu bento,
font Unbounded (tiêu đề) + Inter (nội dung).

## Cài đặt

Yêu cầu **Node.js >= 20**.

```bash
npm install
```

## Các lệnh

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Build (không minify), mở server tại http://localhost:5173 và tự build lại khi sửa `index.html`, `site.config.js`, `src/`, `public/` |
| `npm run build` | Build bản chính thức (CSS minify) vào `dist/` |
| `npm run preview` | Chỉ phục vụ `dist/` đang có, không build |
| `node scripts/build.mjs --html-only` | Chỉ ghép HTML, bỏ qua CSS (nhanh) |

- Trên Windows PowerShell nếu `npm` bị chặn script, dùng `npm.cmd run dev`.
- Đổi cổng: `PORT=3000 npm run dev` (PowerShell: `$env:PORT=3000; npm run dev`).
- Giả lập GitHub Pages dạng project: `npm run dev -- --base=/mc-portfolio/` rồi mở http://localhost:5173/mc-portfolio/.
- **Xem thử trên điện thoại thật:** `npm run dev` in thêm dòng `Mạng LAN (điện thoại): http://192.168.x.x:5173/`.
  Điện thoại bắt cùng Wi-Fi với máy tính rồi mở địa chỉ đó (lần đầu Windows có thể hỏi cho phép Node.js qua tường lửa — chọn *Private network*).

Sau mỗi lần build, terminal sẽ báo:
- **Cảnh báo vàng**: file ảnh/video được khai báo nhưng chưa có trong `public/`, và các placeholder `[IN_HOA]` chưa thay.
- **Lỗi đỏ**: template dùng key không có trong config (lệnh build trả mã lỗi 1).

## Sửa nội dung

1. Mở `site.config.js` và sửa chữ, link, danh sách dịch vụ/video/ảnh… Mỗi mục có comment hướng dẫn và kích thước ảnh (điện thoại ghi trước, máy tính sau).
2. Thêm/bớt dịch vụ, video, ảnh gallery, đối tác, cảm nhận, câu hỏi bằng cách thêm/xóa object trong mảng `items`.
3. Đường dẫn ảnh viết dạng `public/images/...` (không có dấu `/` ở đầu).
4. Không sửa tay thư mục `dist/` — nó bị xóa và tạo lại mỗi lần build.

Link còn là placeholder (`[ZALO_LINK]`, `[SO_DIEN_THOAI]`…) sẽ tự trỏ về mục Liên hệ, nên không bao giờ thành link hỏng.
Ảnh chưa có sẽ tự hiện **khung ánh sáng cùng tỉ lệ** — build chỉ chèn thẻ `<img>` khi file thật sự tồn tại, nên trang không có lỗi 404 ảnh.

### Thứ tự các khu vực

Hero → Đối tác → Giới thiệu → Dịch vụ → Video showreel → Gallery → Cảm nhận → Hỏi đáp → Liên hệ → Footer.
Dải đối tác được đặt ngay sau hero để khách thấy "bằng chứng tin cậy" sớm. Muốn đổi thứ tự, kéo các dòng `{{{ @...Section }}}` trong `index.html`.

## Key mới (đánh dấu `(MỚI)` trong `site.config.js`)

Không key cũ nào bị xóa hay đổi tên — chỉ thêm:

| Key | Ý nghĩa |
|---|---|
| `ui.showMore`, `ui.showLess` | Chữ trên nút thu gọn: "Xem thêm (N)" / "Thu gọn" |
| `ui.skipLink`, `ui.menuLabel`, `ui.closeLabel` | Chữ của link "Bỏ qua đến nội dung", nút Menu / Đóng |
| `ui.videoMissing` | Thông báo khi bấm video chưa có link |
| `hero.image.mobile`, `hero.image.desktop` | Ảnh hero tối ưu (dọc cho điện thoại, ngang cho máy tính). Để `""` thì dùng `backgroundMobile` / `backgroundDesktop` cũ |
| `hero.imagePosition.mobile/.desktop` | Điểm lấy nét ảnh (CSS `object-position`), VD `"50% 20%"` — đặt vào khuôn mặt MC |
| `hero.availability` | Nhãn có chấm xanh nhấp nháy trên tiêu đề (VD "Đang nhận lịch…"). Để `""` thì ẩn |
| `about.summary` | 1–2 câu tóm tắt luôn hiển thị; `story` cũ nằm trong khối mở/đóng |
| `about.storyToggleLabel` | Chữ trên nút mở câu chuyện đầy đủ |
| `services.mobileVisible`, `videos.mobileVisible`, `gallery.mobileVisible`, `testimonials.mobileVisible` | Số mục hiện sẵn trên điện thoại (xem mục dưới) |
| `faq` | Khu vực Câu hỏi thường gặp: `sectionLabel`, `heading`, `subheading`, `openFirst`, `items: [{ question, answer }]` |
| `dock` | Thanh đặt lịch nổi ở đáy màn hình điện thoại: `enabled`, `callLabel`, `bookLabel`, `bookHref` |

Ảnh riêng cho điện thoại (tùy chọn) có thể thêm vào từng mục: `services.items[].imageMobile`, `gallery.items[].srcMobile`.

## Chỉnh số mục hiển thị trên điện thoại

Mỗi danh sách dài có key `mobileVisible`:

```js
services: {
  mobileVisible: 3,   // điện thoại hiện 3 thẻ đầu, phần còn lại sau nút "Xem thêm (3)"
  ...
},
```

- Màn hình **< 1024px**: chỉ hiện `mobileVisible` mục đầu, nút **"Xem thêm (N)"** mở phần còn lại (đổi thành **"Thu gọn"**, bấm lại sẽ cuộn về đầu mục).
- Màn hình **≥ 1024px**: luôn hiện đầy đủ, không có nút.
- Xóa key hoặc đặt số ≥ số mục → không thu gọn.
- Mọi mục vẫn nằm sẵn trong HTML (tốt cho SEO). Trình duyệt tắt JavaScript sẽ hiện đầy đủ.
- Câu chuyện "Giới thiệu" và từng câu hỏi FAQ dùng `<details>` gốc của HTML — bàn phím và trình đọc màn hình dùng được ngay.

## Placeholder cần thay (trong `site.config.js`)

| Placeholder | Ý nghĩa / ví dụ |
|---|---|
| `[TEN_MC]` | Tên MC / thương hiệu |
| `[SO_NAM_KINH_NGHIEM]`, `[SO_SU_KIEN]` | Số liệu, VD `8`, `500` |
| `[SO_DIEN_THOAI]` | `0901 234 567` (tự tạo link `tel:`) |
| `[ZALO_LINK]` | `https://zalo.me/0901234567` |
| `[EMAIL]` | Email nhận yêu cầu báo giá từ form |
| `[FACEBOOK_LINK]`, `[YOUTUBE_LINK]` | Link trang cá nhân |
| `[YOUTUBE_SHOWREEL_URL]`, `[YOUTUBE_VIDEO_01..04]` | Link YouTube/Vimeo hoặc `public/videos/xxx.mp4` |
| `[WEBSITE_URL]` | URL website sau khi deploy (cần cho ảnh chia sẻ Facebook/Zalo) |
| `[DIA_CHI]` | Khu vực hoạt động (để placeholder thì không hiện) |

## Ảnh cần chuẩn bị

Ưu tiên `.webp`, tên kebab-case có số thứ tự; bản riêng cho điện thoại thêm đuôi `-m`. Thư mục đã tạo sẵn trong `public/images/`.

| File | Điện thoại | Máy tính |
|---|---|---|
| `public/images/hero/hero-01-m.webp` | 750×1334 (dọc 9:16), ≤ 120KB | — |
| `public/images/hero/hero-01.webp` | — | 1920×1080 (ngang 16:9), ≤ 200KB |
| `public/images/about/portrait-mobile.webp` | 400×500 (4:5) | — |
| `public/images/about/portrait.webp` | — | 600×800 (3:4) |
| `public/images/services/service-01..06.webp` | 600×400 (3:2, hiển thị vuông 92px ở điện thoại) | dùng chung |
| `public/images/videos/showreel-thumb.webp` | 1280×720 (điện thoại cắt khung 4:3 ở giữa) | dùng chung |
| `public/images/videos/video-01..04.webp` | 640×360 | dùng chung |
| `public/images/gallery/gallery-01..08.webp` | 1200×900 (ô 4:5 / 16:10, ảnh gốc dùng cho lightbox) | dùng chung |
| `public/images/partners/partner-01..06.webp` | 200×80, nền trong suốt (tự chuyển trắng) | dùng chung |
| `public/images/testimonials/avatar-01..04.webp` | 100×100 | dùng chung |
| `public/images/og/og-cover.jpg` | 1200×630 (ảnh khi chia sẻ link) | — |
| `public/videos/*.mp4` | (tùy chọn) video tự host, H.264 | dùng chung |

Icon (`public/icons/`) đã có sẵn: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`.

## Deploy lên GitHub Pages

1. Tạo repo (VD `mc-portfolio`) và push code lên nhánh `main`.
2. Trên GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` sẽ tự build và deploy (hoặc chạy tay trong tab **Actions**).

Trang dùng đường dẫn tương đối nên chạy được cả ở `https://ten.github.io/` lẫn `https://ten.github.io/mc-portfolio/`.
Có thể đưa thư mục `dist/` lên bất kỳ hosting tĩnh nào (Netlify, Vercel, Cloudflare Pages…).

## Cấu trúc thư mục

```
├── site.config.js        # NỘI DUNG website (sửa ở đây)
├── index.html            # Khung HTML (template)
├── src/
│   ├── templates.js      # Bộ render: config → HTML
│   ├── input.css         # CSS nguồn Tailwind v4 (màu, font trong @theme)
│   └── js/main.js        # JS phía trình duyệt (menu, thu gọn, lightbox vuốt, video, dock, form)
├── public/               # icons/, images/<khu-vuc>/, videos/
├── scripts/
│   ├── build.mjs         # Build → dist/
│   └── dev.mjs           # Server phát triển (in cả địa chỉ IP LAN)
└── .github/workflows/deploy.yml
```
