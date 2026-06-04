const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

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

/* Services card mouse glow */
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--service-x", `${x}px`);
    card.style.setProperty("--service-y", `${y}px`);
  });
});

/* Services scroll reveal */
const revealServices = document.querySelectorAll(".service-card");

revealServices.forEach((card, index) => {
  card.classList.add("reveal-service");
  card.style.transitionDelay = `${index * 80}ms`;
});

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealServices.forEach((card) => {
  serviceObserver.observe(card);
});


/* Work card mouse glow */
const workCards = document.querySelectorAll(".work-card");

workCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--work-x", `${x}px`);
    card.style.setProperty("--work-y", `${y}px`);
  });
});

/* Work slider controls */
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

/* Work reveal animation */
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

/* Skills panel mouse glow */
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

/* Animate skill bars on scroll */
const skillBars = document.querySelectorAll(".skill-bar");

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


/* Process card mouse glow */
const processContents = document.querySelectorAll(".process-content");

processContents.forEach((content) => {
  content.addEventListener("mousemove", (e) => {
    const rect = content.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    content.style.setProperty("--process-x", `${x}px`);
    content.style.setProperty("--process-y", `${y}px`);
  });
});

/* Process reveal animation */
const processSteps = document.querySelectorAll(".process-step");

processSteps.forEach((step, index) => {
  step.style.transitionDelay = `${index * 110}ms`;
});

const processObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

processSteps.forEach((step) => {
  processObserver.observe(step);
});


/* About main card mouse glow */
const aboutCard = document.querySelector(".about-card-main");

if (aboutCard) {
  aboutCard.addEventListener("mousemove", (e) => {
    const rect = aboutCard.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    aboutCard.style.setProperty("--about-x", `${x}px`);
    aboutCard.style.setProperty("--about-y", `${y}px`);
  });
}

/* About reveal animation */
const aboutRevealItems = document.querySelectorAll(".about-visual, .about-content");

aboutRevealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 120}ms`;
});

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

aboutRevealItems.forEach((item) => {
  aboutObserver.observe(item);
});


/* Contact form mouse glow */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("mousemove", (e) => {
    const rect = contactForm.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contactForm.style.setProperty("--contact-x", `${x}px`);
    contactForm.style.setProperty("--contact-y", `${y}px`);
  });
}

/* Contact reveal animation */
const contactRevealItems = document.querySelectorAll(".contact-content, .contact-form");

contactRevealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 130}ms`;
});

const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

contactRevealItems.forEach((item) => {
  contactObserver.observe(item);
});

/* Demo form submit */
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formMessage.textContent =
      "Request ready. Connect this form with Formspree, EmailJS, or WordPress later.";

    form.reset();
  });
}