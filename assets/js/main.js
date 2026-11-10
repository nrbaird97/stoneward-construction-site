/*
  Stoneward Construction
  Small, dependency-free site script.
  Content data lives in config.js and plans.js.
*/
(function () {
  "use strict";

  var config = window.SITECONFIG || {};
  var plans = Array.isArray(window.SITE_PLANS) ? window.SITE_PLANS : [];

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

    var addr = config.address || {};
    var addrText = addr.street ? [addr.street, addr.city + ", " + addr.region + " " + addr.postalCode].join(", ") : "";
    $$("[data-address-text]").forEach(function (node) {
      node.textContent = addrText;
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
      "description": "Licensed Utah residential contractor for modular ADUs and small modular homes.",
      "telephone": config.phone,
      "email": config.email,
      "areaServed": config.serviceArea
    };

    if (config.address && config.address.street) {
      schema.address = {
        "@type": "PostalAddress",
        "streetAddress": config.address.street,
        "addressLocality": config.address.city,
        "addressRegion": config.address.region,
        "postalCode": config.address.postalCode,
        "addressCountry": "US"
      };
    }

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
    var page = window.location.pathname.split("/").pop() || "index";
    page = page.replace(/\.html$/, "");
    $$(".site-nav a[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav").replace(/\.html$/, "") === page) {
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

  function money(value) {
    return "$" + Number(value).toLocaleString("en-US");
  }

  var PRICE_NOTE = "Starting prices are Designer Series planning estimates for a home delivered and set on your foundation in Utah, as of " + (window.PRICE_DATE || "this month") + ". Delivery, the standard crane and set are included, though site conditions can add charges. Not included: site work, foundation, utility connections, the finish work that joins the modules, sales tax, permits and fees. Prices can change, and your final price is confirmed in a written contract after design and preconstruction.";

  function addPriceNotes() {
    $$(".plans-grid, .series__grid, .series-list").forEach(function (grid) {
      if (!grid.querySelector("[data-plan-price]")) { return; }
      var holder = grid.classList.contains("series__grid") ? grid.closest(".series-list") || grid : grid;
      if (holder.parentNode && holder.parentNode.querySelector("[data-price-note]")) { return; }
      var note = document.createElement("p");
      note.className = "plans-note";
      note.setAttribute("data-price-note", "");
      note.textContent = PRICE_NOTE;
      holder.parentNode.insertBefore(note, holder.nextSibling);
    });
    $$("[data-price-from]").forEach(function (node) {
      var kind = node.getAttribute("data-price-from");
      var list = plans.filter(function (plan) { return plan.price && (kind === "all" || plan.category === kind); });
      if (!list.length) { return; }
      var low = list.reduce(function (a, b) { return a.price <= b.price ? a : b; });
      node.textContent = money(low.price);
    });
  }

  function planCard(plan, index) {
    var range = bedsRange(plan.beds);
    var sqft = Number(plan.sqft).toLocaleString("en-US");
    var bedsNoun = countLabel(plan.beds, "bed", "beds");
    var bathsNoun = countLabel(plan.baths, "bath", "baths");
    var photo = escapeHtml(plan.photo || "");
    var planImage = escapeHtml(plan.plan || "");
    var name = escapeHtml(plan.name);
    var requestUrl = "contact?plan=" + encodeURIComponent(plan.name);
    var detailUrl = "plan?plan=" + encodeURIComponent(plan.slug || "");

    return [
      '<article class="plan-card" data-category="' + escapeHtml(plan.category || "") + '" data-beds-min="' + range.min + '" data-beds-max="' + range.max + '" data-sqft="' + Number(plan.sqft) + '">',
      '  <figure class="ph ' + photoClass(index) + ' plan-card__media" data-photo="' + photo + '">',
      '    <a class="plan-card__photo-link" href="' + detailUrl + '" tabindex="-1" aria-hidden="true"></a>',
      '    <img class="plan-card__photo" src="assets/img/' + photo + '" alt="' + name + ' exterior rendering" loading="lazy" onerror="this.hidden=true">',
      planImage ? '    <img class="plan-card__plan" src="assets/img/' + planImage + '" alt="' + name + ' floor plan" loading="lazy" onerror="this.hidden=true">' : '',
      '    <figcaption>' + name + '</figcaption>',
      planImage ? '    <button class="plan-card__toggle" type="button" data-plan-toggle aria-pressed="false">Floor plan</button>' : '',
      '  </figure>',
      '  <div class="plan-card__body">',
      '    <h3><a class="plan-card__link" href="' + detailUrl + '">' + name + '</a></h3>',
      plan.price ? '    <p class="plan-price" data-plan-price>From <strong>' + money(plan.price) + '</strong></p>' : '',
      '    <p class="plan-size"><strong>' + sqft + '</strong> sq ft' + (plan.footprint ? ' <span>(' + escapeHtml(plan.footprint) + ')</span>' : '') + '</p>',
      '    <ul class="plan-specs">',
      '      <li><strong>' + escapeHtml(plan.beds) + '</strong> ' + bedsNoun + '</li>',
      '      <li><strong>' + escapeHtml(plan.baths) + '</strong> ' + bathsNoun + '</li>',
      '    </ul>',
      plan.type ? '    <p class="plan-type">' + escapeHtml(plan.type) + '</p>' : '',
      '    <div class="plan-card__actions">',
      '      <a class="btn btn--primary" href="' + detailUrl + '">View details</a>',
      '      <a class="plan-card__quote" href="' + requestUrl + '">Request pricing</a>',
      '    </div>',
      '  </div>',
      '</article>'
    ].join("\n");
  }

  function initNamedPlans() {
    $$("[data-plan-names]").forEach(function (grid) {
      var names = grid.getAttribute("data-plan-names").split(",").map(function (n) { return n.trim(); });
      var list = names.map(function (name) {
        return plans.find(function (plan) { return plan.name === name; });
      }).filter(Boolean);
      grid.innerHTML = list.map(planCard).join("\n");
    });
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

  function initPlanDetail() {
    var root = $("[data-plan-detail]");
    if (!root) {
      return;
    }
    var slug = new URLSearchParams(window.location.search).get("plan");
    var plan = plans.find(function (item) { return item.slug === slug; });
    if (!plan) {
      return;
    }

    var sqft = Number(plan.sqft).toLocaleString("en-US");
    document.title = plan.name + " Floor Plan | Stoneward Construction";
    $("[data-plan-name]", root).textContent = plan.name;
    $("[data-plan-series]", root).textContent = (plan.series && plan.series !== plan.name ? plan.series + " series" : (plan.category === "home" ? "Home" : "ADU")) + " \u00B7 " + sqft + " sq ft";
    $("[data-plan-about]", root).textContent = plan.about || "";
    $("[data-plan-cta]", root).setAttribute("href", "contact?plan=" + encodeURIComponent(plan.name));

    var facts = [
      ["Starting at", plan.price ? money(plan.price) : "Request pricing"],
      ["Living area", sqft + " sq ft"],
      ["Footprint", plan.footprint || ""],
      ["Bedrooms", plan.beds],
      ["Bathrooms", plan.baths],
      ["Style", plan.type || ""],
      ["Best suited for", plan.category === "home" ? "A primary home on its own lot" : "A backyard ADU, guest house or small home"]
    ];
    var noteNode = $("[data-plan-price-note]", root);
    if (noteNode && plan.price) { noteNode.textContent = PRICE_NOTE; }
    $("[data-plan-facts]", root).innerHTML = facts.filter(function (fact) { return fact[1]; }).map(function (fact) {
      return "<div><dt>" + escapeHtml(fact[0]) + "</dt><dd>" + escapeHtml(fact[1]) + "</dd></div>";
    }).join("");

    var shots = (plan.gallery && plan.gallery.length ? plan.gallery.map(function (file) { return "assets/img/plans/" + file; }) : ["assets/img/" + plan.photo])
      .map(function (src, index) { return { src: src, label: plan.name + " photo " + (index + 1), plan: false }; });
    if (plan.plan) {
      shots.push({ src: "assets/img/" + plan.plan, label: plan.name + " floor plan", plan: true });
    }
    var main = $("[data-plan-main]", root);
    var thumbs = $("[data-plan-thumbs]", root);
    function select(index) {
      main.src = shots[index].src;
      main.alt = shots[index].label;
      main.parentNode.classList.toggle("is-plan", shots[index].plan);
      $$("button", thumbs).forEach(function (button, i) {
        button.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
    }
    thumbs.innerHTML = shots.map(function (shot, index) {
      return '<button type="button" class="plan-gallery__thumb' + (shot.plan ? " is-plan" : "") + '" data-shot="' + index + '" aria-label="Show ' + escapeHtml(shot.label) + '"><img src="' + shot.src + '" alt="" loading="lazy">' + (shot.plan ? "<span>Floor plan</span>" : "") + "</button>";
    }).join("");
    thumbs.addEventListener("click", function (event) {
      var button = event.target.closest("[data-shot]");
      if (button) {
        select(Number(button.getAttribute("data-shot")));
      }
    });
    select(0);

    var related = plans.filter(function (item) { return item !== plan && item.series === plan.series; });
    if (related.length < 3) {
      plans.filter(function (item) { return item !== plan && related.indexOf(item) === -1 && item.category === plan.category; })
        .sort(function (a, b) { return Math.abs(a.sqft - plan.sqft) - Math.abs(b.sqft - plan.sqft); })
        .slice(0, 4 - related.length)
        .forEach(function (item) { related.push(item); });
    }
    var wrap = $("[data-plan-related-wrap]");
    if (wrap && related.length) {
      wrap.hidden = false;
      $("[data-plan-related]").innerHTML = related.slice(0, 4).map(planCard).join("\n");
    }
  }

  function initGallery() {
    var grids = $$("[data-gallery]");
    if (!grids.length) { return; }

    var planGrid = $("[data-gallery-plans]");
    if (planGrid) {
      plans.forEach(function (plan) {
        var file = (plan.gallery && plan.gallery[0]) ? "plans/" + plan.gallery[0] : plan.photo;
        if (!file) { return; }
        var src = "assets/img/" + file;
        var button = document.createElement("button");
        button.type = "button";
        button.className = "gallery__item";
        button.setAttribute("data-full", src);
        button.setAttribute("data-caption", plan.name);
        button.setAttribute("data-href", "plan?plan=" + encodeURIComponent(plan.slug || ""));
        button.innerHTML = '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(plan.name) + ' rendering" loading="lazy">';
        planGrid.appendChild(button);
      });
    }

    var items = $$(".gallery__item");
    var box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.innerHTML = '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">&lsaquo;</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">&rsaquo;</button>' +
      '<p class="lightbox__count"></p>';
    document.body.appendChild(box);
    var img = $(".lightbox__img", box);
    var count = $(".lightbox__count", box);
    var current = 0;
    var opener = null;

    function show(index) {
      current = (index + items.length) % items.length;
      var item = items[current];
      img.src = item.getAttribute("data-full");
      img.alt = item.getAttribute("data-caption") || "";
      var href = item.getAttribute("data-href");
      count.innerHTML = escapeHtml(item.getAttribute("data-caption") || "") + (href ? ' &middot; <a href="' + escapeHtml(href) + '">View plan</a>' : "") + " &middot; " + (current + 1) + " of " + items.length;
    }
    function open(index, trigger) {
      opener = trigger;
      show(index);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      $(".lightbox__close", box).focus();
    }
    function close() {
      box.hidden = true;
      document.body.style.overflow = "";
      if (opener) { opener.focus(); }
    }
    items.forEach(function (item, index) {
      item.addEventListener("click", function () { open(index, item); });
    });
    $(".lightbox__close", box).addEventListener("click", close);
    $(".lightbox__prev", box).addEventListener("click", function () { show(current - 1); });
    $(".lightbox__next", box).addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (event) { if (event.target === box) { close(); } });
    document.addEventListener("keydown", function (event) {
      if (box.hidden) { return; }
      if (event.key === "Escape") { close(); }
      if (event.key === "ArrowLeft") { show(current - 1); }
      if (event.key === "ArrowRight") { show(current + 1); }
    });
  }

  function initLeadForms() {
    var forms = $$("[data-lead-form]");
    if (!forms.length) { return; }
    var endpoint = String(config.leadEndpoint || "");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var status = $("[data-lead-status]", form);
        var data = new FormData(form);
        var email = String(data.get("email") || "").trim();
        var first = String(data.get("first") || "").trim();
        if (data.get("company")) { return; }
        if (!first || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !form.querySelector("[name=consent]").checked) {
          status.textContent = "Please add your first name, a valid email and check the box.";
          return;
        }
        var magnet = form.getAttribute("data-magnet") || "guide";
        var payload = {
          first: first,
          email: email,
          phone: String(data.get("phone") || "").trim(),
          city: String(data.get("city") || ""),
          magnet: magnet,
          page: window.location.pathname
        };
        var button = form.querySelector("button[type=submit]");
        button.disabled = true;
        status.textContent = "Sending...";
        function done() { window.location.href = "thank-you?m=" + encodeURIComponent(magnet); }
        if (!endpoint) {
          window.location.href = "mailto:" + encodeURIComponent(config.email || "") + "?subject=" + encodeURIComponent("Send me the ADU " + magnet) + "&body=" + encodeURIComponent("Name: " + first + "\nEmail: " + email + "\nCity: " + payload.city);
          return;
        }
        fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) })
          .then(done, function () { status.textContent = "Something went wrong. Please call or email us and we will send it right away."; button.disabled = false; });
      });
    });
  }

  function initThanks() {
    var links = $("[data-thanks-links]");
    if (!links) { return; }
    var magnet = new URLSearchParams(window.location.search).get("m") || "guide";
    var files = { guide: ["10-step guide", "downloads/10-steps-to-a-backyard-adu-in-utah.pdf"], worksheet: ["income worksheet", "downloads/backyard-adu-income-worksheet.pdf"], checklist: ["lot checklist", "downloads/backyard-adu-lot-checklist.pdf"] };
    var pick = files[magnet] || files.guide;
    links.innerHTML = '<a class="btn btn--primary" href="' + pick[1] + '" download>Download the ' + pick[0] + "</a>";
    $$("[data-thanks-card]").forEach(function (card) {
      if (card.getAttribute("data-thanks-card") === magnet) { card.hidden = true; }
    });
  }

  applyContactDetails();
  injectBusinessSchema();
  initPlanDetail();
  initMenu();
  markCurrentNav();
  initFeaturedPlans();
  initNamedPlans();
  initPlanBrowser();
  addPriceNotes();
  initContactForm();
  initGallery();
  initLeadForms();
  initThanks();
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
