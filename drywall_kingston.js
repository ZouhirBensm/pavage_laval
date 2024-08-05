// 9995
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
  dialect: dialect
});


const PORT = process.env['PORT']

const { ENVIRONMENT, SIGNAL } = require('./miscellaneous/const/env')


const app = express()

app.use(Compression);



app.set('view engine', 'ejs');
app.set('etag', 'strong');


app.use(express.static('public'));



app.use((req, res, next) => {
  res.locals.env = process.env.NODE_ENV;
  res.locals.production = ENVIRONMENT.PRODUCTION;
  return next()
});

// Middlewares


require('./miscellaneous/db/db')


// Controllers
const get_catch_controller = require('./lifecycle/controller/get-catch-controller/cont1')
const data_error_handler_controller = require('./lifecycle/controller/error-controller/cont1');




// For SEO Keep until google identifies that the pages are gone
const goneUrls = [
  "/blog/drywall/blog-posting/Article1",
  "/blog/drywall/blog-posting/article1",
  "/blog/drywall/blog-posting/article2",
  "/drywall/drywall-contractors-kingston",
  "/drywall/residential-drywall-contractors-kingston",
  "/drywall/drywall-contractors-kingston-ontario",
  "/service/drywall-contractors-kingston",
  "/service/residential-drywall-contractors-kingston",
  "/service/drywall-contractors-kingston-ontario",
  "/blog/drywall/blog-posting/best-drywall-kingston",
  "/blog/{Category}/blog-posting/residential-drywall-contractors-kingston",
  "/blog/{Category}/blog-posting/drywall-companies-in-kingston-ontario",
  "/blog/{Category}/blog-posting/drywall-contractors-kingston-ontario",
  "/blog/drywall/blog-posting/drywall-contractors-kingston",
  "/blog/drywall/blog-posting/residential-drywall-contractors-kingston",
  "/blog/drywall/blog-posting/drywall-contractors-kingston-ontario",
  "/blog/drywall/blog-posting/drywall-companies-in-kingston-ontario",
  "/blog/drywall/blog-posting/drywall-kingston-ltd",
  "/blog/drywall/blog-posting/drywall-kingston-prices",
  "/blog/drywall/blog-posting/drywall-kingston-cost",
  "/blog/drywall/blog-posting/best-drywall-kingston",
  "/blog/{Category}/blog-posting/drywall-companies-in-kingston-ontario",
  "/blog/{Category}/blog-posting/best-drywall-kingston",
  "/blog/%7BCategory%7D/blog-posting/residential-drywall-contractors-kingston",
  "/blog/%7BCategory%7D/blog-posting/drywall-companies-in-kingston-ontario",
  "/blog/%7BCategory%7D/blog-posting/drywall-contractors-kingston-ontario",
  "/blog/%7BCategory%7D/blog-posting/drywall-companies-in-kingston-ontario",
  "/blog/%7BCategory%7D/blog-posting/best-drywall-kingston",
  "/drywall/drywall-companies-in-kingston-ontario",
  "/service/drywall-companies-in-kingston-ontario"
];






goneUrls.forEach(url => {
  app.get(url, (req, res) => {
    res.status(410).send('This page has been permanently removed.');
  });
});










// Serve index.html for the root path
app.get('/', async (req, res) => {
  // Throw an error for testing the error handling middleware.
  // let error = new Error("new error")
  // return next(error)

  // Fetch the slugs from the blog_element table with the same category_id
  const blog_elements = await db.blog_element.findAll({
    // where: {
    //   category_id: db_category.id,
    // },
  include: [
    {
      model: db.category,
      as: 'category',
      attributes: ['category_name', 'slug']
    }],
    attributes: ['slug', 'title'],
    nest: true,
    raw: true,
  });



  if (!blog_elements) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  const service_pages = await db.service_page.findAll({
    attributes: ['slug', 'title'],
    raw: true
  });



  if (!service_pages) {
    const error = new Error("No service pages found!")
    return next(error)
  }

  console.log(blog_elements, service_pages)

  return res.render('index3', {
    blog_elements: blog_elements,
    service_pages: service_pages
  });


});




