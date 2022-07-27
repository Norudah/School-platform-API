require("dotenv").config();
const { sequelize } = require("./models/postgres");
const { Technology } = require("./models/mongo");
const { User } = require("./models/postgres");
const { mongoose } = require("./models/mongo/db");

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
  sequelize.close();
});

// mongo

const reset = async () => {
  const collections = await mongoose.connection.collections;

  for (let collection of collections) {
    await collection.deleteMany({});
  }
};

const seeder = async () => {
  const technologyNames = ["Node JS", "React", "Angular"];

  technologyNames.forEach(async (name) => {
    await Technology.create({
      name: name,
      users: [],
    });
  });
};

(async function () {
  // await reset(); // do not work
  await seeder();
})();

// psql

// const users = [
//   {
//     email: "pierucci.romain@gmail.com",
//     password: "OKOKOK",
//     isAdmin: "true",
//     isVerified: "true",
//     firstname: "Romain Pierucci",
//   },
//   {
//     email: "sylvain.boudacher@gmail.com",
//     password: "OKOKOK",
//     isAdmin: "false",
//     isVerified: "true",
//     firstname: "Sylvain Boudacher",
//   },
// ];

// users.forEach(async (user) => {
//   await User.create(user);
// });
