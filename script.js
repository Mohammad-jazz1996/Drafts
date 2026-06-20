const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const message = `مرحبا، أريد التسجيل في تقوية%0Aالاسم: ${encodeURIComponent(data.get("name"))}%0Aالهاتف: ${encodeURIComponent(data.get("phone"))}%0Aالخدمة: ${encodeURIComponent(data.get("service"))}%0Aالتفاصيل: ${encodeURIComponent(data.get("message") || "")}`;
  window.open(`https://wa.me/971501234567?text=${message}`, "_blank");
});
