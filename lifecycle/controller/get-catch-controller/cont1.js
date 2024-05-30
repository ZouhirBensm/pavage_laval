function cont1(req, res, next) {
  console.log('\n\nreq.method:::', req.method)

  if (req.method === "GET") {
    res.locals.status = 404
    return res.status(res.locals.status).render('url_not_present')

  }
  return next();
}



module.exports = {
  cont1
}

