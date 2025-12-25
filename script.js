// script.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ================================
     FORCE DARK THEME (ONLY)
  ================================= */
  body.classList.add("theme-dark");
  localStorage.setItem("theme", "dark");

  /* ================================
     TYPING EFFECT
  ================================= */
  const roles = [
    "Aspiring Software Engineer",
    "BE",
    "Technology Enthusiast",
    "PG-DAC @ CDAC",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typedText = document.getElementById("typed-text");

  function typeLoop() {
    if (!typedText) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
      typedText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1300);
        return;
      }
    } else {
      typedText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeLoop, deleting ? 50 : 90);
  }

  typeLoop();

  /* ================================
     SCROLL REVEAL
  ================================= */
  const revealElements = document.querySelectorAll(".reveal");

  function handleReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach((el) => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleReveal);
  window.addEventListener("load", handleReveal);
  handleReveal();

  /* ================================
     CLOSE NAVBAR ON MOBILE CLICK
  ================================= */
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("mainNavbar");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        try {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.toggle();
        } catch {
          navbarCollapse.classList.remove("show");
        }
      }
    });
  });

  /* ================================
     SECURITY: EXTERNAL LINKS
  ================================= */
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    a.setAttribute("rel", "noopener noreferrer");
  });

  /* ================================
     PROJECT LINKS: FORCE NEW TAB
  ================================= */
  document
    .querySelectorAll(
      '.project-card a[target="_blank"], .project-card a[href*="github.com"]'
    )
    .forEach((a) => {
      a.addEventListener("click", () => {
        const href = a.getAttribute("href");
        if (!href) return;
        setTimeout(() => {
          window.open(href, "_blank", "noopener");
        }, 60);
      });
    });
});
