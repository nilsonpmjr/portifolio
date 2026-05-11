const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const form = document.querySelector("#form-contato");
const currentYear = document.querySelector("#ano-atual");
const backToTop = document.querySelector(".back-to-top");

currentYear.textContent = new Date().getFullYear();

function closeMenu() {
  navLinks.classList.remove("open");
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

backToTop.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", "#topo");
});

// O tema é salvo no navegador para manter a preferência do visitante em novos acessos.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  const selectedTheme = body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", selectedTheme);
});

const sections = document.querySelectorAll("main section[id]");
const menuItems = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let activeId = "sobre";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      activeId = section.id;
    }
  });

  menuItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

function setError(fieldId, message) {
  const field = document.querySelector(`#${fieldId}`);
  const error = document.querySelector(`#erro-${fieldId}`);
  field.classList.toggle("invalid", Boolean(message));
  error.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();
  const status = document.querySelector("#status-formulario");
  let isValid = true;

  setError("nome", "");
  setError("email", "");
  setError("mensagem", "");
  status.textContent = "";

  if (!nome) {
    setError("nome", "Informe seu nome.");
    isValid = false;
  }

  if (!email) {
    setError("email", "Informe seu e-mail.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError("email", "Informe um e-mail válido, como usuario@dominio.com.");
    isValid = false;
  }

  if (!mensagem) {
    setError("mensagem", "Escreva uma mensagem.");
    isValid = false;
  }

  if (!isValid) {
    status.textContent = "Revise os campos destacados antes de enviar.";
    return;
  }

  form.reset();
  status.textContent = "Mensagem enviada com sucesso!";
});
