/* TASMEEM WOODWORKS - script.js
   EDIT THE CONFIG BELOW to change contact details. */
const CONFIG = {
  whatsappNumber: "2347040993252",
  email: "tasmeemwoodworks@gmail.com",
  greeting: "Hello TASMEEM WOODWORKS, I would like to make an inquiry"
};

document.documentElement.classList.add("js");

function waLink(text) {
  return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(text);
}

document.querySelectorAll("[data-wa]").forEach(function (el) {
  const service = el.getAttribute("data-wa");
  const msg = service ? CONFIG.greeting + " about: " + service + "." : CONFIG.greeting + ".";
  el.href = waLink(msg);
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

document.getElementById("year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".card, .gallery figure, .why > div, .steps li, .frame").forEach(function (el) {
    el.classList.add("reveal"); io.observe(el);
  });
}

const form = document.getElementById("quoteForm");
const msgBox = document.getElementById("formMsg");

function showError(input, text) {
  const err = input.parentElement.querySelector(".err");
  if (err) err.textContent = text;
  input.classList.toggle("invalid", Boolean(text));
}

function validate() {
  let ok = true;
  const f = form.elements;
  [["name", "Please enter your name."], ["phone", "Please enter your phone number."],
   ["service", "Please choose a service."], ["location", "Please enter the project location."],
   ["details", "Please describe your project."]].forEach(function (r) {
    const bad = f[r[0]].value.trim() === "";
    showError(f[r[0]], bad ? r[1] : ""); if (bad) ok = false;
  });
  if (f.phone.value.trim() && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.value.trim())) { showError(f.phone, "Enter a valid phone number."); ok = false; }
  if (f.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) { showError(f.email, "Enter a valid email address."); ok = false; }
  else if (!f.email.value.trim()) showError(f.email, "");
  return ok;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validate()) {
    const first = form.querySelector(".invalid"); if (first) first.focus();
    return;
  }
  const d = new FormData(form);
  const clean = function (k) { return String(d.get(k) || "").trim().slice(0, 1000); };
  const lines = [
    "New quote request",
    "Name: " + clean("name"), "Phone: " + clean("phone"), "Email: " + (clean("email") || "not given"),
    "Service: " + clean("service"), "Location: " + clean("location"),
    "Budget: " + (clean("budget") || "not given"),
    "Preferred contact: " + clean("contact"), "Details: " + clean("details")
  ].join("\n");
  const wa = waLink(lines);
  const mail = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Quote request: " + clean("service")) + "&body=" + encodeURIComponent(lines);

  msgBox.hidden = false;
  msgBox.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "Thank you, " + clean("name") + ". Your request is ready, but it has not been sent yet. Choose how to send it: ";
  const a1 = document.createElement("a"); a1.href = wa; a1.target = "_blank"; a1.rel = "noopener noreferrer"; a1.textContent = "Send on WhatsApp";
  const a2 = document.createElement("a"); a2.href = mail; a2.textContent = "Send by email";
  p.append(a1, document.createTextNode(" or "), a2, document.createTextNode("."));
  msgBox.appendChild(p);
  msgBox.focus();
});

form.addEventListener("input", function (e) { if (e.target.classList.contains("invalid")) showError(e.target, ""); });
