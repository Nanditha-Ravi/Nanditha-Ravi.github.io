const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const workCards = document.querySelectorAll(".work-card[data-href]");
const themedSections = document.querySelectorAll(".theme-section[data-theme]");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

workCards.forEach((card) => {
  const href = card.getAttribute("data-href");
  if (!href) {
    return;
  }

  card.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      return;
    }
    window.location.href = href;
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = href;
    }
  });
});

if (themedSections.length > 0) {
  const syncThemeToScroll = () => {
    const viewportAnchor = window.innerHeight * 0.38;
    let activeSection = themedSections[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    themedSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top - viewportAnchor);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeSection = section;
      }
    });

    const nextTheme = activeSection.getAttribute("data-theme");
    if (nextTheme && document.body.getAttribute("data-theme") !== nextTheme) {
      document.body.setAttribute("data-theme", nextTheme);
    }
  };

  syncThemeToScroll();
  window.addEventListener("scroll", syncThemeToScroll, { passive: true });
  window.addEventListener("resize", syncThemeToScroll);
}

const modal = document.getElementById("modalOverlay");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".modal-close");
const contactForm = document.getElementById("contact-form");

if (modal && openBtn && closeBtn) {
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_sn78kem", "template_qpilekr", this)
      .then(
        () => {
          alert("Message sent!");
          if (modal) {
            modal.classList.remove("active");
          }
          this.reset();
        },
        (error) => {
          alert("Failed to send.");
          console.log(error);
        }
      );
  });
}
