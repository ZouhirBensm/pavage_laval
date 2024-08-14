async function mid1_en(req, res, next) {
  
  console.log(is_english, '\n\n')

  if(!is_english) return next()

  console.log("English mode is on")




  const now = new Date();
  console.log(now);



  const blog_elements_en = await db.blog_element_en.findAll({
    include: [
      {
        model: db.category_en,
        as: 'category',
        attributes: ['category_name', 'slug']
      }],
    attributes: ['slug', 'title'],
    nest: true,
    raw: true,
  });



  if (!blog_elements_en) {
    const error = new Error("No blog elements found!")
    return next(error)
  }




  // console.log(blog_elements_en)


  // return next()




  // HERE
  // all tables here exist in en version and are populated in french


  const extra_service_pages_fr = await db.extra_service_page_fr.findAll({
    attributes: ['slug', 'title'],
    raw: true
  });

  if (!extra_service_pages_fr) {
    const error = new Error("No service pages found!")
    return next(error)
  }




  // console.log(blog_elements_en)


  // return next()




  const business_data_fr = await db.business_data_fr.findOne({
    raw: true
  });

  if (!business_data_fr) {
    const error = new Error("No business data found!")
    return next(error)
  }



  // console.log(blog_elements_en)


  // return next()





  const main_service_data_fr = await db.main_service_data_fr.findAll({
    raw: true
  });

  if (!main_service_data_fr) {
    const error = new Error("No service data found!")
    return next(error)
  }




  // console.log(blog_elements_en)


  // return next()



  const review_data_fr = await db.review_data_fr.findAll({
    raw: true
  });

  if (!review_data_fr) {
    const error = new Error("No review data found!")
    return next(error)
  }


  // console.log(blog_elements_en)


  // return next()




  const all_data_per_page_fr = await db.all_data_per_page_fr.findOne({
    where: {
      page_url_identify: res.locals.req_path,
    },
    raw: true
  });

  if (!all_data_per_page_fr) {
    const error = new Error("No all_data_per_page_fr found!")
    return next(error)
  }


  // console.log(blog_elements_en)


  // return next()





  const nav_fr = await db.nav_fr.findOne({
    raw: true
  });

  if (!nav_fr) {
    const error = new Error("No nav_fr found!")
    return next(error)
  }


  // console.log(blog_elements_en)


  // return next()



  const welcome_section_fr = await db.welcome_section_fr.findOne({
    raw: true
  });

  if (!welcome_section_fr) {
    const error = new Error("No welcome_section_fr found!")
    return next(error)
  }



  // console.log(blog_elements_en)


  // return next()



  const portfolio_section_fr = await db.portfolio_section_fr.findOne({
    raw: true
  });

  if (!portfolio_section_fr) {
    const error = new Error("No portfolio_section_fr found!")
    return next(error)
  }





  // console.log(blog_elements_en)


  // return next()





  const index_content_fr = await db.index_content_fr.findAll({
    raw: true
  });

  if (!index_content_fr) {
    const error = new Error("No index_content_fr found!")
    return next(error)
  }



  // console.log(blog_elements_en)


  // return next()



  const faq_fr = await db.faq_fr.findAll({
    raw: true
  });

  if (!faq_fr) {
    const error = new Error("No faq_fr found!")
    return next(error)
  }


  // console.log(blog_elements_en)


  // return next()




  const footer_fr = await db.footer_fr.findOne({
    raw: true
  });

  if (!footer_fr) {
    const error = new Error("No footer_fr found!")
    return next(error)
  }



  // console.log(blog_elements_en)


  // return next()










  // console.log(extra_service_pages_fr)
  // console.log(index_content_fr)
  // console.log(blog_elements_fr)
  // console.log(business_data_fr)
  // console.log(main_service_data_fr)
  // console.log(review_data_fr)
  // console.log(faq_fr)
  // console.log(footer_fr)
  




  res.locals.index_page_data = {
    blog_elements_fr: blog_elements_fr,
    extra_service_pages_fr: extra_service_pages_fr,
    business_data_fr: business_data_fr,
    main_service_data_fr: main_service_data_fr,
    review_data_fr: review_data_fr,
    all_data_per_page_fr: all_data_per_page_fr,
    nav_fr: nav_fr,
    welcome_section_fr: welcome_section_fr,
    portfolio_section_fr: portfolio_section_fr,
    index_content_fr: index_content_fr,
    faq_fr: faq_fr,
    footer_fr: footer_fr
  }




  return next()
}




const middleware = {
  mid1_en: mid1_en
}



module.exports = middleware