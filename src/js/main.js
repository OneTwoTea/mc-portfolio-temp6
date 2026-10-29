/**
 * ═══════════════════════════════════════════════════════════
 *  MAIN.JS — JS phía trình duyệt (không thư viện ngoài)
 *  Header, menu điện thoại, thu gọn danh sách, lọc + lightbox
 *  (vuốt), video tải khi bấm, ánh sáng hero, dock, form báo giá.
 *  Mọi nội dung đã có sẵn trong HTML — JS chỉ tăng trải nghiệm.
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 1024px)");
  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));
  const clamp01 = (n) => Math.min(1, Math.max(0, n));

  // ─── KHÓA CUỘN: tính lại từ trạng thái thật (menu mở hoặc có <dialog open>) ──
  function syncScrollLock() {
    const menuOpen = !!$("#mobile-menu.is-open");
    root.classList.toggle("is-locked", menuOpen || !!$("dialog[open]"));
  }

  // ─── HEADER: đậm nền khi cuộn ─────────────────────────
  function initHeader() {
    const header = $("#site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // ─── MENU ĐIỆN THOẠI ──────────────────────────────────
  // aria-expanded, khóa cuộn, Esc / bấm ra ngoài / chọn mục để đóng, giữ focus trong menu
  function initMenu() {
    const btn = $("#menu-toggle");
    const layer = $("#mobile-menu");
    const header = $("#site-header");
    if (!btn || !layer) return;

    const label = $("[data-menu-label]", btn);
    const openText = label ? label.textContent : "";
    const closeText = btn.dataset.closeLabel || "Đóng";
    let open = false;
    layer.inert = true;

    function setOpen(next, restoreFocus = true) {
      if (next === open) return;
      open = next;
      btn.setAttribute("aria-expanded", String(open));
      layer.classList.toggle("is-open", open);
      header && header.classList.toggle("menu-open", open);
      layer.inert = !open;
      if (label) label.textContent = open ? closeText : openText;
      syncScrollLock();
      if (open) {
        const first = $("a", layer);
        first && first.focus({ preventScroll: true });
      } else if (restoreFocus) {
        btn.focus({ preventScroll: true });
      }
    }

    btn.addEventListener("click", () => setOpen(!open));

    layer.addEventListener("click", (e) => {
      if (e.target.closest("[data-menu-close]")) setOpen(false);
      else if (e.target.closest("a")) setOpen(false, false); // chọn mục → đóng, trình duyệt cuộn tới mục
    });

    document.addEventListener("keydown", (e) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // Giữ Tab trong [nút menu + các link trong menu]
      if (e.key === "Tab") {
        const items = [btn, ...$$("a, button", layer).filter((el) => el.offsetParent !== null)];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    desktop.addEventListener("change", (e) => e.matches && setOpen(false, false));
  }

  // ─── THU GỌN DANH SÁCH ("Xem thêm (N)" / "Thu gọn") ──
  function initCollapse() {
    $$("[data-more]").forEach((btn) => {
      const list = document.getElementById(btn.getAttribute("aria-controls"));
      const label = $("[data-more-label]", btn);
      if (!list) return;

      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        list.classList.toggle("is-open", open);
        if (label) label.textContent = open ? btn.dataset.labelLess : btn.dataset.labelMore;

        if (open) {
          if (!reduceMotion.matches) {
            $$(":scope > [data-extra]", list).forEach((el) => {
              el.classList.add("is-entering");
              el.addEventListener("animationend", () => el.classList.remove("is-entering"), { once: true });
            });
          }
        } else {
          // Thu lại → cuộn về đầu section để không bị "lạc" giữa trang
          const section = list.closest("section");
          section && section.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
        }
      });
    });
  }

  // ─── CÂU CHUYỆN (details): mở sẵn trên màn hình lớn ──
  function initStory() {
    const sync = () => {
      if (desktop.matches) $$("details[data-open-lg]").forEach((d) => (d.open = true));
    };
    sync();
    desktop.addEventListener("change", sync);
  }

  // ─── LỌC GALLERY ──────────────────────────────────────
  function initGalleryFilter() {
    const grid = $("#gallery-grid");
    const chips = $$("[data-filter]");
    if (!grid || !chips.length) return;
    const moreWrap = $('[data-more-wrap="gallery-grid"]');

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const cat = chip.dataset.filter;
        const all = cat === "*";
        chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        grid.classList.toggle("is-filtering", !all); // đang lọc → hiện mọi ảnh khớp, bỏ thu gọn
        $$(":scope > li", grid).forEach((li) => (li.hidden = !all && li.dataset.category !== cat));
        if (moreWrap) moreWrap.hidden = !all;
      });
    });
  }

  // ─── HỘP THOẠI DÙNG CHUNG (<dialog>) ─────────────────
  function setupDialog(dlg, onClose) {
    dlg.addEventListener("close", () => {
      syncScrollLock();
      onClose && onClose();
    });
    dlg.addEventListener("click", (e) => {
      if (e.target.closest("[data-dialog-close]")) dlg.close();
      else if (e.target === dlg) dlg.close(); // bấm vùng trống
    });
  }
  function openDialog(dlg) {
    if (dlg.open) return;
    dlg.showModal();
    syncScrollLock();
  }

  // ─── LIGHTBOX (bàn phím + vuốt) ───────────────────────
  function initLightbox() {
    const dlg = $("#lightbox");
    const triggers = $$("[data-lightbox]");
    if (!dlg || !triggers.length || typeof dlg.showModal !== "function") return;

    const img = $("[data-lb-img]", dlg);
    const ph = $("[data-lb-ph]", dlg);
    const caption = $("[data-lb-caption]", dlg);
    const count = $("[data-lb-count]", dlg);
    const stage = $("[data-lb-stage]", dlg);
    let items = [];
    let index = 0;

    function show(i) {
      index = (i + items.length) % items.length;
      const item = items[index];
      const src = item.dataset.src;
      const alt = item.dataset.alt || "";
      if (src) {
        img.src = src;
        img.alt = alt;
        img.hidden = false;
        ph.hidden = true;
      } else {
        img.removeAttribute("src");
        img.hidden = true;
        ph.hidden = false;
      }
      caption.textContent = alt;
      count.textContent = `${index + 1} / ${items.length}`;
      // Nạp trước ảnh kế tiếp để vuốt mượt
      const next = items[(index + 1) % items.length];
      if (next && next.dataset.src) new Image().src = next.dataset.src;
    }

    triggers.forEach((btn) =>
      btn.addEventListener("click", () => {
        // Ảnh đang bị lọc ẩn thì bỏ qua; ảnh đang thu gọn vẫn xem được trong lightbox
        items = triggers.filter((t) => !t.closest("li").hidden);
        show(items.indexOf(btn));
        openDialog(dlg);
      })
    );

    $("[data-lb-prev]", dlg).addEventListener("click", () => show(index - 1));
    $("[data-lb-next]", dlg).addEventListener("click", () => show(index + 1));
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });

    // Vuốt trái/phải
    let startX = 0;
    let startY = 0;
    let tracking = false;
    stage.addEventListener("pointerdown", (e) => {
      tracking = true;
      startX = e.clientX;
      startY = e.clientY;
    });
    stage.addEventListener("pointerup", (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) show(index + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener("pointercancel", () => (tracking = false));

    setupDialog(dlg, () => {
      img.removeAttribute("src");
    });
  }

  // ─── VIDEO: chỉ tải trình phát khi bấm (poster hiện trước) ──
  function toEmbed(url) {
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    if (yt) return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1` };
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
    if (/\.(mp4|webm|mov)(\?|#|$)/i.test(url)) return { type: "video", src: url };
    return { type: "iframe", src: url };
  }

  function initVideos() {
    const dlg = $("#video-dialog");
    const triggers = $$("[data-video], [data-video-missing]");
    if (!dlg || !triggers.length || typeof dlg.showModal !== "function") return;

    const player = $("[data-player]", dlg);
    const msg = $("[data-video-msg]", dlg);
    const name = $("[data-video-name]", dlg);

    triggers.forEach((btn) =>
      btn.addEventListener("click", () => {
        const url = btn.dataset.video;
        name.textContent = btn.dataset.videoTitle || "";
        player.innerHTML = "";
        player.hidden = !url;
        msg.hidden = !!url;

        if (url) {
          const embed = toEmbed(url);
          if (embed.type === "video") {
            const v = document.createElement("video");
            v.src = embed.src;
            v.controls = true;
            v.autoplay = true;
            v.playsInline = true;
            v.className = "size-full";
            player.appendChild(v);
          } else {
            const f = document.createElement("iframe");
            f.src = embed.src;
            f.title = btn.dataset.videoTitle || "Video";
            f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
            f.allowFullscreen = true;
            f.className = "size-full";
            player.appendChild(f);
          }
        }
        openDialog(dlg);
      })
    );

    // Đóng → gỡ trình phát để dừng tiếng
    setupDialog(dlg, () => (player.innerHTML = ""));
  }

  // ─── ÁNH SÁNG HERO: đốm sáng theo ngón tay/chuột, nghiêng nhẹ trên máy tính ──
  function initStageLight() {
    const frame = $("[data-tilt]");
    if (!frame) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let raf = 0;
    let px = 0.7;
    let py = 0;

    function apply() {
      raf = 0;
      frame.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      frame.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      if (finePointer.matches && !reduceMotion.matches) {
        frame.style.setProperty("--rx", `${((0.5 - py) * 4).toFixed(2)}deg`);
        frame.style.setProperty("--ry", `${((px - 0.5) * 6).toFixed(2)}deg`);
      }
    }
    function onPoint(e) {
      const r = frame.getBoundingClientRect();
      px = clamp01((e.clientX - r.left) / r.width);
      py = clamp01((e.clientY - r.top) / r.height);
      frame.classList.add("is-lit");
      if (!raf) raf = requestAnimationFrame(apply);
    }

    frame.addEventListener("pointermove", onPoint, { passive: true });
    frame.addEventListener("pointerdown", onPoint, { passive: true });
    frame.addEventListener("pointerleave", () => {
      frame.classList.remove("is-lit");
      frame.style.setProperty("--rx", "0deg");
      frame.style.setProperty("--ry", "0deg");
    });
  }

  // ─── HIỆN DẦN KHI CUỘN ───────────────────────────────
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
  }

  // ─── DOCK ĐẶT LỊCH: hiện khi đã qua nút hero, ẩn ở mục Liên hệ ──
  function initDock() {
    const dock = $("#dock");
    const heroCta = $("[data-hero-cta]");
    const contact = $("#contact");
    if (!dock || !("IntersectionObserver" in window)) {
      dock && dock.classList.add("is-shown");
      return;
    }
    let pastHero = false;
    let atContact = false;
    const update = () => dock.classList.toggle("is-shown", pastHero && !atContact);

    if (heroCta) {
      new IntersectionObserver(([en]) => {
        pastHero = !en.isIntersecting && en.boundingClientRect.top < 0;
        update();
      }).observe(heroCta);
    } else {
      pastHero = true;
    }
    if (contact) {
      new IntersectionObserver(
        ([en]) => {
          atContact = en.isIntersecting;
          update();
        },
        { threshold: 0.12 }
      ).observe(contact);
    }
    update();
  }

  // ─── FORM BÁO GIÁ → mở ứng dụng email ────────────────
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $("[data-form-status]", form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = [form.elements.name, form.elements.phone];
      let firstInvalid = null;
      fields.forEach((f) => {
        const ok = f.checkValidity() && f.value.trim() !== "";
        f.setAttribute("aria-invalid", String(!ok));
        if (!ok && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) {
        status.textContent = "Vui lòng nhập họ tên và số điện thoại hợp lệ.";
        firstInvalid.focus();
        return;
      }

      const to = form.dataset.email;
      if (!to) {
        status.textContent = "Email nhận báo giá chưa được cấu hình — vui lòng gọi điện hoặc nhắn Zalo ở trên.";
        return;
      }

      const d = Object.fromEntries(new FormData(form));
      const subject = `Yêu cầu báo giá MC — ${d.eventType || "Sự kiện"}`;
      const body = [
        `Họ và tên: ${d.name}`,
        `Số điện thoại: ${d.phone}`,
        d.email ? `Email: ${d.email}` : "",
        `Loại sự kiện: ${d.eventType || ""}`,
        d.date ? `Ngày dự kiến: ${d.date}` : "",
        "",
        d.message || "",
      ]
        .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
        .join("\n");

      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Đang mở ứng dụng email của bạn…";
    });

    form.addEventListener("input", (e) => {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
        e.target.setAttribute("aria-invalid", "false");
      }
    });
  }

  // ─── KHỞI ĐỘNG ───────────────────────────────────────
  initHeader();
  initMenu();
  initCollapse();
  initStory();
  initGalleryFilter();
  initLightbox();
  initVideos();
  initStageLight();
  initReveal();
  initDock();
  initContactForm();
})();
