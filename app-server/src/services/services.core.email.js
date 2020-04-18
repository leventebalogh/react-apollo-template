const sendgrid = require("@sendgrid/mail");
const { config } = require("./services.core.config");
const { logging } = require("./services.core.logging");

export const sendEmail = async ({
  // Can be either a single e-mail address, or an Array
  to = "",
  from = "",
  subject = "",
  textMessage = "",
  htmlMessage = "",
  // Optional, can be a single e-mail address, or an Array
  cc,
  // Optional, can be a single e-mail address, or an Array
  bcc,
}) => {
  const msg = {
    to,
    cc,
    bcc,
    subject,
    from,
    text: textMessage,
    html: htmlMessage,
  };

  sendgrid.setApiKey(config.sendgrid.apiKey);

  try {
    await sendgrid.send(msg);
    logging.info("[Email] - Successful sending", { to, cc, bcc, subject });
  } catch (e) {
    const response = e.response.body;

    logging.error("[Email] - Error while sending", {
      to,
      cc,
      bcc,
      subject,
      response,
    });
  }
};
