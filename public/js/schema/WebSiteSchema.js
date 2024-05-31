const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.example.com", // Place real website URL here
  "name": "Your Business Name" // Place business name here
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(websiteSchema);
document.head.appendChild(script);
