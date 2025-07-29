import { loadTemplate, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.items = JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  addItem(item) {
    this.items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  removeItem(index) {
    this.items.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  async render(selector, templatePath) {
    const container = document.querySelector(selector);
    const tpl = await loadTemplate(templatePath);

    const html = this.items
      .map((item, idx) => {
        let entry = tpl
          .replace(/{{\s*Image\s*}}/g,   item.Image)
          .replace(/{{\s*Name\s*}}/g,    item.Name)
          .replace(/{{\s*FinalPrice\s*}}/g, item.FinalPrice)
          .replace(/{{\s*Colors\.0\.ColorName\s*}}/g, item.Colors[0].ColorName)
          .replace(/{{\s*index\s*}}/g,   idx);
        return entry;
      })
      .join("");

    renderWithTemplate(html, container);
  }
}