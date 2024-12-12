const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(is_english) return next()

  console.log("French mode is on mid 5")





  const now = new Date()
  // console.log('datetime = ', now)


  // const { page_de_services_supplementaires_seo } = req.params;
  // console.log('page_de_services_supplementaires_seo: ', page_de_services_supplementaires_seo);


  let db_extra_service_page_fr

  try {
    db_extra_service_page_fr = await db.extra_service_page_fr.findOne({
      where: {
        slug: req.params.page_de_services_supplementaires_seo,
      },
      raw: true,
    });
  } catch (error) {
    return next(error);
  }


  // console.log('\n\n(1)\n\n', db_extra_service_page_fr)


  if (!db_extra_service_page_fr) {
    const error = new Error("No extra service page found!")
    return next(error)
  }


  let eq_lang_page =  '/service/' + db_extra_service_page_fr.eq_lang_page


  // const css_link = '<link rel="stylesheet" href="/css/page-de-services-supplementaires-seo.css" />'
  
  // TODO need to pull this data from database ideally #001
  // css edits for page_de_services_supplementaires_seo.ejs page
  const css_link = 
    '<link rel="stylesheet" href="/css2/mention-legale.css" />' + 
    '<link rel="stylesheet" href="/css2/layout.css" />';

  // brochure text add ons (brochure_text1 and brochure_text2) for page_de_services_supplementaires_seo.ejs page
  const brochure_text1 = '<p>We offer paving services in Laval, Quebec, specializing in asphalt for residential and commercial projects.</p>'
  const brochure_text2 = "<header><h2>Pavaging Laval Asphalt Laval Earnanswers</h2></header><p>If you're looking for quality paving near you, our team of Laval paving experts guarantees long-lasting results. We also serve the Montreal region and surrounding areas. Contact us for a quick quote on your asphalt needs in Laval and nearby locations.</p>"


  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(db_extra_service_page_fr.title_meta_canonical, { title: db_extra_service_page_fr.title, description: db_extra_service_page_fr.description, req_path: res.locals.req_path});

  const all_data_per_page = {rendered_title_meta_canonical: rendered_title_meta_canonical}

  // db_extra_service_page_fr.rendered_title_meta_canonical = rendered_title_meta_canonical



  res.locals.index_page_data.all_data_per_page = {
    title: db_extra_service_page_fr.title,
    under_h1: db_extra_service_page_fr.under_h1,
    eq_lang_page: eq_lang_page,
    css_link: css_link,
    brochure_text1: brochure_text1,
    brochure_text2: brochure_text2,
    ...all_data_per_page
  }


  
  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    extra_service_page: db_extra_service_page_fr
  }


  // console.log('\n\n(**) ->\n\n', res.locals.index_page_data)



  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware