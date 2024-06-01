const breadcrumbListSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://drywallkingston.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Request Free Quote",
      "item": "https://drywallkingston.com/request-free-quote"
    }
  ]
}

const script3 = document.createElement('script');
script3.type = 'application/ld+json';
const text3 = JSON.stringify(breadcrumbListSchema)
console.log("websiteSchema:" ,text3)
script3.text = text3
document.head.appendChild(script3);
