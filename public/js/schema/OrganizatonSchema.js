const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Drywall Kingston",
  "url": "https://drywallkingston.com",
  "logo": "https://drywallkingston.com/img/logo_head2.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-819-555-2555",
    "contactType": "Customer Service",
    "areaServed": "CA",
    "availableLanguage": "English",
    "url": "https://drywallkingston.com/request-free-quote"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1786 Bath Rd #18",
    "addressLocality": "Kingston",
    "addressRegion": "ON",
    "postalCode": "K7M 4Y2",
    "addressCountry": "CA"
  },
  // "sameAs": [
  //   "https://www.youtube.com/channel/yourchannel",
  //   "https://twitter.com/yourprofile",
  //   "https://www.pinterest.com/yourprofile",
  //   "https://www.quora.com/profile/yourprofile"
  // ]
  "founder": {
    "@type": "Person",
    "name": "John Doe",
    "jobTitle": "Founder & CEO"
    // "image": "https://drywallkingston.com/img/john_doe.jpg",
    // "sameAs": "https://www.linkedin.com/in/johndoe"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Jane Smith",
      "jobTitle": "Chief Operating Officer"
      // "image": "https://drywallkingston.com/img/jane_smith.jpg",
      // "sameAs": "https://www.linkedin.com/in/janesmith"
    },
    {
      "@type": "Person",
      "name": "Mike Johnson",
      "jobTitle": "Chief Marketing Officer"
      // "image": "https://drywallkingston.com/img/mike_johnson.jpg",
      // "sameAs": "https://www.linkedin.com/in/mikejohnson"
    }
  ],
  // "foundingDate": "2010",
  "description": "Drywall Kingston is a leading provider of drywall services in Kingston, ON, offering top-quality installation, repair, and finishing services to residential and commercial clients."
}

const script1 = document.createElement('script');
script1.type = 'application/ld+json';
const text1 = JSON.stringify(organizationSchema)
console.log("organizationSchema:" ,text1)
script1.text = text1
document.head.appendChild(script1);
