export function saveItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function loadItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
