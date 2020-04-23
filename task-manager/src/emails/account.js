const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = '<key here>'

sgMail.setApiKey(sendGridAPIKey)

sgMail.send({
  to: 'dirk.b.filter@hotmail.ca',
  from: 'dirk.b.filter@hotmail.ca',
  subject: 'This is my first email from nodejs!',
  text: "This won't work because no API key"
})
