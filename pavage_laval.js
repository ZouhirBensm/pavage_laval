// 1231231223
const express = require('express')
const path = require('path');
const ejs = require('ejs');

const fs = require('fs');

require('dotenv').config()

const { Sequelize } = require('sequelize');
const { initModels } = require(`./models/init-models`);

const createSiteMap = require('./miscellaneous/utils/custom-sitemap')

const Compression = require('./miscellaneous/services/compression/compression-middleware')


const logDataInColoredStructure = require('./miscellaneous/utils/log-data-structure')


const dialect = 'mysql'

const sequelize = new Sequelize(process.env['DB_NAME'], process.env['DB_USERNAME'], process.env['DB_USERPASSWORD'], {
  host: process.env['DB_HOST'],
  dialect: dialect,
  logging: false,
});


const PORT = process.env['PORT']

const { ENVIRONMENT, SIGNAL } = require('./miscellaneous/const/env')


const app = express()

app.use(Compression);
// app.use(express.static(path.join(__dirname, 'public')));



const middleware0 = require('./lifecycle/middleware/mid0')
const middleware1 = require('./lifecycle/middleware/mid1')
const middleware1_en = require('./lifecycle/middleware/mid1_en')
const middleware2 = require('./lifecycle/middleware/mid2')
const middleware2_en = require('./lifecycle/middleware/mid2_en')
const middleware3 = require('./lifecycle/middleware/mid3')
const middleware3_en = require('./lifecycle/middleware/mid3_en')
const middleware4 = require('./lifecycle/middleware/mid4')
const middleware4_en = require('./lifecycle/middleware/mid4_en')
const middleware5 = require('./lifecycle/middleware/mid5')
const middleware5_en = require('./lifecycle/middleware/mid5_en')
const middleware6 = require('./lifecycle/middleware/mid6')
const middleware6_en = require('./lifecycle/middleware/mid6_en')
const middleware7 = require('./lifecycle/middleware/mid7')
const middleware7_en = require('./lifecycle/middleware/mid7_en')
const middleware8 = require('./lifecycle/middleware/mid8')
const middleware9 = require('./lifecycle/middleware/mid9')
const middleware9_en = require('./lifecycle/middleware/mid9_en')
const middleware10 = require('./lifecycle/middleware/mid10')
const middleware11 = require('./lifecycle/middleware/mid11')




const middleware12 = require('./lifecycle/middleware/backlink-middleware/mid1')





// Original site uses default ejs page views on views folder. Comment this to use default website from views folder.
// If you want the new site ejs pages, use folder views2. Uncomment the code below to do so.
// app.set('views', path.join(__dirname, 'views2'));

app.set('view engine', 'ejs');
app.set('etag', 'strong');


app.use(express.static('public'));



app.use((req, res, next) => {
  console.log('\n\n\n__________________________________\n')
  console.log('new request!\n\n')
  console.log('(1)')
  global.is_english = req.path.endsWith('/en');


  res.locals.env = process.env.NODE_ENV;
  res.locals.production = ENVIRONMENT.PRODUCTION;


  const req_path = req.path
  const req_url = req.url

  console.log('\n\nreq_path, req_url:\n')
  console.log(req_path, req_url)
  console.log('\n\n')



  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;


  res.locals.req_path = req_path
  res.locals.fullUrl = fullUrl


  res.locals.domain = process.env['DOMAIN']
  res.locals.protocoled_domain = `https://${res.locals.domain}`


  return next()
});

// Middlewares


require('./miscellaneous/db/db')


// Controllers
const get_catch_controller = require('./lifecycle/controller/get-catch-controller/cont1')
const data_error_handler_controller = require('./lifecycle/controller/error-controller/cont1');
const sitemap_controller = require('./lifecycle/controller/sitemap-controller/cont1.js')









