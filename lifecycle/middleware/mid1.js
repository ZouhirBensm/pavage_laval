const ejs = require('ejs');
// const franc = require('franc-min');
// const franc = require('franc');


const { translateReviews } = require('../../miscellaneous/services/translator')

async function mid1(req, res, next) {


  // console.log(is_english, '\n\n')

  if(is_english) return next()

  // console.log("French mode is on mid1")


  const now = new Date();
  // console.log('\n\n', now);

  
  // const req_path = req.path
  // const req_url = req.url

  // console.log(req_path, req_url)

  // Fetch the slugs from the blog_element_fr table with the same category_id
  const blog_elements_fr = await db.blog_element_fr.findAll({
    // where: {
    //   category_id: db_category.id,
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

  if (!extra_service_pages_fr) {
    const error = new Error("No service pages found!")
    return next(error)
  }



  const business_data_fr = await db.business_data_fr.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!business_data_fr) {
    const error = new Error("No business data found!")
    return next(error)
  }





  const main_service_data_fr = await db.main_service_data_fr.findAll({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!main_service_data_fr) {
    const error = new Error("No service data found!")
    return next(error)
  }


  // console.log(main_service_data_fr)



  let review_data_fr = res.locals.reviews


  const all_data_per_page_fr = await db.all_data_per_page_fr.findOne({
    where: {
      page_url_identify: res.locals.req_path,
    },
    raw: true
    // attributes: ['slug', 'title'],
  });




  if (!all_data_per_page_fr) {
    const error = new Error("No all_data_per_page_fr found!")
    return next(error)
  }

  const contact_form_data_fr = await db.demande_de_devis_gratuit_fr.findOne({
    raw: true
    // attributes: ['slug', 'title'],
  });


  if (!contact_form_data_fr) {
    const error = new Error("No all_data_per_page_fr found!")
    return next(error)
  }



  const nav_fr = await db.nav_fr.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!nav_fr) {
    const error = new Error("No nav_fr found!")
    return next(error)
  }


  const welcome_section_fr = await db.welcome_section_fr.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!welcome_section_fr) {
    const error = new Error("No welcome_section_fr found!")
    return next(error)
  }



  const portfolio_section_fr = await db.portfolio_section_fr.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!portfolio_section_fr) {
    const error = new Error("No portfolio_section_fr found!")
    return next(error)
  }


  const index_content_fr = await db.index_content_fr.findAll({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!index_content_fr) {
    const error = new Error("No index_content_fr found!")
    return next(error)
  }




  const areas_section_fr = await db.areas_section_fr.findAll({
    raw: true
  });

  if (!areas_section_fr) {
    const error = new Error("No areas_section_fr found!")
    return next(error)
  }


  const hidden_section_fr = await db.hidden_section_fr.findAll({
    raw: true
  });

  if (!hidden_section_fr) {
    const error = new Error("No hidden_section_fr found!")
    return next(error)
  }



  const faq_content_fr = await db.faq_content_fr.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!faq_content_fr) {
    const error = new Error("No footer_fr found!")
    return next(error)
  }





  const faq_fr = await db.faq_fr.findAll({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!faq_fr) {
    const error = new Error("No faq_fr found!")
    return next(error)
  }


  const footer_fr = await db.footer_fr.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!footer_fr) {
    const error = new Error("No footer_fr found!")
    return next(error)
  }




  

  // console.log(extra_service_pages_fr)
  // console.log(index_content_fr)
  // console.log(blog_elements_fr)
  // console.log(business_data_fr)
  // console.log(main_service_data_fr)
  // console.log(review_data_fr)
  // console.log(faq_fr)
  // console.log(footer_fr)
  



  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(all_data_per_page_fr.title_meta_canonical, { title: all_data_per_page_fr.title, description: all_data_per_page_fr.description, req_path: res.locals.req_path});

  all_data_per_page_fr.rendered_title_meta_canonical = rendered_title_meta_canonical



  let rendered_front_end_script_needed_to_serve_variables

  rendered_front_end_script_needed_to_serve_variables = ejs.render(all_data_per_page_fr.front_end_script_needed_to_serve_variables, { business_data: business_data_fr, review_data: review_data_fr, main_service_data: main_service_data_fr, blog_elements: blog_elements_fr, extra_service_pages: extra_service_pages_fr });

  all_data_per_page_fr.rendered_front_end_script_needed_to_serve_variables = rendered_front_end_script_needed_to_serve_variables




  // console.log('rendered_title_meta_canonical ->', all_data_per_page_fr.rendered_title_meta_canonical)

  res.locals.index_page_data = {
    blog_elements: blog_elements_fr,
    extra_service_pages: extra_service_pages_fr,
    business_data: business_data_fr,
    main_service_data: main_service_data_fr,
    review_data: review_data_fr,
    all_data_per_page: all_data_per_page_fr,
    nav: nav_fr,
    welcome_section: welcome_section_fr,
    portfolio_section: portfolio_section_fr,
    index_content: index_content_fr,
    faq: faq_fr,
    footer: footer_fr,
    contact_form_data: contact_form_data_fr,
    areas_section: areas_section_fr,
    hidden_section: hidden_section_fr,
    faq_content: faq_content_fr
  }




  // console.log(res.locals.index_page_data)

  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware