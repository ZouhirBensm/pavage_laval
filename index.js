const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env['PORT']




const environments = {
  development: "development",
  production: "production"
}

const SIGNAL = {
  INTERRUPTION: 'SIGINT',
  TERMINATION: 'SIGTERM'
}



app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use((req, res, next) => {
  return next()
});


app.get('/', (req, res, next) => {
  // Throw an error for testing the error handling middleware.
  // let error = new Error("new error")
  // return next(error)

  return res.render('index')
})



// Try accessing this URL localhost:3005/no_existant and that will trigger this middleware
app.use((req, res, next) => {
  if (req.method === "GET") {
    return res.status(200).render('url_not_present')
  }

  return next();
})



// Error thrown on server, return 200 and respond with json object describing server error
app.use((error, req, res, next) => {
  // console.error(err.stack)
  console.error('\n\n')

  console.error('\x1b[31;5m')
  console.error('Last middleware to process an error if any:')
  console.error('\x1b[0m')

  console.error('\x1b[37;41;1m')
  console.error(error)
  console.error('\x1b[0m')

  return res.status(200).json({
    name: error.constructor.name,
    real_status: 500,
    message: error.message
  })

})



const server = app.listen(PORT, () => {
  console.log('\n')
  console.log(`Congrats, your Node.JS Express.JS application is running on localhost:${PORT}.\napp.listen() callback function`)
  console.log('\n')
})


// When CTRL + C closes the app
server.on('close', () => {
  console.log('Express web server is closing\n');
});

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

const CLOSE_SIGNAL = (
  process.env.NODE_ENV === environments.development ? SIGNAL.INTERRUPTION
  : process.env.NODE_ENV === environments.production ? SIGNAL.TERMINATION :
  SIGNAL.INTERRUPTION
);

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