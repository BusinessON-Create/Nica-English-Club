const URL = import.meta.env.VITE_API_URL;
// Sin header Content-Type: evita el preflight CORS que Apps Script no soporta.
export async function api(action, data = {}) {
  const r = await fetch(URL, { method: "POST", body: JSON.stringify({ action, ...data }) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j;
}
