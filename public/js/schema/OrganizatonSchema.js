const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Drywall Kingston",
  "url": "https://drywallkingston.com",
  "logo": "https://drywallkingston.com/img/logo_head2.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "url": "https://drywallkingston.com/request-free-quote"
  }
  // "sameAs": [
  //   "https://www.youtube.com/channel/yourchannel",
  //   "https://twitter.com/yourprofile",
  //   "https://www.pinterest.com/yourprofile",
  //   "https://www.quora.com/profile/yourprofile"
  // ]
};

const script1 = document.createElement('script');
script1.type = 'application/ld+json';
const text1 = JSON.stringify(organizationSchema)
console.log("organizationSchema:" ,text1)
script1.text = text1
document.head.appendChild(script1);
