
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

// Mobile navigation
if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Reveal sections on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("show");
  });
}

// Active navigation link
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive =
            link.getAttribute("href") === "#" + entry.target.id;

          link.classList.toggle("active", isActive);
        });
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px" });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Back to top button
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 350);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Current year in footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form: open Gmail compose
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      if (formNote) {
        formNote.textContent = "Please fill in all fields.";
      }
      return;
    }

    const recipient = "gangilvanshika@gmail.com";

    const subject = encodeURIComponent(
      "Portfolio Contact from " + name
    );

    const body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n\n" +
      "Message:\n" + message
    );

    const gmailURL =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent(recipient) +
      "&su=" + subject +
      "&body=" + body;

    const emailWindow = window.open(gmailURL, "_blank");

    if (emailWindow) {
      if (formNote) {
        formNote.textContent =
          "Gmail opened. Review your message and click Send.";
      }
    } else {
      if (formNote) {
        formNote.textContent =
          "Popup blocked. Allow popups or open Gmail manually.";
      }
    }
  });
}
