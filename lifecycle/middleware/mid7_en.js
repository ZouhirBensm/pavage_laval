const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(!is_english) return next()

  console.log("English mode is on. 2\n\n")




  console.log('req.params.category -> ', req.params.category)

  const category_en = await db.category_en.findOne({
    where: {
      slug: `${req.params.category}/en`,
    },
    raw: true,
  });

  if (!category_en) {
    return res.status(404).send('Category not found');
  }


  const blog_elements_en = await db.blog_element_en.findAll({
    where: {
      category_id: category_en.id,
    },
    attributes: ['slug', 'title'],
    raw: true,
  });

  if (!blog_elements_en) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  const category_page_en = await db.category_page_en.findOne({
    raw: true,
  });

  if (!category_page_en) {
    const error = new Error("No category_page_en found!")
    return next(error)
  }




  let all_data_per_page = {
    title: category_en.category_name,
    under_h1: category_page_en.under_h1,
    eq_lang_page: category_page_en.eq_lang_page
  }

  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(category_en.title_meta_canonical, { category_name: category_en.category_name, category_description: category_en.category_description, req_path: res.locals.req_path});

  all_data_per_page.rendered_title_meta_canonical = rendered_title_meta_canonical



  
  res.locals.index_page_data.all_data_per_page = all_data_per_page




  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    category: category_en,
    blog_elements: blog_elements_en
  }





  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware