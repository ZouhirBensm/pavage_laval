const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(is_english) return next()

  console.log("French mode is on mid7")







  const category_fr = await db.category_fr.findAll({
    raw: true
  });

  if (!category_fr) {
    const error = new Error("No category_fr found!")
    return next(error)
  }



  const blog_page_fr = await db.blog_page_fr.findOne({
    raw: true
  });

  if (!blog_page_fr) {
    const error = new Error("No blog_page_fr found!")
    return next(error)
  }
  
  

  console.log({category_fr, blog_page_fr})


  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    category: category_fr,
    blog_page: blog_page_fr
  }


  console.log('\n\n(**) ->\n\n', res.locals.index_page_data)



  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware