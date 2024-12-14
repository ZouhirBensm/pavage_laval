const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(is_english) return next()

  console.log("French mode is on mid7")







  const category_fr = await db.category_fr.findOne({
    where: {
      slug: req.params.category,
    },
    raw: true,
  });

  if (!category_fr) {
    return res.status(404).send('Category not found');
  }


  const blog_elements_fr = await db.blog_element_fr.findAll({
    where: {
      category_id: category_fr.id,
    },
    attributes: ['slug', 'title'],
    raw: true,
  });

  if (!blog_elements_fr) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  const category_page_fr = await db.category_page_fr.findOne({
    raw: true,
  });

  if (!category_page_fr) {
    const error = new Error("No category_page_fr found!")
    return next(error)
  }

  let all_data_per_page = {
    title: category_fr.category_name,
    under_h1: category_page_fr.under_h1,
    eq_lang_page: category_page_fr.eq_lang_page,
    css_link: category_page_fr.css_link
  }

  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(category_fr.title_meta_canonical, { category_name: category_fr.category_name, category_description: category_fr.category_description, req_path: res.locals.req_path});

  all_data_per_page.rendered_title_meta_canonical = rendered_title_meta_canonical




  res.locals.index_page_data.all_data_per_page = all_data_per_page


  



  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    category: category_fr,
    blog_elements: blog_elements_fr
  }



  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware