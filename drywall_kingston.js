// 12
const express = require('express')
const path = require('path');

const fs = require('fs');

require('dotenv').config()

const { Sequelize } = require('sequelize');
// const { initModels } = require(`./models/init-models`);

const createSiteMap = require('./miscellaneous/utils/custom-sitemap')
const { getJsonData } = require('./miscellaneous/utils/utils1')


const dialect = 'mysql'

const sequelize = new Sequelize(process.env['DB_NAME'], process.env['DB_USERNAME'], process.env['DB_USERPASSWORD'], {
  host: process.env['DB_HOST'],
  dialect: dialect
});


const PORT = process.env['PORT']

const { ENVIRONMENT, SIGNAL } = require('./miscellaneous/const/env')


const app = express()



app.set('view engine', 'ejs');
app.set('etag', 'strong');



app.use(express.static('public'));


app.use((req, res, next) => {

  return next()
});

// Middlewares


require('./miscellaneous/db/db')


// Controllers
const get_catch_controller = require('./lifecycle/controller/get-catch-controller/cont1')
const data_error_handler_controller = require('./lifecycle/controller/error-controller/cont1');





// Serve index.html for the root path
app.get('/', (req, res) => {
  // Throw an error for testing the error handling middleware.
  // let error = new Error("new error")
  // return next(error)

  return res.sendFile('index.html', { root: 'public' });
  // return res.render('index')
});

// Serve request-free-quote.html for the /request-free-quote path
app.get('/request-free-quote', (req, res) => {
  return res.sendFile('request-free-quote.html', { root: 'public' });
});


// Using Node
// Serve request-free-quote.html for the /request-free-quote path
// app.post('/retrieve-request-free-quote-data', (req, res) => {
//   console.log('retrieve-request-free-quote-data!')
//   return res.end()
// });



app.get('/organization', (req, res) => {
  return res.sendFile('organization.html', { root: 'public' });
});



app.get('/about', (req, res) => {
  return res.sendFile('about.html', { root: 'public' });
});


app.get('/service/drywall-installation', (req, res) => {
  return res.sendFile('drywall-installation.html', { root: 'public' });
});


app.get('/service/drywall-repair-and-patching', (req, res) => {
  return res.sendFile('drywall-repair-and-patching.html', { root: 'public' });
});



app.get('/service/drywall-finishing-and-texturing', (req, res) => {
  return res.sendFile('drywall-finishing-and-texturing.html', { root: 'public' });
});


app.get('/sitemap', (req, res) => {
  return res.sendFile('sitemap.html', { root: 'public' });
});


app.get('/blog', (req, res) => {
  return res.sendFile('blog.html', { root: 'public' });
});


app.get('/blog/:category', (req, res) => {

  const category = req.params.category;

  console.log(category);

  const options = {
    root: path.join(__dirname, 'public'),
  };

  res.sendFile('category.html', options, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', 'category.html');
    }
  });

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





app.get('/blog/:category/blog-posting/:title', (req, res) => {
  const { title, category } = req.params;

  console.log(title)

  const jsonData = getJsonData(title, category);

  const htmlFilePath = path.join(__dirname, 'public', 'blog-posting.html');

  let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

  // Embed the JSON data in a script tag
  const scriptTag = `<script>window.blogData = ${JSON.stringify(jsonData)};</script>`;
  htmlContent = htmlContent.replace('</head>', `${scriptTag}</head>`);

  res.send(htmlContent);
});








app.get('/sitemap/xml-sitemap', (req, res) => {
  // return res.sendFile('sitemap.html', { root: 'public' });

  const now = new Date()
  console.log(now)

  let last_modified_1 = '2024-06-02T15:07:49.699Z'
  let last_modified_1_date = new Date(last_modified_1);


  const urls = [
    {
      URL: '/',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/request-free-quote',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/organization',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/about',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/service/drywall-installation',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/service/drywall-repair-and-patching',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.8
    },
    {
      URL: '/service/drywall-finishing-and-texturing"',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.8
    },
    {
      URL: '/sitemap',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-contractors-kingston',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 1
    },
    {
      URL: '/blog/drywall/blog-posting/residential-drywall-contractors-kingston',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-contractors-kingston-ontario',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-companies-in-kingston-ontario',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-companies-in-kingston',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-kingston-ltd',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-kingston-prices',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/drywall-kingston-cost',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    },
    {
      URL: '/blog/drywall/blog-posting/best-drywall-kingston',
      lastmod: last_modified_1_date,
      changefreq: "monthly",
      // hreflang: "en",
      priority: 0.5
    }
  ];




  const xml = createSiteMap(urls)

  fs.writeFileSync(`./public/sitemap/sitemap.xml`, xml, 'utf-8');

  return res.sendFile('sitemap.html', { root: 'public' });
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