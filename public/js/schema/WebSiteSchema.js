const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.example.com", // Place real website URL here
  "name": "Your Business Name" // Place business name here
};

const script = document.createElement('script');
script.type = 'application/ld+json';
const text = JSON.stringify(websiteSchema)
console.log("websiteSchema:" ,text)
script.text = text
document.head.appendChild(script);
