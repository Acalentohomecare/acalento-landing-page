/*
 * Acalento Gestão — interações da landing page.
 *
 * CONFIGURAÇÃO: defina abaixo o e-mail que deve receber os pedidos de demonstração.
 * O formulário abre o programa de e-mail do visitante com a mensagem já preenchida.
 */
const CONTATO_EMAIL = "acalentohomecare@gmail.com";

document.documentElement.classList.remove("no-js");

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Cabeçalho com sombra ao rolar
const topbar = document.querySelector(".topbar");
const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu do celular
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menu.classList.toggle("is-open", open);
};
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Animação de entrada
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Formulário de contato
const form = document.getElementById("form-contato");
const status = form.querySelector(".form__status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.className = "form__status";

  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((input) => {
    const ok = input.value.trim() !== "" && input.checkValidity();
    input.setAttribute("aria-invalid", String(!ok));
    if (!ok && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) {
    status.textContent = "Preencha nome, empresa e um e-mail válido.";
    status.classList.add("is-error");
    firstInvalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  if (!CONTATO_EMAIL) {
    status.textContent = "Obrigado! O canal de contato ainda está sendo configurado.";
    status.classList.add("is-ok");
    return;
  }

  const assunto = `Demonstração Acalento Gestão — ${data.empresa}`;
  const corpo = [
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.telefone || "-"}`,
    "",
    data.mensagem || "",
  ].join("\n");
  window.location.href = `mailto:${CONTATO_EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  status.textContent = "Abrindo seu programa de e-mail…";
  status.classList.add("is-ok");
});
