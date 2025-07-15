// src/js/product.js

import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // 1) Read whatever is currently in storage
  const stored = getLocalStorage("so-cart");

  // 2) Normalize it into an array
  let cart;
  if (Array.isArray(stored)) {
    cart = stored; // already an array
  } else if (stored) {
    cart = [stored]; // a single object → wrap in array
  } else {
    cart = []; // nothing there yet
  }

  // 3) Safely add the new product
  cart.push(product);

  // 4) Write the updated array back to localStorage
  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
