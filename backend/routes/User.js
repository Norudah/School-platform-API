const { Router } = require("express");
const { User, Relation } = require("../models/postgres");
const { ValidationError, Op } = require("sequelize");
const checkIsAdmin = require("../middlewares/checkIsAdmin");

const router = new Router();

const formatError = (validationError) => {
  return validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

router.get("/", async (req, res) => {
  try {
    const result = await User.findAll({
      where: {
        isVerified: true,
        id: {
          [Op.ne]: req.user.dataValues.id,
        },
      },
    });
    res.status(200).json(result);
    return;
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/my-friends", async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    const result = await User.findAll({
      where: {
        isVerified: true,
      },
    });

    // const result = await User.findAll({
    //   include: {
    //     model: Relation,
    //     through: { attributes: [] },
    //     where: {
    //       [Op.or]: {
    //         fromId: userId,
    //         to: userId,
    //       },
    //     },
    //   },
    //   where: {
    //     isVerified: true,
    //     id: {
    //       [Op.ne]: req.user.dataValues.id,
    //     },
    //   },
    // });
    res.status(200).json(result);
    return;
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

// router.post("/", checkIsAdmin, async (req, res) => {
//   try {
//     const result = await User.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       res.status(422).json(formatError(error));
//     } else {
//       res.sendStatus(500);
//       console.error(error);
//     }
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const result = await User.findByPk(parseInt(req.params.id, 10));
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [nbLines, [result]] = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id, 10),
      },
      returning: true,
    });
    if (!nbLines) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const nbLines = await User.destroy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    if (!nbLines) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
