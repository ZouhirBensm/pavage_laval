const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// PLACE ID FROM
// https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder#maps_places_placeid_finder-javascript

const GOOGLE_API_KEY_PLACES_API = process.env['GOOGLE_API_KEY_PLACES_API']
const GMB_PLACE_ID = process.env['GMB_PLACE_ID']





async function mid1(req, res, next) {

  // console.log(GOOGLE_API_KEY_PLACES_API, GMB_PLACE_ID, typeof GOOGLE_API_KEY_PLACES_API, typeof GMB_PLACE_ID)
  // console.log(GOOGLE_API_KEY, PLACE_ID, typeof GOOGLE_API_KEY, typeof PLACE_ID)

  // console.log(GOOGLE_API_KEY_PLACES_API == GOOGLE_API_KEY)
  // console.log(GMB_PLACE_ID == PLACE_ID)

  try {
    // Make a request to the Google Places API to fetch reviews
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: GMB_PLACE_ID,       // Replace with your Google Place ID
        key: GOOGLE_API_KEY_PLACES_API      // Replace with your API key
      }
    });

    // Check if reviews exist in the response
    const reviews = response.data.result.reviews || [];

    console.log(reviews)

    res.locals.reviews = reviews

  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).send('Error fetching reviews');
  }


  // return res.end()
  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware












