const mailer = async (receiverMail, code) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.ACADEMIALINK_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "AcademiaLink",
    to: receiverMail,
    subject: `OTP for classroom`,
    text: `Your OTP is ${code}`,
    html: `<b>Your OTP is ${code} </b>`,
  });

  console.log(`Message Sent : ${info.messageId}`);

  if (info.messageId) {
    return true;
  }
  return false;
};

export default mailer;
