function sendEmail(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const site_rentee_email = 'pavagelaval@outlook.com'

  // Get form data
  var name = document.getElementById('contact_name').value;
  var email = document.getElementById('contact_email').value;
  var phone = document.getElementById('contact_phone').value;
  var message = document.getElementById('contact_message').value;


  console.log(name, email)
  // console.log(phone, message)

  // Construct the mailto link
  var mailtoLink = 'mailto:' + site_rentee_email +
    '?subject=' + encodeURIComponent('Free Quote Request') +
    '&body=' + encodeURIComponent(
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
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