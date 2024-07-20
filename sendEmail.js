// sendEmail.js
const { google } = require('googleapis');
const { getOAuthClient } = require('./gmailAuth');

const gmail = google.gmail('v1');

const sendEmail = async (to, subject, text) => {
  try {
    const auth = await getOAuthClient();
    const raw = createRawEmail(to, subject, text);

    const response = await gmail.users.messages.send({
      auth,
      userId: 'me',
      requestBody: {
        raw,
      },
    });

    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const createRawEmail = (to, subject, text) => {
  const messageParts = [
    `To: ${to}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    `Subject: ${subject}`,
    '',
    text,
  ];

  const message = messageParts.join('\n');
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

module.exports = { sendEmail };
