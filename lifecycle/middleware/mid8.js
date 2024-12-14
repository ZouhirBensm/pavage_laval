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




  all_data_per_page = {
    title: res.locals.blog_element.title,
    under_h1: res.locals.blog_element.under_h1,
    eq_lang_page: blog_posting_content.eq_lang_page, // is_english ? '/blog' : '/blog/en',
    css_link: blog_posting_content.css_link,
    schema_script: blog_posting_content.schema_script
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