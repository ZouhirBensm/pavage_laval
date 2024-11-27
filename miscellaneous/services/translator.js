const { translate } = require('@vitalets/google-translate-api');



async function translateReviews(review_data, targetLanguage) {

  // console.log("9")

  const { franc } = await import('franc-min');

  for (let review of review_data) {
    const detectedLanguage = franc(review.review_body);

    if (targetLanguage === 'fr' && detectedLanguage === 'eng') {
      try {
        const translated = await translate(review.review_body, { to: 'fr' });
        review.review_body = translated.text;
      } catch (error) {
        throw error
      }
    }


    else if (targetLanguage === 'en' && detectedLanguage === 'fra') {
      try {
        const translated = await translate(review.review_body, { to: 'en' });
        review.review_body = translated.text;
      } catch (error) {
        throw error
      }
    }

  }

  return review_data;

}


module.exports = { translateReviews }