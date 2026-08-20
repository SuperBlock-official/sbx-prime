import { useEffect } from "react";

/** Lightweight SPA SEO: title, description, OG + Twitter cards, optional JSON-LD. */
export default function Seo({ title, description, path = "/", image = "https://www.sbxprime.com/og.jpg", jsonLd = null }) {
 useEffect(() => {
 document.title = title;
 const ensure = (attr, key, content) => {
 let el = document.head.querySelector(`meta[${attr}="${key}"]`);
 if (!el) {
 el = document.createElement("meta");
 el.setAttribute(attr, key);
 document.head.appendChild(el);
 }
 el.setAttribute("content", content);
 };
 const url = `https://www.sbxprime.com${path}`;
 ensure("name", "description", description);
 ensure("property", "og:title", title);
 ensure("property", "og:description", description);
 ensure("property", "og:type", "website");
 ensure("property", "og:url", url);
 ensure("property", "og:site_name", "SBX Prime");
 ensure("property", "og:image", image);
 ensure("name", "twitter:card", "summary_large_image");
 ensure("name", "twitter:title", title);
 ensure("name", "twitter:description", description);
 ensure("name", "twitter:image", image);

 let ld;
 if (jsonLd) {
 ld = document.createElement("script");
 ld.type = "application/ld+json";
 ld.dataset.page = "true";
 ld.textContent = JSON.stringify(jsonLd);
 document.head.appendChild(ld);
 }
 return () => ld?.remove();
 }, [title, description, path, image]);
 return null;
}
