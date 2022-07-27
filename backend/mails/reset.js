require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const getMessage = (toEmail, token) => {
  return {
    to: toEmail,
    from: "g7.project.react.node@gmail.com",
    subject: "Demande de reset de votre mot de passe",
    text: "Message de description de reset de compte",
    html: `<p>Clique sur le lien suivant pour réinitialiser votre mot de passe :</p><a href="http://localhost:5000/request-password/${token}">ICI</a>`,
  };
};

const sendResetPasswordRequest = (toEmail, token) => {
  const message = getMessage(toEmail, token);
  sgMail
    .send(message)
    .then(() => {
      console.log("Email de demande de reset du mot de passe envoyé");
    })
    .catch((error) => {
      console.log("Erreur lors de l'envoie de l'email de demande de mot de passe");
      console.error(error);
    });
};

module.exports = sendResetPasswordRequest;
