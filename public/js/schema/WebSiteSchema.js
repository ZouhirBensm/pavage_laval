const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.example.com", // Place real website URL here
  "name": "Your Business Name" // Place business name here
};

const script1 = document.createElement('script');
script1.type = 'application/ld+json';
const text1 = JSON.stringify(websiteSchema)
console.log("websiteSchema:" ,text1)
script1.text = text1
document.head.appendChild(script1);
