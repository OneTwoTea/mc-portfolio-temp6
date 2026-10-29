/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SITE.CONFIG.JS — CẤU HÌNH NỘI DUNG WEBSITE                 ║
 * ║  Giao diện "Prism Aurora" — thiết kế cho điện thoại trước   ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Toàn bộ nội dung hiển thị trên website được quản lý        ║
 * ║  tại file này. Muốn đổi nội dung, chỉ cần sửa file này      ║
 * ║  rồi chạy `npm run build` (hoặc để `npm run dev` tự build). ║
 * ║                                                              ║
 * ║  HƯỚNG DẪN:                                                  ║
 * ║  - Thay các giá trị [IN_HOA] bằng thông tin thật             ║
 * ║  - Đường dẫn ảnh viết dạng "public/images/..." (không có /   ║
 * ║    ở đầu)                                                    ║
 * ║  - Ảnh ưu tiên .webp, tên kebab-case: service-01.webp,       ║
 * ║    bản riêng cho điện thoại thêm đuôi -m: service-01-m.webp  ║
 * ║  - Kích thước ảnh ghi ở comment từng mục: ĐIỆN THOẠI trước,  ║
 * ║    MÁY TÍNH sau                                              ║
 * ║  - Ảnh chưa có → trang tự hiện khung ánh sáng cùng tỉ lệ     ║
 * ║    (build chỉ chèn thẻ <img> khi file thật sự tồn tại)       ║
 * ║  - Link còn placeholder → nút tự trỏ về mục #contact         ║
 * ║  - Số mục hiện sẵn trên điện thoại: key `mobileVisible`      ║
 * ║    ở từng khu vực (phần còn lại nằm sau nút "Xem thêm (N)"); ║
 * ║    từ 1024px trở lên luôn hiện đủ                            ║
 * ║  - Các key đánh dấu (MỚI) được thêm cho giao diện này        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const SITE_CONFIG = {

  // ─── 0. CHỮ GIAO DIỆN DÙNG CHUNG (MỚI) ─────────────────────
  // Chữ trên nút thu gọn/mở rộng của mọi danh sách và các nhãn trợ năng
  ui: {
    showMore: "Xem thêm",                            // nút sẽ hiện "Xem thêm (N)"
    showLess: "Thu gọn",
    skipLink: "Bỏ qua đến nội dung chính",
    menuLabel: "Menu",
    closeLabel: "Đóng",
    videoMissing: "Video đang được cập nhật — liên hệ để xem trọn bộ showreel.",
  },

  // ─── 1. SEO & META ─────────────────────────────────────────
  seo: {
    title: "MC [TEN_MC] — MC Sự Kiện Chuyên Nghiệp",
    description: "MC dẫn chương trình sự kiện chuyên nghiệp tại TP.HCM và toàn quốc. Hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm, [SO_SU_KIEN]+ sự kiện thành công.",
    keywords: "MC sự kiện, MC đám cưới, MC doanh nghiệp, dẫn chương trình, [TEN_MC]",
    ogImage: "public/images/og/og-cover.jpg",        // 1200×630px, JPG (Facebook/Zalo chưa đọc tốt WebP)
    ogImageAlt: "MC [TEN_MC] — Dẫn chương trình sự kiện",
    url: "[WEBSITE_URL]",                            // VD: https://ten-ban.github.io/mc-portfolio/
    locale: "vi_VN",
    themeColor: "#0A0613",                           // màu thanh trình duyệt trên điện thoại — trùng nền tím đêm của giao diện
  },

  // ─── 2. THÔNG TIN CÁ NHÂN / THƯƠNG HIỆU ──────────────────
  brand: {
    name: "[TEN_MC]",
    tagline: "MC Sự Kiện Chuyên Nghiệp",
    logo: "public/icons/favicon.svg",                // SVG logo, 40×40px hiển thị
    logoAlt: "Logo [TEN_MC]",
  },

  // ─── 3. HEADER ─────────────────────────────────────────────
  // Điện thoại: thanh kính mờ bo tròn nổi ở đầu trang — logo trái, nút Menu phải.
  // Máy tính (≥ 1024px): menu ngang ở giữa + nút CTA bên phải.
  header: {
    menuItems: [
      { label: "Trang chủ", href: "#hero" },
      { label: "Giới thiệu", href: "#about" },
      { label: "Dịch vụ", href: "#services" },
      { label: "Video", href: "#videos" },
      { label: "Gallery", href: "#gallery" },
      { label: "Cảm nhận", href: "#testimonials" },
      { label: "Liên hệ", href: "#contact" },
    ],
    ctaButton: {
      label: "Đặt Lịch Ngay",
      href: "[ZALO_LINK]",                           // Link Zalo hoặc #contact
    },
  },

  // ─── 4. HERO (PRISM STAGE) ─────────────────────────────────
  // Ảnh MC đặt trong "khung sân khấu" bo tròn, viền ánh sáng lăng kính xoay quanh.
  // Chữ + nút đặt lịch nằm ở nửa dưới khung (trong tầm ngón cái).
  // Ảnh: Điện thoại 750×1334px (dọc 9:16) — Máy tính 1920×1080px (ngang 16:9)
  // Nên chọn ảnh có nửa dưới tối/đơn giản để chữ trắng dễ đọc. Ảnh hero luôn tải ngay (không lazy).
  hero: {
    heading: "Khoảnh Khắc Đáng Nhớ\nBắt Đầu Từ Sân Khấu",
    subheading: "MC dẫn chương trình chuyên nghiệp cho đám cưới, sự kiện doanh nghiệp và các chương trình nghệ thuật trên toàn quốc.",
    backgroundDesktop: "public/images/hero/hero-01.webp",   // 1920×1080px
    backgroundMobile: "public/images/hero/hero-01-m.webp", // 750×1334px
    backgroundAlt: "MC [TEN_MC] dẫn chương trình trên sân khấu",
    ctaPrimary: {
      label: "Đặt Lịch Qua Zalo",
      href: "[ZALO_LINK]",
    },
    ctaSecondary: {
      label: "Xem Showreel",
      href: "#videos",
    },
    scrollIndicator: true,

    // (MỚI) Ảnh đã tối ưu cho hero. Để "" thì dùng backgroundMobile / backgroundDesktop ở trên.
    image: {
      mobile: "public/images/hero/hero-01-m.webp",   // 750×1334px (dọc 9:16), nên ≤ 120KB
      desktop: "public/images/hero/hero-01.webp",    // 1920×1080px (ngang 16:9), nên ≤ 200KB
    },
    // (MỚI) Điểm lấy nét của ảnh (CSS object-position) — đặt vào khuôn mặt MC
    imagePosition: {
      mobile: "50% 20%",
      desktop: "65% 30%",
    },
    // (MỚI) Nhãn nhỏ có chấm sáng nhấp nháy phía trên tiêu đề. Để "" thì ẩn.
    availability: "Đang nhận lịch mùa cưới & YEP 2026",
  },

  // ─── 5. GIỚI THIỆU ────────────────────────────────────────
  // Ảnh chân dung: Điện thoại 400×500px (4:5) — Máy tính 600×800px (3:4)
  // Điện thoại: chỉ hiện `summary`; `story` nằm trong khối thu gọn (<details>).
  about: {
    sectionLabel: "Về Tôi",
    heading: "Đồng Hành Cùng\nKhoảnh Khắc Của Bạn",
    portrait: "public/images/about/portrait.webp",        // 600×800px
    portraitMobile: "public/images/about/portrait-mobile.webp", // 400×500px
    portraitAlt: "MC [TEN_MC] trên sân khấu",
    // (MỚI) Tóm tắt 1–2 câu, luôn hiển thị
    summary: "Hơn [SO_NAM_KINH_NGHIEM] năm cầm mic, [SO_SU_KIEN]+ sân khấu — từ tiệc cưới ấm cúng đến gala nghìn khách. Kịch bản riêng cho từng chương trình, nhịp cảm xúc giữ trọn từ lời chào đến phút khép lại.",
    // (MỚI) Chữ trên nút mở phần câu chuyện đầy đủ (story)
    storyToggleLabel: "Đọc câu chuyện của tôi",
    story: "Với hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm trong lĩnh vực dẫn chương trình, tôi đã có vinh dự đồng hành cùng hàng trăm sự kiện — từ những đám cưới ấm cúng đến những gala doanh nghiệp quy mô lớn.\n\nTriết lý của tôi: mỗi sự kiện là duy nhất, và người MC phải là cầu nối cảm xúc giữa chương trình và khán giả. Tôi luôn chuẩn bị kỹ lưỡng, lắng nghe mong muốn của khách hàng, và mang đến năng lượng tích cực cho từng khoảnh khắc trên sân khấu.",
    stats: [
      { number: "[SO_NAM_KINH_NGHIEM]+", label: "Năm Kinh Nghiệm" },
      { number: "[SO_SU_KIEN]+", label: "Sự Kiện Thành Công" },
      { number: "50+", label: "Đối Tác Doanh Nghiệp" },
      { number: "100%", label: "Khách Hàng Hài Lòng" },
    ],
  },

  // ─── 6. DỊCH VỤ ───────────────────────────────────────────
  // Ảnh dịch vụ: Điện thoại 600×400px (3:2) — Máy tính dùng chung ảnh này (thẻ co theo màn hình)
  // Chưa có ảnh → thẻ hiện khung ánh sáng cùng tỉ lệ kèm icon.
  services: {
    sectionLabel: "Dịch Vụ",
    heading: "Dịch Vụ Của Tôi",
    mobileVisible: 3,                                // (MỚI) số thẻ hiện sẵn trên điện thoại; ≥ 1024px hiện đủ
    subheading: "Mỗi loại hình sự kiện đều được chuẩn bị kịch bản riêng, phù hợp với phong cách và mong muốn của bạn.",
    items: [
      {
        icon: "wedding",
        title: "MC Đám Cưới",
        description: "Dẫn dắt tiệc cưới ấm cúng, lãng mạn với kịch bản cá nhân hóa cho từng cặp đôi.",
        image: "public/images/services/service-01.webp",  // 600×400px
      },
      {
        icon: "corporate",
        title: "MC Doanh Nghiệp",
        description: "Gala dinner, hội nghị khách hàng, lễ kỷ niệm — chuyên nghiệp và đẳng cấp.",
        image: "public/images/services/service-02.webp",
      },
      {
        icon: "event",
        title: "MC Sự Kiện",
        description: "Festival, concert, gameshow — tạo không khí sôi động và kết nối khán giả.",
        image: "public/images/services/service-03.webp",
      },
      {
        icon: "ceremony",
        title: "MC Lễ Khai Trương",
        description: "Lễ khai trương, động thổ, khánh thành — trang trọng và chuyên nghiệp.",
        image: "public/images/services/service-04.webp",
      },
      {
        icon: "award",
        title: "MC Lễ Trao Giải",
        description: "Vinh danh, trao giải thưởng — tạo cảm xúc và khoảnh khắc đáng nhớ.",
        image: "public/images/services/service-05.webp",
      },
      {
        icon: "bilingual",
        title: "MC Song Ngữ",
        description: "Dẫn chương trình Việt — Anh cho sự kiện quốc tế và đa văn hóa.",
        image: "public/images/services/service-06.webp",
      },
    ],
  },

  // ─── 7. VIDEO SHOWREEL ─────────────────────────────────────
  // Poster: showreel Điện thoại 1280×720px (dùng chung Máy tính), video nhỏ 640×360px (16:9)
  // videoUrl: link YouTube (https://youtu.be/... hoặc https://www.youtube.com/watch?v=...)
  //           hoặc file tự host "public/videos/ten-video.mp4". Video chỉ tải khi người xem bấm.
  videos: {
    sectionLabel: "Video",
    heading: "Khoảnh Khắc Trên Sân Khấu",
    mobileVisible: 2,                                // (MỚI) số video nhỏ hiện sẵn trên điện thoại; ≥ 1024px hiện đủ
    subheading: "Xem những highlight từ các sự kiện tôi đã dẫn chương trình.",
    featured: {
      title: "Showreel 2025",
      thumbnail: "public/images/videos/showreel-thumb.webp",  // 1280×720px
      videoUrl: "[YOUTUBE_SHOWREEL_URL]",
      duration: "3:45",
    },
    items: [
      {
        title: "Highlight Đám Cưới",
        thumbnail: "public/images/videos/video-01.webp",       // 640×360px
        videoUrl: "[YOUTUBE_VIDEO_01]",
        duration: "2:30",
      },
      {
        title: "Gala Doanh Nghiệp ABC",
        thumbnail: "public/images/videos/video-02.webp",
        videoUrl: "[YOUTUBE_VIDEO_02]",
        duration: "4:15",
      },
      {
        title: "Festival Âm Nhạc 2025",
        thumbnail: "public/images/videos/video-03.webp",
        videoUrl: "[YOUTUBE_VIDEO_03]",
        duration: "3:00",
      },
      {
        title: "Lễ Kỷ Niệm 20 Năm Cty XYZ",
        thumbnail: "public/images/videos/video-04.webp",
        videoUrl: "[YOUTUBE_VIDEO_04]",
        duration: "5:20",
      },
    ],
  },

  // ─── 8. GALLERY ────────────────────────────────────────────
  // Ảnh gallery: Điện thoại lưới 2 cột (ô dọc 4:5, cứ ảnh thứ 3 là ô ngang rộng 2 cột) — Máy tính lưới 4 cột.
  // Ảnh gốc 1200×900px (4:3), dùng luôn cho lightbox (bấm để phóng to, vuốt trái/phải để chuyển ảnh).
  // "category" phải trùng 1 mục trong categories (dùng cho nút lọc).
  gallery: {
    sectionLabel: "Hình Ảnh",
    heading: "Khoảnh Khắc Đáng Nhớ",
    mobileVisible: 4,                                // (MỚI) số ảnh hiện sẵn trên điện thoại; ≥ 1024px hiện đủ
    subheading: "Những khoảnh khắc thực tế từ các sự kiện tôi đã đồng hành.",
    categories: ["Tất cả", "Đám cưới", "Doanh nghiệp", "Sự kiện", "Hậu trường"],
    items: [
      {
        src: "public/images/gallery/gallery-01.webp",    // 1200×900px
        alt: "MC dẫn chương trình trên sân khấu tiệc phủ hoa trắng",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-02.webp",
        alt: "MC công bố giải đặc biệt cùng khách mời",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-03.webp",
        alt: "MC giao lưu, khuấy động khách mời tại year-end party",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-04.webp",
        alt: "MC dẫn phần giao lưu giữa buổi tiệc",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-05.webp",
        alt: "MC cùng khách mời trên sân khấu Year End Party",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-06.webp",
        alt: "MC dẫn hội thi văn nghệ trước màn hình LED lớn",
        category: "Hậu trường",
      },
      {
        src: "public/images/gallery/gallery-07.webp",
        alt: "Tiết mục biểu diễn dưới ánh đèn sân khấu",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-08.webp",
        alt: "MC cùng nhóm khách mời trên sân khấu tất niên",
        category: "Đám cưới",
      },
    ],
  },

  // ─── 9. KHÁCH HÀNG / ĐỐI TÁC ─────────────────────────────
  // Logo đối tác: Điện thoại & Máy tính dùng chung 200×80px, nền trong suốt (SVG/WebP/PNG)
  // Giao diện này đặt dải đối tác NGAY SAU HERO. Logo tự chuyển trắng đơn sắc. Chưa có logo → hiện tên công ty.
  partners: {
    sectionLabel: "Đối Tác",
    heading: "Tin Tưởng Bởi",
    items: [
      { name: "Vietcombank", logo: "public/images/partners/partner-01.webp" },
      { name: "MB Bank", logo: "public/images/partners/partner-02.webp" },
      { name: "ACB", logo: "public/images/partners/partner-03.webp" },
      { name: "VPBank", logo: "public/images/partners/partner-04.webp" },
      { name: "VIB", logo: "public/images/partners/partner-05.webp" },
      { name: "HSBC", logo: "public/images/partners/partner-06.webp" },
    ],
  },

  // ─── 10. CẢM NHẬN KHÁCH HÀNG ──────────────────────────────
  // Avatar: Điện thoại & Máy tính dùng chung 100×100px vuông (hiển thị tròn) — chưa có ảnh → hiện chữ cái đầu
  testimonials: {
    sectionLabel: "Cảm Nhận",
    heading: "Khách Hàng Nói Gì",
    mobileVisible: 2,                                // (MỚI) số cảm nhận hiện sẵn trên điện thoại; ≥ 1024px hiện đủ
    subheading: "Niềm tin của khách hàng là động lực lớn nhất để tôi không ngừng hoàn thiện.",
    items: [
      {
        name: "Anh Trần Văn Hùng",
        role: "Giám đốc, Công ty ABC",
        avatar: "public/images/testimonials/avatar-01.webp",  // 100×100px
        content: "Anh [TEN_MC] dẫn gala cuối năm cho công ty tôi rất chuyên nghiệp. Chương trình được dẫn dắt mạch lạc, không khí sôi động. Chắc chắn sẽ tiếp tục hợp tác!",
        rating: 5,
      },
      {
        name: "Chị Nguyễn Thị Mai",
        role: "Cô dâu",
        avatar: "public/images/testimonials/avatar-02.webp",
        content: "Cảm ơn anh [TEN_MC] đã làm đám cưới của vợ chồng em thêm trọn vẹn. Anh rất tâm lý, chuẩn bị kỹ lưỡng và tạo được nhiều khoảnh khắc xúc động.",
        rating: 5,
      },
      {
        name: "Anh Lê Minh Đức",
        role: "Trưởng phòng Marketing, Tập đoàn XYZ",
        avatar: "public/images/testimonials/avatar-03.webp",
        content: "Đã làm việc với nhiều MC nhưng anh [TEN_MC] luôn là lựa chọn hàng đầu cho các sự kiện quan trọng. Phong cách chuyên nghiệp, linh hoạt và rất có duyên.",
        rating: 5,
      },
      {
        name: "Chị Phạm Hồng Nhung",
        role: "Wedding Planner",
        avatar: "public/images/testimonials/avatar-04.webp",
        content: "Tôi thường xuyên giới thiệu anh [TEN_MC] cho các cặp đôi. Anh luôn mang đến sự chuyên nghiệp và cảm xúc đúng mực cho mỗi lễ cưới.",
        rating: 5,
      },
    ],
  },

  // ─── 10b. CÂU HỎI THƯỜNG GẶP (MỚI) ────────────────────────
  // Mỗi câu là một khối mở/đóng (<details>). Thêm/bớt bằng cách thêm/xóa object trong items.
  faq: {
    sectionLabel: "Hỏi Đáp",
    heading: "Câu Hỏi Thường Gặp",
    subheading: "Chưa thấy câu trả lời? Nhắn Zalo, tôi phản hồi trong ngày.",
    openFirst: true,                                 // mở sẵn câu đầu tiên
    items: [
      {
        question: "Nên đặt lịch trước bao lâu?",
        answer: "Mùa cưới và cuối năm (tháng 9 – tháng 1) nên đặt trước 1–3 tháng. Các tháng còn lại thường chỉ cần 2–4 tuần. Lịch được giữ khi hai bên xác nhận và đặt cọc.",
      },
      {
        question: "Chi phí dẫn chương trình được tính thế nào?",
        answer: "Chi phí phụ thuộc loại sự kiện, thời lượng, địa điểm và yêu cầu song ngữ. Gửi thông tin qua form hoặc Zalo để nhận báo giá chi tiết trong 24 giờ.",
      },
      {
        question: "Có nhận dẫn sự kiện ngoài TP.HCM không?",
        answer: "Có. Tôi nhận sự kiện trên toàn quốc; chi phí di chuyển và lưu trú (nếu có) được báo rõ trong báo giá.",
      },
      {
        question: "Kịch bản do ai chuẩn bị?",
        answer: "Tôi soạn kịch bản dẫn riêng dựa trên buổi trao đổi với bạn hoặc agency, gửi duyệt trước sự kiện và chỉnh sửa đến khi bạn hài lòng.",
      },
      {
        question: "Có tham gia tổng duyệt không?",
        answer: "Có. Tôi có mặt tổng duyệt (nếu chương trình có) và đến sớm trước giờ diễn để phối hợp cùng ekip âm thanh, ánh sáng.",
      },
    ],
  },

  // ─── 11. LIÊN HỆ ──────────────────────────────────────────
  contact: {
    sectionLabel: "Liên Hệ",
    heading: "Hãy Kết Nối Với Tôi",
    subheading: "Bạn đang lên kế hoạch cho sự kiện? Liên hệ ngay để được tư vấn miễn phí!",
    phone: "[SO_DIEN_THOAI]",                        // VD: "0901 234 567" — tự tạo link tel:
    zalo: "[ZALO_LINK]",                             // https://zalo.me/<số điện thoại>
    email: "[EMAIL]",
    facebook: "[FACEBOOK_LINK]",
    youtube: "[YOUTUBE_LINK]",
    address: "[DIA_CHI]",
    workingHours: "Thứ 2 — Chủ nhật: 8:00 — 21:00",
    // Form báo giá: bấm gửi sẽ mở ứng dụng email với nội dung đã điền (không cần máy chủ)
    form: {
      heading: "Gửi Yêu Cầu Báo Giá",
      note: "Để lại thông tin, tôi sẽ liên hệ lại trong vòng 24 giờ.",
      submitLabel: "Gửi Yêu Cầu",
      eventTypes: ["Đám cưới", "Sự kiện doanh nghiệp", "Khai trương / Khánh thành", "Lễ trao giải", "Sự kiện song ngữ", "Khác"],
    },
  },

  // ─── 12. FLOATING BUTTON ──────────────────────────────────
  // Nút Zalo nổi góc phải (tablet/desktop). Trên mobile đã có thanh liên hệ ở đáy màn hình
  floatingButton: {
    enabled: true,
    type: "zalo",
    label: "Chat Zalo",
    href: "[ZALO_LINK]",                             // VD: https://zalo.me/0901234567
  },

  // ─── 12b. THANH ĐẶT LỊCH NỔI TRÊN ĐIỆN THOẠI (MỚI) ────────
  // Viên kính nổi ở đáy màn hình (< 768px): hiện sau khi cuộn qua hero, ẩn khi tới mục Liên hệ.
  dock: {
    enabled: true,
    callLabel: "Gọi",                                // nút gọi (link tel: lấy từ contact.phone)
    bookLabel: "Đặt lịch show",                      // nút chính — trỏ về bookHref
    bookHref: "#contact",                            // hoặc link Zalo
  },

  // ─── 13. FOOTER ────────────────────────────────────────────
  footer: {
    copyright: "© 2026 [TEN_MC]. All rights reserved.",
    madeWith: "MC sự kiện tại TP.HCM & toàn quốc",
    backToTop: true,
  },
};
