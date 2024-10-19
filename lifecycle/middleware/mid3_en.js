const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(!is_english) return next()

  console.log("English mode is on.\n\n")


  const business_data_en = await db.business_data_en.findOne({
    raw: true
  });

  if (!business_data_en) {
    const error = new Error("No business data found!")
    return next(error)
  }



  // console.log('business_data_en ->\n', business_data_en, '\n\n')
  // return next()



  const nav_en = await db.nav_en.findOne({
    raw: true
  });

  if (!nav_en) {
    const error = new Error("No nav_en found!")
    return next(error)
  }



  // console.log('nav_en ->\n', nav_en, '\n\n')
  // return next()


  const welcome_section_en = await db.welcome_section_en.findOne({
    raw: true
  });

  if (!welcome_section_en) {
    const error = new Error("No welcome_section_en found!")
    return next(error)
  }


  // console.log('welcome_section_en ->\n', welcome_section_en, '\n\n')
  // return next()




  const all_data_per_page_en = await db.all_data_per_page_en.findOne({
    where: {
      page_url_identify: res.locals.req_path,
    },
    raw: true
  });

  if (!all_data_per_page_en) {
    const error = new Error("No all_data_per_page_en found!")
    return next(error)
  }


  // console.log('all_data_per_page_en ->\n', all_data_per_page_en, '\n\n')
  // return next()





  const footer_en = await db.footer_en.findOne({
    raw: true
  });

  if (!footer_en) {
    const error = new Error("No footer_en found!")
    return next(error)
  }


  // console.log('footer_en ->\n', footer_en, '\n\n')
  // return next()


  const organization_page_data_en = await db.organization_page_data_en.findOne({
    raw: true
  });


  const about_page_en = await db.about_page_en.findOne({
    raw: true
  });








  // console.log(nav_en, welcome_section_en, business_data_en, all_data_per_page_en)
  // console.log(demande_de_devis_gratuit_en)
  // console.log(welcome_section_en)



  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(all_data_per_page_en.title_meta_canonical, { title: all_data_per_page_en.title, description: all_data_per_page_en.description, req_path: res.locals.req_path});

  all_data_per_page_en.rendered_title_meta_canonical = rendered_title_meta_canonical

  // console.log('rendered_title_meta_canonical ->\n\n', all_data_per_page_en.rendered_title_meta_canonical)


  let rendered_front_end_script_needed_to_serve_variables

  rendered_front_end_script_needed_to_serve_variables = ejs.render(all_data_per_page_en.front_end_script_needed_to_serve_variables, { business_data: business_data_en, all_data_per_page: all_data_per_page_en });

  all_data_per_page_en.rendered_front_end_script_needed_to_serve_variables = rendered_front_end_script_needed_to_serve_variables


  

  res.locals.index_page_data = {
    all_data_per_page: all_data_per_page_en,
    business_data: business_data_en,
    nav: nav_en,
    welcome_section: welcome_section_en,
    footer: footer_en,
    ...(organization_page_data_en ? { organization_page_data: organization_page_data_en } : {}),
    ...(about_page_en ? { about_page: about_page_en } : {})
  }



  console.log(res.locals.index_page_data)


  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware