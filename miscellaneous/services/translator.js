const { translate } = require('@vitalets/google-translate-api');



async function translateReviews(review_data, targetLanguage) {

  // Dynamically import `franc-min` (which exports an object, not a function)
  const { franc } = await import('franc-min');  // dynamic import for ESM

  // Process each review
  for (let review of review_data) {
    // Detect the language of the review body using the `franc` function from the object
    const detectedLanguage = franc(review.review_body);

    // If the target language is French ('fr'), and review is in English, translate to French
    if (targetLanguage === 'fr' && detectedLanguage === 'eng') {
      try {
        const translated = await translate(review.review_body, { to: 'fr' });
        review.review_body = translated.text; // Overwrite with the translated text
      } catch (error) {
        throw error
        console.error('Error during translation:', error);
      }
    } 
    // If the target language is English ('en'), and review is in French, translate to English
    else if (targetLanguage === 'en' && detectedLanguage === 'fra') {
      try {
        const translated = await translate(review.review_body, { to: 'en' });
        review.review_body = translated.text; // Overwrite with the translated text
      } catch (error) {
        throw error
      }
    }
  }

  return review_data; // Return the modified review data
}


module.exports = { translateReviews }