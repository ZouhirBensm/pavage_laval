

function stripHTML(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog_element.title,
  "about": blog_element.category.category_name,
  "articleBody": stripHTML(blog_element.html_content),
  "datePublished": blog_element.datetime_published,
  "dateModified": blog_element.datetime_edited,
  "inLanguage": is_english ? 'en' : 'fr',
  "author": {
    "@type": "Organization",
    "url": `${business_data.website_main_url}/organisation`
  },
  "publisher": {
    "@type": "Organization",
    "name": `${business_data.business_name}`,
    "logo": {
      "@type": "ImageObject",
      "url": `${business_data.website_main_url}/img/logo_head2.png`
    }
  }
};






const scriptElement = document.createElement('script');
scriptElement.type = 'application/ld+json';

// console.log("\n\nblogPostingSchema -> ", blogPostingSchema)


scriptElement.text = JSON.stringify(blogPostingSchema);
document.head.appendChild(scriptElement);