import CheckoutProcess from "./CheckoutProcess.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const cp = new CheckoutProcess();

  // Show subtotal on load
  cp.calculateSubtotal();

  // Recalc tax/shipping/total after ZIP blur
  document.querySelector('input[name="zip"]').addEventListener("blur", () => {
    cp.calculateTotals();
  });

  // Handle form submit
  document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await cp.checkout(e.target);
      alert("✅ Order placed successfully!");
      localStorage.removeItem(cp.cartKey);
      window.location.href = "../index.html";
    } catch (err) {
      console.error(err);
      alert("❌ There was a problem placing your order.");
    }
  });
});