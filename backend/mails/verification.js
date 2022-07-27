require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const getMessage = (toEmail, token) => {
  return {
    to: toEmail,
    from: "g7.project.react.node@gmail.com",
    subject: "Bienvenu ! Veuillez vérifier votre compte",
    text: "Message de description de vérification de compte",
    html: `<p>Bienvenu ! Cliquez pour valider votre inscription :</p><a href="http://localhost:5000/verify/${token}">ICI</a>`,
  };
};

const sendInscriptionEmail = (toEmail, token) => {
  const message = getMessage(toEmail, token);
  sgMail
    .send(message)
    .then(() => {
      console.log("Email de confirmation envoyé");
    })
    .catch((error) => {
      console.log("Erreur lors de l'envoie de l'email de vérification");
      console.error(error);
    });
};

module.exports = sendInscriptionEmail;
