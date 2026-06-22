import { useEffect } from "react";

const Helmet = ({ title, description, url, image }) => {
  useEffect(() => {
    // -------------------------
    // TITLE
    // -------------------------
    document.title = title || "NiteSea";

    // -------------------------
    // META HELPER (for meta tags only)
    // -------------------------
    const upsertMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);

      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }

      el.setAttribute(attr, value);
    };

    // -------------------------
    // BASIC SEO TAGS
    // -------------------------
    upsertMeta('meta[name="description"]', "content", description || "");
    upsertMeta('meta[name="robots"]', "content", "index, follow");

    // -------------------------
    // CANONICAL (FIXED PROPERLY)
    // -------------------------
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url || window.location.href);

    // -------------------------
    // OPEN GRAPH (Facebook / WhatsApp)
    // -------------------------
    upsertMeta('meta[property="og:title"]', "content", title || "");
    upsertMeta('meta[property="og:description"]', "content", description || "");
    upsertMeta('meta[property="og:url"]', "content", url || window.location.href);
    upsertMeta('meta[property="og:image"]', "content", image || "");
    upsertMeta('meta[property="og:type"]', "content", "website");
    upsertMeta('meta[property="og:site_name"]', "content", "NiteSea");

    // -------------------------
    // TWITTER CARD
    // -------------------------
    upsertMeta('meta[name="twitter:title"]', "content", title || "");
    upsertMeta('meta[name="twitter:description"]', "content", description || "");
    upsertMeta('meta[name="twitter:image"]', "content", image || "");
    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");

    // -------------------------
    // STRUCTURED DATA (VERY IMPORTANT FOR SITELINKS)
    // -------------------------
    const oldSchema = document.getElementById("website-schema");
    if (oldSchema) oldSchema.remove();

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "website-schema";

    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "NiteSea",
      url: url || window.location.origin,
      potentialAction: {
        "@type": "SearchAction",
        target: `${window.location.origin}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    document.head.appendChild(schema);
  }, [title, description, url, image]);

  return null;
};

export default Helmet;