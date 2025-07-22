import { qs } from "./utils.mjs";

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