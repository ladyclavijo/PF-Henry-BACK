const { createUser } = require("../controllers/usersControllers");

const postUserHandler = async (req, res) => {
  const { username, name, lastname, email, password, country, phone } =
    req.body;
  try {
    const response = await createUser(
      username,
      name,
      lastname,
      email,
      password,
      country,
      phone
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postUserHandler };
