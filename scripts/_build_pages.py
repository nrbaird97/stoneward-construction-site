#!/usr/bin/env python3
"""One-off page composer for the Stoneward static site. Not part of the site."""
from pathlib import Path

ROOT = Path("/home/nrbai/stoneward-site")
SITE = "https://www.stonewardconstruction.com"

FAVICON = (
    "data:image/svg+xml,"
    "%3Csvg%20xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox='0%200%2064%2064'%3E"
    "%3Crect%20width='64'%20height='64'%20rx='13'%20fill='%232F5D50'%2F%3E"
    "%3Cpath%20d='M15%2035.5%2032%2020l17%2015.5V50a2%202%200%200%201-2%202H17a2%202%200%200%201-2-2Z'%20fill='%23FAF8F4'%2F%3E"
    "%3Cpath%20d='M27%2052V39h10v13'%20fill='%232F5D50'%2F%3E%3C%2Fsvg%3E"
)

PIN_ICON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/>'
    '<circle cx="12" cy="10" r="2.5"/></svg>'
)

SHIELD_ICON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M12 3 5 6v5c0 4.4 3 8.1 7 10 4-1.9 7-5.6 7-10V6l-7-3Z"/>'
    '<path d="m9 12 2 2 4-4"/></svg>'
)

HOME_ICON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/></svg>'
)

PHONE_ICON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M6.5 3.5 9 3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2-1 2.5a2 2 0 0 1-2 1.5A15 15 0 0 1 4 6a2 2 0 0 1 1.5-2.5Z"/>'
    '</svg>'
)


def head(title, description, path, og_type="website"):
    canonical = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="{og_type}">
  <meta property="og:site_name" content="Stoneward Construction">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{canonical}">
  <link rel="icon" href="{FAVICON}">
  <link rel="stylesheet" href="assets/css/styles.css">
  <script src="assets/js/config.js" defer></script>
  <script src="assets/js/plans.js" defer></script>
  <script src="assets/js/main.js" defer></script>
  <script type="application/ld+json" id="business-schema">{{"@context":"https://schema.org","@type":"LocalBusiness","name":"Stoneward Construction"}}</script>
</head>
<body>
"""


SKIP = '<a class="skip-link" href="#main">Skip to content</a>\n'

HEADER = f"""{SKIP}<header class="site-header">
  <div class="shell header__inner">
    <a class="brand" href="index.html" aria-label="Stoneward Construction home">
      <span class="brand__name">Stoneward</span>
      <span class="brand__sub">Construction</span>
    </a>
    <nav class="site-nav" id="site-nav" aria-label="Primary">
      <a href="adus.html" data-nav="adus.html">ADUs</a>
      <a href="how-it-works.html" data-nav="how-it-works.html">How it works</a>
      <a href="about.html" data-nav="about.html">About</a>
      <a href="contact.html" data-nav="contact.html">Contact</a>
      <div class="nav-extra">
        <a data-phone-link data-phone-text href="tel:"></a>
        <a class="btn btn--primary" href="contact.html">Get a free ADU plan</a>
      </div>
      <p class="nav-note">Irontown Modular dealer serving <span data-service-area></span>.</p>
    </nav>
    <div class="header__actions">
      <a class="header__phone" data-phone-link data-phone-text href="tel:"></a>
      <a class="header__phone-icon" data-phone-link href="tel:" aria-label="Call Stoneward Construction">{PHONE_ICON}</a>
      <a class="btn btn--primary btn--small header__cta" href="contact.html">Get a free ADU plan</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
        <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>
"""

FOOTER = """<footer class="site-footer">
  <div class="shell">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="brand" href="index.html" aria-label="Stoneward Construction home">
          <span class="brand__name">Stoneward</span>
          <span class="brand__sub">Construction</span>
        </a>
        <p>Modular ADUs and small modular homes from Irontown Modular, delivered by a local Utah contractor.</p>
      </div>
      <div class="footer__col">
        <h2>Explore</h2>
        <ul>
          <li><a href="adus.html">ADUs and floor plans</a></li>
          <li><a href="how-it-works.html">How it works</a></li>
          <li><a href="about.html">About Stoneward</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2>Contact</h2>
        <ul>
          <li><a data-phone-link data-phone-text href="tel:"></a></li>
          <li><a data-email-link data-email-text href="mailto:"></a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2>Service area</h2>
        <ul>
          <li data-service-area></li>
        </ul>
      </div>
    </div>
    <div class="footer__legal">
      <p>Licensed Utah residential contractor. Authorized Irontown Modular dealer.</p>
      <p class="footer__disclaimer">Floor plans and renderings are Irontown Modular's. Availability, pricing and delivery are confirmed in your written quote.</p>
      <p>&copy; Stoneward Construction. All rights reserved.</p>
    </div>
  </div>
</footer>
</body>
</html>
"""


def page(title, description, path, body, og_type="website"):
    return head(title, description, path, og_type) + HEADER + "<main id=\"main\">\n" + body + "\n</main>\n\n" + FOOTER


INDEX_BODY = f"""
<section class="hero">
  <div class="shell hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">Irontown Modular dealer</p>
      <h1>Modular ADUs, built in a Utah factory and set on your lot.</h1>
      <p class="hero__sub">One local contractor from your first call to move-in.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="contact.html">Get a free ADU plan</a>
        <a class="btn btn--outline" href="adus.html">See floor plans</a>
      </div>
      <p class="hero__meta">{PIN_ICON}<span>Serving <span data-service-area></span></span></p>
    </div>
    <figure class="ph ph--warm hero__media" data-photo="hero.jpg">
      <img src="assets/img/hero.jpg" alt="A completed modular ADU set on a landscaped Utah lot" loading="lazy" onerror="this.hidden=true">
      <figcaption>Completed ADU, Utah</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">Why a modular ADU</p>
        <h2>A calmer way to add a home.</h2>
        <p>Stick-built can work. It also puts every trade, permit and weather day on your lot. A modular build moves the house into a factory and keeps the site work moving alongside it.</p>
      </div>
    </div>
    <div class="why-list">
      <div class="why-row">
        <h3>The crew backlog</h3>
        <p>A site build waits its turn for framers, electricians and roofers. With modular, much of the construction happens inside a factory, where the work is part of a production schedule.</p>
      </div>
      <div class="why-row">
        <h3>Cost creep on stick-built</h3>
        <p>When a home is built in the open, changes and surprises can add up. A factory plan and a written scope give you a clearer picture before construction starts. Your quote confirms pricing and delivery.</p>
      </div>
      <div class="why-row">
        <h3>Weather delays</h3>
        <p>Rain, wind and cold can stop work on an exposed site. Modules are built indoors. Site work still follows the weather, but the house itself is not sitting in it.</p>
      </div>
      <div class="why-row">
        <h3>Managing permits and trades</h3>
        <p>A modular ADU still needs permits, inspections and site work. Stoneward coordinates the local pieces and works with Irontown's process, so you are not refereeing separate companies.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">What are you building?</p>
        <h2>Three ways an ADU can work.</h2>
        <p>Start with how you want to use the space. We'll help you match it to the right Irontown plan.</p>
      </div>
    </div>
    <div class="card-grid">
      <article class="entry-card">
        <figure class="ph ph--sage" data-photo="backyard-adu.jpg">
          <img src="assets/img/backyard-adu.jpg" alt="A detached backyard ADU with a simple roof and a small patio" loading="lazy" onerror="this.hidden=true">
          <figcaption>Backyard ADU</figcaption>
        </figure>
        <div class="entry-card__body">
          <h3>Backyard ADU</h3>
          <p>A separate home for family, guests or extra income, sized for a backyard.</p>
          <a class="link-arrow" href="adus.html">Explore ADU plans</a>
        </div>
      </article>
      <article class="entry-card">
        <figure class="ph ph--clay" data-photo="casita.jpg">
          <img src="assets/img/casita.jpg" alt="A small casita with a covered entry beside a main house" loading="lazy" onerror="this.hidden=true">
          <figcaption>Casita</figcaption>
        </figure>
        <div class="entry-card__body">
          <h3>Casita or guest house</h3>
          <p>A smaller footprint for visitors, a home office or a place for family to stay close without giving up privacy.</p>
          <a class="link-arrow" href="adus.html">See small plans</a>
        </div>
      </article>
      <article class="entry-card">
        <figure class="ph ph--sand" data-photo="small-modular-home.jpg">
          <img src="assets/img/small-modular-home.jpg" alt="A small modular home on a rural Utah property" loading="lazy" onerror="this.hidden=true">
          <figcaption>Small modular home</figcaption>
        </figure>
        <div class="entry-card__body">
          <h3>Small modular home</h3>
          <p>A compact primary home for a narrow lot, a rural property or a simpler way to build on land you already own.</p>
          <a class="link-arrow" href="adus.html">Compare layouts</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">How it works</p>
        <h2>Five steps, one local contact.</h2>
        <p>This is the typical Irontown Modular process. Foundation and site work run alongside the factory build, and a project manager is assigned to your project.</p>
      </div>
      <a class="link-arrow section-head__link" href="how-it-works.html">See the full process</a>
    </div>
    <ol class="steps">
      <li class="step-card">
        <span class="step__num">01</span>
        <h3>Talk it through</h3>
        <p>Tell us about your lot, your household and how you want the space to work. We'll be straight about what fits.</p>
      </li>
      <li class="step-card">
        <span class="step__num">02</span>
        <h3>Pick a plan</h3>
        <p>Choose from the Irontown plans we sell and talk through finishes. We'll confirm the scope in your written quote.</p>
      </li>
      <li class="step-card">
        <span class="step__num">03</span>
        <h3>Feasibility and approvals</h3>
        <p>We review your lot and the local approval path. The city or county makes the permit decision.</p>
      </li>
      <li class="step-card">
        <span class="step__num">04</span>
        <h3>Factory build and delivery</h3>
        <p>Modules are built indoors in Utah while foundation and site work happen at home. Then they ship to your lot.</p>
      </li>
      <li class="step-card">
        <span class="step__num">05</span>
        <h3>Set and finish</h3>
        <p>Your modules are set, finish work is completed and your project manager stays with the project through the walkthrough.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section section--featured">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">Featured plans</p>
        <h2>A few plans to start with.</h2>
        <p>Every plan is available in several finishes. Square footage and layouts are Irontown Modular's.</p>
      </div>
      <a class="link-arrow section-head__link" href="adus.html">See all 10 plans</a>
    </div>
    <div class="plans-grid" data-featured-plans></div>
    <noscript><p class="plans-note">Please enable JavaScript to see the featured plans, or open the ADUs page for the full list.</p></noscript>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">Modular vs stick-built</p>
        <h2>Two ways to build. Different trade-offs.</h2>
        <p>Both paths can produce a good home. Here is the practical difference, in plain terms.</p>
      </div>
    </div>
    <div class="compare">
      <div class="compare__head">
        <span></span>
        <span>Modular ADU</span>
        <span>Stick-built on site</span>
      </div>
      <div class="compare__row">
        <h3>Design</h3>
        <div class="compare__cell"><span class="compare__label">Modular ADU</span><p>A factory plan set with finish selections.</p></div>
        <div class="compare__cell"><span class="compare__label">Stick-built</span><p>Drawn for your lot and built as work progresses.</p></div>
      </div>
      <div class="compare__row">
        <h3>Price certainty</h3>
        <div class="compare__cell"><span class="compare__label">Modular ADU</span><p>A written quote before construction starts.</p></div>
        <div class="compare__cell"><span class="compare__label">Stick-built</span><p>Selections, site conditions and changes can move the number.</p></div>
      </div>
      <div class="compare__row">
        <h3>Carrying costs</h3>
        <div class="compare__cell"><span class="compare__label">Modular ADU</span><p>Site work and factory work can run alongside each other.</p></div>
        <div class="compare__cell"><span class="compare__label">Stick-built</span><p>Trades are sequenced on site, one after another.</p></div>
      </div>
      <div class="compare__row">
        <h3>Weather</h3>
        <div class="compare__cell"><span class="compare__label">Modular ADU</span><p>The house is built indoors. Site work still follows the weather.</p></div>
        <div class="compare__cell"><span class="compare__label">Stick-built</span><p>Every stage of the house is exposed to the weather.</p></div>
      </div>
    </div>
    <p class="compare__disclaimer">Every lot and project is different. These are general differences, not a promise about your project. Your approved plans and written quote govern the work.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="shell">
    <div class="trust">
      <div class="trust__item">
        <span class="trust__icon">{SHIELD_ICON}</span>
        <div>
          <h3>Licensed Utah residential contractor</h3>
          <p>A local, licensed contractor is your point of contact.</p>
        </div>
      </div>
      <div class="trust__item">
        <span class="trust__icon">{HOME_ICON}</span>
        <div>
          <h3>Irontown Modular dealer</h3>
          <p>Authorized to help you choose and order an Irontown plan.</p>
        </div>
      </div>
      <div class="trust__item">
        <span class="trust__icon">{PIN_ICON}</span>
        <div>
          <h3>Local project contact</h3>
          <p>Stoneward stays with you from the first call through finish work.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--flush-top">
  <div class="shell">
    <div class="cta-band">
      <h2>Your ADU starts with a conversation.</h2>
      <p>Tell us about your lot, your city and how you want to use the space. We'll help you find a plan worth pursuing.</p>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="contact.html">Get a free ADU plan</a>
        <a class="btn btn--ghost-light" data-phone-link data-phone-text href="tel:"></a>
      </div>
    </div>
  </div>
