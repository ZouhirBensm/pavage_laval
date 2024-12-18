async function mid1(req, res, next) {
  try {
    // Query the database to get all slugs (both English and French)
    const main_service_data_en = await db.main_service_data_en.findAll({
      attributes: ['slug', 'page_to_render'],
      raw: true
    });

    const main_service_data_fr = await db.main_service_data_fr.findAll({
      attributes: ['slug', 'page_to_render'],
      raw: true
    });

    // Combine the slugs from both languages
    const allEndpointData = [
      ...main_service_data_en.map(data => {return {slug: `/service/${data.slug}`, page_to_render: data.page_to_render}}),
      ...main_service_data_fr.map(data => {return {slug: `/service/${data.slug}`, page_to_render: data.page_to_render}})
    ];


    console.log(allEndpointData, req.path)
    // Check if the request path matches any of the slugs
    const matchedEndpoint = allEndpointData.find(endpointData => req.path.includes(endpointData.slug));

    console.log('matchedEndpoint', matchedEndpoint)

    if (matchedEndpoint) {
      // If a match is found, forward the request to a special controller
      // You can store matchedEndpoint in req so it's accessible to the controller
      req.matchedEndpoint = matchedEndpoint;  
      console.log('matchedEndpoint2', matchedEndpoint)
      return next('route');  // Skip to the next route that matches the controller
    } else {
      // If no match, just continue with the regular flow
      return next();
    }

  } catch (error) {
    // Handle errors (e.g., database failure)
    console.error('Error checking slugs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const middleware = {
  mid1: mid1
}


module.exports = middleware