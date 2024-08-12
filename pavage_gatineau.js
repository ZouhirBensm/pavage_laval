// 9995555
const express = require('express')
const path = require('path');

const fs = require('fs');

require('dotenv').config()

const { Sequelize } = require('sequelize');
const { initModels } = require(`./models/init-models`);

const createSiteMap = require('./miscellaneous/utils/custom-sitemap')
const { getJsonData, getJsonData2 } = require('./miscellaneous/utils/utils1')

const json = require('./miscellaneous/db/json')

const Compression = require('./miscellaneous/services/compression/compression-middleware')




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



const middleware1 = require('./lifecycle/middleware/mid1')
const middleware2 = require('./lifecycle/middleware/mid2')
const middleware3 = require('./lifecycle/middleware/mid3')
const middleware4 = require('./lifecycle/middleware/mid4')



app.set('view engine', 'ejs');
app.set('etag', 'strong');


app.use(express.static('public'));



app.use((req, res, next) => {
  res.locals.env = process.env.NODE_ENV;
  res.locals.production = ENVIRONMENT.PRODUCTION;


  const req_path = req.path
  const req_url = req.url

  // console.log(req_path, req_url)

  res.locals.req_path = req_path


  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.locals.fullUrl = fullUrl
  

  return next()
});

// Middlewares


require('./miscellaneous/db/db')


// Controllers
const get_catch_controller = require('./lifecycle/controller/get-catch-controller/cont1')
const data_error_handler_controller = require('./lifecycle/controller/error-controller/cont1');




// For SEO Keep until google identifies that the pages are gone
const goneUrls = [
  "/some/url/path"
];






goneUrls.forEach(url => {
  app.get(url, (req, res) => {
    res.status(410).send('This page has been permanently removed.');
  });
});










// Serve index.html for the root path
app.get('/', middleware1.mid1, async (req, res) => {
  // Throw an error for testing the error handling middleware.
  // let error = new Error("new error")
  // return next(error)

  return res.render('index3', {...res.locals.index_page_data});
});












app.get('/demande-de-devis-gratuit', middleware2.mid1, async (req, res) => {

  return res.render('demande-de-devis-gratuit', {...res.locals.index_page_data});
});













app.get('/organisation', middleware3.mid1, (req, res) => {

  return res.render('organization', {...res.locals.index_page_data});
});





app.get('/a-propos', middleware3.mid1, (req, res) => {

  return res.render('a-propos', {...res.locals.index_page_data});
});







app.get('/service/pavage-residentiel-et-commercial-a-gatineau',  middleware4.mid1, (req, res) => {
  return res.render('pavage-residentiel-et-commercial', {...res.locals.index_page_data});
});





app.get('/service/revetement-maintenance-en-asphalte-gatineau',  middleware4.mid1, (req, res) => {
  return res.render('revetement-en-asphalte', {...res.locals.index_page_data});
});






app.get('/service/travaux-en-beton-residentiel-et-commercial-a-gatineau',  middleware4.mid1, (req, res) => {
  return res.render('travaux-en-beton-residentiel-et-commercial', {...res.locals.index_page_data});
});












app.get('/service/:extra_service_page_title_for_seo', middleware4.mid1, async (req, res, next) => {

  const now = new Date()

  // console.log('datetime = ', now)


  const { extra_service_page_title_for_seo } = req.params;
  console.log(extra_service_page_title_for_seo);


  let db_extra_service_page_fr

  try {
    db_extra_service_page_fr = await db.extra_service_page_fr.findOne({
      where: {
        slug: req.params.extra_service_page_title_for_seo,
      },
      raw: true,
    });
  } catch (error) {
    return next(error);
  }


  // console.log('\n\n(1)\n\n', db_extra_service_page_fr)


  if (!db_extra_service_page_fr) {
    const error = new Error("No blog elements found!")
    return next(error)
  }


  res.locals.index_page_data.all_data_per_page_fr = {
    title: db_extra_service_page_fr.title,
    under_h1: db_extra_service_page_fr.under_h1,
  }

  res.locals.index_page_data = {
    ...res.locals.index_page_data,
    extra_service_page_fr: db_extra_service_page_fr
  }


  console.log('\n\n(**) ->', res.locals.index_page_data)

  return res.render('extra-service-page-for-seo', {...res.locals.index_page_data});


});








// HERE
app.get('/sitemap', async (req, res) => {

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


  console.log("\n\ncategories_and_associated_blogs:\n", categories_and_associated_blogs)



  if (!extra_service_pages_fr) {
    const error = new Error("No service pages found!")
    return next(error)
  }




  return res.render('sitemap', {
    // blog_elements_fr: blog_elements_fr,
    extra_service_pages_fr: extra_service_pages_fr,
    categories_and_associated_blogs: categories_and_associated_blogs
  });
  // return res.sendFile('sitemap.html', { root: 'public' });
});










app.get('/blog', async (req, res) => {


  const categories = await db.category_fr.findAll({
    raw: true
  }
);

console.log(categories)



  return res.render('blog', {
    categories
  });
  // return res.sendFile('blog.html', { root: 'public' });
});





