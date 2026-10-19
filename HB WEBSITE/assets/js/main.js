/* Harmony Bridge Care — site interactions */
(function () {
  document.documentElement.classList.remove('no-js');

  // Sticky header shadow
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.documentElement.style.setProperty('--nav-top', Math.max(0, header.getBoundingClientRect().bottom) + 'px');
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) toggle.click();
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Animated counters
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target, end = parseInt(el.getAttribute('data-count'), 10), start = null;
        var step = function (t) {
          if (!start) start = t;
          var p = Math.min((t - start) / 1200, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { el.textContent = '0'; co.observe(el); });
  }

  // Services sub-navigation active state
  var subLinks = document.querySelectorAll('.subnav a[href^="#"]');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          subLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var link = map[entry.target.id];
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  // Tabs
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = list.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var sel = t === tab;
          t.setAttribute('aria-selected', String(sel));
          t.tabIndex = sel ? 0 : -1;
          document.getElementById(t.getAttribute('aria-controls')).hidden = !sel;
        });
      });
      tab.addEventListener('keydown', function (e) {
        var i = Array.prototype.indexOf.call(tabs, tab);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
          next.focus(); next.click();
        }
      });
    });
    // Open a tab from the URL hash, e.g. contact.html#refer
    var hashTab = location.hash && list.querySelector('[data-hash="' + location.hash.slice(1) + '"]');
    if (hashTab) hashTab.click();
  });

  // Forms
  // Each form posts to its `action` URL. Until a real form endpoint is connected
  // (e.g. Formspree, Netlify Forms, or your web host's handler), forms whose action
  // contains "YOUR_FORM_ID" show the confirmation message without sending anything.
  document.querySelectorAll('form[data-hb-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) return;
      var action = form.getAttribute('action') || '';
      e.preventDefault();
      var done = function () { form.classList.add('is-sent'); var s = form.nextElementSibling; if (s) { s.setAttribute('tabindex', '-1'); s.focus(); } };
      if (action.indexOf('YOUR_FORM_ID') !== -1 || !window.fetch) { done(); return; }
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.textContent = 'Sending…'; }
      fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); done(); })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.label; }
          alert('Sorry, your message could not be sent. Please call us at 929-353-4833 or email info@hbridgecare.com.');
        });
    });
  });

  // Careers: "Apply" on a role pre-selects it in the application form
  var roleSelect = document.getElementById('job_role');
  document.querySelectorAll('[data-role]').forEach(function (btn) {
    btn.addEventListener('click', function () { if (roleSelect) roleSelect.value = btn.getAttribute('data-role'); });
  });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
