import {
  getParam,
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";

window.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // 1) Grab the id from the URL (?id=...)
  const id = getParam("id");

  // 2) Fetch the single product from the API
  const dataSource = new ProductData();
  const item = await dataSource.findProductById(id);

  // 3) Inject into the placeholders you added to the HTML
  document.querySelector(".product-title").textContent = item.Name;
  document.querySelector(".product-image").src = item.PrimaryLarge;
  document.querySelector(".product-image").alt = item.Name;
  document.querySelector(".product-detail__price").textContent = `$${item.FinalPrice}`;
  document.querySelector(".product-color").textContent = item.Colors[0].ColorName;
  document.querySelector(".product-description").textContent = item.Description;

  // 4) Wire up the Add to Cart button
  const btn = document.getElementById("addToCart");
  btn.addEventListener("click", () => {
    const stored = getLocalStorage("so-cart") || [];
    stored.push(item);
    setLocalStorage("so-cart", stored);
    btn.textContent = "Added!";
    btn.disabled = true;
  });
});