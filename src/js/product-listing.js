import ProductData from "./ProductData.mjs";
const dataSource = new ProductData("tents");

// After fetching products into `products`...
// Render product cards + Quick View button
const listContainer = document.querySelector(".product-list");
listContainer.innerHTML = products
  .map(p => {
    const slug = slugMap[p.Id] || p.Id;
    return `
      <li class="product-card divider">
        <a href="product_pages/${slug}.html?id=${p.Id}">
          <img src="${p.PrimaryMedium}" alt="${p.Name}" />
          <h3>${p.Name}</h3>
          <p>$${p.FinalPrice}</p>
        </a>
        <button class="quick-view" data-id="${p.Id}">Quick View</button>
      </li>
    `;
  })
  .join("");

// Modal elements
const modal = document.getElementById("quick-view-modal");
const imgEl = modal.querySelector("#modal-img");
const titleEl = modal.querySelector("#modal-title");
const descEl = modal.querySelector("#modal-desc");
const priceEl = modal.querySelector("#modal-price");
const closeBtn = modal.querySelector(".modal-close");

// Close handlers
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Quick View button handlers
document.querySelectorAll(".quick-view").forEach(btn => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    try {
      const detail = await dataSource.findProductById(id);
      imgEl.src = detail.PrimaryMedium;
      imgEl.alt = detail.Name;
      titleEl.textContent = detail.Name;
      descEl.textContent = detail.LongDescription || detail.Description || "";
      priceEl.textContent = `$${detail.FinalPrice}`;
      modal.classList.remove("hidden");
    } catch (err) {
      console.error("Quick View fetch error:", err);
    }
  });
});