</section>
"""

ADUS_BODY = """
<section class="page-intro">
  <div class="shell">
    <p class="eyebrow">Irontown floor plans</p>
    <h1>Find the plan that fits your lot.</h1>
    <p class="lede">We sell 10 Irontown Modular plans, from a 497 sq ft one-bedroom to a 1,002 sq ft two-bedroom. Each is available in several finishes. Pricing is confirmed in your written quote.</p>
  </div>
</section>

<section class="section section--flush-top">
  <div class="shell">
    <div class="plan-toolbar">
      <div class="filter-group" role="group" aria-label="Filter plans by bedrooms">
        <span class="filter-group__label">Bedrooms</span>
        <button class="chip" type="button" data-filter-beds="all" aria-pressed="true">All</button>
        <button class="chip" type="button" data-filter-beds="1" aria-pressed="false">1 bed</button>
        <button class="chip" type="button" data-filter-beds="2" aria-pressed="false">2 bed</button>
      </div>
      <div class="filter-group" role="group" aria-label="Filter plans by size">
        <span class="filter-group__label">Size</span>
        <button class="chip" type="button" data-filter-size="all" aria-pressed="true">All</button>
        <button class="chip" type="button" data-filter-size="under600" aria-pressed="false">Under 600 sq ft</button>
        <button class="chip" type="button" data-filter-size="600to800" aria-pressed="false">600-800 sq ft</button>
        <button class="chip" type="button" data-filter-size="800plus" aria-pressed="false">800+ sq ft</button>
      </div>
    </div>
    <p class="plan-count" data-plan-count aria-live="polite">All 10 plans</p>
    <div class="plans-grid" data-plans-grid></div>
    <p class="empty-state" data-plans-empty hidden>No plans match those filters. Try a wider size range or another bedroom count.</p>
    <p class="plans-note">All plans are Irontown Modular floor plans. Availability, pricing and delivery are confirmed in your written quote. Bedroom filters show plans available with that bedroom count.</p>
    <noscript><p class="empty-state">Please enable JavaScript to browse and filter the plans, or contact Stoneward for the current plan list.</p></noscript>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="cta-band">
      <h2>Not sure which plan is the right start?</h2>
      <p>Send us your city, your lot situation and what you want the unit to do. We'll suggest a plan or two to look at first.</p>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="contact.html">Request pricing</a>
        <a class="btn btn--ghost-light" href="how-it-works.html">See how it works</a>
      </div>
    </div>
  </div>
</section>
"""

HOW_BODY = f"""
<section class="page-intro">
  <div class="shell page-intro__grid">
    <div>
      <p class="eyebrow">How it works</p>
      <h1>From first call to move-in.</h1>
      <p class="lede">This is the typical Irontown Modular process. Foundation and site work run alongside the factory build, and a project manager is assigned to your project.</p>
    </div>
    <figure class="ph ph--sage page-intro__media" data-photo="how-it-works.jpg">
      <img src="assets/img/how-it-works.jpg" alt="A crane setting a modular home module onto a foundation" loading="lazy" onerror="this.hidden=true">
      <figcaption>Set day</figcaption>
    </figure>
  </div>
</section>

<section class="section section--flush-top">
  <div class="shell">
    <div class="process">
      <div class="process__item">
        <span class="process__num">01</span>
        <div class="process__body">
          <h2>Talk it through</h2>
          <p>Tell us about your lot, your household and how you want the ADU to work. Is it a guest house, a home office, a place for family or a small primary home? We'll talk through access, utilities and the practical questions early, before you spend on design.</p>
        </div>
      </div>
      <div class="process__item">
        <span class="process__num">02</span>
        <div class="process__body">
          <h2>Pick a plan</h2>
          <p>Choose from the 10 Irontown plans we sell. Each is available in several finishes. We'll compare layouts with your lot and how you want to use the space, then confirm the plan and finish direction.</p>
        </div>
      </div>
      <div class="process__item">
        <span class="process__num">03</span>
        <div class="process__body">
          <h2>Feasibility on your lot and approvals</h2>
          <p>We review your lot for access, setbacks, utilities, slope and local requirements. The city or county makes the approval decision, and we do not promise an outcome. We coordinate the application with you and Irontown and tell you what we see before you commit.</p>
          <p>State approvals for the modular design are handled by Irontown as part of their process.</p>
        </div>
      </div>
      <div class="process__item">
        <span class="process__num">04</span>
        <div class="process__body">
          <h2>Factory build and delivery</h2>
          <p>While foundation and site work happen on your lot, your modules are built indoors at Irontown's Utah factory. When the modules and your site are ready, they ship to you. A project manager is assigned to your project.</p>
        </div>
      </div>
      <div class="process__item">
        <span class="process__num">05</span>
        <div class="process__body">
          <h2>Set and finish</h2>
          <p>Modules are set on your lot and the finish work is completed. Stoneward stays your local point of contact through the final walkthrough and closeout.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">Who does what</p>
        <h2>One project, two teams, one local contact.</h2>
        <p>You do not have to manage the handoffs between a factory and a building site. That is our job.</p>
      </div>
    </div>
    <div class="handle-grid">
      <div class="handle-card handle-card--accent">
        <h2>What Stoneward handles</h2>
        <ul class="check-list">
          <li>Your first call and local point of contact</li>
          <li>Lot review and site planning with you</li>
          <li>Site work and foundation coordination</li>
          <li>Local permit and inspection coordination</li>
          <li>Delivery, set and finish work</li>
          <li>Final walkthrough and closeout</li>
        </ul>
      </div>
      <div class="handle-card">
        <h2>What Irontown handles</h2>
        <ul class="check-list">
          <li>Plan sets and design</li>
          <li>State approvals for the modular design</li>
          <li>Module construction in the Utah factory</li>
          <li>Shipping to your site</li>
          <li>A project manager assigned to the build</li>
          <li>Finish options for every plan</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">Questions</p>
        <h2>Honest answers, before you start.</h2>
      </div>
    </div>
    <div class="faq-list">
      <details class="faq">
        <summary>What is a modular ADU?</summary>
        <div class="faq__body">
          <p>A modular ADU is an accessory dwelling unit built as one or more modules indoors at a factory, then shipped and set on your lot. The site work, foundation and finish work happen locally. Irontown Modular builds the modules in Utah.</p>
        </div>
      </details>
      <details class="faq">
        <summary>Do I need permits?</summary>
        <div class="faq__body">
          <p>Almost always, yes. An ADU is a dwelling, and your city or county will have requirements for zoning, setbacks, utilities, inspections and the building permit. The exact path depends on where you live.</p>
          <p>Stoneward helps you identify and coordinate the approvals, but the jurisdiction makes the decision. We do not promise an approval outcome.</p>
        </div>
      </details>
      <details class="faq">
        <summary>Can it go on my lot?</summary>
        <div class="faq__body">
          <p>Sometimes. Access for delivery, setbacks, utilities, slope, drainage and local rules all affect whether a plan works. We start with a lot review and will tell you if a standard plan looks like a stretch. A site visit may be needed before anyone can answer with confidence.</p>
        </div>
      </details>
      <details class="faq">
        <summary>How do I get pricing?</summary>
        <div class="faq__body">
          <p>Request pricing and tell us your plan, city and lot situation. We'll put together a written quote that lays out the scope. Pricing and delivery are confirmed in that quote, not on this website.</p>
        </div>
      </details>
      <details class="faq">
        <summary>What finishes are available?</summary>
        <div class="faq__body">
          <p>Each Irontown plan is available in several finishes. We'll walk through the options with you and confirm your selections in the written quote.</p>
        </div>
      </details>
      <details class="faq">
        <summary>Who do I call?</summary>
        <div class="faq__body">
          <p>Call Stoneward. You get a local contact who can answer questions about your lot, the process and your quote.</p>
          <p><a data-phone-link data-phone-text href="tel:"></a><br><a data-email-link data-email-text href="mailto:"></a></p>
        </div>
      </details>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="cta-band">
      <h2>Ready to talk through your lot?</h2>
      <p>We'll start with the basics and help you decide whether a modular ADU is worth pursuing.</p>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="contact.html">Get a free ADU plan</a>
        <a class="btn btn--ghost-light" href="adus.html">See floor plans</a>
      </div>
    </div>
  </div>
</section>
"""

ABOUT_BODY = f"""
<section class="page-intro">
  <div class="shell">
    <p class="eyebrow">About Stoneward</p>
    <h1>A local contractor for factory-built homes.</h1>
    <p class="lede">Stoneward Construction is a licensed Utah residential contractor and an authorized dealer for Irontown Modular. We help homeowners along the Wasatch Front plan, coordinate approvals and finish a modular ADU or small home.</p>
  </div>
</section>

<section class="section section--flush-top">
  <div class="shell">
    <div class="about-grid">
      <figure class="ph ph--clay" data-photo="about.jpg">
        <img src="assets/img/about.jpg" alt="A Stoneward project contact reviewing plans at a Utah building site" loading="lazy" onerror="this.hidden=true">
        <figcaption>On site, Utah</figcaption>
      </figure>
      <div class="about-copy">
        <h2>Local from the first call to the final walkthrough.</h2>
        <p>An ADU is a construction project with a lot of moving parts. Our job is to make the local side simpler: look honestly at your lot, help you choose a plan, coordinate approvals and site work, and stay reachable through delivery and finish work.</p>
        <p>We are a dealer, not a distant call center. When you call Stoneward, you reach someone who can talk about your lot, your city and the Irontown plan you are considering.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">What we do</p>
        <h2>The local pieces of a modular project.</h2>
        <p>Irontown builds the modules. Stoneward handles the local work that gets them onto your lot and finished.</p>
      </div>
    </div>
    <div class="info-grid">
      <article class="info-card">
        <h3>Plan and lot fit</h3>
        <p>We start with your lot and how you want to use the unit, then narrow the Irontown plans that make sense.</p>
      </article>
      <article class="info-card">
        <h3>Approvals and site work</h3>
        <p>We coordinate the local approval path, foundation and site work, working alongside Irontown's team.</p>
      </article>
      <article class="info-card">
        <h3>Set and finish</h3>
        <p>We stay your local contact through delivery, set, finish work and the final walkthrough.</p>
      </article>
      <article class="info-card">
        <h3>One point of contact</h3>
        <p>You do not have to manage the handoffs between the factory, the site and the city on your own.</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section-head">
      <div class="section-head__copy">
        <p class="eyebrow">Working with Irontown Modular</p>
        <h2>A Utah factory, a local dealer.</h2>
      </div>
    </div>
    <div class="about-copy">
      <p>Irontown Modular is a Utah factory builder. Their plans are built as modules indoors, then shipped, set and finished. Their typical process covers design, state approvals, module construction, shipping, set and finish work. Foundation and site work run alongside the factory build, and a project manager is assigned to your project.</p>
      <p>Stoneward is an authorized Irontown Modular dealer and your local contractor for the site work, coordination and finish. You get the factory's plan and process with a local contact who can answer questions about your lot.</p>
    </div>
    <div class="service-band">
      <div>
        <p class="eyebrow">Service area</p>
        <h2>Along the Wasatch Front.</h2>
        <p data-service-area></p>
      </div>
      <a class="btn btn--primary" href="contact.html">Ask about your city</a>
    </div>
  </div>
