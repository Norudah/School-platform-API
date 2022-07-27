const { Router } = require("express");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const { Relation, User } = require("../models/postgres");
const { Op } = require("sequelize");

const router = new Router();

router.post("/make-friend-request", async (req, res) => {
  try {
    const { from, to } = req.body;

    if (req.user.dataValues.id !== from) {
      res.status(401).json({
        message: "La demande d'amis ne provient pas du bon utilisateur",
      });
    }

    const result = await User.findAll({
      where: {
        id: {
          [Op.or]: [from, to],
        },
      },
    });

    if (result.length !== 2) {
      res.status(401).json({
        message: "Il faut au moins 2 utilsateur",
      });
      return;
    }

    const relation = await Relation.getRelationBetweenTwoUsers(from, to);

    if (relation) {
      res.status(401).json({
        message: "Une relation existe déjà entre les deux utilisateurs",
      });
      return;
    }

    const newRelation = await Relation.create({
      status: "PENDING",
      fromId: from,
      toId: to,
    });

    res.status(200).json({
      message: "Relation ajouté avec succès",
      newRelation: newRelation,
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/my-friend-requests", async (req, res) => {
  try {
    const { userId } = req.body;
    const userIdConnected = req.user.dataValues.id;
    if (userIdConnected !== userId) {
      res.status(401).json({
        message: "La requête ne provient pas du bon utilisateur",
      });
      return;
    }

    const relations = await Relation.findAll({
      where: {
        toId: userId,
        status: "PENDING",
      },
    });

    res.status(200).json({
      message: "Relations obtenues avec succès",
      relations: relations,
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/accept-friend-request", async (req, res) => {
  try {
    const { relationId } = req.body;
    console.log(relationId);
    const relation = await Relation.findByPk(relationId);
    console.log("RELATION");
    console.log(relation);

    if (!relation) {
      res.status(404).json({
        message: "La relation n'existe pas",
      });
      return;
    }

    if (relation.dataValues.toId !== req.user.dataValues.id) {
      res.status(401).json({
        message: "La relation ne correspond pas",
      });
      return;
    }

    if (relation.dataValues.status !== "PENDING") {
      res.status(401).json({
        message: "La demande d'amis a déjà été accepté",
      });
      return;
    }

    await relation.update({
      status: "CONFIRMED",
    });

    res.status(200).json({
      message: "Demande d'amis accepté",
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/remove-friend", async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.dataValues.id;

    const relation = await Relation.getRelationBetweenTwoUsers(friendId, userId);

    if (!relation) {
      res.status(404).json({
        message: "La relation n'existe pas",
      });
      return;
    }

    await relation.destroy();

    res.status(200).json({
      message: "Relation supprimé avec succès",
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
