// Thin client for the admin API. Uses cookie auth (credentials: include).
const BASE = import.meta.env.VITE_API_URL || "/api";

async function req(path, { method = "GET", body, isForm } = {}) {
  const opts = { method, credentials: "include", headers: {} };
  if (isForm) {
    opts.body = body;
  } else if (body !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw Object.assign(new Error(data.error || "Request failed"), {
      status: res.status,
      errors: data.errors,
    });
  }
  return data;
}

export const adminApi = {
  login: (email, password) => req("/admin/login", { method: "POST", body: { email, password } }),
  logout: () => req("/admin/logout", { method: "POST" }),
  me: () => req("/admin/me"),
  listAssets: () => req("/admin/assets"),
  getAsset: (slug) => req(`/admin/assets/${slug}`),
  createAsset: (payload) => req("/admin/assets", { method: "POST", body: payload }),
  updateAsset: (slug, payload) => req(`/admin/assets/${slug}`, { method: "PUT", body: payload }),
  deleteAsset: (slug) => req(`/admin/assets/${slug}`, { method: "DELETE" }),
  uploadImage: (file) => {
    const fd = new FormData();
    fd.append("image", file);
    return req("/admin/uploads", { method: "POST", body: fd, isForm: true });
  },
  listPledges: () => req("/admin/pledges"),
  listLeads: () => req("/admin/leads"),
};
