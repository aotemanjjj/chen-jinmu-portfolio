// ============================================================
// Portfolio Website - Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. INTRO SCREEN - 开场动画
  // ============================================================
  var introScreen = document.getElementById('introScreen');
  var enterBtn = document.getElementById('enterBtn');
  var scrollHint = document.getElementById('scrollHint');
  var mainNav = document.getElementById('mainNav');
  var introExited = false;

  // 从尾兽档案等子页面返回时，URL 带 skipIntro=1 时跳过封面动画
  var skipIntro = new URLSearchParams(window.location.search).get('skipIntro') === '1'
    || window.location.hash === '#home';

  function exitIntro() {
    if (introExited) return;
    introExited = true;

    introScreen.classList.add('exit');

    setTimeout(function () {
      introScreen.style.display = 'none';
      mainNav.classList.add('visible');
    }, 800);
  }

  // 立即跳过：无过渡，直接隐藏封面
  function skipIntroNow() {
    if (introExited) return;
    introExited = true;
    introScreen.classList.add('exit');
    introScreen.style.display = 'none';
    mainNav.classList.add('visible');
  }

  if (skipIntro) {
    skipIntroNow();
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', exitIntro);
  }

  var scrollThreshold = 100;
  window.addEventListener('wheel', function (e) {
    if (!introExited && e.deltaY > 0) {
      exitIntro();
    }
  }, { passive: true });

  var touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!introExited) {
      var touchEndY = e.touches[0].clientY;
      if (touchStartY - touchEndY > 30) {
        exitIntro();
      }
    }
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (!introExited && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      exitIntro();
    }
  });

  // ============================================================
  // 2. PARTICLES - 沙粒粒子效果
  // ============================================================
  (function () {
    var layer = document.getElementById('introParticles');
    if (!layer) return;

    var COUNT = window.innerWidth < 768 ? 28 : 60;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < COUNT; i++) {
      var p = document.createElement('span');
      p.className = 'sand-particle';
      var size = Math.random() * 3.5 + 1;
      var up = Math.random() > 0.5;
      var dur = (Math.random() * 9 + 7).toFixed(2);
      var delay = (Math.random() * -14).toFixed(2);
      var driftX = (Math.random() * 120 - 60).toFixed(0);
      var driftY = (Math.random() * -80 - 10).toFixed(0);

      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = up ? (85 + Math.random() * 15) + '%' : (Math.random() * 100) + '%';
      p.style.opacity = (Math.random() * 0.5 + 0.25).toFixed(2);
      p.style.setProperty('--drift-x', driftX + 'px');
      p.style.setProperty('--drift-y', driftY + 'px');
      p.style.animation = (up ? 'sand-drift-up ' : 'sand-drift-side ') + dur + 's linear ' + delay + 's infinite';

      frag.appendChild(p);
    }

    layer.appendChild(frag);
  })();

  // ============================================================
  // 3. BARCODE - 条形码生成
  // ============================================================
  (function () {
    var bars = document.getElementById('introBars');
    if (!bars) return;

    var pattern = [3,1,2,1,1,3,1,2,1,1,2,3,1,1,2,1,3,1,2,1,1,2,1,3,1,2,1,1,3,1,2,1,1,2,3,1,1,2,1,3,1,2,1];
    var frag = document.createDocumentFragment();

    for (var i = 0; i < pattern.length; i++) {
      var b = document.createElement('span');
      b.style.width = pattern[i] + 'px';
      b.style.height = '100%';
      frag.appendChild(b);
    }

    bars.appendChild(frag);
  })();

  // Mini barcodes
  (function () {
    var miniBars = document.querySelectorAll('.mini-bars');
    var pattern = [2,1,3,1,2,1,1,3,2,1,2,1,3,1,2,1,1,2,3,1];

    miniBars.forEach(function (container) {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < pattern.length; i++) {
        var b = document.createElement('span');
        b.style.width = pattern[i] + 'px';
        frag.appendChild(b);
      }
      container.appendChild(frag);
    });
  })();

  // ============================================================
  // 4. NAVIGATION - 导航
  // ============================================================
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (mainNav) {
      if (currentScroll > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ============================================================
  // 5. ACTIVE NAV LINK - 导航高亮
  // ============================================================
  var sections = document.querySelectorAll('section[id]');
  var navLinkItems = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollPos = window.pageYOffset + 150;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================================
  // 6. SCROLL REVEAL - 滚动显示动画
  // ============================================================
  var revealElements = document.querySelectorAll('.section-header, .hero-content, .about-content, .work-card, .skill-card, .contact-content, .timeline-item');

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    var revealPoint = 120;

    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // ============================================================
  // 7. SKILL BARS - 技能进度条动画
  // ============================================================
  var skillBars = document.querySelectorAll('.skill-bar-fill');
  var skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;

    var skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    var sectionTop = skillsSection.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      skillsAnimated = true;
      skillBars.forEach(function (bar) {
        var width = bar.getAttribute('data-width');
        bar.style.width = width;
      });
    }
  }

  window.addEventListener('scroll', animateSkillBars, { passive: true });

  // ============================================================
  // 8. WORKS FILTER - 作品筛选
  // ============================================================
  var filterBtns = document.querySelectorAll('.filter-btn');
  var workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      workCards.forEach(function (card, index) {
        var category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = 'fade-in-up 0.5s ease-out ' + (index * 0.05) + 's both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ============================================================
  // 9. BACK TO TOP - 回到顶部
  // ============================================================
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================================
  // 10. CONTACT FORM - 联系表单
  // ============================================================
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>发送中...</span>';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.innerHTML = '<span>发送成功 ✓</span>';
        submitBtn.style.background = 'var(--state-success)';

        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // ============================================================
  // 11. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();

        var navHeight = mainNav ? mainNav.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // 12. CURSOR EFFECT (optional - desktop only)
  // ============================================================
  if (window.matchMedia('(min-width: 768px)').matches) {
    var cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = '\
      position: fixed;\
      width: 200px;\
      height: 200px;\
      border-radius: 50%;\
      background: radial-gradient(circle, var(--bj-accent-glow) 0%, transparent 70%);\
      pointer-events: none;\
      z-index: 9998;\
      transform: translate(-50%, -50%);\
      opacity: 0;\
      transition: opacity 0.3s ease;\
      mix-blend-mode: screen;\
    ';
    document.body.appendChild(cursorGlow);

    var mouseX = 0, mouseY = 0;
    var glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = '0.6';
    });

    document.addEventListener('mouseleave', function () {
      cursorGlow.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ============================================================
  // 13. PARALLAX EFFECT ON HERO CARDS
  // ============================================================
  var heroCards = document.querySelectorAll('.hero-card-frame, .about-image-frame');

  if (window.matchMedia('(min-width: 768px)').matches) {
    heroCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateY = ((x - centerX) / centerX) * 8;
        var rotateX = ((y - centerY) / centerY) * -8;

        card.style.transform = 'perspective(1000px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
      });
    });
  }

});
