export async function fetchItems() {
  const url = 'http://localhost:3001/items';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function xxx() {
  // TODO: ...
}
