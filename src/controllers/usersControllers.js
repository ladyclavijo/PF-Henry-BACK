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

module.exports = { createUser };
