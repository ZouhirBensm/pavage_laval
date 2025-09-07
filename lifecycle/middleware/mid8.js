const ejs = require('ejs');

async function mid1(req, res, next) {

  // const css_link = '<link rel="stylesheet" href="/css/blog-posting.css" />'

  let blog_posting_content = is_english ? db.blog_posting_content_en : db.blog_posting_content_fr

  blog_posting_content = await blog_posting_content.findOne({
    raw: true
  });

  if (!blog_posting_content) {
    const error = new Error("No blog_posting_content found!")
    return next(error)
  }


  // pavage-asphalte-laval-montreal@outlook.com
  let brochure_text1 = is_english ? "<p>We offer paving services in Laval, Quebec, specializing in asphalt for residential and commercial projects. <a href='mailto:pavage-asphalte-laval-montreal@outlook.com?cc=info@asphaltesolution.comm&subject=Pavage Asphalte Laval Montreal: Quote Request'>info@asphaltesolution.com</a></p>" : "<p>Nous offrons des services de pavage à Laval, Québec, spécialisés dans l'asphalte pour des projets résidentiels et commerciaux. <a href='mailto:pavage-asphalte-laval-montreal@outlook.com?cc=info@asphaltesolution.comm&subject=Pavage Asphalte Laval Montreal: Quote Request'>info@asphaltesolution.com</a></p>"
  
  let brochure_text2 = is_english ? "<header><h2>Pavaging Laval Asphalt Laval Earnanswers</h2></header><p>If you're looking for quality paving near you, our team of Laval paving experts guarantees long-lasting results. We also serve the Montreal region and surrounding areas. Contact us for a quick quote on your asphalt needs in Laval and nearby locations.</p>" : "<header><h2>Pavage Laval Asphalte Laval Earnanswers</h2></header><p>Si vous recherchez un pavage de qualité près de chez vous, notre équipe d'experts en pavage Laval vous garantit des résultats durables. Nous servons également la région de Montréal et ses environs. Contactez-nous pour un devis rapide sur vos besoins en asphalte à Laval et dans les environs.</p>",

  all_data_per_page = {
    title: res.locals.blog_element.title,
    under_h1: res.locals.blog_element.under_h1,
    eq_lang_page: blog_posting_content.eq_lang_page, // is_english ? '/blog' : '/blog/en',
    css_link: blog_posting_content.css_link,
    schema_script: blog_posting_content.schema_script,
    brochure_text1: brochure_text1,
    brochure_text2: brochure_text2
  }





  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(res.locals.blog_element.title_meta_canonical, { title: res.locals.blog_element.title, description: res.locals.blog_element.meta_description, req_path: res.locals.req_path});

  all_data_per_page.rendered_title_meta_canonical = rendered_title_meta_canonical








  let rendered_front_end_script_needed_to_serve_variables

  // const { front_end_script_needed_to_serve_variables, ...blog_element_passed_to_front_end } = 
  // res.locals.blog_element;
  
  const { front_end_script_needed_to_serve_variables: _, ...blog_element_passed_to_front_end } = 
  res.locals.blog_element;

  rendered_front_end_script_needed_to_serve_variables = ejs.render(res.locals.blog_element.front_end_script_needed_to_serve_variables, { business_data: res.locals.index_page_data.business_data, blog_element : blog_element_passed_to_front_end });

  all_data_per_page.rendered_front_end_script_needed_to_serve_variables = rendered_front_end_script_needed_to_serve_variables









  res.locals.index_page_data.all_data_per_page = all_data_per_page

  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware