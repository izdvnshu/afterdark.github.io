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
})();
