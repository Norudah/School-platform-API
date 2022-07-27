const { Router } = require("express");
const { User } = require("../models/postgres");
const { Technology } = require("../models/mongo");
const { ValidationError } = require("sequelize");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../lib/jwt");
const router = new Router();
const crypto = require("crypto");
const sendMail = require("../mails");
const { Op } = require("sequelize");

const formatError = (validationError) => {
  return validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

router.post("/register", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      verificationToken: crypto.randomBytes(64).toString("hex"),
    };
    delete newUser.technologies;

    const user = await User.create(newUser);

    const technologies = req.body.technologies;
    const technologyNames = technologies.map((technology) => technology.name);

    const resultTechnologies = await Technology.find({
      name: {
        $in: technologyNames,
      },
    });

    // TODO: A FAIRE POUR L'UPDATE. LA PAS BESOIN CAR LE USER EST CREE EN MEME TEMPS, DONC PAS DE DOUBLON D'IDs
    // Coché et dans le tableau : On change pas
    // Coché et pas dans le tableau : On ajoute l'ID dans le tableau
    // Pas coché et dans le tableau : On retire l'ID du tableau
    // Pas coché et pas dans le tablea : On change pas

    const allUpdatesOperations = [];
    const userId = user.dataValues.id;

    for (const technology of technologies) {
      if (!technology.isChecked) continue;

      const concernedTechnology = resultTechnologies.find(
        (resultTechnology) => resultTechnology.name === technology.name
      );

      if (!concernedTechnology) continue;

      const newUsers = [...concernedTechnology.users, userId];

      allUpdatesOperations.push({
        updateOne: {
          filter: {
            name: concernedTechnology.name,
          },
          update: {
            users: newUsers,
          },
        },
      });
    }

    Technology.bulkWrite(allUpdatesOperations).then((res) => {
      console.log("Documents Updated", res.modifiedCount);
    });

    // TODO: Reactiver pour la mise en prod
    // sendMail.sendInscriptionEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      ...user,
      technologies,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!result) {
      res.status(401).json({
        email: "Email not found",
      });
      return;
    }
    if (!result.isVerified) {
      res.status(401).json({
        message: "Utilisateur non vérifié",
      });
      return;
    }
    if (!(await bcryptjs.compare(req.body.password, result.password))) {
      res.status(401).json({
        password: "Password is incorrect",
      });
      return;
    }

    const token = await createToken(result);

    delete result.password;

    res.status(200).json({
      user: result,
      token,
    });
    return;
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        verificationToken: req.params.token,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "Le token ne correspond pas",
      });
      return;
    }

    await user.update({
      verificationToken: null,
      isVerified: true,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/make-reset-password-request", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "L'email renseigné n'existe pas",
      });
      return;
    }

    await user.update({
      resetToken: crypto.randomBytes(64).toString("hex"),
    });

    if (!user.resetToken) {
      res.status(401).json({
        message: "Something went wrong",
      });
      return;
    }

    sendMail.sendResetPasswordRequest(user.email, user.resetToken);

    res.status(200).json({
      mesage: "Demande de mot de passe perdu fait. Email envoyé",
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/reset-password/:resetToken", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        resetToken: req.params.resetToken,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "Une erreur est survenue. Veuillez faire une nouvelle demande",
      });
      return;
    }

    if (req.body.password) {
      user.update({
        password: req.body.password,
        resetToken: null,
      });
      console.log('user avec "test" comme password. beforeHook non appliqué donc');
      console.log(user);

      await user.save();

      res.status(200).json({
        message: "Le mot de passe a été modifié avec succès",
      });
      return;
    }

    res.status(200).json({
      message: "Les informations sont correctes. Authorisation de changer le mot de passe",
    });
    return;
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

module.exports = router;
