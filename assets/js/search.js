/*
  Stoneward Construction site search.
  Pages come from search-index.js (built by scripts/build_search.py).
  Floor plans come from plans.js, so prices and sizes are never repeated here.
*/
(function () {
  "use strict";

  var STOP = { adu: 1, adus: 1, the: 1, a: 1, an: 1, in: 1, for: 1, of: 1, and: 1, to: 1, utah: 1, city: 1, plan: 1, plans: 1, rules: 1 };
  var index = null;

  function $(selector, root) { return (root || document).querySelector(selector); }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function norm(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function money(n) {
    return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function load(callback) {
    if (index) { callback(); return; }
    function build() {
      var pages = (window.SEARCH_INDEX || []).map(function (p) {
        return {
          title: p.t, url: p.u, kind: p.k, desc: p.d,
          f: { title: norm(p.t), kind: norm(p.k), head: norm(p.h), desc: norm(p.d), body: norm(p.b) }
        };
      });
      var plans = (window.SITE_PLANS || []).map(function (p) {
        var bits = [p.sqft ? p.sqft + " sq ft" : "", p.beds ? p.beds + " bed" : "", p.baths ? p.baths + " bath" : ""].filter(Boolean);
        var desc = bits.join(", ") + (p.price ? ". From " + money(p.price) : "");
        return {
          title: p.name, url: "plan?plan=" + encodeURIComponent(p.slug || ""), kind: "Plan", desc: desc,
          f: {
            title: norm(p.name), kind: "plan floor plan", head: norm((p.series || "") + " " + (p.type || "")),
            desc: norm(bits.join(" ") + " " + (p.footprint || "") + " bedroom bath"), body: norm(p.about)
          }
        };
      });
      index = pages.concat(plans);
      callback();
    }
    if (window.SEARCH_INDEX) { build(); return; }
    var script = document.createElement("script");
    script.src = "assets/js/search-index.js";
    script.onload = build;
    script.onerror = function () { window.SEARCH_INDEX = []; build(); };
    document.head.appendChild(script);
  }

  function search(query) {
    var tokens = norm(query).split(" ").filter(function (t) { return t && !STOP[t]; });
    if (!tokens.length || !index) { return []; }
    var weights = { title: 10, kind: 4, head: 3, desc: 2, body: 1 };
    var results = [];
    index.forEach(function (entry) {
      var total = 0;
      for (var i = 0; i < tokens.length; i++) {
        var best = 0;
        for (var field in weights) {
          var text = entry.f[field];
          var at = text.indexOf(tokens[i]);
          if (at < 0) { continue; }
          var wordStart = at === 0 || text.charAt(at - 1) === " ";
          var score = weights[field] * (wordStart ? 1 : 0.4);
          if (score > best) { best = score; }
        }
        if (!best) { return; }
        total += best;
      }
      if (entry.kind === "City" || entry.kind === "Plan") { total += 0.5; }
      results.push({ entry: entry, score: total });
    });
    results.sort(function (a, b) { return b.score - a.score || a.entry.title.localeCompare(b.entry.title); });
    return results.map(function (r) { return r.entry; });
  }

  function item(entry) {
    return '<li><a class="search-hit" href="' + esc(entry.url || "./") + '">' +
      '<span class="search-hit__kind">' + esc(entry.kind) + '</span>' +
      '<span class="search-hit__title">' + esc(entry.title) + '</span>' +
      (entry.desc ? '<span class="search-hit__desc">' + esc(entry.desc.length > 150 ? entry.desc.slice(0, 147) + "..." : entry.desc) + '</span>' : "") +
      '</a></li>';
  }

  var EMPTY = '<li class="search-empty">No match. Try a city such as Lehi, a plan such as Cabana, or a size such as 500. ' +
    '<a href="utah-adu-cities">All cities</a> or <a href="adus">all plans</a>.</li>';

  function initPanel() {
    var actions = $(".header__actions");
    if (!actions || $(".search-toggle")) { return; }
    var button = document.createElement("button");
    button.type = "button";
    button.className = "search-toggle";
    button.setAttribute("aria-label", "Search the site");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "site-search");
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    var anchor = $("[data-theme-toggle]", actions);
    actions.insertBefore(button, anchor || actions.firstChild);

    var panel = document.createElement("div");
    panel.className = "search-panel";
    panel.id = "site-search";
    panel.hidden = true;
    panel.innerHTML = '<form class="search-panel__form" action="search" method="get" role="search">' +
      '<input type="search" name="q" placeholder="Search cities, plans, sizes" autocomplete="off" aria-label="Search cities, plans and guides">' +
      '<button class="btn btn--primary btn--small" type="submit">Search</button></form>' +
      '<ul class="search-list" aria-live="polite"></ul>';
    var header = $(".site-header");
    header.appendChild(panel);
    var input = $("input", panel);
    var list = $(".search-list", panel);

    function render() {
      var q = input.value.trim();
      if (!q) { list.innerHTML = ""; return; }
      load(function () {
        var found = search(q);
        list.innerHTML = found.length ? found.slice(0, 7).map(item).join("") +
          (found.length > 7 ? '<li class="search-more"><a href="search?q=' + encodeURIComponent(q) + '">See all ' + found.length + ' results</a></li>' : "") : EMPTY;
      });
    }

    function setOpen(open) {
      panel.hidden = !open;
      button.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { load(function () {}); input.focus(); }
    }

    button.addEventListener("click", function () { setOpen(panel.hidden); });
    input.addEventListener("input", render);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) { setOpen(false); button.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !button.contains(e.target)) { setOpen(false); }
    });
  }

  function initPage() {
    var root = $("[data-search-page]");
    if (!root) { return; }
    var input = $("input", root);
    var list = $("[data-search-results]", root);
    var summary = $("[data-search-summary]", root);
    var params = new URLSearchParams(window.location.search);
    input.value = params.get("q") || "";

    function render() {
      var q = input.value.trim();
      if (!q) {
        list.innerHTML = "";
        summary.textContent = "Type a city, a plan name or a size.";
        return;
      }
      load(function () {
        var found = search(q);
        summary.textContent = found.length ? found.length + (found.length === 1 ? " result" : " results") + " for “" + q + "”" : "";
        list.innerHTML = found.length ? found.map(item).join("") : EMPTY;
      });
    }

    input.addEventListener("input", function () {
      if (window.history && history.replaceState) {
        history.replaceState(null, "", input.value.trim() ? "search?q=" + encodeURIComponent(input.value.trim()) : "search");
      }
      render();
    });
    render();
  }

  function start() { initPanel(); initPage(); }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", start); } else { start(); }
})();