app.get('/blog/:category', async (req, res) => {

  try {
    db_category_fr = await db.category_fr.findOne({
      where: {
        slug: req.params.category,
      },
      raw: true,
    });
  } catch (error) {
    return next(error);
  }


  if (!db_category_fr) {
    return res.status(404).send('Category not found');
  }

  console.log('->', req.params.category, db_category_fr)

  // Fetch the slugs from the blog_element_fr table with the same category_id
  const blog_elements_fr = await db.blog_element_fr.findAll({
    where: {
      category_id: db_category_fr.id,
    },
    attributes: ['slug', 'title'],
    raw: true,
  });


  if (!blog_elements_fr) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  // Extract slugs into an array
  // const slugs = blog_elements_fr.map(element => element.slug);

  // console.log('->', {
  //   category: db_category_fr.category_name,
  //   category_slug: db_category_fr.slug,
  //   canonical: req.originalUrl,
  //   blog_elements_fr: blog_elements_fr
  // })

  // Render the view with the category name and slugs
  return res.render('category', {
    category: db_category_fr.category_name,
    category_slug: db_category_fr.slug,
    canonical: req.originalUrl,
    blog_elements_fr: blog_elements_fr
  });


});



app.get('/blog/:category/blog-posting/:title', async (req, res) => {


  const now = new Date()
  console.log(now)

  const { title, category } = req.params;


  let titles_of_extra_services = ['Drywall Companies In Kingston', 'Drywall Kingston Ltd', 'Drywall Kingston Prices', 'Drywall Kingston Cost', 'Best Drywall Kingston']



  // Fetch the slugs from the blog_element_fr table with the same category_id
  const blog_element_fr = await db.blog_element_fr.findOne({
    where: {
      slug: title,
    },
    include: [
      {
        model: db.category_fr,
        as: 'category',
        attributes: ['category_name', 'slug']
      }
    ],
    raw: true,
    nest: true,
  });

  
  console.log('\n\n(1)-> ', blog_element_fr, '\n\n')


  if (!blog_element_fr) {
    const error = new Error("No blog element found!")
    return next(error)
  }

  if (titles_of_extra_services.includes(blog_element_fr.title)) {
    const newUrl = `/drywall/${title}`;
    return res.redirect(301, newUrl);
  }


  return res.render('blog-posting', {
    blogData: blog_element_fr,
    // blogData: JSON.stringify(blog_element_fr),
  });
});









// Your route
app.get('/tiroir1/legal-disclaimer', (req, res) => {
  return res.render('legal-disclaimer');
});

// Your route
app.get('/tiroir1/privacy-policy', (req, res) => {
  return res.render('privacy-policy');
});





app.get('/sitemap/xml-sitemap', async (req, res) => {
  // Define the path to the XML file
  const xmlFilePath = path.join(__dirname, 'public', 'sitemap', 'sitemap.xml');

  // Delete the existing XML file if it exists
  if (fs.existsSync(xmlFilePath)) {
    fs.unlinkSync(xmlFilePath);
    console.log('Deleted existing sitemap.xml file');
  }

  const now = new Date();
  console.log(now);

  let last_modified_1 = '2024-06-02T15:07:49.699Z';
  let last_modified_1_date = new Date(last_modified_1);

  let last_modified_3 = '2024-06-21T15:04:37.758Z';
  let last_modified_3_date = new Date(last_modified_3);

  let last_modified_4 = '2024-06-24T13:13:22.821Z';
  let last_modified_4_date = new Date(last_modified_4);

  const urls = [
    {
      URL: '/',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/demande-de-devis-gratuit',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/organization',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/a-propos',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/sitemap',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },

    // {
    //   URL: '/tiroir1/legal-disclaimer',
    //   lastmod: last_modified_3_date,
    //   changefreq: "monthly",
    //   priority: 1
    // },
    // {
    //   URL: '/tiroir1/privacy-policy',
    //   lastmod: last_modified_3_date,
    //   changefreq: "monthly",
    //   priority: 1
    // },

    {
      URL: '/service/drywall-installation',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/drywall-repair-and-patching',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/drywall-finishing-and-texturing',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    }
  ];



  const extra_service_pages_fr = await db.extra_service_page_fr.findAll({
    attributes: ['slug', 'title', 'last_modified'],
    raw: true
  });



  if (!extra_service_pages_fr) {
    const error = new Error("No service pages found!")
    return next(error)
  }


  // console.log('\n\nservice_pages-> ', extra_service_pages_fr)

  extra_service_pages_fr.forEach(extra_service_page_fr => {

    let url = `/service/${extra_service_page_fr.slug}`;

    console.log(extra_service_page_fr.last_modified)
    let lastmod = new Date(extra_service_page_fr.last_modified)


    urls.push({
      URL: url,
      lastmod: lastmod,
      changefreq: "monthly",
      priority: 1
    });


  });


  const blog_elements_fr = await db.blog_element_fr.findAll({
    attributes: ['slug', 'title', 'datetime_edited'],
    include: [
      {
        model: db.category_fr,
        as: 'category',
        attributes: ['category_name', 'slug']
      }
    ],
    raw: true,
    nest: true
  });


  if (!blog_elements_fr) {
    const error = new Error("No blog elements found!")
    return next(error)
  }


  // console.log('\n\nblog_elements-> ', blog_elements_fr)

  blog_elements_fr.forEach(blog_element_fr => {
    // console.log(blog_element_fr);

    let url = `/blog/${blog_element_fr.category.slug}/blog-posting/${blog_element_fr.slug}`;

    let datetime_edited = new Date(blog_element_fr.datetime_edited)


    urls.push({
      URL: url,
      lastmod: datetime_edited,
      changefreq: "monthly",
      priority: 0.8
    });


  });

  // console.log(urls)

  const xml = createSiteMap(urls);

  fs.writeFileSync(xmlFilePath, xml, 'utf-8');
  console.log('New sitemap.xml file generated');

  // return res.render('sitemap');
  // return res.sendFile('sitemap.html', { root: 'public' });
  return res.redirect(301, '/sitemap');
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