const body = document.body;

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('hide'), 600);
  setTimeout(() => preloader.remove(), 1200);
});

// Typed intro (guarded for offline usage)
if (window.Typed) {
  new Typed('#typed', {
    strings: ['AI/ML Developer', 'Student & Innovator', 'Designing Intelligent Experiences'],
    typeSpeed: 60,
    backSpeed: 32,
    loop: true,
    showCursor: true,
  });
} else {
  // Fallback text if CDN blocked
  const typedEl = document.getElementById('typed');
  if (typedEl) typedEl.textContent = 'AI/ML Developer | Student | Innovator';
}

// AOS animations (guard)
if (window.AOS) {
  AOS.init({
    offset: 80,
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
  });
}

// Navbar scroll behavior
const nav = document.getElementById('nav');
const links = document.querySelectorAll('.nav__link');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  setActiveLink();
});

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  document.querySelectorAll('section').forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href='#${sec.id}']`);
      if (active) active.classList.add('active');
    }
  });
}

// Mobile menu
const burger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('active');
  mobileMenu.classList.remove('show');
}));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
});

// Counters
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.ceil(target / 80);
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          counterObserver.unobserve(el);
          return;
        }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// Progress bars
const progressBars = document.querySelectorAll('.progress span');
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.value + '%';
      progressObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });
progressBars.forEach(bar => progressObserver.observe(bar));

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.style.display = show ? 'block' : 'none';
  });
}));

// Tilt effect
const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

// Back-to-top smooth scroll is native via CSS

// Particles background
const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 80;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 2 + 1,
  }));
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
    gradient.addColorStop(0, 'rgba(92,240,255,0.8)');
    gradient.addColorStop(1, 'rgba(92,240,255,0)');
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  // connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(138,91,255,${1 - dist / 120})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursorTrail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Parallax hero
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', e => {
  const speed = 0.02;
  const x = (window.innerWidth / 2 - e.clientX) * speed;
  const y = (window.innerHeight / 2 - e.clientY) * speed;
  hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});

// Chat mock
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
function addBubble(text, isUser = false) {
  const div = document.createElement('div');
  div.className = `bubble ${isUser ? 'user' : 'ai'}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
chatSend.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addBubble(text, true);
  chatInput.value = '';
  setTimeout(() => addBubble('Mock response: imagine an AI riff here ✨'), 400);
});
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') chatSend.click(); });

// Form validation
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.style.color = '#ff6b81';
    return;
  }
  const emailValid = /.+@.+\..+/.test(email);
  if (!emailValid) {
    formStatus.textContent = 'Enter a valid email address.';
    formStatus.style.color = '#ff6b81';
    return;
  }
  formStatus.textContent = 'Sending...';
  setTimeout(() => {
    formStatus.textContent = 'Message sent! (Mock)';
    formStatus.style.color = '#5cf0ff';
    form.reset();
  }, 800);
});

// Sound effect (click)
const playSoundBtn = document.getElementById('playSound');
playSoundBtn.addEventListener('click', () => {
  const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctxAudio.createOscillator();
  const gain = ctxAudio.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(540, ctxAudio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctxAudio.currentTime + 0.15);
  gain.gain.value = 0.05;
  osc.connect(gain).connect(ctxAudio.destination);
  osc.start();
  osc.stop(ctxAudio.currentTime + 0.18);
});

// Easter egg: logo click 5 times
const logo = document.getElementById('logo');
let clickCount = 0;
logo.addEventListener('click', () => {
  clickCount++;
  if (clickCount >= 5) {
    gsap.to('body', { duration: 0.6, backgroundColor: '#0a0f2d', yoyo: true, repeat: 1 });
    addBubble('Easter egg unlocked: welcome to the neon realm.');
    clickCount = 0;
  }
});

// Lazy reveal with GSAP for hero items
if (window.gsap) {
  gsap.from('.hero__content > *', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.2 });
}
