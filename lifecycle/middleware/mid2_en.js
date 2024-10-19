const ejs = require('ejs');

async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(!is_english) return next()

  console.log("English mode is on.\n\n")




  const business_data_en = await db.business_data_en.findOne({
    // attributes: ['slug', 'title'],
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
    // attributes: ['slug', 'title'],
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
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!footer_en) {
    const error = new Error("No footer_en found!")
    return next(error)
  }


  // console.log('footer_en ->\n', footer_en, '\n\n')
  // return next()


  const demande_de_devis_gratuit_en = await db.demande_de_devis_gratuit_en.findOne({
    // attributes: ['slug', 'title'],
    raw: true
  });

  if (!demande_de_devis_gratuit_en) {
    const error = new Error("No demande_de_devis_gratuit_en found!")
    return next(error)
  }



  // console.log('demande_de_devis_gratuit_en ->\n', demande_de_devis_gratuit_en, '\n\n')
  // return next()






  // console.log(nav_en, welcome_section_en, business_data_en, all_data_per_page_en)
  console.log(demande_de_devis_gratuit_en)




  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(all_data_per_page_en.title_meta_canonical, { title: all_data_per_page_en.title, description: all_data_per_page_en.description, req_path: res.locals.req_path});

  all_data_per_page_en.rendered_title_meta_canonical = rendered_title_meta_canonical
  




  res.locals.index_page_data = {
    business_data: business_data_en,
    nav: nav_en,
    welcome_section: welcome_section_en,
    all_data_per_page: all_data_per_page_en,
    footer: footer_en,
    demande_de_devis_gratuit: demande_de_devis_gratuit_en
  }




  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware