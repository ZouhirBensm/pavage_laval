const ejs = require('ejs');


async function mid1(req, res, next) {


  console.log(is_english, '\n\n')

  if(!is_english) return next()

  console.log("English mode is on.\n\n")




  const now = new Date()
  // console.log('datetime = ', now)


  // const { page_de_services_supplementaires_seo } = req.params;
  // console.log('page_de_services_supplementaires_seo: ', page_de_services_supplementaires_seo);


  let db_extra_service_page_en

  try {
    db_extra_service_page_en = await db.extra_service_page_en.findOne({
      where: {
        slug: `${req.params.page_de_services_supplementaires_seo}/en`,
      },
      raw: true,
    });
  } catch (error) {
    return next(error);
  }


  // console.log('\n\n(1)\n\n', db_extra_service_page_fr)


  if (!db_extra_service_page_en) {
    const error = new Error("No extra_service_page_en found!")
    return next(error)
  }


  let eq_lang_page =  '/service/' + db_extra_service_page_en.eq_lang_page

  const extra_service_content = await db.extra_service_content_en.findOne({
    raw: true
  });

  if (!extra_service_content) {
    const error = new Error("No extra_service_content found!")
    return next(error)
  }


  let rendered_title_meta_canonical = undefined

  rendered_title_meta_canonical = ejs.render(db_extra_service_page_en.title_meta_canonical, { title: db_extra_service_page_en.title, description: db_extra_service_page_en.description, req_path: res.locals.req_path});


  const all_data_per_page = {rendered_title_meta_canonical: rendered_title_meta_canonical}

  // db_extra_service_page_en.rendered_title_meta_canonical = rendered_title_meta_canonical



  res.locals.index_page_data.all_data_per_page = {
    title: db_extra_service_page_en.title,
    under_h1: db_extra_service_page_en.under_h1,
    eq_lang_page: eq_lang_page,
    css_link: extra_service_content.css_link,
    brochure_text1: extra_service_content.brochure_text1,
    brochure_text2: extra_service_content.brochure_text2,
    ...all_data_per_page
  }


  
  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    extra_service_page: db_extra_service_page_en
  }


  // console.log('\n\n(**) ->\n\n', res.locals.index_page_data)




  return next()



}




const middleware = {
  mid1: mid1
}



module.exports = middleware