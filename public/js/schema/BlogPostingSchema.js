// console.log('(1) => ', business_data_fr)





function stripHTML(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blogData.title,
  "about": blogData.category.category_name,
  "articleBody": stripHTML(blogData.html_content),
  "datePublished": blogData.datetime_published,
  "dateModified": blogData.datetime_edited,
  "author": {
    "@type": "Organization",
    "url": `${business_data_fr.website_main_url}/organisation`
  },
  "publisher": {
    "@type": "Organization",
    "name": `${business_data_fr.business_name}`,
    "logo": {
      "@type": "ImageObject",
      "url": `${business_data_fr.website_main_url}/img/logo_head2.png`
    }
  }
};






const scriptElement = document.createElement('script');
scriptElement.type = 'application/ld+json';

// console.log("\n\nblogPostingSchema -> ", blogPostingSchema)


scriptElement.text = JSON.stringify(blogPostingSchema);
document.head.appendChild(scriptElement);