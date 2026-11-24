function showTab(name) {
    document.querySelectorAll('.menu-panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.menu-tab').forEach(function (b) { b.classList.remove('active'); });
    var panel = document.getElementById('panel-' + name);
    var btn = document.getElementById('btn-' + name);
    if (panel) panel.classList.add('active');
    if (btn) btn.classList.add('active');
}

function activateTab(name) {
    setTimeout(function () { showTab(name); }, 80);
}

/* ===== NAV SHRINK ===== */
window.addEventListener('scroll', function () {
    var nav = document.querySelector('nav');
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

/* ===== PARALLAX HERO ===== */
window.addEventListener('scroll', function () {
    var heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        var scrolled = window.scrollY;
        heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    }
}, { passive: true });

/* ===== SCROLL REVEAL ===== */
(function () {
    var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });

    /* Section label underline */
    var labels = document.querySelectorAll('.section-label, .section-label-light');
    var lblObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lblObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    labels.forEach(function (el) { lblObs.observe(el); });
})();

/* ===== STAT COUNTER ===== */
(function () {
    var stats = document.querySelectorAll('.stat-num[data-target]');
    if (!stats.length) return;
    var done = false;
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !done) {
                done = true;
                stats.forEach(function (el) {
                    var target = parseInt(el.getAttribute('data-target'), 10);
                    var suffix = target >= 30 ? '+' : '';
                    var start = 0;
                    var duration = 1200;
                    var step = Math.ceil(duration / (target || 1));
                    el.classList.add('animated');
                    var timer = setInterval(function () {
                        start++;
                        el.textContent = start + suffix;
                        if (start >= target) {
                            clearInterval(timer);
                            el.textContent = target + suffix;
                        }
                    }, step);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 1.0 });
    stats.forEach(function (el) { observer.observe(el); });
})();

/* ===== CAT CARDS STAGGER ===== */
(function () {
    var cards = document.querySelectorAll('.cat-card');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = (Array.from(cards).indexOf(entry.target) % 4) * 0.08 + 's';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, border-color .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1)';
        observer.observe(card);
    });
})();