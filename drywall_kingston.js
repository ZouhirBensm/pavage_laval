// 999
const express = require('express')
const path = require('path');

const fs = require('fs');

require('dotenv').config()

const { Sequelize } = require('sequelize');
// const { initModels } = require(`./models/init-models`);

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
app.get('/', (req, res) => {
  // Throw an error for testing the error handling middleware.
  // let error = new Error("new error")
  // return next(error)

  return res.render('index3');
  // return res.sendFile('index.html', { root: 'public' });
  // return res.render('index')
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


// app.get('/service/steel-stud-framing', (req, res) => {
//   return res.render('steel-stud-framing');
// });

// app.get('/service/blown-and-batt-insulation', (req, res) => {
//   return res.render('blown-and-batt-insulation');
// });

// app.get('/service/suspended-t-bar-ceilings', (req, res) => {
//   return res.render('suspended-t-bar-ceilings');
// });

// app.get('/service/textured-and-coffered-ceilings', (req, res) => {
//   return res.render('textured-and-coffered-ceilings');
// });

// app.get('/service/cove-moldings-and-bulkheads', (req, res) => {
//   return res.render('cove-moldings-and-bulkheads');
// });

// app.get('/service/spray-priming-and-painting', (req, res) => {
//   return res.render('spray-priming-and-painting');
// });



// app.get('/service/:extra_service_page_title_for_seo', (req, res) => {
//   const { extra_service_page_title_for_seo } = req.params;

//   console.log(extra_service_page_title_for_seo)

//   const jsonData = getJsonData2(extra_service_page_title_for_seo);

//   const htmlFilePath = path.join(__dirname, 'public', 'extra-service-page-for-seo.html');

//   let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

//   // Embed the JSON data in a script tag
//   const scriptTag = `<script>window.blogData = ${JSON.stringify(jsonData)};</script>`;
//   htmlContent = htmlContent.replace('</head>', `${scriptTag}</head>`);

//   res.send(htmlContent);
// });



app.get('/service/:extra_service_page_title_for_seo', (req, res) => {

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

  // Render other service pages
  const jsonData = getJsonData2(extra_service_page_title_for_seo);

  if (!jsonData) {
    return res.status(404).render('url_not_present')
  }

  console.log(jsonData)

  return res.render('extra-service-page-for-seo', {
    blogData: jsonData,
    // env: process.env.NODE_ENV
    canonical: req.originalUrl
  });



});




// app.get('/drywall/:extra_service_page_title_for_seo', (req, res) => {

//   const { extra_service_page_title_for_seo } = req.params;
//   console.log(extra_service_page_title_for_seo);

//   const jsonData = getJsonData2(extra_service_page_title_for_seo);

//   // console.log(jsonData)
  
//   let titles_of_extra_services = ['Drywall Companies In Kingston', 'Drywall Kingston Ltd', 'Drywall Kingston Prices', 'Drywall Kingston Cost', 'Best Drywall Kingston']
  
//   console.log(jsonData.title)
//   console.log(titles_of_extra_services)
//   console.log(titles_of_extra_services.includes(jsonData.title))
  
//   if (!titles_of_extra_services.includes(jsonData.title)) return res.status(410).send('This page has been permanently removed.');


//   console.log('render extra-service-page-for-seo')
//   return res.render('extra-service-page-for-seo', {
//     blogData: jsonData,
//     // env: process.env.NODE_ENV
//     canonical: req.originalUrl
//   });
// });






app.get('/sitemap', (req, res) => {
  return res.render('sitemap');
  // return res.sendFile('sitemap.html', { root: 'public' });
});


app.get('/blog', (req, res) => {
  return res.render('blog');
  // return res.sendFile('blog.html', { root: 'public' });
});






// app.get('/blog/:category', (req, res) => {

//   const category = req.params.category;

//   console.log(category);

//   const options = {
//     root: path.join(__dirname, 'public'),
//   };

//   res.sendFile('category.html', options, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(err.status).end();
//     } else {
//       console.log('Sent:', 'category.html');
//     }
//   });

// });



app.get('/blog/:category', (req, res) => {
  const category = req.params.category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  return res.render('category', { category: category, canonical: req.originalUrl });
});







// app.get('/blog/:category/blog-posting/:title', (req, res) => {

//   const category = req.params.category;
//   const title = req.params.title;



//   console.log(category, title);

//   const options = {
//     root: path.join(__dirname, 'public'),
//   };

//   res.sendFile('blog-posting.html', options, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(err.status).end();
//     } else {
//       console.log('Sent:', 'blog-posting.html');
//     }
//   });

// });





// app.get('/blog/:category/blog-posting/:title', (req, res) => {
//   const { title, category } = req.params;

//   console.log(title)

//   const jsonData = getJsonData(title, category);

//   const htmlFilePath = path.join(__dirname, 'public', 'blog-posting.html');

//   let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

//   // Embed the JSON data in a script tag
//   const scriptTag = `<script>window.blogData = ${JSON.stringify(jsonData)};</script>`;
//   htmlContent = htmlContent.replace('</head>', `${scriptTag}</head>`);

//   res.send(htmlContent);
// });


// Your route
app.get('/blog/:category/blog-posting/:title', (req, res) => {


  const { title, category } = req.params;
  
  const jsonData = getJsonData(title, category);



  let titles_of_extra_services = ['Drywall Companies In Kingston', 'Drywall Kingston Ltd', 'Drywall Kingston Prices', 'Drywall Kingston Cost', 'Best Drywall Kingston']
  
  console.log('->', jsonData)
  // console.log(jsonData.title)
  // console.log(titles_of_extra_services)
  // console.log(titles_of_extra_services.includes(jsonData.title))

  if (!jsonData) {
    return res.status(404).render('url_not_present')
  }
  
  if (titles_of_extra_services.includes(jsonData.title)) {
    const newUrl = `/drywall/${title}`;
    return res.redirect(301, newUrl);
  }


  return res.render('blog-posting', {
    blogData: jsonData,
    // env: process.env.NODE_ENV
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








app.get('/sitemap/xml-sitemap', (req, res) => {
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

  let last_modified_2 = '2024-06-20T18:11:40.666Z';
  let last_modified_2_date = new Date(last_modified_2);


  
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
    },
    {
      URL: '/service/steel-stud-framing',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/blown-and-batt-insulation',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/suspended-t-bar-ceilings',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/textured-and-coffered-ceilings',
      lastmod: last_modified_2_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/cove-moldings-and-bulkheads',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/service/spray-priming-and-painting',
      lastmod: last_modified_4_date,
      changefreq: "monthly",
      priority: 1
    },



    // {
    //   URL: '/drywall/drywall-companies-in-kingston',
    //   lastmod: last_modified_2_date,
    //   changefreq: "monthly",
    //   priority: 0.5
    // },
    // {
    //   URL: '/drywall/drywall-kingston-ltd',
    //   lastmod: last_modified_2_date,
    //   changefreq: "monthly",
    //   priority: 0.8
    // },
    // {
    //   URL: '/drywall/drywall-kingston-prices',
    //   lastmod: last_modified_2_date,
    //   changefreq: "monthly",
    //   priority: 0.8
    // },
    // {
    //   URL: '/drywall/drywall-kingston-cost',
    //   lastmod: last_modified_2_date,
    //   changefreq: "monthly",
    //   priority: 0.8
    // },
    // {
    //   URL: '/drywall/best-drywall-kingston',
    //   lastmod: last_modified_2_date,
    //   changefreq: "monthly",
    //   priority: 0.8
    // },
  ];



  for (const key in json) {
    if (json.hasOwnProperty(key)) {

      const title = json[key].title;
      console.log(title);


      if (!json[key].dateModified) continue;

      let formattedTitle = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      
      let url = `/blog/drywall/blog-posting/${formattedTitle}`;


      if (formattedTitle == 'an-exhaustive-guide-to-digiseine' || formattedTitle == 'an-exhaustive-guide-to-atlas-vinyl-sundecks-ltd') {
        url = `/blog/agency/blog-posting/${formattedTitle}`;
      }

      const lastmod = json[key].dateModified ? new Date(json[key].dateModified) : last_modified_1_date;

      urls.push({
        URL: url,
        lastmod: lastmod,
        changefreq: "monthly",
        priority: 0.8
      });
    }
  }

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