function cont1(error, req, res, next) {
  console.log('\n\nreq.method:::', req.method)
  console.log('\n\nerror:::', error)
  // TODO #103
  if (req.method === "GET" && !error) {


    res.locals.noindex = true
    res.locals.nofollow = true

    res.locals.meta_description = `Path not registed as a valid URL`
    res.locals.html_title = `Path not registed as a valid URL`

    console.log('123123\n\n123123!!!!!!\n\n')

    res.locals.status = 404
    return res.status(res.locals.status).render('get_this_url_not_present')
  }
  return next(error);
}

module.exports = {
  cont1
}

// // Try accessing this URL localhost:3005/no_existant and that will trigger this middleware
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     return res.status(200).render('url_not_present')
//   }

//   return next();
// })


