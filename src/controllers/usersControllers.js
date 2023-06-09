const { user } = require("../db");

const createUser = async (
  id,
  username,
  name,
  lastname,
  email,
  country,
  phone
) => {
  if (!id || !username || !name || !lastname || !email || !country || !phone) {
    throw Error("missing data in createUser");
  } else {
    await user.create({
      id,
      username,
      name,
      lastname,
      email,
      country,
      phone,
    });
    return `new user created`;
  }
};

const getAllUsers = async () => {
  const response = await user.findAll();
  return response;
};

module.exports = { createUser, getAllUsers };
