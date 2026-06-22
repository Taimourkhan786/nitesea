import { useEffect } from 'react';

const Helmet = ({ 
  title, 
  description, 
  url, 
  image, 
  keywords, 
  type, 
  siteName 
}) => {
  useEffect(() => {
    const defaultTitle = 'NiteSea - Free Online Image Resizer';
    const defaultDesc = 'Resize your images instantly with NiteSea.';
    const defaultUrl = 'https://nitesea.com/';
    const defaultImage = 'https://nitesea.com/logo512.png';
    const defaultKeywords = 'image resizer, resize images, free image tool, online image resizer, NiteSea';
    const defaultType = 'website';
    const defaultSiteName = 'NiteSea';

    // Update Title
    document.title = title || defaultTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || defaultDesc;

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords || defaultKeywords;

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || defaultUrl;

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title || defaultTitle;

    // Update OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || defaultDesc;

    // Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = url || defaultUrl;

    // Update OG Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.content = image || defaultImage;

    // Update OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.content = type || defaultType;

    // Update OG Site Name
    let ogSite = document.querySelector('meta[property="og:site_name"]');
    if (!ogSite) {
      ogSite = document.createElement('meta');
      ogSite.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSite);
    }
    ogSite.content = siteName || defaultSiteName;

    // Update Twitter Title
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.name = 'twitter:title';
      document.head.appendChild(twTitle);
    }
    twTitle.content = title || defaultTitle;

    // Update Twitter Description
    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.name = 'twitter:description';
      document.head.appendChild(twDesc);
    }
    twDesc.content = description || defaultDesc;

    // Update Twitter Image
    let twImage = document.querySelector('meta[name="twitter:image"]');
    if (!twImage) {
      twImage = document.createElement('meta');
      twImage.name = 'twitter:image';
      document.head.appendChild(twImage);
    }
    twImage.content = image || defaultImage;

  }, [title, description, url, image, keywords, type, siteName]);

  return null;
};

export default Helmet;