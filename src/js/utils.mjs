// 1️ loadTemplate: fetches an HTML partial and returns it as text
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.text();
}

// 2️ renderWithTemplate: injects the HTML, then (optionally) runs a callback
export function renderWithTemplate(template, parentEl, data, callback) {
  parentEl.innerHTML = template;
  if (typeof callback === "function") {
    callback(data);
  }
}

// 3️ loadHeaderFooter: loads both header.html & footer.html and renders them
export async function loadHeaderFooter() {
  const [headerTpl, footerTpl] = await Promise.all([
    loadTemplate("../partials/header.html"),
    loadTemplate("../partials/footer.html"),
  ]);

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  renderWithTemplate(headerTpl, headerEl);
  renderWithTemplate(footerTpl, footerEl);
}