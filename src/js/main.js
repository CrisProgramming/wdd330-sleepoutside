import { qs, loadHeaderFooter } from "./utils.mjs";

window.addEventListener("DOMContentLoaded", async () => {
  // 1️ inject header & footer
  await loadHeaderFooter();

  // 2️ then wire up your search form
  const searchForm = qs("#searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", e => {
     e.preventDefault();
      const query = qs("#searchInput").value.trim();
      if (query) {
        window.location.href = `product_list.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
});