const { createUser, getAllUsers } = require("../controllers/usersControllers");

const postUserHandler = async (req, res) => {
  const { id, username, name, lastname, email, country, phone } = req.body;
  console.log(id, username, name, lastname, email, country, phone);
  try {
    const response = await createUser(
      id,
      username,
      name,
      lastname,
      email,
      country,
      phone
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postUserHandler, getAllUsersHandler };
