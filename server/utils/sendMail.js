const nodemailer = require('nodemailer');


async function sendMail(
  mail,
  token,

  userName,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.ethereal.email',
    auth: {
      user: 'fdfdllfdgsdfsdfsjfsdiu@gmail.com', // generated ethereal user
      pass: '#$1234567890zaq1', // generated ethereal password
    },
  });

  const info = await transporter.sendMail({
    from: '"MegaK Shop" <megak@example.com>', // sender address
    to: mail, // list of receivers
    subject: 'Account activate Shop MegaK' , // Subject line
    text: 'Welcome to MegaK Shop', // plain text body
    attachments: [{
      filename: 'image.jpg',
      path: './utils/3.jpg',
      cid: 'zaq12wsx' //same cid value as in the html img src
    }],
    html: `<h1>Welcome in ${userName} MegaK Shop </h1> <p>Your active link is: http://localhost:5000/confirm/?token=${token}</p> <img src="cid:zaq12wsx"/>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  sendMail,
};
