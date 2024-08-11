console.log(business_data_fr)

const aboutWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": `${all_data_per_page_fr.title}`,
  "url": `${business_data_fr.website_main_url}/a-propos`,
  "mainEntity": {
    "@type": "Organization",
    "url": `${business_data_fr.website_main_url}/organisation`,
  }
};

const script1 = document.createElement('script');
script1.type = 'application/ld+json';

console.log(aboutWebPageSchema)
const text1 = JSON.stringify(aboutWebPageSchema)
// console.log("aboutWebPageSchema:" ,text1)
script1.text = text1
document.head.appendChild(script1);
