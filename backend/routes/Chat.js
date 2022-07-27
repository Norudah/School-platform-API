const { Router } = require("express");
const { Chat, Message } = require("../models/mongo");
const { User, Relation } = require("../models/postgres");

const router = new Router();

// TODO : Factoriser dans un middleware : Verificaiton qu'on est amis + Que c'est la bonne conversation

router.post("/new", async (req, res) => {
  try {
    const [userId, friendId] = [req.user.dataValues.id, req.body.friendId];
    const relation = await Relation.getFriendRelationBetweenTwoUsers(userId, friendId);

    if (!relation) {
      res.status(401).json({
        message: "Vous n'êtes pas amis avec cette personnne",
      });
      return;
    }

    const existingChat = await Chat.findOne({
      participants: {
        $in: [userId, friendId],
      },
    });

    if (existingChat) {
      res.status(401).json({
        message: "Vous avez déjà une conversation avec cet amis",
      });
      return;
    }

    const chat = await Chat.create({
      participants: [friendId, userId],
    });

    res.status(200).json({
      message: "Conversation créé avec succès",
      chat,
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: {
        $in: [req.user.dataValues.id],
      },
    });

    if (!chat) {
      res.status(401).json({
        message: "Ce n'est pas la bonne conversation",
      });
      return;
    }

    const messages = await Message.find({
      chatId: chatId,
    });

    res.status(200).json({
      message: "Liste des messages retrouvés avec succès",
      messages,
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/:chatId/send-new-message", async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const chat = await Chat.findOne({
      _id: chatId,
      participants: {
        $in: [req.user.dataValues.id],
      },
    });

    if (!chat) {
      res.status(401).json({
        message: "Ce n'est pas la bonne conversation",
      });
      return;
    }

    const relation = await Relation.getFriendRelationBetweenTwoUsers(chat.participants[0], chat.participants[1]);

    if (!relation) {
      res.status(401).json({
        message: "Vous n'êtes pas amis avec cette personnne",
      });
      return;
    }

    const message = await Message.create({
      sender: req.user.dataValues.id,
      chatIt: req.params.chatId,
      content: req.body.content,
    });

    res.status(200).json({
      message: "Message envoyé avec succès",
      content: message,
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/delete-message", async (req, res) => {
  try {
    console.log("ICI");
    const [messageId, userId] = [req.body.messageId, req.user.dataValues.id];

    // console.log(messageId, userId);

    const message = await Message.findOne({
      _id: messageId,
      sender: userId,
    });

    if (!message) {
      res.status(401).json({
        message: "Le message cherché n'a pas été trouvé",
      });
      return;
    }

    if (message.deletedAt) {
      res.status(401).json({
        message: "Ce message a déjà été supprimé",
      });
      return;
    }

    await message.updateOne({
      content: "Ce message a été supprimé",
      deletedAt: Date.now(),
    });

    res.status(200).json({
      message: "Votre message a été supprimé",
    });
    return;
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
