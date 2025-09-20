async function cont1(req, res, next) {
  try {
    // Set meta data for the page
    // res.locals.canonical = 'https://www.earnanswers.com/sub/backlink/1';
    res.locals.title = "List of links for Google crawler 1";
    res.locals.description = "All the links for webpages that contain themselves links to one of the site I control for SEO crawler purposes";
    
    // Render the backlink1 template, passing urls from middleware
    // res.render('backlink1', {
    //   urls: res.locals.urls,
    //   canonical: res.locals.canonical,
    //   meta_description: res.locals.meta_description,
    //   html_title: res.locals.html_title
    // });



  return next()

  } catch (error) {
    console.error('Error in controller:', error);
    return next(error);
  }
}

const controller = {
  cont1: cont1
};

module.exports = controller;