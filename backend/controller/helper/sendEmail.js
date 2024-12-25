const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async ({ viewFileName, data, from, to, subject }) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "392eed1fffc310",
      pass: "b1d8426d882a8c",
    },
  });

  ejs.renderFile(
    "./views/" + viewFileName + ".ejs",
    data,
    async (err, dataString) => {
      const info = await transport.sendMail({
        from,
        to,
        subject,
        html: dataString, // html body
      });

      console.log("Message sent: %s", info.messageId);
    }
  );
};

module.exports = sendEmail;
