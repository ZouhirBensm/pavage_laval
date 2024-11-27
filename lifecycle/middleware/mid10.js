const axios = require('axios');

// TODO script needs testing
const { translateReviews } = require('../../miscellaneous/services/translator')
const { saveNewReviewsIfNeeded } = require('../../miscellaneous/services/save-review-if-needed')

// PLACE ID FROM
// https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder#maps_places_placeid_finder-javascript

const GOOGLE_API_KEY_PLACES_API = process.env['GOOGLE_API_KEY_PLACES_API']
const GMB_PLACE_ID = process.env['GMB_PLACE_ID']





async function mid1(req, res, next) {

  console.log('is_english', is_english)

  const translation_lang = is_english ? 'en' : 'fr';
  const db_review_data = is_english ? db.review_data_en : db.review_data_fr;


  const review_data = await db_review_data.findAll({
    raw: true
  });
  console.log('1')

  if (!review_data) {
    console.log('2')
    const error = new Error("No review data found!")
    return next(error)
  }




  try {
    console.log('3')
    var response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: GMB_PLACE_ID,
        key: GOOGLE_API_KEY_PLACES_API
      }
    });

  } catch (err) {
    console.log('4')
    res.locals.reviews = review_data
  }


  console.log('5')
  // Check if reviews exist in the response
  const reviews = response.data.result.reviews || [];

  // console.log('\n\nreviews: ', reviews)

  res.locals.reviews = reviews



  if (!res.locals.reviews) {
    console.log('6')
    res.locals.reviews = review_data
  }


  // console.log(res.locals.reviews)



  console.log('7')

  res.locals.reviews = res.locals.reviews.map((review, index) => ({
    id: index + 1,
    name: review.author_name,
    rating_value: review.rating,
    review_body: review.text,
  }));







  try {
    console.log('8')
    res.locals.reviews = await translateReviews(res.locals.reviews, translation_lang)
  } catch (error) {
    console.log('10')
    // console.log('5', error)
    res.locals.reviews = review_data
  }
  
  
  res.locals.reviews = res.locals.reviews.slice(0, 6);


  console.log('11')
  // return res.end()



  await saveNewReviewsIfNeeded(res.locals.reviews, db_review_data, review_data);



  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware