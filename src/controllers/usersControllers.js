const { user, order, review } = require("../db");
const { getClearShoppingOrder } = require("../data/data");

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
  let response = await user.findByPk(id, {
    include: [
      {
        model: order,
        as: "orders",
        attributes: { exclude: ["userId"] },
      },
      {
        model: review,
        attributes: { exclude: ["userId"] },
      },
    ],
  });
  const auxOrders = response.orders.map((order) => {
    return {
      id: order.id,
      items: order.items.filter((elem) => elem.hasOwnProperty("id")),
      total:
        order.items.find((elem) => elem.hasOwnProperty("total")).total / 100,
      createdAt: order.createdAt,
    };
  });
  for (const element of auxOrders) {
    element.items = await getClearShoppingOrder(element.items);
  }
  return {response , detailShopHistory: auxOrders}
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
  await review.create({ rating, reviewContent, userId, bookId });
};

const deletReview = async (id) => {
  const deleted = await review.destroy({
    where: {
      id: id,
    },
  });
  if (deleted === 0) throw Error("Review not found");
  else return "Review deleted successfully";
};
module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  postReview,
  deletReview,
};
