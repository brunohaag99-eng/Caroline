// Gera corações flutuantes no fundo
(function initHearts() {
  const container = document.getElementById("hearts-bg");
  const hearts = ["❤️", "💖", "💗", "💕", "💘", "💝", "💓"];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "heart-float";
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = 14 + Math.random() * 26 + "px";
    span.style.animationDuration = 8 + Math.random() * 10 + "s";
    span.style.animationDelay = Math.random() * 8 + "s";
    container.appendChild(span);
  }
})();

// Revela elementos ao rolar
(function initReveal() {
  const sections = document.querySelectorAll(
    ".letter-card, .reason-card, .memory-card, .section-head"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();

// Menu mobile (hambúrguer)
(function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (!toggle || !links) return;

  const closeMenu = () => {
    toggle.classList.remove("active");
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Fecha o menu ao clicar em um link
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      closeMenu();
    }
  });
})();

// Destaca o link da navbar conforme a seção visível
(function initNavActive() {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id], header[id]");

  const updateActive = () => {
    let current = "inicio";
    sections.forEach((sec) => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 120;
      if (top >= offset) {
        current = sec.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  };

  window.addEventListener("scroll", updateActive);
  window.addEventListener("load", updateActive);
})();
