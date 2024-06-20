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
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Organization",
      "item": "https://drywallkingston.com/organization"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "About Us",
      "item": "https://drywallkingston.com/about"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Drywall Iinstallation",
      "item": "https://drywallkingston.com/service/drywall-installation"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Drywall Repair and Patching",
      "item": "https://drywallkingston.com/service/drywall-repair-and-patching"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Drywall Finishing and Texturing",
      "item": "https://drywallkingston.com/service/drywall-finishing-and-texturing"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "Steel Stud Framing",
      "item": "https://drywallkingston.com/service/steel-stud-framing"
    },
    {
      "@type": "ListItem",
      "position": 9,
      "name": "Blown and Batt Insulation",
      "item": "https://drywallkingston.com/service/blown-and-batt-insulation"
    },
    {
      "@type": "ListItem",
      "position": 10,
      "name": "Suspended T-Bar Ceilings",
      "item": "https://drywallkingston.com/service/suspended-t-bar-ceilings"
    },
    {
      "@type": "ListItem",
      "position": 11,
      "name": "Textured and Coffered Ceilings",
      "item": "https://drywallkingston.com/service/textured-and-coffered-ceilings"
    },
    {
      "@type": "ListItem",
      "position": 12,
      "name": "Cove Moldings and Bulkheads",
      "item": "https://drywallkingston.com/service/cove-moldings-and-bulkheads"
    },
    {
      "@type": "ListItem",
      "position": 13,
      "name": "Spray Priming and Painting",
      "item": "https://drywallkingston.com/service/spray-priming-and-painting"
    },
    {
      "@type": "ListItem",
      "position": 14,
      "name": "Sitemap",
      "item": "https://drywallkingston.com'/sitemap'"
    },
    {
      "@type": "ListItem",
      "position": 15,
      "name": "Drywall Contractors Kingston",
      "item": "https://drywallkingston.com/drywall/drywall-contractors-kingston"
    },
    {
      "@type": "ListItem",
      "position": 16,
      "name": "Residential Drywall Contractors Kingston",
      "item": "https://drywallkingston.com/drywall/residential-drywall-contractors-kingston"
    },{
      "@type": "ListItem",
      "position": 17,
      "name": "Drywall Contractors Kingston Ontario",
      "item": "https://drywallkingston.com/drywall/drywall-contractors-kingston-ontario"
    },
    {
      "@type": "ListItem",
      "position": 18,
      "name": "Drywall Companies in Kingston Ontario",
      "item": "https://drywallkingston.com/drywall/drywall-companies-in-kingston-ontario"
    },{
      "@type": "ListItem",
      "position": 19,
      "name": "Drywall Companies in Kingston",
      "item": "https://drywallkingston.com/drywall/drywall-companies-in-kingston"
    },
    {
      "@type": "ListItem",
      "position": 20,
      "name": "Drywall Kingston Ltd",
      "item": "https://drywallkingston.com/drywall/drywall-kingston-ltd"
    },{
      "@type": "ListItem",
      "position": 21,
      "name": "Drywall Kingston Prices",
      "item": "https://drywallkingston.com/drywall/drywall-kingston-prices"
    },
    {
      "@type": "ListItem",
      "position": 22,
      "name": "Drywall Kingston Cost",
      "item": "https://drywallkingston.com/drywall/drywall-kingston-cost"
    },
    {
      "@type": "ListItem",
      "position": 23,
      "name": "Best Drywall Kingston",
      "item": "https://drywallkingston.com/drywall/best-drywall-kingston"
    },
    {
      "@type": "ListItem",
      "position": 24,
      "name": "Best Drywall Kingston",
      "item": "https://drywallkingston.com/blog/drywall/blog-posting/drywall-taping-tools"
    },
    {
      "@type": "ListItem",
      "position": 25,
      "name": "Best Drywall Kingston",
      "item": "https://drywallkingston.com/blog/drywall/blog-posting/drywall-alternatives-for-garage"
    },
    {
      "@type": "ListItem",
      "position": 26,
      "name": "Best Drywall Kingston",
      "item": "https://drywallkingston.com/blog/drywall/blog-posting/types-of-drywall"
    },
    {
      "@type": "ListItem",
      "position": 27,
      "name": "Best Drywall Kingston",
      "item": "/blog/drywall/blog-posting/how-to-tape-drywall"
    },
    {
      "@type": "ListItem",
      "position": 228,
      "name": "Best Drywall Kingston",
      "item": "https://drywallkingston.com/blog/drywall/blog-posting/all-about-popcorn-ceilings"
    }
  ]
}



const script3 = document.createElement('script');
script3.type = 'application/ld+json';
const text3 = JSON.stringify(breadcrumbListSchema)
// console.log("websiteSchema:" ,text3)
script3.text = text3
document.head.appendChild(script3);
