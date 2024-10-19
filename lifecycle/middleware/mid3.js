const ejs = require('ejs');

async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(is_english) return next()

  console.log("French mode is on mid3")


  const business_data_fr = await db.business_data_fr.findOne({
    raw: true
  });

  if (!business_data_fr) {
    const error = new Error("No business data found!")
    return next(error)
  }



  const nav_fr = await db.nav_fr.findOne({
    raw: true
  });

  if (!nav_fr) {
    const error = new Error("No nav_fr found!")
    return next(error)
  }




  const welcome_section_fr = await db.welcome_section_fr.findOne({
    raw: true
  });

  if (!welcome_section_fr) {
    const error = new Error("No welcome_section_fr found!")
    return next(error)
  }







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


  const footer_fr = await db.footer_fr.findOne({
    raw: true
  });

  if (!footer_fr) {
    const error = new Error("No footer_fr found!")
    return next(error)
  }



  const organization_page_data_fr = await db.organization_page_data_fr.findOne({
    raw: true
  });

  const about_page_fr = await db.about_page_fr.findOne({
    raw: true
  });













  // console.log(nav_fr, welcome_section_fr, business_data_fr, all_data_per_page_fr)
  // console.log(demande_de_devis_gratuit_fr)
  // console.log(welcome_section_fr)

  console.log('\n\nall_data_per_page_fr.title_meta_canonical ->\n\n', all_data_per_page_fr.title_meta_canonical)


  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(all_data_per_page_fr.title_meta_canonical, { title: all_data_per_page_fr.title, description: all_data_per_page_fr.description, req_path: res.locals.req_path});

  all_data_per_page_fr.rendered_title_meta_canonical = rendered_title_meta_canonical


  console.log('\n\nrendered_title_meta_canonical ->\n\n', all_data_per_page_fr.rendered_title_meta_canonical)

  res.locals.index_page_data = {
    all_data_per_page: all_data_per_page_fr,
    business_data: business_data_fr,
    nav: nav_fr,
    welcome_section: welcome_section_fr,
    footer: footer_fr,
    ...(organization_page_data_fr ? { organization_page_data: organization_page_data_fr } : {}),
    ...(about_page_fr ? { about_page: about_page_fr } : {})
  };




  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware