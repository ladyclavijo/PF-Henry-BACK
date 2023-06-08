const { user } = require("../db");

const createUser = async (
  username,
  name,
  lastname,
  email,
  password,
  country,
  phone
) => {
  if (
    !username ||
    !name ||
    !lastname ||
    !email ||
    !password ||
    !country ||
    !phone
  ) {
    throw Error("missing data in createUser");
  } else {
    await user.create({
      username,
      name,
      lastname,
      email,
      password,
      country,
      phone,
    });
    return `new user created`;
  }
};

module.exports = { createUser };
