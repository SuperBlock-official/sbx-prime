import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Login from "./Login";
import Assets from "./Assets";
import AssetEdit from "./AssetEdit";
import Pledges from "./Pledges";
import Leads from "./Leads";

export default function AdminApp() {
  // Keep the admin out of search indexes.
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    document.head.appendChild(m);
    return () => document.head.removeChild(m);
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Assets />} />
        <Route path="assets/new" element={<AssetEdit />} />
        <Route path="assets/:slug" element={<AssetEdit />} />
        <Route path="pledges" element={<Pledges />} />
        <Route path="leads" element={<Leads />} />
      </Route>
    </Routes>
  );
}
