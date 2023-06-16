const { user, order, review } = require("../db");

const createUser = async (
  id,
  username,
  name,
  lastname,
  email,
  country,
  phone
) => {
  if (!id || !username || !email) {
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

const getUserById = async (id) => {
  const response = await user.findByPk(id, {
    include: {
      model: order,
      as: "orders",
      attributes: { exclude: ["userId"] },
    },
    include: {
      model: review,
      attributes: { exclude: ["userId"] },
    }
  });
  return response;
};

const updateUser = async (id, updateData) => {
  if (!id || !updateData) {
    throw Error("missing data in updateUser");
  } else {
    const userToUpdate = await user.findByPk(id);
    if (!userToUpdate) {
      throw Error(`User with id:${id} not found`);
    }

    const updatedUserData = {};

    if (updateData.username) {
      updatedUserData.username = updateData.username;
    }
    if (updateData.name) {
      updatedUserData.name = updateData.name;
    }
    if (updateData.lastname) {
      updatedUserData.lastname = updateData.lastname;
    }
    if (updateData.email) {
      updatedUserData.email = updateData.email;
    }
    if (updateData.country) {
      updatedUserData.country = updateData.country;
    }
    if (updateData.postalcode) {
      updatedUserData.postalcode = updateData.postalcode;
    }
    if (updateData.photo) {
      updatedUserData.photo = updateData.photo;
    }
    if (updateData.phone) {
      updatedUserData.phone = updateData.phone;
    }
    if (updateData.paymentMethod) {
      updatedUserData.paymentMethod = updateData.paymentMethod;
    }
    if (updateData.shippingAddress) {
      updatedUserData.shippingAddress = updateData.shippingAddress;
    }
    if (updateData.isActive !== undefined) {
      updatedUserData.isActive = updateData.isActive;
    }
    if (updateData.isBan !== undefined) {
      updatedUserData.isBan = updateData.isBan;
    }
    if (updateData.isAdmin !== undefined) {
      updatedUserData.isAdmin = updateData.isAdmin;
    }

    await user.update(updatedUserData, {
      where: {
        id: id,
      },
    });

    return `User updated with the id:${id}`;
  }
};

const postReview = async (userId, bookId, rating, reviewContent) => {
  await review.create({ rating, reviewContent, userId, bookId })
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  postReview,
};
