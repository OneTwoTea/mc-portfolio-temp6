/**
 * ═══════════════════════════════════════════════════════════
 *  TEMPLATES.JS — Bộ render: config → HTML
 *  Giao diện "Prism Aurora": nền tím đêm, ánh sáng lăng kính,
 *  thẻ kính mờ kiểu bento. Thiết kế cho điện thoại 390px trước.
 * ═══════════════════════════════════════════════════════════
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/** Thư mục gốc dự án (để kiểm tra file ảnh có tồn tại không) */
const ROOT = fileURLToPath(new URL("../", import.meta.url));

// ─── ICONS (SVG inline) ─────────────────────────────────
const ICONS = {
  wedding: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  corporate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>`,
  event: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  ceremony: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  bilingual: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  zalo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M12.5 6C9.46 6 7 8.46 7 11.5v25C7 39.54 9.46 42 12.5 42h23c3.04 0 5.5-2.46 5.5-5.5v-25C41 8.46 38.54 6 35.5 6h-23zm2.14 11h18.72c.87 0 1.34 1.01.78 1.67L22.97 31.5h8.87c.74 0 1.16.83.71 1.39-.15.18-.37.29-.61.29H13.36c-.87 0-1.34-1.01-.78-1.67L23.75 18.7h-9.1a.82.82 0 0 1-.72-.43.81.81 0 0 1 .71-1.27z"/></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  mic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>`,
  sparkle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>`,
  image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  quote: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>`,
};

// ─── TIỆN ÍCH ──────────────────────────────────────────

