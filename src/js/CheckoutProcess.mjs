import ProductData from "./ProductData.mjs";

export default class CheckoutProcess {
  constructor(cartKey = "so-cart") {
    this.cartKey = cartKey;
  }

  // 1) Subtotal = sum of FinalPrice in cart
  calculateSubtotal() {
    const items = JSON.parse(localStorage.getItem(this.cartKey)) || [];
    const subtotal = items.reduce(
      (sum, i) => sum + parseFloat(i.FinalPrice),
      0
    );
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    return subtotal;
  }

  // 2) Tax, shipping, total after ZIP
  calculateTotals() {
    const subtotal = this.calculateSubtotal();
    const tax = subtotal * 0.06;
    const itemCount =
      JSON.parse(localStorage.getItem(this.cartKey))?.length || 0;
    const shipping = itemCount ? 10 + 2 * (itemCount - 1) : 0;
    const total = subtotal + tax + shipping;

    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("order-total").textContent = total.toFixed(2);

    return { tax, shipping, total };
  }

  // 3) Simplify items for backend
  packageItems(raw) {
    return raw.map((i) => ({
      id: i.Id,
      name: i.Name,
      price: parseFloat(i.FinalPrice),
      quantity: 1,
    }));
  }

  // 4) Build payload & POST via ProductData.checkout
  async checkout(form) {
    const fd = new FormData(form);
    const { tax, shipping, total } = this.calculateTotals();

    const payload = {
      orderDate: new Date().toISOString(),
      fname: fd.get("fname"),
      lname: fd.get("lname"),
      street: fd.get("street"),
      city: fd.get("city"),
      state: fd.get("state"),
      zip: fd.get("zip"),
      cardNumber: fd.get("cardNumber"),
      expiration: fd.get("expiration"),
      code: fd.get("code"),
      items: this.packageItems(
        JSON.parse(localStorage.getItem(this.cartKey)) || []
      ),
      orderTotal: total.toFixed(2),
      shipping,
      tax: tax.toFixed(2),
    };

    return ProductData.checkout(payload);
  }
}