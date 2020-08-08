export async function fetchProducts() {
  const url = 'http://localhost:3001/products';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchProduct(productId) {
  const url = `http://localhost:3001/products/${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
