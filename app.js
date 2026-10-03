(function () {
  var urls = window.CHECKOUT_URLS || {};
  var page = document.querySelector("[data-page]");
  var root = document.querySelector("[data-sheet]");
  var nameEl = document.querySelector("[data-sheet-name]");
  var priceEl = document.querySelector("[data-sheet-price]");
  var detailEl = document.querySelector("[data-sheet-detail]");
  var go = document.querySelector("[data-sheet-go]");
  var empty = document.querySelector("[data-sheet-empty]");
  var closeBtn = document.querySelector("[data-sheet-close]");
  var lastFocus = null;

  function validUrl(value) {
    if (!value) return "";
    var trimmed = String(value).trim();
    if (!/^https?:\/\//i.test(trimmed)) return "";
    return trimmed;
  }

  function focusables() {
    var list = [];
    if (!go.hidden) list.push(go);
    list.push(closeBtn);
    return list;
  }

  function openFrom(button) {
    var href = validUrl(urls[button.getAttribute("data-buy")]);
    lastFocus = button;
    nameEl.textContent = button.getAttribute("data-name") || "";
    priceEl.textContent = button.getAttribute("data-price") || "";
    detailEl.textContent = button.getAttribute("data-detail") || "";
    if (href) {
      go.href = href;
      go.hidden = false;
      empty.hidden = true;
    } else {
      go.hidden = true;
      go.removeAttribute("href");
      empty.hidden = false;
    }
    root.hidden = false;
    document.body.classList.add("is-locked");
    if (page) page.inert = true;
    (href ? go : closeBtn).focus();
  }

  function closeSheet() {
    if (root.hidden) return;
    root.hidden = true;
    document.body.classList.remove("is-locked");
    if (page) page.inert = false;
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", function (event) {
    var buy = event.target.closest("[data-buy]");
    if (buy) {
      openFrom(buy);
      return;
    }
    if (event.target.closest("[data-sheet-close]") || event.target.closest("[data-scrim]")) {
      closeSheet();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (root.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeSheet();
      return;
    }
    if (event.key !== "Tab") return;
    var items = focusables();
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
