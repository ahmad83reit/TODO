const nodemailer = require('nodemailer');

exports.SendEmail = async (textMessage, subject, receiverEmail, callback) => {
  // Send the email
  // Send the email
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    secureConnection: true,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var textMessage = textMessage;
  var mailOptions = {
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: subject,
    text: textMessage,
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
      return callback({ IsSended: false, success: false, error: err });
      // this.isCodeSended = false;
    }
    console.log('Sended OK');
    transporter.close();
    return callback({ IsSended: true, success: true });
  });
};
