const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'dirk.b.filter@hotmail.ca',  // use custom domain and use that domain
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let us know how you get along with the app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'dirk.b.filter@hotmail.ca',  // use custom domain and use that domain
    subject: "Account cancellation",
    text: `We're sorry to see you go, ${name}. Let us know how we could have done better.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