</section>

<section class="section section--flush-top">
  <div class="shell">
    <div class="trust">
      <div class="trust__item">
        <span class="trust__icon">{SHIELD_ICON}</span>
        <div>
          <h3>Licensed Utah residential contractor</h3>
          <p>A local, licensed contractor is your point of contact.</p>
        </div>
      </div>
      <div class="trust__item">
        <span class="trust__icon">{HOME_ICON}</span>
        <div>
          <h3>Irontown Modular dealer</h3>
          <p>Authorized to help you choose and order an Irontown plan.</p>
        </div>
      </div>
      <div class="trust__item">
        <span class="trust__icon">{PIN_ICON}</span>
        <div>
          <h3>Local project contact</h3>
          <p>Stoneward stays with you from the first call through finish work.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="cta-band">
      <h2>Let's look at your lot.</h2>
      <p>Tell us where you are and what you have in mind. We'll help you narrow the plan and the next step.</p>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="contact.html">Start a conversation</a>
        <a class="btn btn--ghost-light" data-phone-link data-phone-text href="tel:"></a>
      </div>
    </div>
  </div>
</section>
"""

CONTACT_BODY = f"""
<section class="page-intro">
  <div class="shell">
    <p class="eyebrow">Contact Stoneward</p>
    <h1>Let's talk about your ADU.</h1>
    <p class="lede">Tell us where you are and what you have in mind. We'll get back to you soon.</p>
  </div>
