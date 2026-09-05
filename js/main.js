/**
 * FITZONE GYM — Main JavaScript
 * =================================
 * Handles: Navigation, Scroll effects, Animated counters,
 * Gallery filter + Lightbox, Enquiry form validation,
 * Mobile menu, Reveal animations, Rate limiting
 */

"use strict";

/* ─── Rate Limiter (spam protection) ─────────────────────────────────────── */
const RateLimiter = (() => {
  const submissions = [];
  const MAX_SUBMISSIONS = 3;
  const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

  return {
    canSubmit() {
      const now = Date.now();
      const recent = submissions.filter((t) => now - t < WINDOW_MS);
      submissions.length = 0;
      submissions.push(...recent);
      return submissions.length < MAX_SUBMISSIONS;
    },
    record() {
      submissions.push(Date.now());
    },
  };
})();

/* ─── Sanitizer ──────────────────────────────────────────────────────────── */
function sanitizeInput(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();
}

/* ─── Validators ─────────────────────────────────────────────────────────── */
function isValidName(v) {
  return v.trim().length >= 2 && v.trim().length <= 100 && /^[\p{L}\s'.,-]+$/u.test(v.trim());
}

function isValidPhone(v) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/* ─── DOM Ready ──────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initHeroLoad();
  initScrollReveal();
  initCounters();
  initGallery();
  initLightbox();
  initFacilityLightbox();
  initEnquiryForm();
  initGalleryFilter();
  populateGalleryFromConfig();
  populateFacilitiesFromConfig();
  populateProgramsFromConfig();
  setWALinks();
  setPhoneLinks();
});

/* ─── 1. Navbar Scroll Effect ────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      // Close mobile nav if open
      closeMobileNav();
    });
  });
}

/* ─── 2. Mobile Menu ─────────────────────────────────────────────────────── */
let mobileNavOpen = false;

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    mobileNavOpen ? closeMobileNav() : openMobileNav();
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      mobileNavOpen &&
      !hamburger.contains(e.target) &&
      !mobileNav.contains(e.target)
    ) {
      closeMobileNav();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNavOpen) closeMobileNav();
  });
}

function openMobileNav() {
  mobileNavOpen = true;
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  hamburger.setAttribute("aria-expanded", "true");
  mobileNav.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  mobileNavOpen = false;
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  if (mobileNav) mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── 3. Hero Image Load Effect ─────────────────────────────────────────── */
function initHeroLoad() {
  const hero = document.getElementById("hero");
  const heroImg = hero && hero.querySelector(".hero-bg img");
  if (!hero || !heroImg) return;

  const trigger = () => hero.classList.add("loaded");

  if (heroImg.complete) {
    trigger();
  } else {
    heroImg.addEventListener("load", trigger);
  }
}

/* ─── 4. Scroll Reveal ───────────────────────────────────────────────────── */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ─── 5. Animated Counters ───────────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter);
    const isDecimal = el.dataset.decimal === "true";
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const current = target * ease;

      el.textContent =
        prefix +
        (isDecimal ? current.toFixed(1) : Math.floor(current)) +
        suffix;

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ─── 6. Gallery Filter ──────────────────────────────────────────────────── */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryGrid = document.getElementById("gallery-grid");
  if (!filterBtns.length || !galleryGrid) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const items = galleryGrid.querySelectorAll(".gallery-item");

      items.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "";
          item.style.opacity = "0";
          requestAnimationFrame(() => {
            item.style.transition = "opacity 0.35s ease";
            item.style.opacity = "1";
          });
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/* ─── 7. Gallery + Facility Lightbox ────────────────────────────────────── */
let lightboxImages = [];
let lightboxIndex = 0;

function initLightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbClose = document.getElementById("lightbox-close");
  const lbPrev = document.getElementById("lightbox-prev");
  const lbNext = document.getElementById("lightbox-next");

  if (!lb) return;

  // Close on overlay click
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  lbClose && lbClose.addEventListener("click", closeLightbox);
  lbPrev && lbPrev.addEventListener("click", () => lightboxNavigate(-1));
  lbNext && lbNext.addEventListener("click", () => lightboxNavigate(1));

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxNavigate(-1);
    if (e.key === "ArrowRight") lightboxNavigate(1);
  });
}

function openLightbox(images, startIndex) {
  lightboxImages = images;
  lightboxIndex = startIndex;
  showLightboxImage();
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function lightboxNavigate(dir) {
  lightboxIndex =
    (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  showLightboxImage();
}

function showLightboxImage() {
  const lbImg = document.getElementById("lightbox-img");
  if (!lbImg || !lightboxImages[lightboxIndex]) return;
  const { src, alt } = lightboxImages[lightboxIndex];
  lbImg.src = src;
  lbImg.alt = alt || "Fitzone Gym";
}

/* Gallery lightbox setup */
function initGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;

    const allItems = [...galleryGrid.querySelectorAll(".gallery-item[data-src]")];
    const images = allItems.map((el) => ({
      src: el.dataset.src,
      alt: el.dataset.alt,
    }));
    const index = allItems.indexOf(item);

    openLightbox(images, index);
  });
}

/* Facility lightbox setup */
function initFacilityLightbox() {
  const facilityGrid = document.getElementById("facilities-grid");
  if (!facilityGrid) return;

  facilityGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".facility-card[data-src]");
    if (!card) return;

    const allCards = [...facilityGrid.querySelectorAll(".facility-card[data-src]")];
    const images = allCards.map((el) => ({
      src: el.dataset.src,
      alt: el.dataset.alt,
    }));
    const index = allCards.indexOf(card);

    openLightbox(images, index);
  });
}

/* ─── 8. Enquiry Form ────────────────────────────────────────────────────── */
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  const successMsg = document.getElementById("form-success");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    if (!RateLimiter.canSubmit()) {
      showFormError(
        form,
        "Too many submissions. Please wait a few minutes before trying again."
      );
      return;
    }

    RateLimiter.record();

    // Collect sanitized data (for display / future backend integration)
    const data = {
      name: sanitizeInput(form.querySelector("#f-name").value),
      phone: sanitizeInput(form.querySelector("#f-phone").value),
      goal: sanitizeInput(form.querySelector("#f-goal").value),
      contact: sanitizeInput(form.querySelector("#f-contact").value),
      message: sanitizeInput(form.querySelector("#f-message").value),
    };

    // NOTE: No backend is configured. The form is a UI demonstration.
    // To integrate a backend, POST `data` to your API endpoint here.
    // Example: await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(data) })

    console.log("Enquiry form data:", data);

    // Show success state
    form.style.display = "none";
    if (successMsg) {
      successMsg.classList.add("visible");
      successMsg.setAttribute("role", "alert");
    }
  });

  // Live validation on blur
  form.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      const group = input.closest(".form-group");
      if (group && group.classList.contains("has-error")) {
        validateField(input);
      }
    });
  });
}

function validateForm(form) {
  let valid = true;
  const fields = form.querySelectorAll(".form-control[required]");
  fields.forEach((field) => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  const group = field.closest(".form-group");
  if (!group) return true;

  const errorEl = group.querySelector(".form-error");
  let valid = true;
  let errorMsg = "";

  const value = field.value.trim();
  const id = field.id;

  if (field.hasAttribute("required") && !value) {
    valid = false;
    errorMsg = "This field is required.";
  } else if (id === "f-name" && value && !isValidName(value)) {
    valid = false;
    errorMsg = "Please enter a valid name (letters only, 2–100 characters).";
  } else if (id === "f-phone" && value && !isValidPhone(value)) {
    valid = false;
    errorMsg = "Please enter a valid phone number.";
  }

  if (!valid) {
    group.classList.add("has-error");
    if (errorEl) errorEl.textContent = errorMsg;
  } else {
    group.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }

  return valid;
}

function showFormError(form, message) {
  let errorDiv = form.querySelector(".form-global-error");
  if (!errorDiv) {
    errorDiv = document.createElement("p");
    errorDiv.className = "form-global-error form-spam-note";
    errorDiv.style.color = "#ff6b6b";
    form.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

/* ─── 9. Populate from Config ────────────────────────────────────────────── */

function populateGalleryFromConfig() {
  if (typeof FITZONE === "undefined" || !FITZONE.gallery) return;
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const layouts = ["", "tall", "", "wide", "", "", "tall", "", "wide"];

  FITZONE.gallery.forEach((item, i) => {
    const layoutClass = layouts[i % layouts.length] || "";
    const div = document.createElement("div");
    div.className = `gallery-item ${layoutClass}`;
    div.dataset.category = item.category;
    div.dataset.src = item.src;
    div.dataset.alt = item.alt;
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `View: ${item.alt}`);

    div.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-item-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>`;

    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") div.click();
    });

    grid.appendChild(div);
  });
}

function populateFacilitiesFromConfig() {
  if (typeof FITZONE === "undefined" || !FITZONE.facilities) return;
  const grid = document.getElementById("facilities-grid");
  if (!grid) return;
  grid.innerHTML = "";

  FITZONE.facilities.forEach((item) => {
    const div = document.createElement("div");
    div.className = "facility-card";
    div.dataset.src = item.image;
    div.dataset.alt = item.alt;
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `View ${item.label}`);

    div.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" loading="lazy">
      <div class="facility-overlay"></div>
      <span class="facility-label">${item.label}</span>
      <div class="facility-expand" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
        </svg>
      </div>`;

    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") div.click();
    });

    grid.appendChild(div);
  });

  // Re-init facility lightbox after populating
  initFacilityLightbox();
}

function populateProgramsFromConfig() {
  if (typeof FITZONE === "undefined" || !FITZONE.programs) return;
  const grid = document.getElementById("programs-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const icons = {
    dumbbell: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4"/></svg>`,
    scale: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4-.7-.7.7M5.6 18.4l.7-.7m11.4.7-.7-.7"/><circle cx="12" cy="12" r="4"/></svg>`,
    arm: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l4-8 4 4 4-6 4 10"/></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    person: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"/></svg>`,
    lightning: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  };

  FITZONE.programs.forEach((prog, i) => {
    const card = document.createElement("div");
    card.className = "program-card reveal";
    if (i > 0) card.classList.add(`reveal-delay-${Math.min(i, 6)}`);

    card.innerHTML = `
      <div class="program-number">0${i + 1}</div>
      <h3 class="program-title">${prog.title}</h3>
      <p class="program-desc">${prog.description}</p>
      <div class="program-arrow" aria-hidden="true">→</div>`;

    grid.appendChild(card);
  });
}

/* ─── 10. Set WhatsApp Links ─────────────────────────────────────────────── */
function setWALinks() {
  if (typeof FITZONE === "undefined") return;
  const waLinks = document.querySelectorAll("[data-wa]");

  waLinks.forEach((el) => {
    if (FITZONE.whatsapp.enabled && FITZONE.whatsappUrl) {
      el.href = FITZONE.whatsappUrl;
      el.removeAttribute("data-wa-disabled");
    } else {
      el.href = `tel:${FITZONE.phone}`;
      el.title = "WhatsApp not yet configured — calling instead";
    }
  });
}

/* ─── 11. Set Phone Links ────────────────────────────────────────────────── */
function setPhoneLinks() {
  if (typeof FITZONE === "undefined") return;
  document.querySelectorAll("[data-phone-display]").forEach((el) => {
    el.textContent = FITZONE.phoneDisplay;
  });
}
