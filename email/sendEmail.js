
const sgMail =require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const ownerId = 'vibesecure@gmail.com'
 function sendWelcomeEmail  (email, name) {
  sgMail
    .send({
      to: email,
      subject: 'welcome to SecureSpot',
      from: ownerId,
      html: `
      <html>
      <body>
      <center><img src="https://media.istockphoto.com/vectors/colorful-typography-banner-vector-id1172141868?s=612x612"></center>
      <h2>Hey ${name}</h2>
      <br>
      <p>Welcome to the app. Let me know how you get along with the app.</p>
      </body>
      </html>`,
    })
    .then(() => {
      console.log('Welcome Email sent')
    })
    .catch((error) => {
      console.log(error.response.body)
    })
}
module.exports={sendWelcomeEmail}
// export const sendCancelationEmail = (email, name) => {
//   sgMail
//     .send({
//       to: email,
//       from: ownerId,
//       subject: 'Sorry to see you go! from SecureSpot',
//       html: `<html>
//       <body>
//       <center><img src="https://securespot.s3.amazonaws.com/sad.png"></center>
//       <h2>Hey ${name}</h2>
//       <br>
//       <p>Thanks for having time with us!</p>
//       </body>
//       </html>`,
//     })
//     .then(() => {
//       console.log('cancelation Email sent')
//     })
//     .catch((error) => {
//       console.error(error.toString())

//       //Extract error msg
//       const { message, code, response } = error

//       //Extract response msg
//       const { headers, body } = response
//     })
// }
// export const sendOTPEmail = (email, name, otp) => {
//   sgMail
//     .send({
//       to: email,
//       from: ownerId,
//       subject: `Your OTP for getting password back `,
//       text: 'Hello plain world!',
//       html: `
//       <html>
//       <body>
//       <center><img src="https://securespot.s3.amazonaws.com/securespot.png" width="50" height="50"></center>
//       <h2>Hey ${name}</h2>
//       <br>
//       <p>Your OTP is ${otp}</p>
//       </body>
//       </html>`,
//     })
//     .then(() => {
//       console.log('OTP sent')
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }
