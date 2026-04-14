// ===== Typing Animation =====
class TypingAnimation {
  constructor(element, texts, speed = 80, deleteSpeed = 40, pauseTime = 2000) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.charIndex--;
      this.element.textContent = currentText.substring(0, this.charIndex);
    } else {
      this.charIndex++;
      this.element.textContent = currentText.substring(0, this.charIndex);
    }

    let timeout = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      timeout = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      timeout = 500;
    }

    setTimeout(() => this.type(), timeout);
  }
}

// ===== Intersection Observer for Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el) => {
    observer.observe(el);
  });
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// ===== Smooth Scroll for Nav Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// ===== Parallax Floating Cards =====
function initParallax() {
  const cards = document.querySelectorAll('.hero-float-card');
  
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    cards.forEach((card, i) => {
      const factor = (i + 1) * 8;
      card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// ===== Active Nav Link Highlight =====
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--accent-blue)';
      }
    });
  });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  // Typing animation
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    new TypingAnimation(typingElement, [
      'Computer Science Student 💻',
      'C++ Developer ⚡',
      'Java Developer ☕',
      'OOP Enthusiast 🎯',
      'Problem Solver 🧩',
    ]);
  }

  // Init all modules
  initScrollAnimations();
  initNavbar();
  initSmoothScroll();
  initParallax();
  initActiveNavHighlight();
});
