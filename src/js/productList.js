import { qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search") || "";
const dataSource = new ProductData("tents");

async function loadAndRender() {
  // 1️⃣ fetch either all products or only the matching ones
  const products = searchTerm
    ? await dataSource.searchProducts(searchTerm)
    : await dataSource.getData();

  const container = qs("#productContainer");

  // 2️⃣ no‐results guard
  if (!products || products.length === 0) {
    container.innerHTML = `<p>No products found for “${searchTerm}”.</p>`;
    return;
  }

  // 3️⃣ render the grid, using the exact keys from your JSON:
  container.innerHTML = products
    .map(p => `
      <li class="product-card">
        <a href="#">
          <!-- your JSON’s Image field already includes the full path -->
          <img
            src="${p.Image}"
            alt="${p.NameWithoutBrand}"
          />

          <!-- Brand is an object, so we drill into its Name -->
          <h3 class="card__brand">${p.Brand.Name}</h3>

          <!-- NameWithoutBrand gives you “Ajax Tent – 3-Person, 3-Season” -->
          <h2 class="card__name">${p.NameWithoutBrand}</h2>

          <!-- FinalPrice is the price you want to show -->
          <p class="product-card__price">$${p.FinalPrice.toFixed(2)}</p>
        </a>
      </li>
    `)
    .join("");
}

window.addEventListener("DOMContentLoaded", loadAndRender);