const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const GOOGLE_API_KEY = 'AIzaSyChTNeL3CC4QMrB6gNJp5sU5ohP6lrhn6s';  // Replace with your actual Google API key
const PLACE_ID = 'ChIJj69jiLcDzkwR34mlyqXv-CQ';              // Replace with your actual Google Places Place ID







async function mid1(req, res, next) {

  try {
    // Make a request to the Google Places API to fetch reviews
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: PLACE_ID,       // Replace with your Google Place ID
        key: GOOGLE_API_KEY      // Replace with your API key
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


  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware




