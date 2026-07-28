/* ========================================
   导航栏滚动效果
   ======================================== */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// 移动端菜单切换
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// 点击导航链接后关闭移动端菜单
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ========================================
   平滑滚动导航高亮
   ======================================== */
const sections = document.querySelectorAll('section[id]');
const navItems = navLinks.querySelectorAll('a');

function highlightNav() {
  let scrollY = window.scrollY;
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

/* ========================================
   滚动渐入动画
   ======================================== */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
  // 为项目卡片、工具项、能力项添加渐入动画类
  document.querySelectorAll('.project-card, .tool-item, .capability-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

/* ========================================
   Hero视觉动态效果
   ======================================== */
function createHeroParticles() {
  const heroVisual = document.getElementById('heroVisual');
  if (!heroVisual) return;

  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(233, 69, 96, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 6 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    heroVisual.appendChild(particle);
  }
}

// 添加浮动动画样式
const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
    25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
    50% { transform: translateY(-10px) translateX(-5px); opacity: 0.4; }
    75% { transform: translateY(-30px) translateX(-10px); opacity: 0.7; }
  }
`;
document.head.appendChild(floatStyle);

// 初始化粒子
document.addEventListener('DOMContentLoaded', createHeroParticles);

/* ========================================
   能力条动画（进入视口时触发）
   ======================================== */
const capabilityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.capability-fill');
      bars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);
      });
      capabilityObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const capabilitySection = document.querySelector('.capability');
  if (capabilitySection) {
    capabilityObserver.observe(capabilitySection);
  }
});

/* ========================================
   图片懒加载
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 为所有图片添加懒加载
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

/* ========================================
   打印前预处理（确保暗色主题正确转为打印样式）
   ======================================== */
window.addEventListener('beforeprint', () => {
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing');
});