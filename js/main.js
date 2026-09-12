/* AFTERDARK — interactions */
(function () {
  'use strict';

  /* ---------- Install tabs ---------- */
  const tabs = document.querySelectorAll('.tab');
  const cmds = document.querySelectorAll('.install-cmd .cmd');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      cmds.forEach(function (c) { c.classList.remove('active'); });
      tab.classList.add('active');
      const target = document.getElementById('cmd-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ---------- Copy button ---------- */
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const active = document.querySelector('.install-cmd .cmd.active');
      if (!active) return;
      const text = active.textContent.trim();
      function done() {
        copyBtn.textContent = 'Copied';
        setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ---------- Terminal typing animation ---------- */
  const termBody = document.getElementById('terminalBody');
  if (termBody) {
    const script = [
      { cls: 't-cmd', text: 'afterdark start --track zero-to-pro' },
      { cls: 't-out', text: '' },
      { cls: 't-hl',  text: 'AFTERDARK v1.0.0 — python learning environment' },
      { cls: 't-ok',  text: '[ok] lesson 001 :: variables        PASSED' },
      { cls: 't-ok',  text: '[ok] lesson 002 :: data types       PASSED' },
      { cls: 't-ok',  text: '[ok] lesson 003 :: control flow     PASSED' },
      { cls: 't-out', text: '' },
      { cls: 't-out', text: '>>> vibe_level = "professional"' },
      { cls: 't-ok',  text: '>>> Streak: 7 days — keep conquering the dark.' }
    ];
    let line = 0;
    let ch = 0;
    let current = null;

    function typeNext() {
      if (line >= script.length) {
        const cur = document.createElement('span');
        cur.className = 'cursor';
        termBody.appendChild(cur);
        return;
      }
      const item = script[line];
      if (!current) {
        current = document.createElement('div');
        current.className = item.cls;
        termBody.appendChild(current);
      }
      if (item.text.length === 0) {
        current = null;
        line++;
        ch = 0;
        setTimeout(typeNext, 90);
        return;
      }
      if (ch < item.text.length) {
        current.textContent += item.text[ch];
        ch++;
        setTimeout(typeNext, item.cls === 't-cmd' ? 34 : 10);
      } else {
        current = null;
        line++;
        ch = 0;
        setTimeout(typeNext, 140);
      }
    }
    setTimeout(typeNext, 500);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- Stats counter ---------- */
  const nums = document.querySelectorAll('.fig-num');
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const dur = 1200;
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  nums.forEach(function (n) { io.observe(n); });

  /* ---------- Subscribe form ---------- */
  const form = document.getElementById('subscribeForm');
  const email = document.getElementById('subscribeEmail');
  const msg = document.getElementById('subscribeMsg');
  if (form) {
    form.addEventListener('submit', function () {
      const val = (email.value || '').trim();
      if (!val || val.indexOf('@') < 1) {
        msg.textContent = '>> please enter a valid email';
        return;
      }
      msg.textContent = '>> subscribed — see you after dark.';
      email.value = '';
    });
  }

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- Start Free portal (magical popup) ---------- */
  const startFreeBtn = document.getElementById('startFreeBtn');
  const specialProgramsBtn = document.getElementById('specialProgramsBtn');
  const portalScrim = document.getElementById('portalScrim');
  const portalClose = document.getElementById('portalClose');
  const SPARKS = ['✦', '✧', '★', '✶', '✵', '✴'];

  function spawnSparks(host, count) {
    if (!host) return;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      s.textContent = SPARKS[(Math.random() * SPARKS.length) | 0];
      s.style.left = (8 + Math.random() * 84).toFixed(1) + '%';
      s.style.top = (6 + Math.random() * 88).toFixed(1) + '%';
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 240).toFixed(0) + 'px');
      s.style.setProperty('--dy', ((Math.random() - 0.5) * 240).toFixed(0) + 'px');
      s.style.setProperty('--dur', (650 + Math.random() * 950).toFixed(0) + 'ms');
      s.style.setProperty('--scale', (0.5 + Math.random() * 1.2).toFixed(2));
      s.style.fontSize = (9 + Math.random() * 11).toFixed(0) + 'px';
      s.style.color = Math.random() > 0.55 ? 'var(--accent)' : '#ffffff';
      s.style.animationDelay = (Math.random() * 180).toFixed(0) + 'ms';
      host.appendChild(s);
      s.addEventListener('animationend', function () { s.remove(); });
    }
  }

  function openPortal() {
    if (!portalScrim || portalScrim.classList.contains('open')) return;
    portalScrim.classList.add('open');
    portalScrim.setAttribute('aria-hidden', 'false');
    document.body.classList.add('portal-locked');
    spawnSparks(portalScrim.querySelector('.portal-stage'), 24);
    const first = portalScrim.querySelector('.portal-option');
    if (first) first.focus({ preventScroll: true });
  }

  function closePortal() {
    if (!portalScrim) return;
    portalScrim.classList.remove('open');
    portalScrim.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('portal-locked');
    portalScrim.querySelectorAll('.spark').forEach(function (s) { s.remove(); });
    if (startFreeBtn) startFreeBtn.focus({ preventScroll: true });
  }

  if (portalScrim && portalClose && (startFreeBtn || specialProgramsBtn)) {
    if (startFreeBtn) startFreeBtn.addEventListener('click', openPortal);
    if (specialProgramsBtn) specialProgramsBtn.addEventListener('click', openPortal);
    portalClose.addEventListener('click', closePortal);
    portalScrim.addEventListener('click', function (e) {
      if (e.target === portalScrim) closePortal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && portalScrim.classList.contains('open')) closePortal();
    });
    /* a small sprinkle of sparks when hovering an option */
    document.querySelectorAll('.portal-option').forEach(function (opt) {
      opt.addEventListener('mouseenter', function () {
        if (portalScrim.classList.contains('open')) spawnSparks(opt, 5);
      });
    });
  }
})();
