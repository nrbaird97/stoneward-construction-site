/*
  Stoneward Construction
  Small, dependency-free site script.
  Content data lives in config.js and plans.js.
*/
(function () {
  "use strict";

  var config = window.SITECONFIG || {};
  var plans = Array.isArray(window.IRONTOWN_PLANS) ? window.IRONTOWN_PLANS : [];

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function telHref() {
    var digits = String(config.phone || "").replace(/\D/g, "");
    if (!digits) {
      return "tel:";
    }
    return "tel:" + (digits.length === 10 ? "+1" + digits : "+" + digits);
  }

  function emailHref() {
    return "mailto:" + String(config.email || "");
  }

  function applyContactDetails() {
    var phone = String(config.phone || "");
    var email = String(config.email || "");
    var area = String(config.serviceArea || "");

    $$("[data-phone-link]").forEach(function (link) {
      link.setAttribute("href", telHref());
      if (phone) {
        link.setAttribute("aria-label", "Call Stoneward Construction at " + phone);
      }
    });

    $$("[data-phone-text]").forEach(function (node) {
      node.textContent = phone;
    });

    $$("[data-email-link]").forEach(function (link) {
      link.setAttribute("href", emailHref());
      if (email) {
        link.setAttribute("aria-label", "Email Stoneward Construction at " + email);
      }
    });

    $$("[data-email-text]").forEach(function (node) {
      node.textContent = email;
    });

    $$("[data-service-area]").forEach(function (node) {
      node.textContent = area;
    });
  }

  function injectBusinessSchema() {
    var node = document.getElementById("business-schema");
    if (!node) {
      return;
    }

    var schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": config.businessName || "Stoneward Construction",
      "url": String(config.siteUrl || "https://www.stonewardconstruction.com").replace(/\/$/, "") + "/",
      "description": "Licensed Utah residential contractor and authorized Irontown Modular dealer for modular ADUs and small modular homes.",
      "telephone": config.phone,
      "email": config.email,
      "areaServed": config.serviceArea
    };

    node.textContent = JSON.stringify(schema);
  }

  function setMenu(open, nav, toggle) {
    if (!nav || !toggle) {
      return;
    }
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) {
      var firstLink = nav.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  function initMenu() {
    var nav = document.getElementById("site-nav");
    var toggle = $(".nav-toggle");
    if (!nav || !toggle) {
      return;
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen, nav, toggle);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false, nav, toggle);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false, nav, toggle);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) {
        return;
      }
      if (nav.contains(event.target) || toggle.contains(event.target)) {
        return;
      }
      setMenu(false, nav, toggle);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        setMenu(false, nav, toggle);
      }
    });
  }

  function markCurrentNav() {
    var page = window.location.pathname.split("/").pop() || "index.html";
    $$(".site-nav a[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === page) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function bedsRange(value) {
    var parts = String(value).split("-").map(function (part) {
      return Number(part);
    });
    return {
      min: parts[0] || 0,
      max: parts[parts.length - 1] || parts[0] || 0
    };
  }

  function countLabel(value, singular, plural) {
    return String(value) === "1" ? singular : plural;
  }

  function photoClass(index) {
    return ["ph--warm", "ph--sage", "ph--clay", "ph--sand"][index % 4];
  }

  function planCard(plan, index) {
    var range = bedsRange(plan.beds);
    var sqft = Number(plan.sqft).toLocaleString("en-US");
    var bedsNoun = countLabel(plan.beds, "bed", "beds");
    var bathsNoun = countLabel(plan.baths, "bath", "baths");
    var photo = escapeHtml(plan.photo || "");
    var planImage = escapeHtml(plan.plan || "");
    var name = escapeHtml(plan.name);
    var requestUrl = "contact.html?plan=" + encodeURIComponent(plan.name);

    return [
      '<article class="plan-card" data-category="' + escapeHtml(plan.category || "") + '" data-beds-min="' + range.min + '" data-beds-max="' + range.max + '" data-sqft="' + Number(plan.sqft) + '">',
      '  <figure class="ph ' + photoClass(index) + ' plan-card__media" data-photo="' + photo + '">',
      '    <img class="plan-card__photo" src="assets/img/' + photo + '" alt="Irontown Modular ' + name + ' exterior rendering" loading="lazy" onerror="this.hidden=true">',
      planImage ? '    <img class="plan-card__plan" src="assets/img/' + planImage + '" alt="Irontown Modular ' + name + ' floor plan" loading="lazy" onerror="this.hidden=true">' : '',
      '    <figcaption>' + name + '</figcaption>',
      planImage ? '    <button class="plan-card__toggle" type="button" data-plan-toggle aria-pressed="false">Floor plan</button>' : '',
      '  </figure>',
      '  <div class="plan-card__body">',
      '    <h3>' + name + '</h3>',
      '    <p class="plan-size"><strong>' + sqft + '</strong> sq ft' + (plan.footprint ? ' <span>(' + escapeHtml(plan.footprint) + ')</span>' : '') + '</p>',
      '    <ul class="plan-specs">',
      '      <li><strong>' + escapeHtml(plan.beds) + '</strong> ' + bedsNoun + '</li>',
      '      <li><strong>' + escapeHtml(plan.baths) + '</strong> ' + bathsNoun + '</li>',
      '    </ul>',
      plan.type ? '    <p class="plan-type">' + escapeHtml(plan.type) + '</p>' : '',
      '    <a class="btn btn--primary btn--block" href="' + requestUrl + '">Request pricing</a>',
      '  </div>',
      '</article>'
    ].join("\n");
  }

  function initFeaturedPlans() {
    var grid = $("[data-featured-plans]");
    if (!grid || !plans.length) {
      return;
    }

    var names = ["Mysa 500", "Cabana 2 Bed", "Rabbit 800"];
    var featured = names.map(function (name) {
      return plans.find(function (plan) {
        return plan.name === name;
      });
    }).filter(Boolean);

    if (featured.length < 3) {
      plans.forEach(function (plan) {
        if (featured.length < 3 && featured.indexOf(plan) === -1) {
          featured.push(plan);
        }
      });
    }

    grid.innerHTML = featured.slice(0, 3).map(planCard).join("\n");
  }

  function setPressed(buttons, active) {
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", button === active ? "true" : "false");
    });
  }

  function initPlanBrowser() {
    var grid = $("[data-plans-grid]");
    if (!grid) {
      return;
    }

    if (!plans.length) {
      grid.innerHTML = '<p class="empty-state">Plan data is being updated. Please call or email Stoneward for the current plan list.</p>';
      return;
    }

    // Group the plans by series, in an order that packs neatly three across.
    var seriesNames = [];
    plans.forEach(function (plan) {
      var series = plan.series || plan.name;
      if (seriesNames.indexOf(series) === -1) {
        seriesNames.push(series);
      }
    });

    grid.innerHTML = seriesNames.map(function (series) {
      var members = plans.filter(function (plan) {
        return (plan.series || plan.name) === series;
      });
      if (!members.length) {
        return "";
      }
      return [
        '<section class="series" data-series data-n="' + Math.min(members.length, 4) + '">',
        '  <header class="series__head">',
        '    <div><p class="series__eyebrow">Series</p><h2>' + escapeHtml(series) + '</h2></div>',
        '    <p class="series__count" data-series-count></p>',
        '  </header>',
        '  <div class="series__grid">',
        members.map(function (plan) { return planCard(plan, plans.indexOf(plan)); }).join("\n"),
        '  </div>',
        '</section>'
      ].join("\n");
    }).join("\n");

    var cards = $$(".plan-card", grid);
    var groups = $$("[data-series]", grid);
    var count = $("[data-plan-count]");
    var empty = $("[data-plans-empty]");
    var state = { type: "all", beds: "all", size: "all" };

    function showCard(card) {
      var bedsMin = Number(card.getAttribute("data-beds-min"));
      var bedsMax = Number(card.getAttribute("data-beds-max"));
      var sqft = Number(card.getAttribute("data-sqft"));

      if (state.type !== "all" && card.getAttribute("data-category") !== state.type) {
        return false;
      }
      if (state.beds === "1" && bedsMin > 1) {
        return false;
      }
      if (state.beds === "2" && (bedsMin > 2 || bedsMax < 2)) {
        return false;
      }
      if (state.beds === "3" && bedsMax < 3) {
        return false;
      }
      if (state.size === "under600" && sqft >= 600) {
        return false;
      }
      if (state.size === "600to1000" && (sqft < 600 || sqft > 1002)) {
        return false;
      }
      if (state.size === "1000plus" && sqft <= 1002) {
        return false;
      }
      return true;
    }

    function update() {
      var shown = 0;
      cards.forEach(function (card) {
        var visible = showCard(card);
        card.hidden = !visible;
        if (visible) {
          shown += 1;
        }
      });

      groups.forEach(function (group) {
        var visible = $$(".plan-card", group).filter(function (card) { return !card.hidden; }).length;
        group.hidden = visible === 0;
        group.setAttribute("data-n", String(Math.min(visible, 4)));
        var label = $("[data-series-count]", group);
        if (label) {
          label.textContent = visible + (visible === 1 ? " model" : " models");
        }
      });

      if (count) {
        count.textContent = shown === cards.length ? "All " + cards.length + " plans" : shown + " of " + cards.length + " plans";
      }
      if (empty) {
        empty.hidden = shown !== 0;
      }
    }

    var typeButtons = $$("[data-filter-type]");
    typeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        state.type = button.getAttribute("data-filter-type");
        setPressed(typeButtons, button);
        update();
      });
    });

    var bedButtons = $$("[data-filter-beds]");
    var sizeButtons = $$("[data-filter-size]");

    bedButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        state.beds = button.getAttribute("data-filter-beds");
        setPressed(bedButtons, button);
        update();
      });
    });

    sizeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        state.size = button.getAttribute("data-filter-size");
        setPressed(sizeButtons, button);
        update();
      });
    });

    update();
  }

  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) {
      return;
    }

    var planSelect = $("[data-plan-select]", form);
    if (planSelect) {
      plans.forEach(function (plan) {
        var option = document.createElement("option");
        option.value = plan.name;
        option.textContent = plan.name;
        planSelect.appendChild(option);
      });

      var requested = new URLSearchParams(window.location.search).get("plan");
      if (requested) {
        var exists = Array.prototype.some.call(planSelect.options, function (option) {
          return option.value === requested;
        });
        if (!exists) {
          var extra = document.createElement("option");
          extra.value = requested;
          extra.textContent = requested;
          planSelect.appendChild(extra);
        }
        planSelect.value = requested;
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var values = {};
      data.forEach(function (value, key) {
        values[key] = String(value).trim();
      });

      var chosenPlan = values.plan || "Not sure yet";
      var subject = "ADU plan request: " + chosenPlan;
      var body = [
        "Name: " + (values.name || ""),
        "Phone: " + (values.phone || ""),
        "Email: " + (values.email || ""),
        "City: " + (values.city || ""),
        "Lot situation: " + (values.lot || ""),
        "Plan of interest: " + chosenPlan,
        "",
        "Message:",
        values.message || "(No message)"
      ].join("\n");

      var href = emailHref() +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var status = $("[data-form-status]", form);
      if (status) {
        status.hidden = false;
        status.textContent = "Your email app should open with the request. Nothing is sent until you press send.";
      }

      window.location.href = href;
    });
  }

  // Tap or click the button to pin the floor plan. Hover shows it on desktop.
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-plan-toggle]");
    if (!button) {
      return;
    }
    var media = button.closest(".plan-card__media");
    var showing = media.classList.toggle("is-plan");
    button.setAttribute("aria-pressed", showing ? "true" : "false");
    button.textContent = showing ? "Photo" : "Floor plan";
  });

  applyContactDetails();
  injectBusinessSchema();
  initMenu();
  markCurrentNav();
  initFeaturedPlans();
  initPlanBrowser();
  initContactForm();
})();


/* Theme toggle: dark is the default, choice is remembered in localStorage. */
(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var buttons = document.querySelectorAll("[data-theme-toggle]");
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (meta) { meta.setAttribute("content", theme === "light" ? "#FAF8F4" : "#0B0B0C"); }
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      b.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    });
  }
  apply(root.getAttribute("data-theme") === "light" ? "light" : "dark");
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next);
      try { localStorage.setItem("sw-theme", next); } catch (e) { /* storage blocked, theme still applies */ }
    });
  });
})();
