// console.log(review_data);


const priceCurrency = "CAD"



// Get the count of reviews
const reviewCount = review_data.length;

// Calculate the average rating value
const totalRatingValue = review_data.reduce((sum, review) => sum + review.rating_value, 0);
const averageRatingValue = (totalRatingValue / reviewCount).toFixed(1);

// console.log('Review Count:', reviewCount, typeof reviewCount);
// console.log('Average Rating Value:', averageRatingValue, typeof averageRatingValue);




const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": `${business_data.service_type}`,
  "provider": {
    "@type": "LocalBusiness",
    "name": `${business_data.business_name}`,
    "description": `${business_data.business_description}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${business_data.street_address}`,
      "addressLocality": `${business_data.address_city}`,
      "addressRegion": `${business_data.address_province_state}`,
      "postalCode": `${business_data.postal_code}`,
      "addressCountry": `${business_data.address_country}`
    },
    "telephone": `${business_data.telephone}`,
    "email": `${business_data.email}`,

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],

    "geo": {
      "@type": "GeoCoordinates",
      "latitude": `${business_data.latitude}`,
      "longitude": `${business_data.longitude}`,
    },

    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Catalog",
      "itemListElement": main_service_data_fr.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "serviceType": service.service_type,
          "name": service.service_name,
          "description": service.service_description,
          "image": service.service_image_url,
          "url": service.service_page_url,
          "provider": {
            "@type": "LocalBusiness",
            "name": `${business_data.business_name}`
          }
        },
        "priceCurrency": `${priceCurrency}`,
        // "price": "50.00" // Assuming price is not provided in the data
      }))
    },

    "review": review_data.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating_value,
        "bestRating": 5
      },
      "reviewBody": review.review_body
    })),


    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": `${averageRatingValue}`,
      "reviewCount": `${reviewCount}`,
    }



  }
}




const script2 = document.createElement('script');
script2.type = 'application/ld+json';
// console.log("localbusinessSchema:", serviceSchema)


const text2 = JSON.stringify(serviceSchema)
// console.log("localbusinessSchema:", text2)
script2.text = text2
document.head.appendChild(script2);