// Serve request-free-quote.html for the /request-free-quote path
app.get('/request-free-quote', (req, res) => {

  const now = new Date()
  console.log('123', now)

  return res.render('request-free-quote');
  // return res.sendFile('request-free-quote.html', { root: 'public' });
});


// Using Node
// Serve request-free-quote.html for the /request-free-quote path
// app.post('/retrieve-request-free-quote-data', (req, res) => {
//   console.log('retrieve-request-free-quote-data!')
//   return res.end()
// });



app.get('/organization', (req, res) => {
  return res.render('organization');
  // return res.sendFile('organization.html', { root: 'public' });
});



app.get('/about', (req, res) => {
  return res.render('about');
  // return res.sendFile('about.html', { root: 'public' });
});


app.get('/service/drywall-installation', (req, res) => {
  return res.render('drywall-installation');
  // return res.sendFile('drywall-installation.html', { root: 'public' });
});


app.get('/service/drywall-repair-and-patching', (req, res) => {
  return res.render('drywall-repair-and-patching');
  // return res.sendFile('drywall-repair-and-patching.html', { root: 'public' });
});



app.get('/service/drywall-finishing-and-texturing', (req, res) => {
  return res.render('drywall-finishing-and-texturing');
  // return res.sendFile('drywall-finishing-and-texturing.html', { root: 'public' });
});




app.get('/service/:extra_service_page_title_for_seo', async (req, res, next) => {

  const now = new Date()

  console.log('datetime = ', now)


  const { extra_service_page_title_for_seo } = req.params;
  console.log(extra_service_page_title_for_seo);


  redirected_seo_pages = ['drywall-companies-in-kingston', 'drywall-kingston-ltd', 'drywall-kingston-prices', 'drywall-kingston-cost', 'best-drywall-kingston']

  console.log('**', redirected_seo_pages.includes(extra_service_page_title_for_seo))


  // For SEO Keep until google identifies the redirects
  if (redirected_seo_pages.includes(extra_service_page_title_for_seo)) {
    console.log(extra_service_page_title_for_seo);
    const newUrl = `/drywall/${extra_service_page_title_for_seo}`;
    return res.redirect(301, newUrl);
  }

  let db_service_page

  try {
    db_service_page = await db.service_page.findOne({
      where: {
        slug: req.params.extra_service_page_title_for_seo,
      },
      raw: true,
    });
  } catch (error) {
    return next(error);
  }


  console.log('\n\n(1)\n\n', db_service_page)


  if (!db_service_page) {
    const error = new Error("No blog elements found!")
    return next(error)
  }



  return res.render('extra-service-page-for-seo', {
    blogData: db_service_page,
    canonical: req.originalUrl
  });

});








// HERE
app.get('/sitemap', async (req, res) => {

  // Fetch the slugs from the blog_element table with the same category_id
  const blog_elements = await db.blog_element.findAll({
    // where: {
    //   category_id: db_category.id,
    // },
  include: [
    {
      model: db.category,
      as: 'category',
      attributes: ['category_name', 'slug']
    }],
    attributes: ['slug', 'title'],
    nest: true,
    raw: true,
  });


  if (!blog_elements) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  const service_pages = await db.service_page.findAll({
    attributes: ['slug', 'title'],
    raw: true
  });

  // Group blogs by category
  const categories_and_associated_blogs = blog_elements.reduce((acc, blog) => {
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


  // console.log("\n\ncategories_and_associated_blogs:\n", categories_and_associated_blogs)



  if (!service_pages) {
    const error = new Error("No service pages found!")
    return next(error)
  }




  return res.render('sitemap', {
    // blog_elements: blog_elements,
    service_pages: service_pages,
    categories_and_associated_blogs: categories_and_associated_blogs
  });
  // return res.sendFile('sitemap.html', { root: 'public' });
});










app.get('/blog', async (req, res) => {


  const categories = await db.category.findAll({
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
    db_category = await db.category.findOne({
      where: {
        slug: req.params.category,
      },
      raw: true,
    });
  } catch (error) {
    return next(error);
  }


  if (!db_category) {
    return res.status(404).send('Category not found');
  }

  console.log('->', req.params.category, db_category)

  // Fetch the slugs from the blog_element table with the same category_id
  const blog_elements = await db.blog_element.findAll({
    where: {
      category_id: db_category.id,
    },
    attributes: ['slug', 'title'],
    raw: true,
  });


  if (!blog_elements) {
    const error = new Error("No blog elements found!")
    return next(error)
  }

  // Extract slugs into an array
  // const slugs = blog_elements.map(element => element.slug);

  // console.log('->', {
  //   category: db_category.category_name,
  //   category_slug: db_category.slug,
  //   canonical: req.originalUrl,
  //   blog_elements: blog_elements
  // })

  // Render the view with the category name and slugs
  return res.render('category', {
    category: db_category.category_name,
    category_slug: db_category.slug,
    canonical: req.originalUrl,
    blog_elements: blog_elements
  });


});



app.get('/blog/:category/blog-posting/:title', async (req, res) => {


  const now = new Date()
  console.log(now)

  const { title, category } = req.params;


  let titles_of_extra_services = ['Drywall Companies In Kingston', 'Drywall Kingston Ltd', 'Drywall Kingston Prices', 'Drywall Kingston Cost', 'Best Drywall Kingston']



  // Fetch the slugs from the blog_element table with the same category_id
  const blog_element = await db.blog_element.findOne({
    where: {
      slug: title,
    },
    include: [
      {
        model: db.category,
        as: 'category',
        attributes: ['category_name', 'slug']
      }
    ],
    raw: true,
    nest: true,
  });

  
  // console.log('\n\n(1)-> ', blog_element, '\n\n')


  if (!blog_element) {
    const error = new Error("No blog element found!")
    return next(error)
  }

  if (titles_of_extra_services.includes(blog_element.title)) {
    const newUrl = `/drywall/${title}`;
    return res.redirect(301, newUrl);
  }


  return res.render('blog-posting', {
    blogData: blog_element,
    // blogData: JSON.stringify(blog_element),
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
      URL: '/request-free-quote',
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
      URL: '/about',
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



  const service_pages = await db.service_page.findAll({
    attributes: ['slug', 'title', 'last_modified'],
    raw: true
  });



  if (!service_pages) {
    const error = new Error("No service pages found!")
    return next(error)
  }


  // console.log('\n\nservice_pages-> ', service_pages)

  service_pages.forEach(service_page => {

    let url = `/service/${service_page.slug}`;

    console.log(service_page.last_modified)
    let lastmod = new Date(service_page.last_modified)


    urls.push({
      URL: url,
      lastmod: lastmod,
      changefreq: "monthly",
      priority: 1
    });


  });


  const blog_elements = await db.blog_element.findAll({
    attributes: ['slug', 'title', 'datetime_edited'],
    include: [
      {
        model: db.category,
        as: 'category',
        attributes: ['category_name', 'slug']
      }
    ],
    raw: true,
    nest: true
  });


  if (!blog_elements) {
    const error = new Error("No blog elements found!")
    return next(error)
  }


  // console.log('\n\nblog_elements-> ', blog_elements)

  blog_elements.forEach(blog_element => {
    // console.log(blog_element);

    let url = `/blog/${blog_element.category.slug}/blog-posting/${blog_element.slug}`;

    let datetime_edited = new Date(blog_element.datetime_edited)


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

  return res.render('sitemap');
  // return res.sendFile('sitemap.html', { root: 'public' });
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