// Redirect mappings for old URLs to new URLs
const redirect_map = {
  '/service/services-asphalte-a-laval': '/service/asphalte-laval',
  '/service/scellement-de-fissures-asphalte': '/service/scellement-fissure-asphalte-laval',
  '/service/scellement-et-application-de-scellant-asphalte': '/service/scellement-fissure-asphalte-laval',
  '/service/reparation-de-fissures': '/service/scellement-fissure-asphalte-laval',
  '/service/reparation-et-reparation-des-fissures-asphalte': '/service/scellement-fissure-asphalte-laval',
  '/service/reparation-des-fissures-de-voie-entree-en-asphalte': '/service/scellement-fissure-asphalte-laval',
  '/service/scellement-et-entretien-de-voieentree-en-asphalte': '/service/scellant-asphalte-laval',
  '/service/pavage-asphalte-residentiel-et-commercial': '/service/pavage-commercial-laval',
  '/service/services-asphalte-commercial': '/service/pavage-commercial-laval',
  '/service/pavage-asphalte-commercial': '/service/pavage-commercial-laval',
  '/service/service-de-reparation-asphalte-a-laval': '/service/reparation-asphalte-montreal',
  '/service/reparation-de-nids-de-poule': '/service/reparation-asphalte-montreal',
  '/service/reparation-de-patchs-asphalte': '/service/reparation-asphalte-montreal',
  '/service/reparation-de-joints-expansion-en-asphalte': '/service/reparation-asphalte-montreal',
  '/service/reparation-asphalte-par-infrarouge': '/service/reparation-asphalte-montreal',
  '/service/reparation-asphalte-en-caoutchouc': '/service/reparation-asphalte-montreal',
  '/service/reparation-asphalte-en-patch-froid': '/service/reparation-asphalte-montreal',
  '/service/reparation-de-fissures': '/service/scellement-fissure-asphalte-laval',
  '/service/reparation-et-reparation-des-fissures-asphalte': '/service/scellement-fissure-asphalte-laval',
  '/service/reparation-des-fissures-de-voie-entree-en-asphalte': '/service/scellement-fissure-asphalte-laval',
  '/service/reparation-de-nids-de-poule': '/service/reparation-asphalte-montreal',
  '/service/reparation-de-patchs-asphalte': '/service/reparation-asphalte-montreal',
  '/service/reparation-de-joints-expansion-en-asphalte': '/service/reparation-asphalte-montreal',
  '/service/reparation-asphalte-par-infrarouge': '/service/reparation-asphalte-montreal',
  '/service/reparation-asphalte-en-caoutchouc': '/service/reparation-asphalte-montreal',
  '/service/reparation-asphalte-en-patch-froid': '/service/reparation-asphalte-montreal',
  '/service/service-de-reparation-asphalte-a-laval': '/service/reparation-asphalte-montreal',

  '/service/residential-asphalt-driveway-installation/en': '/servicedriveway-paving-montreal/en',
  '/service/paving-services-in-laval/en': '/service/paving-laval/en',
  '/service/asphalt-services-in-laval/en': '/service/asphalt-repair-montreal/en',

  '/service/construction-et-installation-asphalte': '/service/asphalte-laval',
  '/service/asphalt-construction-installation/en': '/service/asphalt-repair-montreal/en',
  '/service/installation-asphalte-a-chaud': '/service/asphalte-laval',
  '/service/hot-mix-asphalt-installation/en': '/service/asphalt-repair-montreal/en',
  '/service/pavage-residentiel': '/service/services-de-pavage-a-laval',
  '/service/residential-paving/en': '/service/paving-laval/en',
  '/service/construction-de-routes-en-asphalte': '/service/asphalte-laval',
  '/service/asphalt-road-construction/en': '/service/asphalt-repair-montreal/en',
  '/service/installation-de-voie-entree-en-asphalte': '/service/asphalte-laval',
  '/service/asphalt-driveway-installation/en': '/service/driveway-paving-montreal/en',
  '/service/services-entretien-asphalte': '/service/asphalte-laval',
  '/service/asphalt-maintenance-services/en': '/service/asphalt-repair-montreal/en',
  '/service/reasphaltage': '/service/asphalte-laval',
  '/service/asphalt-resurfacing/en': '/service/asphalt-repair-montreal/en',
  '/service/recouvrement-asphalte': '/service/asphalte-laval',
  '/service/asphalt-overlay/en': '/service/asphalt-repair-montreal/en',
  '/service/rajeunissement-de-asphalte': '/service/asphalte-laval',
  '/service/asphalt-rejuvenation/en': '/service/asphalt-repair-montreal/en',
  '/service/solutions-de-drainage-en-asphalte': '/service/asphalte-laval',
  '/service/asphalt-drainage-solutions/en': '/service/asphalt-repair-montreal/en',
  '/service/restauration-de-surfaces-en-asphalte': '/service/reparation-asphalte-montreal',
  '/service/asphalt-surface-restoration/en': '/service/asphalt-repair-montreal/en',
  '/service/reasphaltage-et-refection-asphalte': '/service/reparation-asphalte-montreal',
  '/service/asphalt-resurfacing-reconditioning/en': '/service/asphalt-repair-montreal/en',
  '/service/reasphaltage-des-parkings': '/service/reparation-asphalte-montreal',
  '/service/asphalt-parking-lot-resurfacing/en': '/service/asphalt-repair-montreal/en',
  '/service/pavage-industriel-asphalte': '/service/services-de-pavage-a-laval	',
  '/service/industrial-asphalt-paving/en': '/service/paving-laval/en',
  '/service/construction-et-entretien-de-routes-en-asphalte': '/service/reparation-asphalte-montreal',
  '/service/roadway-asphalt-construction-maintenance/en': '/service/asphalt-repair-montreal/en',
  '/service/installation-de-voie-entree-residentielle-en-asphalte': '/service/asphalte-laval',
  '/service/driveway-paving-montreal/en': '/service/driveway-paving-montreal/en',
  '/service/restauration-et-rajeunissement-de-voie-entree-en-asphalte': '/service/asphalte-laval',
  '/service/driveway-asphalt-restoration-rejuvenation/en': '/service/driveway-paving-montreal/en',
  '/service/installation-asphalte-recycle': '/service/asphalte-laval',
  '/service/recycled-asphalt-installation/en': '/service/asphalt-repair-montreal/en',
  '/service/solutions-asphalte-durables': '/service/asphalte-laval',
  '/service/sustainable-asphalt-solutions/en': '/service/asphalt-repair-montreal/en',
  '/service/personnalisation-de-voie-entree-en-asphalte': '/service/asphalte-laval',
  '/service/asphalt-driveway-customization/en': '/service/driveway-paving-montreal/en',
};









// Implement 301 redirects for the mapped URLs
Object.keys(redirect_map).forEach(old_url => {
  app.get(old_url, (req, res) => {
    res.status(301).redirect(redirect_map[old_url]);
  });
});



// For SEO Keep until google identifies that the pages are gone
const goneUrls = [
  '/service/services-de-pave-uni-a-laval',
  '/service/interlocking-paving-stones-pavers-services-in-laval/en',
  '/service/installateurs-de-paves',
  '/service/paver-installers/en',
  '/service/pavage-et-marquage-de-stationnement',
  '/service/parking-lot-paving-striping/en',
  '/service/fourniture-asphalte-et-de-melange-asphalte',
  '/service/asphalt-plant-mix-supply/en',
  '/service/peinture-et-marquage-de-lignes',
  '/service/line-painting-marking/en',
  '/service/marquage-et-peinture-des-parkings',
  '/service/parking-lot-striping-marking/en',
  '/service/marquage-de-parking',
  '/service/parking-lot-striping/en',
  '/service/profilage-et-fraisage-de-surface',
  '/service/surface-profiling-milling/en',
  '/service/pavage-asphalte-ecologique',
  '/service/eco-friendly-asphalt-paving/en',
  '/service/asphalte-decoratif-et-estampe',
  '/service/decorative-stamped-asphalt/en	',
];






goneUrls.forEach(url => {
  app.get(url, (req, res) => {
    res.status(410).send('This page has been permanently removed.');
  });
});


// TODO refactor branch,
// Explanation: middleware11.mid1 identifies if a main service page was requested, if so it sets req.matchedEndpoint and goes to the next middleware that matches the request (ie '*' in this case) through the next('route') command. That latter middleware will render the proper page else will go as normal for other requests

app.get('*', middleware11.mid1)



app.get('*', middleware4.mid1, middleware4_en.mid1, async (req, res, next) => {
  console.log('(2)')

  // console.log("\n\nHere: app.get('*', middleware4.mid1, middleware4_en.mid1, async (req, res, next) => {")
  // console.log("\n\napp.get('*', middleware4.mid1, middleware4_en.mid1, async (req, res, next) => { - req.matchedEndpoint", req.matchedEndpoint)

  if (req.matchedEndpoint) {

    // console.log("\n\napp.get('*', middleware4.mid1, middleware4_en.mid1, async (req, res, next) => { - HERE123")
    // Handle the special logic for matched slugs
    // e.g., fetch additional data for this path
    // res.json({ message: `Special handler for ${req.matchedEndpoint}` });

    return res.render(req.matchedEndpoint.page_to_render, { ...res.locals.index_page_data });
  } else {
    // Continue to the next middleware or route handler
    return next();
  }

  // return next();
});







