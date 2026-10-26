// Инициализация анимаций AOS
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    once: true,
  });
}

const form = document.getElementById("requestForm");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\d\s()+-]{10,}$/;

function setError(fieldName, message) {
  const field = form.querySelector(`[name="${fieldName}"]`).closest(".form__field");
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);

  if (message) {
    field.classList.add("is-invalid");
    errorEl.textContent = message;
  } else {
    field.classList.remove("is-invalid");
    errorEl.textContent = "";
  }
}

function validateField(name, value) {
  const trimmed = value.trim();

  if (name === "message") {
    return trimmed.length >= 10 ? "" : "Опишите проблему хотя бы в 10 символах";
  }

  if (!trimmed) {
    return "Поле обязательно для заполнения";
  }

  if (name === "email" && !emailPattern.test(trimmed)) {
    return "Введите корректный email";
  }

  if (name === "phone" && !phonePattern.test(trimmed)) {
    return "Введите корректный номер телефона";
  }

  return "";
}

form.addEventListener("input", (event) => {
  const target = event.target;
  if (!target.name) return;

  const error = validateField(target.name, target.value);
  setError(target.name, error);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = ["name", "phone", "email", "message"];
  let hasErrors = false;

  fields.forEach((name) => {
    const value = form.elements[name].value;
    const error = validateField(name, value);
    setError(name, error);

    if (error) hasErrors = true;
  });

  if (hasErrors) {
    return;
  }

  alert("Спасибо! Мы свяжемся с вами.");
  form.reset();
  fields.forEach((name) => setError(name, ""));
});