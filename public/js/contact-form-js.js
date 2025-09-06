function sendEmail(event) {

  event.preventDefault();

  const site_rentee_email = 'info@asphaltesolution.com'
  let site_rentee_second_optional_email = undefined;
  site_rentee_second_optional_email = 'pavage-asphalte-laval-montreal@outlook.com';
  const second_email = 'earnanswers@outlook.com';

  // Get form data
  var name = document.getElementById('contact_name').value;
  var email = document.getElementById('contact_email').value;
  var phone = document.getElementById('contact_phone').value;
  var message = document.getElementById('contact_message').value;


  console.log(name, email)
  // console.log(phone, message)

  // Build the recipient list
  let recipientList = site_rentee_email + ',' + second_email;
  if (site_rentee_second_optional_email) {
    recipientList += ',' + site_rentee_second_optional_email;
  }

  // Construct the mailto link
  var mailtoLink = 'mailto:' + recipientList +
    '?subject=' + encodeURIComponent('Pavage Asphalte Laval Montreal: Quote Request') +
    '&body=' + encodeURIComponent(
      'Name/Nom: ' + name + '\n' +
      'Phone/Numéro: ' + phone + '\n' +
      'Email: '  + email + '\n' +
      'Message: ' + message
    );

  // Open the mailto link in the default email client
  window.location.href = mailtoLink;
  return
}


const form = document.getElementById("tmContactForm");
console.log(form)
form.addEventListener("submit", sendEmail);