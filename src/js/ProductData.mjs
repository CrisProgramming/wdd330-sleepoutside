const baseURL = import.meta.env.VITE_SERVER_URL;

// helper to throw on bad response
async function convertToJson(res) {
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default class ProductData {
  // no constructor needed; endpoints take the category/id as argument

  // fetch list of products for a category
  async getData(category) {
    const res = await fetch(`${baseURL}products/search/${category}`);
    const json = await convertToJson(res);
    return json.Result;        // API wraps array under .Result
  }

  // fetch a single product by its id
  async findProductById(id) {
    const res = await fetch(`${baseURL}product/${id}`);
    const json = await convertToJson(res);
    return json.Result;        // single product object
  }

  // (optional) keep a search-by-query helper:
  async searchProducts(category, query) {
    const list = await this.getData(category);
    const q = query.toLowerCase();
    return list.filter(item =>
      (item.Name  && item.Name.toLowerCase().includes(q)) ||
      (item.Brand && item.Brand.toLowerCase().includes(q))
    );
  }

  // POST an order to /checkout
  static async checkout(order) {
    const url = `${baseURL}checkout`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    };
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Checkout failed: ${res.status}`);
    return res.json();
  }


}