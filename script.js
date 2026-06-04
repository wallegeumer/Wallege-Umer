/* ================================
   UMER PORTFOLIO JS
================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ================================
     MOBILE MENU
  ================================ */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }


  /* ================================
     HERO CARD 3D TILT
  ================================ */

  const heroCard = document.querySelector(".hero-card");

  if (heroCard) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      heroCard.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.025, 1.025, 1.025)
      `;

      heroCard.style.setProperty("--mouse-x", `${x}px`);
      heroCard.style.setProperty("--mouse-y", `${y}px`);
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
    });
  }


  /* ================================
     REUSABLE MOUSE GLOW FUNCTION
  ================================ */

  function addMouseGlow(selector, xVar, yVar) {
    const items = document.querySelectorAll(selector);

    items.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        item.style.setProperty(xVar, `${x}px`);
        item.style.setProperty(yVar, `${y}px`);
      });
    });
  }

  addMouseGlow(".service-card", "--service-x", "--service-y");
  addMouseGlow(".work-card", "--work-x", "--work-y");
  addMouseGlow(".process-content", "--process-x", "--process-y");
  addMouseGlow(".about-card-main", "--about-x", "--about-y");
  addMouseGlow(".contact-form", "--contact-x", "--contact-y");

  const skillsPanel = document.querySelector(".skills-panel");

  if (skillsPanel) {
    skillsPanel.addEventListener("mousemove", (e) => {
      const rect = skillsPanel.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      skillsPanel.style.setProperty("--skills-x", `${x}px`);
      skillsPanel.style.setProperty("--skills-y", `${y}px`);
    });
  }


  /* ================================
     REVEAL ANIMATION FUNCTION
  ================================ */

  function revealOnScroll(selector, visibleClass = "is-visible", threshold = 0.18, delay = 90) {
    const items = document.querySelectorAll(selector);

    if (!items.length) return;

    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * delay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
          }
        });
      },
      {
        threshold,
      }
    );

    items.forEach((item) => {
      observer.observe(item);
    });
  }

  /* Services reveal */
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.classList.add("reveal-service");
  });

  revealOnScroll(".service-card", "is-visible", 0.18, 80);

  /* Process reveal */
  revealOnScroll(".process-step", "is-visible", 0.16, 110);

  /* About reveal */
  revealOnScroll(".about-visual, .about-content", "is-visible", 0.18, 120);

  /* Contact reveal */
  revealOnScroll(".contact-content, .contact-form", "is-visible", 0.18, 130);


  /* ================================
     WORK SLIDER
  ================================ */

  const workSlider = document.getElementById("workSlider");
  const workPrev = document.getElementById("workPrev");
  const workNext = document.getElementById("workNext");
  const workProgressBar = document.getElementById("workProgressBar");

  function updateWorkProgress() {
    if (!workSlider || !workProgressBar) return;

    const scrollLeft = workSlider.scrollLeft;
    const maxScroll = workSlider.scrollWidth - workSlider.clientWidth;

    if (maxScroll <= 0) {
      workProgressBar.style.width = "100%";
      return;
    }

    const progress = ((scrollLeft / maxScroll) * 75) + 25;
    workProgressBar.style.width = `${progress}%`;
  }

  if (workSlider && workPrev && workNext) {
    workNext.addEventListener("click", () => {
      workSlider.scrollBy({
        left: workSlider.clientWidth * 0.75,
        behavior: "smooth",
      });
    });

    workPrev.addEventListener("click", () => {
      workSlider.scrollBy({
        left: -workSlider.clientWidth * 0.75,
        behavior: "smooth",
      });
    });

    workSlider.addEventListener("scroll", updateWorkProgress);
    window.addEventListener("resize", updateWorkProgress);
    updateWorkProgress();
  }

  /* Work card reveal */
  const workRevealItems = document.querySelectorAll(".work-card");

  workRevealItems.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `
      opacity 0.75s ease ${index * 90}ms,
      transform 0.75s ease ${index * 90}ms,
      border-color 0.35s ease,
      box-shadow 0.35s ease
    `;
  });

  if (workRevealItems.length) {
    const workObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    workRevealItems.forEach((card) => {
      workObserver.observe(card);
    });
  }


  /* ================================
     SKILL BAR ANIMATION
  ================================ */

  const skillBars = document.querySelectorAll(".skill-bar");

  if (skillBars.length) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    skillBars.forEach((bar) => {
      skillObserver.observe(bar);
    });
  }


  /* ================================
     FORMSPREE CONTACT FORM
  ================================ */

  /* ================================
   WEB3FORMS CONTACT FORM
================================ */

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn");
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

    formMessage.textContent = "";
    formMessage.classList.remove("success", "error");

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";
    }

    try {
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        formMessage.textContent = "Message sent successfully. Umer will contact you soon.";
        formMessage.classList.add("success");
        form.reset();
      } else {
        formMessage.textContent = result.message || "Something went wrong. Please try again.";
        formMessage.classList.add("error");
      }
    } catch (error) {
      formMessage.textContent = "Network error. Please check your internet and try again.";
      formMessage.classList.add("error");
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}
});
