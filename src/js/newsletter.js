const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("nl-email");
const nameInput = document.getElementById("nl-name");
const consentInput = document.getElementById("nl-consent");
const msg = document.getElementById("nl-msg");

const STORAGE_KEY = "newsletter-subscribers";

function getSubs() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveSubs(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Use built-in validation first
  if (!form.reportValidity()) return;

  const email = emailInput.value.trim();
  const name = nameInput.value.trim();

  // Extra simple email check (type="email" already helps)
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    msg.textContent = "Please enter a valid email address.";
    return;
  }

  if (!consentInput.checked) {
    msg.textContent = "Please agree to receive emails to continue.";
    return;
  }

  const subs = getSubs();
  const exists = subs.some(s => s.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    msg.textContent = "You're already subscribed. Thanks!";
    return;
  }

  subs.push({
    email,
    name,
    consent: true,
    subscribedAt: new Date().toISOString(),
  });
  saveSubs(subs);

  // Success UI
  form.reset();
  form.querySelector('button[type="submit"]').disabled = true;
  msg.textContent = "🎉 Thanks! You're subscribed.";
});