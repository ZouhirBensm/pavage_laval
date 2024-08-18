
async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(is_english) return next()

  console.log("French mode is on mid7")







  // return res.end()

  // Fetch the slugs from the blog_element_fr table with the same category_id
  const blog_elements_fr = await db.blog_element_fr.findAll({
    // where: {
    //   category_id: db_category_fr.id,
    // },
    include: [
      {
        model: db.category_fr,
        as: 'category',
        attributes: ['category_name', 'slug']
      }],
    attributes: ['slug', 'title'],
    nest: true,
    raw: true,
  });


  if (!blog_elements_fr) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  const extra_service_pages_fr = await db.extra_service_page_fr.findAll({
    attributes: ['slug', 'title'],
    raw: true
  });




  // Group blogs by category
  const categories_and_associated_blogs = blog_elements_fr.reduce((acc, blog) => {
    const categoryName = blog.category.category_name;
    const categorySlug = blog.category.slug;

    if (!acc[categoryName]) {
      acc[categoryName] = {
        categorySlug: categorySlug,
        blogs: []
      };
    }

    acc[categoryName].blogs.push(blog);
    return acc;
  }, {});


  // console.log("\n\ncategories_and_associated_blogs:\n", categories_and_associated_blogs)



  if (!extra_service_pages_fr) {
    const error = new Error("No service pages found!")
    return next(error)
  }





  const plan_du_site_page_fr = await db.plan_du_site_page_fr.findOne({
    raw: true,
  });


  if (!plan_du_site_page_fr) {
    const error = new Error("No plan_du_site_page_fr found!")
    return next(error)
  }





  const main_service_data_fr = await db.main_service_data_fr.findAll({
    attributes: ['service_name', 'slug'],
    raw: true,
  });


  if (!main_service_data_fr) {
    const error = new Error("No main_service_data_fr found!")
    return next(error)
  }





  let all_pages_fr = await db.all_data_per_page_fr.findAll({
    raw: true,
  });




  if (!all_pages_fr) {
    const error = new Error("No main_service_data_fr found!")
    return next(error)
  }



  // console.log(all_data_per_page_fr)

  const idsToRemove = [5, 6, 7];

  // Separate the objects with the specific IDs
  // const removedItems = all_data_per_page_fr.filter(item => idsToRemove.includes(item.id));

  // Remove the objects from the original array
  all_pages_fr = all_pages_fr.filter(item => !idsToRemove.includes(item.id));

  // console.log("Removed Items: ", removedItems);
  // console.log("\n\n all_pages_fr: \n\n", all_pages_fr);







  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    extra_service_pages: extra_service_pages_fr,
    categories_and_associated_blogs: categories_and_associated_blogs,
    plan_du_site_page: plan_du_site_page_fr,
    main_service_data: main_service_data_fr,
    all_pages: all_pages_fr
  }





  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware