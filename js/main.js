(function () {
  "use strict";

  var WHATSAPP_NUMBER = "14075201065";
  var STORAGE_KEY = "gls-lang";

  function getInitialLang() {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("lang");
    if (fromUrl === "es" || fromUrl === "en") return fromUrl;
    var stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  function buildWaLink(lang) {
    var dict = window.SITE_I18N[lang] || window.SITE_I18N.en;
    var text = encodeURIComponent(dict["whatsapp.message"]);
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  }

  function applyLang(lang) {
    var dict = window.SITE_I18N[lang] || window.SITE_I18N.en;

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = dict[key];
      if (value === undefined) return;
      if (el.hasAttribute("data-i18n-attr")) {
        el.setAttribute(el.getAttribute("data-i18n-attr"), value);
      } else {
        el.innerHTML = value;
      }
    });

    var waHref = buildWaLink(lang);
    document.querySelectorAll("[data-wa-link]").forEach(function (el) {
      el.setAttribute("href", waHref);
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      var isActive = btn.id === "lang-" + lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    window.localStorage.setItem(STORAGE_KEY, lang);

    var url = new URL(window.location.href);
    if (lang === "es") {
      url.searchParams.set("lang", "es");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function syncHeaderHeight() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var initialLang = getInitialLang();
    applyLang(initialLang);

    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);

    var enBtn = document.getElementById("lang-en");
    var esBtn = document.getElementById("lang-es");
    if (enBtn) enBtn.addEventListener("click", function () { applyLang("en"); });
    if (esBtn) esBtn.addEventListener("click", function () { applyLang("es"); });

    var navToggle = document.getElementById("nav-toggle");
    var mainNav = document.getElementById("main-nav");
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        var isOpen = mainNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mainNav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Only one FAQ item open at a time
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          document.querySelectorAll(".faq-item").forEach(function (other) {
            if (other !== item) other.removeAttribute("open");
          });
        }
      });
    });
  });
})();
