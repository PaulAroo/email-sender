const express = require("express");
const { json } = require("express");
const mailer = require("nodemailer");

require("dotenv").config();

const {
  PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

const app = express();

app.use(json());

const emailSender = mailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  },
});

function sendMail(emailAddress, res) {
  emailSender.sendMail(
    {
      from: "timmypaul2006@gmail.com",
      to: `timmypaul2006@gmail.com, ${emailAddress}`,
      subject: "sending Automated Emails",
      text: "tests sending Automated Emails using nodemailer",
      html: `<h1>Hello Friend 🙌, I hope this meets you well This is a test to see if sending automated emails works on this application, a copy of this mail will be sent to both ${emailAddress} and ${MAIL_USERNAME}</h1>`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "failed to send email" });
      } else {
        res.json({ message: "email successfully sent", data: info });
      }
    }
  );
}

app.get("/", (req, res) => {
  res.json({
    message:
      "use /sendMail/<emailAddress> to send an automated email to the specified email address",
  });
});

app.get("/sendMail/:emailAddress", (req, res) => {
  const { emailAddress } = req.params;
  if (emailAddress) {
    sendMail(emailAddress, res);
  } else {
    res.send("please provide an email address");
  }
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`server running on ${PORT}`);
});
