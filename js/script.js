// ------------------------------
// Project data
// ------------------------------
const projects = [
  {
    id: 1,
    title: "TechFest 2026",
    category: "web",
    description: "A responsive event website with registration, event information, schedules and interactive UI components.",
    image: "images/project1.png",
    tags: ["HTML5", "CSS3", "JavaScript"],
    link: "https://github.com/"
  },
  {
    id: 2,
    title: "Vitamin Deficiency Finder",
    category: "ml",
    description: "A web-based concept for visually detecting possible vitamin deficiencies using image-based machine learning.",
    image: "images/project2.png",
    tags: ["Python", "CNN", "Web App"],
    link: "https://github.com/"
  },
  {
    id: 3,
    title: "Student Task Manager",
    category: "web",
    description: "A simple productivity application for adding, completing and organising academic tasks.",
    image: "images/project3.png",
    tags: ["JavaScript", "DOM", "LocalStorage"],
    link: "https://github.com/"
  }
];

const projectsContainer = document.getElementById("projectsContainer");
const filterButtons = document.querySelectorAll(".filter-button");

// ------------------------------
// DOM rendering
// ------------------------------
const renderProjects = (projectList) => {
  projectsContainer.innerHTML = projectList.map(
    ({ id, title, description, image, tags, link, category }) => `
      <article class="project-card" data-category="${category}">
        <div class="project-number">0${id}</div>

        <img
          class="project-image"
          src="${image}"
          alt="${title} project preview"
        >

        <div class="project-info">
          <h3>${title}</h3>
          <p>${description}</p>

          <div class="tags">
            ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>

        <a
          class="project-link"
          href="${link}"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW REPOSITORY ↗
        </a>
      </article>
    `
  ).join("");
};

renderProjects(projects);

// ------------------------------
// Project filter + localStorage
// ------------------------------
const applyProjectFilter = (selectedFilter) => {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === selectedFilter);
  });

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter(({ category }) => category === selectedFilter);

  renderProjects(filteredProjects);
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    localStorage.setItem("projectFilter", selectedFilter);
    applyProjectFilter(selectedFilter);
  });
});

// Restore the saved filter after refresh.
const savedFilter = localStorage.getItem("projectFilter");
if (savedFilter && ["all", "web", "ml"].includes(savedFilter)) {
  applyProjectFilter(savedFilter);
}

// ------------------------------
// Mobile navigation
// ------------------------------
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// ------------------------------
// Contact form validation
// ------------------------------
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

const namePattern = /^[A-Za-z][A-Za-z\s.'-]{2,39}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clearErrors = () => {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formSuccess.textContent = "";
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let isValid = true;

  if (!namePattern.test(name)) {
    nameError.textContent = "Please enter a valid name.";
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (message.length < 10) {
    messageError.textContent = "Message must contain at least 10 characters.";
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent =
      "Message validated successfully. Thank you!";
    contactForm.reset();
  }
});

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {
    formSuccess.textContent = "";
  });
});
