const ejs = require('ejs');

async function mid1(req, res, next) {

  const css_link = '<link rel="stylesheet" href="/css/blog-posting.css" />'
  const schema_script = '<script src="/js/schema/BlogPostingSchema.js"></script>'






  all_data_per_page = {
    title: res.locals.blog_element.title,
    under_h1: res.locals.blog_element.under_h1,
    eq_lang_page: is_english ? '/blog' : '/blog/en',
    css_link: css_link,
    schema_script: schema_script
  }

  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(res.locals.blog_element.title_meta_canonical, { title: res.locals.blog_element.title, description: res.locals.blog_element.meta_description, req_path: res.locals.req_path});

  all_data_per_page.rendered_title_meta_canonical = rendered_title_meta_canonical


  res.locals.index_page_data.all_data_per_page = all_data_per_page

  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware