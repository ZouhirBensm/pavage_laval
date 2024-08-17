const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(!is_english) return next()

  console.log("English mode is on.\n\n")






  const category_en = await db.category_en.findAll({
    raw: true
  });

  if (!category_en) {
    const error = new Error("No category_fr found!")
    return next(error)
  }






  const blog_page_en = await db.blog_page_en.findOne({
    raw: true
  });

  if (!blog_page_en) {
    const error = new Error("No blog_page_en found!")
    return next(error)
  }
  
  




  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    category: category_en,
    blog_page: blog_page_en
  }




  console.log('\n\n(**) ->\n\n', res.locals.index_page_data)




  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware