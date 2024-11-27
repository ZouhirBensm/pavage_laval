
async function saveNewReviewsIfNeeded(newReviews, db_review_data, review_data) {
  try {
    newReviews = newReviews.slice(0, 5);

    const currentReviews = review_data

    const reviewsToAddOrUpdate = newReviews.filter((newReview) => {

      const existingReview = currentReviews.find((rev) => 
        rev.name === newReview.name && 
        rev.review_body === newReview.review_body && 
        rev.rating_value === newReview.rating_value
      );

      return !existingReview;
    });

    if (reviewsToAddOrUpdate.length > 0) {
      for (const review of reviewsToAddOrUpdate) {
        await db_review_data.upsert({
          id: review.id,
          name: review.name,
          rating_value: review.rating_value,
          review_body: review.review_body,
        });
      }
      console.log('New or modified reviews added or updated successfully.');
    } else {
      console.log('No new or modified reviews to add or update.');
    }
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
}


module.exports = { saveNewReviewsIfNeeded }