/** Escape HTML để chống XSS */
export function esc(str) {
  if (typeof str !== "string") return String(str ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Kiểm tra giá trị có phải placeholder [IN_HOA] không */
export function isPlaceholder(val) {
  if (typeof val !== "string") return false;
  return /\[[A-Z0-9_]+\]/.test(val);
}

/** Trả SVG icon inline (trang trí → aria-hidden) */
export function icon(name, cls = "") {
  const svg = ICONS[name];
  if (!svg) return `<!-- icon "${name}" không tìm thấy -->`;
  const clsAttr = cls ? ` class="${esc(cls)}"` : "";
  return svg.replace("<svg ", `<svg${clsAttr} aria-hidden="true" focusable="false" `);
}

/**
 * File public/... có tồn tại không (link ngoài http/https luôn coi là có).
 * Module được import lại mỗi lần build nên cache này luôn mới.
 */
const fileCache = new Map();
export function fileExists(src) {
  if (!src || typeof src !== "string" || isPlaceholder(src)) return false;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return true;
  if (!fileCache.has(src)) fileCache.set(src, existsSync(join(ROOT, src)));
  return fileCache.get(src);
}

/** Chọn file đầu tiên có thật trong danh sách; không có thì trả giá trị đầu tiên (để build cảnh báo) */
function pickFile(...candidates) {
  return candidates.find(fileExists) || candidates.find(Boolean) || "";
}

/**
 * Tạo thẻ ảnh:
 * - Ảnh MOBILE là nguồn mặc định; ảnh desktop chỉ nạp qua <source media="(min-width: …)">.
 * - Lazy-load (trừ ảnh ưu tiên), luôn có width/height và alt.
 * - Chỉ chèn <img> khi file thật sự tồn tại → không có request 404.
 *   Chưa có ảnh → trả `fallback` (khung thay thế) kèm comment ghi tên file cần bổ sung
 *   (build.mjs đọc comment này để in cảnh báo).
 */
export function media({
  src,
  mobileSrc,
  alt = "",
  cls = "",
  style = "",
  width,
  height,
  mobileWidth,
  mobileHeight,
  lazy = true,
  priority = false,
  breakpoint = 768,
  fallback = "",
}) {
  const hasDesktop = fileExists(src);
  const hasMobile = fileExists(mobileSrc);

  if (!hasDesktop && !hasMobile) {
    const wanted = [mobileSrc, src].filter((v) => v && !isPlaceholder(v));
    return `${wanted.length ? `<!-- chưa có ảnh: ${wanted.map(esc).join(" , ")} -->` : ""}${fallback}`;
  }

  const size = (w, h) => `${w ? ` width="${w}"` : ""}${h ? ` height="${h}"` : ""}`;
  const loadAttr = priority ? ` fetchpriority="high" loading="eager"` : lazy ? ` loading="lazy" decoding="async"` : ` decoding="async"`;
  const attrs = `alt="${esc(alt)}"${cls ? ` class="${esc(cls)}"` : ""}${style ? ` style="${esc(style)}"` : ""}${loadAttr}`;

  // Chỉ có 1 bản → dùng luôn bản đó
  if (!hasMobile || !hasDesktop) {
    const only = hasMobile ? mobileSrc : src;
    const dims = hasMobile ? size(mobileWidth || width, mobileHeight || height) : size(width, height);
    return `<img src="${esc(only)}" ${attrs}${dims}>`;
  }

  return `<picture class="contents">
          <source media="(min-width: ${breakpoint}px)" srcset="${esc(src)}"${size(width, height)}>
          <img src="${esc(mobileSrc)}" ${attrs}${size(mobileWidth || width, mobileHeight || height)}>
        </picture>`;
}

/** Khung thay thế khi chưa có ảnh: nền ánh sáng cùng tỉ lệ + icon/chữ nhẹ */
function ph(label = "", iconName = "image", cls = "absolute inset-0") {
  return `<span class="ph ${cls}" aria-hidden="true">
            <span class="ph-ico">${icon(iconName, "size-6")}</span>
            ${label ? `<span class="ph-label">${esc(label)}</span>` : ""}
          </span>`;
}

/** Thuộc tính href (+ target/rel nếu là link ngoài) */
function linkAttrs(href) {
  const external = /^https?:\/\//.test(href);
  return `href="${esc(href)}"${external ? ` target="_blank" rel="noopener noreferrer"` : ""}`;
}

/** Xuống dòng \n trong config → <br> */
function lines(text) {
  return esc(text || "").replace(/\n/g, "<br>");
}

/**
 * Tiêu đề nhiều dòng: mỗi dòng là một khối riêng (text-balance cân từng dòng, không rơi chữ lẻ),
 * dòng cuối được tô gradient lăng kính.
 */
function prismHeading(text, extraCls = "") {
  const parts = String(text || "").split("\n");
  if (parts.length < 2) return esc(parts[0]);
  const last = parts.pop();
  return `${parts.map((p) => `<span class="block">${esc(p)}</span>`).join("")}<span class="block text-prism ${extraCls}">${esc(last)}</span>`;
}

/** Số thứ tự 2 chữ số: 1 → "01" */
const pad = (n) => String(n).padStart(2, "0");

// ─── HELPERS ────────────────────────────────────────────

/** Tạo các link tel/zalo/mailto/mạng xã hội — nếu còn placeholder thì trỏ về #contact */
export function createHelpers(config) {
  const c = config.contact || {};

  function safeLink(value, prefix = "") {
    if (!value || isPlaceholder(value)) return "#contact";
    if (value.startsWith("#")) return value;
    if (prefix === "tel:") return `tel:${value.replace(/[^\d+]/g, "")}`;
    if (prefix === "mailto:") return `mailto:${value}`;
    if (prefix === "zalo:") return /^https?:\/\//.test(value) ? value : `https://zalo.me/${value.replace(/[^\d]/g, "")}`;
    return value;
  }

  const hasPhone = c.phone && !isPlaceholder(c.phone);
  const hasEmail = c.email && !isPlaceholder(c.email);

  return {
    phoneLink: safeLink(c.phone, "tel:"),
    phoneDisplay: hasPhone ? c.phone : "Đang cập nhật",
    zaloLink: safeLink(c.zalo, "zalo:"),
    emailLink: safeLink(c.email, "mailto:"),
    emailDisplay: hasEmail ? c.email : "Đang cập nhật",
    emailRaw: hasEmail ? c.email : "",
    facebookLink: safeLink(c.facebook),
    youtubeLink: safeLink(c.youtube),
    ctaLink: safeLink(config.header?.ctaButton?.href || c.zalo, "zalo:"),
    heroCtaLink: safeLink(config.hero?.ctaPrimary?.href || c.zalo, "zalo:"),
    floatingLink: safeLink(config.floatingButton?.href || c.zalo, "zalo:"),
    dockBookLink: safeLink(config.dock?.bookHref || "#contact", "zalo:"),
  };
}

// ─── RENDERERS ──────────────────────────────────────────

export function createRenderers(config) {
  const h = createHelpers(config);
  const ui = config.ui || {};
  const brand = config.brand || {};

  /** Tiêu đề chung của mỗi section: nhãn có chấm sáng + H2 + 1 câu mô tả */
  function sectionHead(sec, fallbackLabel, id, cls = "") {
    return `<div class="max-w-2xl reveal ${cls}">
          <p class="eyebrow">${esc(sec.sectionLabel || fallbackLabel)}</p>
          <h2 id="${id}-title" class="h-section mt-3">${prismHeading(sec.heading)}</h2>
          ${sec.subheading ? `<p class="mt-3 text-base leading-relaxed text-fg-muted sm:text-lg">${esc(sec.subheading)}</p>` : ""}
        </div>`;
  }

  /**
   * Thu gọn danh sách trên điện thoại.
   * - Mục có index ≥ mobileVisible nhận thuộc tính data-extra (CSS ẩn khi < 1024px VÀ đã có JS).
   * - Nội dung vẫn nằm sẵn trong HTML (SEO, không JS vẫn hiện đủ).
   */
  function collapse(sec, total) {
    const n = Number(sec.mobileVisible);
    const visible = Number.isFinite(n) && n >= 1 ? Math.floor(n) : total;
    const extraCount = Math.max(0, total - visible);
    return {
      extraCount,
      attr: (i) => (extraCount > 0 && i >= visible ? " data-extra" : ""),
      listAttr: extraCount > 0 ? " data-collapse" : "",
    };
  }

  /** Nút "Xem thêm (N)" / "Thu gọn" — chỉ hiện khi có JS và < 1024px */
  function moreButton(listId, extraCount) {
    if (extraCount <= 0) return "";
    const more = `${ui.showMore || "Xem thêm"} (${extraCount})`;
    return `<div class="more-wrap lg:hidden" data-more-wrap="${listId}">
          <button type="button" class="more-btn" aria-expanded="false" aria-controls="${listId}" data-more data-label-more="${esc(more)}" data-label-less="${esc(ui.showLess || "Thu gọn")}">
            <span data-more-label>${esc(more)}</span>
            ${icon("chevronDown", "more-ico size-5")}
          </button>
        </div>`;
  }

  return {
    // ─── SEO HEAD ─────────────────────────────────────
    seoHead() {
      const seo = config.seo || {};
      const siteUrl = seo.url && !isPlaceholder(seo.url) ? seo.url.replace(/\/?$/, "/") : "";
      // og:image cần URL tuyệt đối — chỉ ghép được khi đã có seo.url
      const ogImage = siteUrl ? siteUrl + (seo.ogImage || "") : seo.ogImage || "";
      return `<title>${esc(seo.title || "MC Portfolio")}</title>
    <meta name="description" content="${esc(seo.description || "")}">
    <meta name="keywords" content="${esc(seo.keywords || "")}">
    ${siteUrl ? `<link rel="canonical" href="${esc(siteUrl)}">\n    <meta property="og:url" content="${esc(siteUrl)}">` : ""}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${esc(seo.locale || "vi_VN")}">
    <meta property="og:site_name" content="${esc(brand.name || "")}">
    <meta property="og:title" content="${esc(seo.title || "")}">
    <meta property="og:description" content="${esc(seo.description || "")}">
    <meta property="og:image" content="${esc(ogImage)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(seo.ogImageAlt || "")}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(seo.title || "")}">
    <meta name="twitter:description" content="${esc(seo.description || "")}">
    <meta name="twitter:image" content="${esc(ogImage)}">
    <meta name="theme-color" content="${esc(seo.themeColor || "#0A0613")}">
    <meta name="color-scheme" content="dark">
    <link rel="icon" type="image/svg+xml" href="public/icons/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="public/icons/favicon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="public/icons/apple-touch-icon.png">`;
    },

    // ─── CTA HEADER (thuộc tính href đã xử lý placeholder) ─
    ctaAttrs() {
      return linkAttrs(h.ctaLink);
    },

    // ─── MENU NGANG (≥ 1024px) ────────────────────────
    headerNav() {
      return (config.header?.menuItems || [])
        .map((item) => `<a href="${esc(item.href)}" class="nav-link">${esc(item.label)}</a>`)
        .join("\n          ");
    },

    // ─── MENU ĐIỆN THOẠI (tấm kính thả xuống) ─────────
    mobileNav() {
      const items = (config.header?.menuItems || [])
        .map(
          (item, i) => `<li>
            <a href="${esc(item.href)}" class="menu-link">
              <span class="flex items-baseline gap-3"><span class="menu-num">${pad(i + 1)}</span>${esc(item.label)}</span>
              ${icon("arrowUpRight", "size-5 shrink-0 text-fg-dim")}
            </a>
          </li>`
        )
        .join("\n          ");
      return `<ul role="list">
          ${items}
        </ul>
        <div class="mt-5 grid grid-cols-2 gap-2">
          <a ${linkAttrs(h.phoneLink)} class="btn-glass h-12 text-base">${icon("phone", "size-5")} Gọi điện</a>
          <a ${linkAttrs(h.zaloLink)} class="btn-glass h-12 text-base">${icon("zalo", "size-6")} Zalo</a>
        </div>
        <a ${linkAttrs(h.ctaLink)} class="btn-glow mt-2 h-14 w-full text-base">${icon("calendar", "size-5")} ${esc(config.header?.ctaButton?.label || "Đặt lịch")}</a>`;
    },

    // ─── HERO: KHUNG SÂN KHẤU LĂNG KÍNH ───────────────
    heroSection() {
      const hero = config.hero || {};
      const img = hero.image || {};
      const pos = hero.imagePosition || {};
      const mobileSrc = pickFile(img.mobile, hero.backgroundMobile);
      const desktopSrc = pickFile(img.desktop, hero.backgroundDesktop);

      const visual = media({
        src: desktopSrc,
        mobileSrc,
        alt: hero.backgroundAlt || "",
        cls: "hero-img absolute inset-0 size-full object-cover",
        style: `--pos-m:${pos.mobile || "50% 25%"};--pos-d:${pos.desktop || "50% 35%"}`,
        width: 1920,
        height: 1080,
        mobileWidth: 750,
        mobileHeight: 1334,
        priority: true,
        fallback: `<span class="hero-ph absolute inset-0" aria-hidden="true">
            <span class="orb orb-a"></span><span class="orb orb-b"></span><span class="orb orb-c"></span>
            ${icon("mic", "hero-ph-mic")}
          </span>`,
      });

      return `<section id="hero" aria-labelledby="hero-title" class="relative flex min-h-[100svh] flex-col px-2.5 pb-2.5 pt-[calc(max(0.625rem,env(safe-area-inset-top))+4.25rem)] sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
      <div class="prism-frame flex flex-1 flex-col" data-tilt>
        <span class="prism-ring" aria-hidden="true"></span>
        <div class="stage relative isolate flex flex-1 flex-col justify-end overflow-hidden">
          <div class="absolute inset-0 -z-10">
            ${visual}
            <span class="beams" aria-hidden="true"></span>
            <span class="stage-shade" aria-hidden="true"></span>
          </div>
          <span class="stage-glare" aria-hidden="true"></span>

          <div class="relative px-5 pb-6 pt-16 sm:px-8 sm:pb-9 lg:max-w-[50rem] lg:px-12 lg:pb-12">
            ${hero.availability ? `<p class="live-chip"><span class="live-dot" aria-hidden="true"></span>${esc(hero.availability)}</p>` : ""}
            <p class="mt-4 text-base font-medium text-fg">${esc(brand.name || "")} <span class="text-fg-muted">— ${esc(brand.tagline || "")}</span></p>
            <h1 id="hero-title" class="hero-title mt-2">${prismHeading(hero.heading, "shine")}</h1>
            <p class="mt-4 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">${esc(hero.subheading || "")}</p>
            <div class="mt-6 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3" data-hero-cta>
              <a ${linkAttrs(h.heroCtaLink)} class="btn-glow h-[3.25rem] px-7 text-base sm:h-14">
                ${icon("zalo", "size-6")} ${esc(hero.ctaPrimary?.label || "Đặt Lịch")}
              </a>
              <a href="${esc(hero.ctaSecondary?.href || "#videos")}" class="btn-glass h-[3.25rem] px-7 text-base sm:h-14">
                ${icon("play", "size-4")} ${esc(hero.ctaSecondary?.label || "Xem Video")}
              </a>
            </div>
          </div>

          ${hero.scrollIndicator ? `<a href="#partners" class="scroll-cue" aria-label="Cuộn xuống phần tiếp theo"><span class="scroll-line" aria-hidden="true"></span></a>` : ""}
        </div>
      </div>
    </section>`;
    },

    // ─── ĐỐI TÁC (ngay sau hero — bằng chứng tin cậy sớm) ──
    partnersSection() {
      const par = config.partners || {};
      const logos = (par.items || [])
        .map((p) => {
          const logo = media({ src: p.logo || "", alt: p.name || "Đối tác", cls: "logo-img h-9 w-auto max-w-full object-contain sm:h-10", width: 200, height: 80 });
          const hasLogo = fileExists(p.logo);
          return `<li class="logo-tile">
            ${logo}${hasLogo ? "" : `<span class="text-balance text-center text-base font-medium text-fg-muted">${esc(p.name)}</span>`}
          </li>`;
        })
        .join("\n          ");

      return `<section id="partners" aria-labelledby="partners-title" class="py-10 md:py-14">
      <div class="shell">
        <div class="flex items-center gap-4 reveal">
          <h2 id="partners-title" class="shrink-0 text-sm font-semibold uppercase tracking-[0.16em] text-fg-muted">${esc(par.heading || "Tin Tưởng Bởi")}</h2>
          <span class="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" aria-hidden="true"></span>
        </div>
        <ul class="mt-5 grid grid-cols-3 gap-2 reveal sm:gap-3 lg:grid-cols-6" role="list">
          ${logos}
        </ul>
      </div>
    </section>`;
    },

    // ─── GIỚI THIỆU (bento) ───────────────────────────
    aboutSection() {
      const about = config.about || {};
      const story = (about.story || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      const summary = about.summary || story[0] || "";

      const statsHtml = (about.stats || [])
        .map(
          (s) => `<li class="stat glass">
              <span class="stat-num text-prism ${isPlaceholder(s.number) ? "is-long" : ""}">${esc(s.number)}</span>
              <span class="mt-1.5 block text-base leading-snug text-fg-muted">${esc(s.label)}</span>
            </li>`
        )
        .join("\n            ");

      return `<section id="about" aria-labelledby="about-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell grid gap-3 lg:grid-cols-12 lg:gap-4">
        <div class="glass reveal rounded-[1.75rem] p-6 sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:p-10">
          <p class="eyebrow">${esc(about.sectionLabel || "Về Tôi")}</p>
          <h2 id="about-title" class="h-section mt-3">${prismHeading(about.heading)}</h2>
          <p class="mt-4 text-[1.0625rem] leading-relaxed text-fg">${esc(summary)}</p>
          ${
            story.length
              ? `<details class="story mt-5" data-open-lg>
            <summary class="story-toggle">${esc(about.storyToggleLabel || "Đọc thêm")} ${icon("chevronDown", "story-ico size-5")}</summary>
            <div class="story-body mt-4 space-y-4 text-base leading-relaxed text-fg-muted">
              ${story.map((p) => `<p>${lines(p)}</p>`).join("\n              ")}
            </div>
          </details>`
              : ""
          }
        </div>

        <figure class="portrait reveal relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-void-2 sm:aspect-[16/11] lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[34rem]">
          ${media({
            src: about.portrait || "",
            mobileSrc: about.portraitMobile || "",
            alt: about.portraitAlt || "Ảnh chân dung",
            cls: "absolute inset-0 size-full object-cover",
            width: 600,
            height: 800,
            mobileWidth: 400,
            mobileHeight: 500,
            fallback: ph("Ảnh chân dung 4:5", "mic"),
          })}
          <figcaption class="glass-strong absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <span class="min-w-0">
              <span class="block truncate font-display text-base font-semibold">${esc(brand.name || "")}</span>
              <span class="block truncate text-base text-fg-muted">${esc(brand.tagline || "")}</span>
            </span>
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-rose">${icon("mic", "size-5")}</span>
          </figcaption>
        </figure>

        <ul class="grid grid-cols-2 gap-3 reveal lg:col-span-7 lg:col-start-6 lg:grid-cols-4 lg:gap-4" role="list">
            ${statsHtml}
        </ul>
      </div>
    </section>`;
    },

    // ─── DỊCH VỤ ──────────────────────────────────────
    servicesSection() {
      const svc = config.services || {};
      const items = svc.items || [];
      const col = collapse(svc, items.length);

      const cards = items
        .map(
          (item, i) => `<li${col.attr(i)}>
            <article class="svc glass group">
              <div class="svc-media">
                ${media({
                  src: item.image || "",
                  mobileSrc: item.imageMobile || "",
                  alt: item.imageAlt || item.title || "",
                  cls: "absolute inset-0 size-full object-cover",
                  width: 600,
                  height: 400,
                  fallback: ph("", item.icon || "event"),
                })}
              </div>
              <div class="min-w-0 py-1 pr-1 sm:p-6">
                <div class="flex items-center justify-between gap-3">
                  <span class="svc-ico hidden sm:grid">${icon(item.icon || "event", "size-5")}</span>
                  <span class="font-display text-sm font-medium text-fg-dim">${pad(i + 1)}</span>
                </div>
                <h3 class="mt-1 font-display text-[1.0625rem] font-semibold leading-snug sm:mt-4 sm:text-lg">${esc(item.title)}</h3>
                <p class="mt-1.5 text-base leading-relaxed text-fg-muted">${esc(item.description)}</p>
              </div>
            </article>
          </li>`
        )
        .join("\n          ");

      return `<section id="services" aria-labelledby="services-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell">
        ${sectionHead(svc, "Dịch Vụ", "services")}
        <ul id="services-list" class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4" role="list"${col.listAttr}>
          ${cards}
        </ul>
        ${moreButton("services-list", col.extraCount)}
      </div>
    </section>`;
    },

    // ─── VIDEO SHOWREEL ───────────────────────────────
    videosSection() {
      const vid = config.videos || {};
      const featured = vid.featured || {};
      const items = vid.items || [];
      const col = collapse(vid, items.length);

      // Chưa có link → data-video-missing (popup báo "đang cập nhật" thay vì trình phát rỗng)
      const videoAttr = (url) => (url && !isPlaceholder(url) ? `data-video="${esc(url)}"` : `data-video-missing`);

      const list = items
        .map(
          (v, i) => `<li${col.attr(i)}>
            <button type="button" ${videoAttr(v.videoUrl)} data-video-title="${esc(v.title)}" class="vid glass group" aria-label="Phát video: ${esc(v.title)}">
              <span class="vid-thumb">
                ${media({ src: v.thumbnail || "", alt: "", cls: "absolute inset-0 size-full object-cover", width: 640, height: 360, fallback: ph("", "play") })}
                <span class="play-orb play-orb--sm" aria-hidden="true">${icon("play", "size-3.5")}</span>
              </span>
              <span class="min-w-0 lg:block lg:px-2 lg:pb-2 lg:pt-3">
                <span class="block font-medium leading-snug text-fg">${esc(v.title)}</span>
                ${v.duration ? `<span class="mt-1 block text-sm tabular-nums text-fg-muted">${esc(v.duration)}</span>` : ""}
              </span>
            </button>
          </li>`
        )
        .join("\n          ");

      return `<section id="videos" aria-labelledby="videos-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell">
        ${sectionHead(vid, "Video", "videos")}

        <div class="prism-frame prism-frame--soft reveal mt-8">
          <span class="prism-ring" aria-hidden="true"></span>
          <button type="button" ${videoAttr(featured.videoUrl)} data-video-title="${esc(featured.title || "Showreel")}" class="reel group" aria-label="Phát video: ${esc(featured.title || "Showreel")}">
            ${media({ src: featured.thumbnail || "", alt: "", cls: "absolute inset-0 size-full object-cover", width: 1280, height: 720, fallback: `<span class="hero-ph absolute inset-0" aria-hidden="true"><span class="orb orb-a"></span><span class="orb orb-b"></span></span>` })}
            <span class="beams" aria-hidden="true"></span>
            <span class="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" aria-hidden="true"></span>
            <span class="play-orb" aria-hidden="true">${icon("play", "size-7")}</span>
            <span class="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
              <span class="font-display text-lg font-semibold leading-tight sm:text-2xl">${esc(featured.title || "")}</span>
              ${featured.duration ? `<span class="chip shrink-0 tabular-nums">${esc(featured.duration)}</span>` : ""}
            </span>
          </button>
        </div>

        <ul id="videos-list" class="mt-3 grid gap-3 sm:grid-cols-2 lg:mt-4 lg:grid-cols-4 lg:gap-4" role="list"${col.listAttr}>
          ${list}
        </ul>
        ${moreButton("videos-list", col.extraCount)}
      </div>
    </section>`;
    },

    // ─── GALLERY (bento 2 cột + lọc + lightbox vuốt) ──
    gallerySection() {
      const gal = config.gallery || {};
      const items = gal.items || [];
      const col = collapse(gal, items.length);
      const categories = gal.categories || [];

      const chips = categories
        .map(
          (cat, i) =>
            `<button type="button" class="chip-filter" data-filter="${i === 0 ? "*" : esc(cat)}" aria-pressed="${i === 0}">${esc(cat)}</button>`
        )
        .join("\n          ");

      // Máy tính (4 cột, ảnh đầu chiếm 2×2): nếu hàng cuối thiếu 1 ô thì ảnh cuối kéo rộng 2 cột cho kín lưới
      const fillLast = (items.length + 3) % 4 === 3;
      const tiles = items
        .map((item, i) => {
          const cls = [i % 3 === 0 ? "is-wide" : "", fillLast && i === items.length - 1 && i > 0 ? "lg-fill" : ""].join(" ").trim();
          const src = fileExists(item.src) ? item.src : "";
          return `<li class="g-item ${cls}" data-category="${esc(item.category || "")}"${col.attr(i)}>
            <button type="button" data-lightbox data-src="${esc(src)}" data-alt="${esc(item.alt || "")}" class="g-btn group" aria-label="Phóng to ảnh: ${esc(item.alt || "")}">
              ${media({ src: item.src || "", mobileSrc: item.srcMobile || "", alt: item.alt || "", cls: "g-img absolute inset-0 size-full object-cover", width: 1200, height: 900, fallback: ph(item.category || "", "image") })}
              <span class="g-cap" aria-hidden="true">${esc(item.category || "")}</span>
            </button>
          </li>`;
        })
        .join("\n          ");

      return `<section id="gallery" aria-labelledby="gallery-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell">
        ${sectionHead(gal, "Hình Ảnh", "gallery")}

        ${chips ? `<div class="chip-row reveal" role="group" aria-label="Lọc ảnh theo loại sự kiện">
          ${chips}
        </div>` : ""}

        <ul id="gallery-grid" class="g-grid mt-4" role="list"${col.listAttr}>
          ${tiles}
        </ul>
        ${moreButton("gallery-grid", col.extraCount)}
      </div>
    </section>`;
    },

    // ─── CẢM NHẬN KHÁCH HÀNG ─────────────────────────
    testimonialsSection() {
      const test = config.testimonials || {};
      const items = test.items || [];
      const col = collapse(test, items.length);

      const cards = items
        .map((t, i) => {
          const rating = Math.max(0, Math.min(5, t.rating || 5));
          const stars = Array.from({ length: rating }, () => icon("star", "size-4")).join("");
          const initial = (t.name || "?").trim().split(/\s+/).pop().charAt(0);
          return `<li${col.attr(i)}>
            <figure class="quote glass ${i === 0 ? "tile-glow" : ""}">
              <div class="flex items-center justify-between gap-3">
                <span class="flex gap-0.5 text-sun" role="img" aria-label="${rating} trên 5 sao">${stars}</span>
                ${icon("quote", "size-7 text-white/10")}
              </div>
              <blockquote class="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-fg">“${esc(t.content || "")}”</blockquote>
              <figcaption class="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span class="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-rose to-iris font-display font-semibold text-on-glow">
                  ${media({ src: t.avatar || "", alt: t.name || "", cls: "absolute inset-0 size-full object-cover", width: 100, height: 100, fallback: `<span aria-hidden="true">${esc(initial)}</span>` })}
                </span>
                <span class="min-w-0">
                  <span class="block font-semibold">${esc(t.name || "")}</span>
                  <span class="block text-base text-fg-muted">${esc(t.role || "")}</span>
                </span>
              </figcaption>
            </figure>
          </li>`;
        })
        .join("\n          ");

      return `<section id="testimonials" aria-labelledby="testimonials-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell">
        ${sectionHead(test, "Cảm Nhận", "testimonials")}
        <ul id="testimonials-list" class="mt-8 grid gap-3 sm:grid-cols-2 lg:gap-4" role="list"${col.listAttr}>
          ${cards}
        </ul>
        ${moreButton("testimonials-list", col.extraCount)}
      </div>
    </section>`;
    },

    // ─── CÂU HỎI THƯỜNG GẶP (<details> gốc, không cần JS) ──
    faqSection() {
      const faq = config.faq || {};
      const items = faq.items || [];
      if (!items.length) return "";
      const list = items
        .map(
          (q, i) => `<details class="faq glass"${faq.openFirst && i === 0 ? " open" : ""}>
            <summary class="faq-q">
              <span>${esc(q.question)}</span>
              <span class="faq-ico" aria-hidden="true">${icon("plus", "size-4")}</span>
            </summary>
            <div class="faq-a">${lines(q.answer)}</div>
          </details>`
        )
        .join("\n          ");

      return `<section id="faq" aria-labelledby="faq-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        ${sectionHead(faq, "Hỏi Đáp", "faq", "lg:col-span-5 lg:self-start lg:sticky lg:top-28")}
        <div class="space-y-2 reveal lg:col-span-7">
          ${list}
        </div>
      </div>
    </section>`;
    },

    // ─── LIÊN HỆ / ĐẶT LỊCH ──────────────────────────
    contactSection() {
      const c = config.contact || {};
      const form = c.form || {};

      const quick = (href, iconName, label) => `<a ${linkAttrs(href)} class="quick glass">
              <span class="quick-ico">${icon(iconName, iconName === "zalo" ? "size-6" : "size-5")}</span>
              <span class="text-base font-semibold">${esc(label)}</span>
            </a>`;

      const info = [
        c.workingHours ? `<li class="flex min-h-11 items-center gap-3">${icon("clock", "size-5 shrink-0 text-rose")}<span>${esc(c.workingHours)}</span></li>` : "",
        c.address && !isPlaceholder(c.address) ? `<li class="flex min-h-11 items-center gap-3">${icon("location", "size-5 shrink-0 text-rose")}<span>${esc(c.address)}</span></li>` : "",
        `<li class="flex items-center gap-3">${icon("phone", "size-5 shrink-0 text-rose")}<a ${linkAttrs(h.phoneLink)} class="link-soft">${esc(h.phoneDisplay)}</a></li>`,
        `<li class="flex items-center gap-3">${icon("email", "size-5 shrink-0 text-rose")}<a ${linkAttrs(h.emailLink)} class="link-soft break-all">${esc(h.emailDisplay)}</a></li>`,
      ].join("\n              ");

      const eventOptions = (form.eventTypes || []).map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");

      return `<section id="contact" aria-labelledby="contact-title" class="py-12 md:py-20 lg:py-24">
      <div class="shell">
        <div class="prism-frame prism-frame--soft reveal">
          <span class="prism-ring" aria-hidden="true"></span>
          <div class="contact-panel grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
            <div class="min-w-0">
              <p class="eyebrow">${esc(c.sectionLabel || "Liên Hệ")}</p>
              <h2 id="contact-title" class="h-section mt-3">${prismHeading(c.heading)}</h2>
              ${c.subheading ? `<p class="mt-3 text-base leading-relaxed text-fg-muted sm:text-lg">${esc(c.subheading)}</p>` : ""}

              <div class="mt-6 grid grid-cols-3 gap-2">
                ${quick(h.phoneLink, "phone", "Gọi điện")}
                ${quick(h.zaloLink, "zalo", "Zalo")}
                ${quick(h.emailLink, "email", "Email")}
              </div>

              <ul class="mt-5 space-y-2 text-base text-fg-muted" role="list">
              ${info}
              </ul>

              <div class="mt-5 flex flex-wrap gap-2">
                <a ${linkAttrs(h.facebookLink)} class="btn-glass h-11 px-4 text-base">${icon("facebook", "size-4")} Facebook</a>
                <a ${linkAttrs(h.youtubeLink)} class="btn-glass h-11 px-4 text-base">${icon("youtube", "size-4")} YouTube</a>
              </div>
            </div>

            <!-- Form báo giá: mở ứng dụng email với nội dung đã điền (không cần máy chủ) -->
            <form id="contact-form" data-email="${esc(h.emailRaw)}" class="glass min-w-0 rounded-[1.5rem] p-5 sm:p-7" novalidate>
              <h3 class="font-display text-xl font-semibold">${esc(form.heading || "Gửi Yêu Cầu Báo Giá")}</h3>
              ${form.note ? `<p class="mt-2 text-base text-fg-muted">${esc(form.note)}</p>` : ""}
              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="cf-name" class="field-label">Họ và tên *</label>
                  <input id="cf-name" name="name" type="text" autocomplete="name" required class="field" placeholder="Nguyễn Văn A">
                </div>
                <div>
                  <label for="cf-phone" class="field-label">Số điện thoại *</label>
                  <input id="cf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="[0-9+ .]{9,15}" class="field" placeholder="0901 234 567">
                </div>
                <div>
                  <label for="cf-type" class="field-label">Loại sự kiện</label>
                  <select id="cf-type" name="eventType" class="field field-select">${eventOptions}</select>
                </div>
                <div>
                  <label for="cf-date" class="field-label">Ngày dự kiến</label>
                  <input id="cf-date" name="date" type="date" class="field">
                </div>
                <div class="sm:col-span-2">
                  <label for="cf-email" class="field-label">Email (không bắt buộc)</label>
                  <input id="cf-email" name="email" type="email" inputmode="email" autocomplete="email" class="field" placeholder="ban@email.com">
                </div>
                <div class="sm:col-span-2">
                  <label for="cf-message" class="field-label">Nội dung</label>
                  <textarea id="cf-message" name="message" rows="4" class="field" placeholder="Địa điểm, số lượng khách, mong muốn của bạn..."></textarea>
                </div>
              </div>
              <button type="submit" class="btn-glow mt-6 h-14 w-full text-base">
                ${icon("send", "size-5")} ${esc(form.submitLabel || "Gửi Yêu Cầu")}
              </button>
              <p data-form-status role="status" aria-live="polite" class="mt-3 min-h-6 text-base text-sun"></p>
            </form>
          </div>
        </div>
      </div>
    </section>`;
    },

    // ─── FOOTER ───────────────────────────────────────
    footerSection() {
      const f = config.footer || {};
      const links = (config.header?.menuItems || [])
        .map((item) => `<li><a href="${esc(item.href)}" class="flex min-h-11 items-center text-base text-fg-muted transition-colors hover:text-fg">${esc(item.label)}</a></li>`)
        .join("\n            ");
      const social = (href, iconName, label) =>
        `<a ${linkAttrs(href)} class="icon-btn glass" aria-label="${esc(label)}">${icon(iconName, iconName === "zalo" ? "size-6" : "size-5")}</a>`;

      return `<footer class="relative overflow-hidden border-t border-white/10 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-12 md:pb-10 md:pt-16">
    <div class="shell">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <a href="#hero" class="inline-flex min-h-11 items-center gap-3">
            <img src="${esc(brand.logo || "public/icons/favicon.svg")}" alt="${esc(brand.logoAlt || "")}" width="40" height="40" class="size-10" loading="lazy">
            <span class="font-display text-lg font-semibold">${esc(brand.name || "")}</span>
          </a>
          ${f.madeWith ? `<p class="mt-3 max-w-sm text-base text-fg-muted">${esc(f.madeWith)}</p>` : ""}
          <div class="mt-5 flex flex-wrap gap-2">
            ${social(h.phoneLink, "phone", "Gọi điện")}
            ${social(h.zaloLink, "zalo", "Nhắn Zalo")}
            ${social(h.emailLink, "email", "Gửi email")}
            ${social(h.facebookLink, "facebook", "Facebook")}
            ${social(h.youtubeLink, "youtube", "YouTube")}
          </div>
        </div>
        <nav aria-label="Liên kết cuối trang" class="lg:col-span-6 lg:col-start-7">
          <ul class="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3" role="list">
            ${links}
          </ul>
        </nav>
      </div>

      <p class="wordmark" aria-hidden="true">${esc(brand.name || "")}</p>

      <div class="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-base text-fg-muted">${esc(f.copyright || "")}</p>
        ${f.backToTop ? `<a href="#hero" class="inline-flex min-h-11 items-center gap-2 self-start text-base font-medium text-fg-muted transition-colors hover:text-fg sm:self-auto">Lên đầu trang ${icon("arrowUp", "size-4")}</a>` : ""}
      </div>
    </div>
  </footer>`;
    },

    // ─── NÚT ZALO NỔI (tablet/desktop — điện thoại đã có dock) ──
    floatingButton() {
      const fb = config.floatingButton || {};
      if (fb.enabled === false) return "";
      return `<a ${linkAttrs(h.floatingLink)} class="fab hidden md:grid" aria-label="${esc(fb.label || "Chat Zalo")}">
    ${icon("zalo", "size-7")}
  </a>`;
    },

    // ─── DOCK ĐẶT LỊCH (điện thoại) ──────────────────
    dock() {
      const d = config.dock || {};
      if (d.enabled === false) return "";
      return `<div id="dock" class="dock md:hidden">
    <nav class="dock-bar" aria-label="Đặt lịch nhanh">
      <a ${linkAttrs(h.phoneLink)} class="dock-call">${icon("phone", "size-5")}<span>${esc(d.callLabel || "Gọi")}</span></a>
      <a ${linkAttrs(h.dockBookLink)} class="btn-glow h-12 flex-1 px-5 text-base">${icon("calendar", "size-5")}<span>${esc(d.bookLabel || "Đặt lịch")}</span></a>
    </nav>
  </div>`;
    },

    // ─── HỘP THOẠI: LIGHTBOX + VIDEO (<dialog> gốc) ──
    dialogs() {
      const closeBtn = `<button type="button" data-dialog-close class="icon-btn glass" aria-label="${esc(ui.closeLabel || "Đóng")}">${icon("close", "size-6")}</button>`;
      return `<dialog id="lightbox" class="media-dialog" aria-label="Xem ảnh">
    <div class="dialog-bar">
      <p data-lb-count class="text-sm tabular-nums text-fg-muted"></p>
      ${closeBtn}
    </div>
    <figure data-lb-stage class="lb-stage">
      <img data-lb-img alt="" class="lb-img" hidden>
      <span data-lb-ph class="ph lb-ph" hidden aria-hidden="true"><span class="ph-ico">${icon("image", "size-6")}</span></span>
      <figcaption data-lb-caption class="mt-4 max-w-xl px-4 text-center text-base text-fg-muted"></figcaption>
    </figure>
    <div class="flex items-center justify-center gap-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
      <button type="button" data-lb-prev class="icon-btn icon-btn--lg glass" aria-label="Ảnh trước">${icon("arrowLeft", "size-6")}</button>
      <button type="button" data-lb-next class="icon-btn icon-btn--lg glass" aria-label="Ảnh sau">${icon("arrowRight", "size-6")}</button>
    </div>
  </dialog>

  <dialog id="video-dialog" class="media-dialog" aria-label="Trình phát video">
    <div class="dialog-bar">
      <p data-video-name class="min-w-0 truncate text-base font-medium"></p>
      ${closeBtn}
    </div>
    <div class="flex w-full flex-1 flex-col items-center justify-center px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div data-player class="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black"></div>
      <div data-video-msg hidden class="glass max-w-md rounded-[1.5rem] p-6 text-center">
        <p class="text-base text-fg">${esc(ui.videoMissing || "Video đang được cập nhật.")}</p>
        <a href="#contact" data-dialog-close class="btn-glow mt-5 h-12 px-6 text-base">${icon("calendar", "size-5")} Liên hệ đặt lịch</a>
      </div>
    </div>
  </dialog>`;
    },
  };
}

// ─── RENDER PAGE ────────────────────────────────────────

/**
 * Ghép template + config → HTML hoàn chỉnh
 * @param {string} template — Nội dung index.html (file khung)
 * @param {object} config — SITE_CONFIG
 * @returns {{ html: string, missing: string[] }}
 */
export function renderPage(template, config) {
  const renderers = createRenderers(config);
  const missing = [];

  // Xóa comment hướng dẫn ở đầu file
  let html = template.replace(/<!--\s*ĐÂY LÀ FILE KHUNG[\s\S]*?-->\s*\n?/, "");

  // 1) Thay thế renderer blocks: {{{ @tenRenderer }}}
  html = html.replace(/\{\{\{\s*@(\w+)\s*\}\}\}/g, (match, name) => {
    if (typeof renderers[name] === "function") {
      return renderers[name]();
    }
    missing.push(`@${name}`);
    return "";
  });

  // 2) Thay thế giá trị: {{ duong.dan }}
  html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
    const val = path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), config);
    if (val === undefined || val === null || typeof val === "object") {
      missing.push(path);
      return "";
    }
    return esc(String(val));
  });

  return { html, missing };
}
