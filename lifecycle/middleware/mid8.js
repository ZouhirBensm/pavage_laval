async function mid1(req, res, next) {

  res.locals.index_page_data.all_data_per_page = {
    title: res.locals.blog_element.title,
    under_h1: res.locals.blog_element.under_h1,
    eq_lang_page: is_english ? '/blog' : '/blog/en',
  }

  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware