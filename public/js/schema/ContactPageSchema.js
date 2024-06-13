const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://drywallkingston.com/request-free-quote"
}

const script1 = document.createElement('script');
script1.type = 'application/ld+json';
const text1 = JSON.stringify(contactPageSchema)
// console.log("contactPageSchema:" ,text1)
script1.text = text1
document.head.appendChild(script1);
