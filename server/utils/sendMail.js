const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.ethereal.email',

  auth: {
    user: 'fdfdllfdgsdfsdfsjfsdiu@gmail.com', // generated ethereal user
    pass: '#$1234567890zaq1', // generated ethereal password
  },
});

async function sendActivateMail(
  mail,
  token,
  userName,
) {
  const info = await transporter.sendMail({
    from: '"MegaK Shop" <megak@example.com>', // sender address
    to: mail, // list of receivers
    subject: 'Account activate Shop MegaK', // Subject line
    text: 'Welcome to MegaK Shop', // plain text body
    html: `<h1>Welcome ${userName} in MegaK Shop </h1> <p>Your active link is: http://localhost:5000/confirm/?token=${token}</p> <img src="cid:zaq12wsx"/>`, // html body
    attachments: [{
      filename: 'image.jpg',
      path: `${__dirname}/3.jpg`,
      cid: 'zaq12wsx',
    }],

  });
}

async function resetPasswordMail(
  mail,
  token,
  userName,
) {
  const info = await transporter.sendMail({
    from: '"MegaK Shop" <megak@example.com>',
    to: mail,
    subject: 'Account activate Shop MegaK',
    text: 'Welcome to MegaK Shop',
    attachments: [{
      filename: 'image.jpg',
      path: './utils/3.jpg',
      cid: 'zaq12wsx',
    }],
    html: `<h1>Welcome ${userName} in MegaK Shop </h1> <p>This is your link to reset password: http://localhost:5000/reset/?token=${token}</p> <img src="cid:zaq12wsx"/>`, // html body
  });
}

module.exports = {
  sendActivateMail,
  resetPasswordMail,
};