app.get(['/', '/en'], middleware10.mid1, middleware1.mid1, middleware1_en.mid1_en, async (req, res) => {


  // return res.end()
  // let viewName = is_english ? 'index_en' : 'index';


  // return res.end()

  // console.log("\n\nDATA: res.locals.index_page_data ->\n\n", res.locals.index_page_data)



  logDataInColoredStructure(res.locals.index_page_data);

  // return res.end()
  return res.render('index', { ...res.locals.index_page_data });
  // return res.render(viewName, { ...res.locals.index_page_data });
});














// /demande-de-devis-gratuit/:en?

app.get(['/demande-de-devis-gratuit', '/request-a-free-quote/en'], middleware2.mid1, middleware2_en.mid1, async (req, res) => {

  // return res.end()

  logDataInColoredStructure(res.locals.index_page_data);


  return res.render('demande-de-devis-gratuit', { ...res.locals.index_page_data });
});











app.get(['/organisation', '/organization/en'], middleware3.mid1, middleware3_en.mid1, (req, res) => {

  // res.end()

  return res.render('organisation', { ...res.locals.index_page_data });
});







app.get(['/a-propos', '/about/en'], middleware3.mid1, middleware3_en.mid1, (req, res) => {

  return res.render('a-propos', { ...res.locals.index_page_data });
});








app.get(['/service/:page_de_services_supplementaires_seo', '/service/:page_de_services_supplementaires_seo/en'], middleware5.mid1, middleware5_en.mid1, async (req, res, next) => {


  // logDataInColoredStructure(res.locals.index_page_data);

  return res.render('page_de_services_supplementaires_seo', { ...res.locals.index_page_data });
});












app.get(['/blog', '/blog/en'], middleware6.mid1, middleware6_en.mid1, async (req, res, next) => {



  // return res.end()
  return res.render('blog', { ...res.locals.index_page_data });

});








app.get(['/blog/:category', '/blog/:category/en'], middleware7.mid1, middleware7_en.mid1, async (req, res, next) => {

  console.log("\n\n(*)->\n\n", res.locals.index_page_data)

  // return res.end()
  return res.render('categorie', { ...res.locals.index_page_data });
});









app.get('/blog/:category/blog-posting/:title', middleware0.mid1, middleware8.mid1, async (req, res, next) => {


  console.log("\n\n______________________\n\n (*)->: \n", res.locals.index_page_data)

  return res.render('blog-posting', { ...res.locals.index_page_data });

});













// middleware4.mid1, middleware4_en.mid1
app.get(['/tiroir1/mention-legale', '/drawer1/legal-notice/en'], async (req, res) => {


  let legal_notice_page_fr, legal_notice_page_en


  if (is_english) {
    // english
    legal_notice_page_en = await db.legal_notice_page_en.findOne({
      raw: true
    });

    if (!legal_notice_page_en) {
      const error = new Error("No legal_notice_page_en found!")
      return next(error)
    }

  } else {
    // french
    legal_notice_page_fr = await db.legal_notice_page_fr.findOne({
      raw: true
    });

    if (!legal_notice_page_fr) {
      const error = new Error("No legal_notice_page_fr found!")
      return next(error)
    }
  }

  const legal_notice_page = legal_notice_page_fr || legal_notice_page_en

  // console.log(legal_notice_page)


  // return res.end()

  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    legal_notice_page: legal_notice_page
  }



  logDataInColoredStructure(res.locals.index_page_data);

  return res.render('mention-legale', { ...res.locals.index_page_data });
});









app.get(['/tiroir1/politique-de-confidentialite', '/drawer1/privacy-policy/en'], async (req, res) => {


  let privacy_policy_page_fr, privacy_policy_page_en, rendered_privacy_policy_page_en, rendered_privacy_policy_page_fr


  if (is_english) {
    // english
    privacy_policy_page_en = await db.privacy_policy_page_en.findOne({
      raw: true
    });

    if (!privacy_policy_page_en) {
      const error = new Error("No privacy_policy_page_en found!")
      return next(error)
    }

    rendered_privacy_policy_page_en = ejs.render(privacy_policy_page_en.html_content, {
      business_data: res.locals.index_page_data.business_data
    });


  } else {
    // french
    privacy_policy_page_fr = await db.privacy_policy_page_fr.findOne({
      raw: true
    });

    if (!privacy_policy_page_fr) {
      const error = new Error("No privacy_policy_page_fr found!")
      return next(error)
    }

    rendered_privacy_policy_page_fr = ejs.render(privacy_policy_page_fr.html_content, {
      business_data: res.locals.index_page_data.business_data
    });

  }

  const privacy_policy_page = privacy_policy_page_fr || privacy_policy_page_en

  const rendered_privacy_policy_page = rendered_privacy_policy_page_fr || rendered_privacy_policy_page_en



  // return res.end()

  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    privacy_policy_page: {
      ...privacy_policy_page,
      rendered_privacy_policy_page
    }
  }

  console.log(res.locals.index_page_data)

  return res.render('politique-de-confidentialite', { ...res.locals.index_page_data });
});



app.get('/backlink/:n',
  middleware12.mid1,
  async (req, res, next) => {

    if (res.locals.error) {
      return next()
    }

    let all_data_per_page_fr = await db.all_data_per_page_fr.findOne({
      where: {
        page_url_identify: '/a-propos',
      },
      raw: true
    });

    if (!all_data_per_page_fr) {
      const error = new Error("No all_data_per_page_fr found!")
      return next(error)
    }

    const n = req.params.n;

    res.locals.index_page_data.all_data_per_page = all_data_per_page_fr

    res.locals.index_page_data.all_data_per_page = {
      ...res.locals.index_page_data.all_data_per_page,
      description: "Tous les liens vers des pages web qui contiennent elles-mêmes des liens vers l'un des sites que je contrôle (à des fins de crawl SEO / suivi par les robots)",
      title: `Liste des liens pour le crawler Google ${n}`,
      page_url_identify: `/backlink/${n}`,
      under_h1: 'Backlinks',
      eq_lang_page: `/backlink/${n}`,
      last_modified: '2026-02-02T23:01:22.513Z',
      // css_link: undefined,
      schema_script: undefined,
      // title_meta_canonical: undefined,
      // front_end_script_needed_to_serve_variables: rendered_front_end_script_needed_to_serve_variables,
      // brochure_text1: undefined,
      // brochure_text2: undefined,
    }


    console.log(res.locals.index_page_data)
    return res.render('backlink1', { ...res.locals.index_page_data });
  })










// app.get('/sitemap/sitemap', async (req, res, next) => {
//   console.log("TTTT")
//   return res.end()
// })





app.get('/sitemap/sitemap-3', sitemap_controller.cont1);


















app.get(['/plan-du-site', '/sitemap/en'],
  middleware9.mid1,
  middleware9_en.mid1,
  async (req, res, next) => {

    let backlink_pages_urls = []
    const backlinksDir = path.join(__dirname, './backlinks');

    const files = fs.readdirSync(backlinksDir);

    for (const file of files) {
      const match = file.match(/^backlink(\d+)\.txt$/i);
      if (!match) continue;

      const number = match[1];

      backlink_pages_urls.push(`/backlink/${number}`);
    }

    res.locals.backlink_pages_urls = backlink_pages_urls
    // console.log("\n\n________________________ \n\nres.locals.index_page_data -> \n\n", res.locals.index_page_data)
    // return res.end()

    return res.render('plan-du-site', { ...res.locals.index_page_data });
  });

























app.use(get_catch_controller.cont1)

// Error thrown on server, return 200 and respond with json object describing server error
app.use(data_error_handler_controller.error_cont1)



const server = app.listen(PORT, async () => {
  // sequelize
  try {
    await sequelize.authenticate();
    console.log('\n\nAuthentication using sequelize succeeded');
  } catch (err) {
    console.error('Database authentication failed:', err);
  }

  global.db = initModels(sequelize);


  console.log('\n')
  console.log(`Congrats, your Node.JS Express.JS application is running on localhost:${PORT}.\napp.listen() callback function`)
  console.log('\n')
})


// When CTRL + C closes the app
server.on('close', () => {
  // sequelize
  sequelize.close();
  console.log("Closed sequelize.\n")
  // express
  console.log('Express web server is closing\n');
});


const CLOSE_SIGNAL = (
  process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT ? SIGNAL.INTERRUPTION
    : process.env.NODE_ENV === ENVIRONMENT.PRODUCTION ? SIGNAL.TERMINATION :
      SIGNAL.INTERRUPTION
);


const closeServer = () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};



process.on(CLOSE_SIGNAL, async () => {
  console.log(`\n\nReceived ${CLOSE_SIGNAL} signal...\n`);
  try {
    await closeServer();
    console.log("Closed server.\n")
    process.exit(0);
  } catch (err) {
    console.error('Error while closing the server and disconnecting from sequelize:', err);
    process.exit(1);
  }
});
