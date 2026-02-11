/*
  VLSI Portfolio Interactions
  - Typing effect
  - Smooth nav + active link
  - Scroll reveal animations
  - Project filtering
  - Small micro-interactions
*/

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initTypingEffect();
  initNav();
  initScrollReveal();
  initProjectFilter();
  initContactButton();
});

/* Footer year */
function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* Typing animation in hero */
function initTypingEffect() {
  const typingEl = document.querySelector(".typing");
  const cursorEl = document.querySelector(".typing-cursor");
  if (!typingEl || !cursorEl) return;

  const fullText = typingEl.getAttribute("data-text") || "";
  const speed = 40; // ms per character
  const delayBeforeRestart = 2200;
  let idx = 0;

  const type = () => {
    if (idx <= fullText.length) {
      typingEl.textContent = fullText.slice(0, idx);
      idx++;
      setTimeout(type, speed);
    } else {
      // keep full text for a while then restart
      setTimeout(() => {
        idx = 0;
        typingEl.textContent = "";
        type();
      }, delayBeforeRestart);
    }
  };

  type();
}

/* Navigation - mobile toggle + active link highlighting + scroll behavior */
function initNav() {
  const navHeader = document.querySelector(".nav-header");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  const navLinks = document.querySelectorAll(".nav__link");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const spans = toggle.querySelectorAll("span");
      spans[0].style.transform = links.classList.contains("open")
        ? "translateY(4px) rotate(45deg)"
        : "";
      spans[1].style.transform = links.classList.contains("open")
        ? "translateY(-4px) rotate(-45deg)"
        : "";
    });

    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        if (links.classList.contains("open")) {
          links.classList.remove("open");
          const spans = toggle.querySelectorAll("span");
          spans[0].style.transform = "";
          spans[1].style.transform = "";
        }
      })
    );
  }

  // Highlight active nav link on scroll
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const handleScroll = () => {
    const scrollPos = window.scrollY + (window.innerHeight * 0.25);

    let currentId = null;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (scrollPos >= top) {
        currentId = sec.id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const id = href.replace("#", "");
      if (id && id === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (navHeader) {
      if (window.scrollY > 20) navHeader.classList.add("scrolled");
      else navHeader.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* Scroll reveal animations */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* Project filter buttons */
function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";

      // Update active state
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter cards
      cards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        const match = filter === "all" || categories.includes(filter);
        if (match) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* Contact button micro-interaction */
function initContactButton() {
  const button = document.querySelector(".contact__btn");
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!button || !emailLink) return;

  button.addEventListener("click", () => {
    // subtle press animation
    button.style.transform = "scale(0.97)";
    setTimeout(() => {
      button.style.transform = "";
    }, 120);

    // open mailto for quick collaboration
    emailLink.click();
  });
}