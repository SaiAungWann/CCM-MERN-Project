const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async ({ viewFileName, data, from, to, subject }) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  try {
    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let dataString = await ejs.renderFile(
      "./views/" + viewFileName + ".ejs",
      data
    );

    const info = await transport.sendMail({
      from,
      to,
      subject,
      html: dataString, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    throw new error(e);
    console.log(e);
  }
};

module.exports = sendEmail;