</section>

<section class="section section--flush-top">
  <div class="shell contact-layout">
    <div class="form-card">
      <h2>Request a plan and pricing</h2>
      <form data-contact-form method="post" action="#">
        <div class="field-grid">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" required>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="city">City</label>
            <input id="city" name="city" type="text" autocomplete="address-level2" required>
          </div>
          <div class="field">
            <label for="lot">Lot situation</label>
            <select id="lot" name="lot" required>
              <option value="">Choose one</option>
              <option value="I own a lot with a spot in mind">I own a lot with a spot in mind</option>
              <option value="I own a lot and need help siting the unit">I own a lot and need help siting the unit</option>
              <option value="I am still looking for a lot">I am still looking for a lot</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
          <div class="field">
            <label for="plan">Plan of interest</label>
            <select id="plan" name="plan" data-plan-select>
              <option value="">Not sure yet</option>
            </select>
          </div>
          <div class="field field--full">
            <label for="message">Message</label>
            <textarea id="message" name="message" placeholder="Anything else we should know about your lot or project?"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn--primary" type="submit">Create email request</button>
          <a class="btn btn--outline" data-phone-link href="tel:">Call Stoneward</a>
        </div>
        <p class="form-note">This form opens an email draft in your email app with the details above. Nothing is sent until you press send in your email app.</p>
        <p class="form-status" data-form-status hidden></p>
      </form>
    </div>

    <aside class="contact-card" aria-label="Direct contact details">
      <h2>Talk to a person</h2>
      <div class="contact-methods">
        <div class="contact-method">
          <span class="contact-method__label">Phone</span>
          <a data-phone-link data-phone-text href="tel:"></a>
        </div>
        <div class="contact-method">
          <span class="contact-method__label">Email</span>
          <a class="contact-method__email" data-email-link data-email-text href="mailto:"></a>
        </div>
        <div class="contact-method">
          <span class="contact-method__label">Service area</span>
          <span data-service-area></span>
        </div>
      </div>
      <div class="form-actions">
        <a class="btn btn--primary" data-phone-link href="tel:">Call Stoneward</a>
        <a class="btn btn--outline" data-email-link href="mailto:">Email Stoneward</a>
      </div>
      <p class="contact-card__note">We'll get back to you soon.</p>
      <h2 class="contact-card__subhead">What to include</h2>
      <ul class="sidebar-list">
        <li>Your city or nearest cross streets</li>
        <li>Whether you own the lot or are still looking</li>
        <li>A plan name from the ADUs page, if one caught your eye</li>
        <li>Any questions about the process or your lot</li>
      </ul>
      <p class="contact-card__note">Prefer email? Write to Stoneward directly and include the same details.</p>
    </aside>
  </div>
</section>

<section class="section section--tint">
  <div class="shell">
    <div class="cta-band">
      <h2>Start with the floor plans.</h2>
      <p>Look at the 10 Irontown layouts first, then tell us which ones you want to talk about.</p>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="adus.html">See floor plans</a>
        <a class="btn btn--ghost-light" href="how-it-works.html">How it works</a>
      </div>
    </div>
  </div>
</section>
"""

NOT_FOUND_BODY = """
<section class="error-page">
  <div class="shell">
    <p class="error-code">404</p>
    <h1>That page isn't here.</h1>
    <p>The link may be old, or the page may have moved. Start with the floor plans or get in touch with Stoneward.</p>
    <div class="hero__actions">
      <a class="btn btn--primary" href="index.html">Back to home</a>
      <a class="btn btn--outline" href="adus.html">See floor plans</a>
    </div>
  </div>
</section>
"""

PAGES = {
    "index.html": (
        "Stoneward Construction | Modular ADUs in Utah",
        "Stoneward Construction is a licensed Utah residential contractor and authorized Irontown Modular dealer, helping homeowners plan modular ADUs and small homes along the Wasatch Front.",
        "/",
        INDEX_BODY,
    ),
    "adus.html": (
        "ADU Floor Plans | Stoneward Construction",
        "Compare 10 Irontown Modular ADU floor plans sold by Stoneward Construction, from 497 to 1,002 square feet. Filter by bedrooms and size, then request pricing.",
        "/adus.html",
        ADUS_BODY,
    ),
    "how-it-works.html": (
        "How It Works | Stoneward Construction",
        "See the typical process for a modular ADU with Stoneward Construction and Irontown Modular, from design and approvals through factory build, delivery and finish work.",
        "/how-it-works.html",
        HOW_BODY,
    ),
    "about.html": (
        "About | Stoneward Construction",
        "Stoneward Construction is a licensed Utah residential contractor and authorized Irontown Modular dealer serving homeowners along the Wasatch Front.",
        "/about.html",
        ABOUT_BODY,
    ),
    "contact.html": (
        "Contact | Stoneward Construction",
        "Talk with Stoneward Construction about a modular ADU or small modular home. Tell us about your lot and the plan you have in mind.",
        "/contact.html",
        CONTACT_BODY,
    ),
    "404.html": (
        "Page Not Found | Stoneward Construction",
        "The page you were looking for could not be found. Browse modular ADU floor plans or contact Stoneward Construction.",
        "/404.html",
        NOT_FOUND_BODY,
    ),
}

for filename, (title, description, path, body) in PAGES.items():
    output = page(title, description, path, body)
    (ROOT / filename).write_text(output, encoding="utf-8")
    print("wrote", filename)
