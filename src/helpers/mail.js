import { createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer';

const {
  NODE_ENV, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, DEFAULT_MAIL_SENDER,
} = process.env;

async function getTransporter() {
  let transporter;
  if (NODE_ENV !== 'production') {
    const testAccount = await createTestAccount();
    transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    transporter = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

// eslint-disable-next-line import/prefer-default-export
export async function sendMail(mail) {
  // If there is no sender in payload, set default sender
  const payload = mail;
  if (!payload.from) {
    payload.from = DEFAULT_MAIL_SENDER;
  }

  // Create transporter
  const transporter = await getTransporter();

  // Send mail
  const mailInfo = await transporter.sendMail(payload);

  // If in development mode, console.log the preview url.
  if (NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Mail Preview URL is ${getTestMessageUrl(mailInfo)}`);
  }

  // Return mail response
  return mailInfo;
}
