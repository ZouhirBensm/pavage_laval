async function mid1(req, res, next) {

  // console.log("\nIs this running????????????????\n")

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


    // console.log('\n\nmiddleware11.mid1 - allEndpointData, req.path', allEndpointData, req.path)
    // Check if the request path matches any of the slugs
    const matchedEndpoint = allEndpointData.find(endpointData => req.path.includes(endpointData.slug));

    // console.log('\n\nmiddleware11.mid1 - matchedEndpoint', matchedEndpoint)

    if (matchedEndpoint) {
      // If a match is found, forward the request to a special controller
      // You can store matchedEndpoint in req so it's accessible to the controller
      req.matchedEndpoint = matchedEndpoint;  
      // console.log('\n\nmiddleware11.mid1 - matchedEndpoint2', matchedEndpoint2)
      return next('route');  // Skip to the next route for this flow. i.e. goes to (3)
    } else {
      // If no match, just continue with the regular flow (2)
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