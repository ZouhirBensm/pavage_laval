function error_cont1(error, req ,res, next) {
  // console.error('Response status:', res.statusCode);

  console.error('\n\n\x1b[31;5mOn error-controller:\x1b[0m\n\n\x1b[37;41;1m', error, '\x1b[0m')

  res.status(500).end()
  
}




// // Error thrown on server, return 200 and respond with json object describing server error
// app.use((error, req, res, next) => {
//   // console.error(err.stack)
//   console.error('\n\n')

//   console.error('\x1b[31;5m')
//   console.error('Last middleware to process an error if any:')
//   console.error('\x1b[0m')

//   console.error('\x1b[37;41;1m')
//   console.error(error)
//   console.error('\x1b[0m')

//   return res.status(200).json({
//     name: error.constructor.name,
//     real_status: 500,
//     message: error.message
//   })

// })



module.exports = {
  error_cont1
}