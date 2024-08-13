async function mid1(req, res, next) {



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





  // const demande_de_devis_gratuit_fr = await db.demande_de_devis_gratuit_fr.findOne({
  //   raw: true
  // });

  // if (!demande_de_devis_gratuit_fr) {
  //   const error = new Error("No demande_de_devis_gratuit_fr found!")
  //   return next(error)
  // }





  // console.log(nav_fr, welcome_section_fr, business_data_fr, all_data_per_page_fr)
  // console.log(demande_de_devis_gratuit_fr)
  console.log(welcome_section_fr)




  res.locals.index_page_data = {
    all_data_per_page_fr: all_data_per_page_fr,
    business_data_fr: business_data_fr,
    nav_fr: nav_fr,
    welcome_section_fr: welcome_section_fr,
    footer_fr: footer_fr
  }




  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware