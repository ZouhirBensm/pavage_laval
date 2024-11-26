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
  const db_review_data = is_english ? db.review_data_en : db.review_data_fr;

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
    res.locals.reviews = await db_review_data.findAll({
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
    res.locals.reviews = await db_review_data.findAll({
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





  try {
    res.locals.reviews = await translateReviews(res.locals.reviews, translation_lang)

  } catch (error) {
  
    console.log('5', error)
    res.locals.reviews = await db_review_data.findAll({
      raw: true
    });
  
    if (!res.locals.reviews) {
      console.log('6')
      const error = new Error("No review data found!")
      return next(error)
    }
  }
  
  
  res.locals.reviews = res.locals.reviews.slice(0, 6);

  // TODO save reviews if discrepency between new reviews and DB res.locals.reviews
  // check res.locals.reviews VS await db.review_data_en.findAll({raw: true});, if nothing changed then continue else overwrite the entries in the db.db_review_data with res.locals.reviews



  console.log("0")
  // return res.end()



  await saveNewReviewsIfNeeded(res.locals.reviews, db_review_data);



  return next()
}




const middleware = {
  mid1: mid1
}



module.exports = middleware





// TODO needs testing tomorow
async function saveNewReviewsIfNeeded(newReviews, db_review_data) {
  try {
    newReviews = newReviews.slice(0, 6);

    // Fetch current reviews from the database (assuming the table is named `review_data_en`)
    const currentReviews = await db_review_data.findAll({
      raw: true
    });

    console.log(currentReviews)

    // Map current reviews by their id for easier comparison
    const currentReviewIds = currentReviews.map((review) => review.id);
    const newReviewIds = newReviews.map((review) => review.id);

    console.log(currentReviewIds, newReviewIds)

    // Find if any new reviews are missing in the DB or have been modified
    const reviewsToUpdate = newReviews.filter((newReview) => {
      // If the review ID exists in the DB, check for changes
      const existingReview = currentReviews.find((rev) => rev.id === newReview.id);
      if (existingReview) {
        // Check if review text or rating is different (adjust as per your needs)
        return (
          existingReview.review_body !== newReview.review_body ||
          existingReview.rating_value !== newReview.rating_value
        );
      }
      // If the review doesn't exist in the DB, it's new and needs to be added
      return true;
    });

    console.log(reviewsToUpdate)



    // If there are reviews that need to be updated or added, perform the update
    if (reviewsToUpdate.length > 0) {
      for (const review of reviewsToUpdate) {

        // Update or insert the review (you may need to adapt this based on your DB structure)
        await db_review_data.upsert({
          id: review.id,  // Assuming `id` is the primary key or unique
          name: review.name,
          rating_value: review.rating_value,
          review_body: review.review_body,
        });

      }
      console.log('Reviews updated or added successfully.');
    } else {
      console.log('No changes in reviews. No updates required.');
    }
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
}