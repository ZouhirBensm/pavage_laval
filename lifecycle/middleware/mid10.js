const express = require('express');
const axios = require('axios');

// TODO script needs testing

const { translateReviews } = require('../../miscellaneous/services/translator')

// PLACE ID FROM
// https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder#maps_places_placeid_finder-javascript

const GOOGLE_API_KEY_PLACES_API = process.env['GOOGLE_API_KEY_PLACES_API']
const GMB_PLACE_ID = process.env['GMB_PLACE_ID']





async function mid1(req, res, next) {

  console.log('is_english', is_english)

  const translation_lang = is_english ? 'en' : 'fr';

  // console.log(GOOGLE_API_KEY_PLACES_API, GMB_PLACE_ID, typeof GOOGLE_API_KEY_PLACES_API, typeof GMB_PLACE_ID)
  // console.log(GOOGLE_API_KEY, PLACE_ID, typeof GOOGLE_API_KEY, typeof PLACE_ID)

  // console.log(GOOGLE_API_KEY_PLACES_API == GOOGLE_API_KEY)
  // console.log(GMB_PLACE_ID == PLACE_ID)

  try {
    // Make a request to the Google Places API to fetch reviews
    var response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: GMB_PLACE_ID,       // Replace with your Google Place ID
        key: GOOGLE_API_KEY_PLACES_API      // Replace with your API key
      }
    });

  } catch (err) {

    console.log('1')
    res.locals.reviews = await db.review_data_en.findAll({
      raw: true
    });
  
    if (!res.locals.reviews) {
      console.log('2')
      const error = new Error("No review data found!")
      return next(error)
    }

  }

  // Check if reviews exist in the response
  const reviews = response.data.result.reviews || [];

  // console.log(reviews)

  res.locals.reviews = reviews



  if (!res.locals.reviews) {

    console.log('3')
    // TODO template the DB data pull
    res.locals.reviews = await db.review_data_en.findAll({
      raw: true
    });
  
    if (!res.locals.reviews) {
      console.log('4')
      const error = new Error("No review data found!")
      return next(error)
    }

  }


  // console.log(res.locals.reviews)



  res.locals.reviews = res.locals.reviews.map((review, index) => ({
    id: index + 1,
    name: review.author_name,
    rating_value: review.rating,
    review_body: review.text,
  }));



  // TO TEST TRANSLATION FUNCTIONALITY
  // review_data_en.push({
  //   id: review_data_en.length + 1,
  //   name: 'Jean-Pierre D.',
  //   rating_value: 5,
  //   review_body: 'Excellente expérience, je recommande vivement!',
  // });


  try {
    res.locals.reviews = await translateReviews(res.locals.reviews, translation_lang)
  } catch (error) {
  
    console.log('5')
    res.locals.reviews = await db.review_data_en.findAll({
      raw: true
    });
  
    if (!res.locals.reviews) {
      console.log('6')
      const error = new Error("No review data found!")
      return next(error)
    }
  }
  
  
  res.locals.reviews = res.locals.reviews.slice(0, 6);



  console.log("0")
  // return res.end()
  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware
