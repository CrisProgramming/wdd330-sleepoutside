import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

window.addEventListener("DOMContentLoaded", async () => {
  // 1️ inject header & footer
  await loadHeaderFooter();

  // 2️ instantiate and render the cart
  const cart = new ShoppingCart("so-cart");
  await cart.render(".product-list", "../partials/cart-item.html");

  // 3️ wire up removal buttons
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      cart.removeItem(idx);
      await cart.render(".product-list", "../partials/cart-item.html");
    });
  });
});