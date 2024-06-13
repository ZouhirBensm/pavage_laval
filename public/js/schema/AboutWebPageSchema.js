const aboutWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About Us",
  "url": "https://drywallkingston.com/about",
  "mainEntity": {
    "@type": "Organization",
    "url": "https://drywallkingston.com/organization",
  }
};

const script1 = document.createElement('script');
script1.type = 'application/ld+json';
const text1 = JSON.stringify(aboutWebPageSchema)
// console.log("aboutWebPageSchema:" ,text1)
script1.text = text1
document.head.appendChild(script1);
