import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReferralEmail = async (friendName, friendEmail, referrerName, courseName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: friendEmail,
    subject: `${referrerName} has referred you to a course!`,
    html: `
      <h1>Hello ${friendName}!</h1>
      <p>${referrerName} thinks you might be interested in our ${courseName} course.</p>
      <p>Click here to learn more about the course.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
