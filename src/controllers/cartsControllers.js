const { cart } = require("../db");

const createCart = async (title, cover, price, quantity, userId, bookId) => {
  if (!userId || !bookId) {
    throw Error("missing data in createCart");
  } else {
    await cart.create({
      title,
      cover,
      price,
      quantity,
      userId,
      bookId,
    });
    return `new cart created`;
  }
};

const getAllCarts = async () => {
  const response = await cart.findAll();
  return response;
};

const updateCart = async (userId, bookId, updateData) => {
  console.log(bookId, userId, updateData);
  if (!bookId || !userId || !updateData) {
    throw Error("missing data in updateCart");
  } else {
    console.log("hola");
    const cartToUpdate = await cart.findOne({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });
    console.log(cartToUpdate);
    if (!cartToUpdate) {
      throw Error(
        `Cart with user id:${userId} and book id:${bookId} not found`
      );
    }

    const updatedCartData = {};

    if (updateData.title) {
      updatedCartData.title = updateData.title;
    }
    if (updateData.cover) {
      updatedCartData.cover = updateData.cover;
    }
    if (updateData.price) {
      updatedCartData.price = updateData.price;
    }
    if (updateData.quantity) {
      updatedCartData.quantity = updateData.quantity;
    }

    await cart.update(updatedCartData, {
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    return `Cart updated with the user id:${userId} and book id:${bookId}`;
  }
};
const deleteCart = async (userId, bookId) => {
  if (!userId || !bookId) {
    throw Error("missing data in deleteCart");
  } else {
    const cartToDelete = await cart.findOne({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });
    if (!cartToDelete) {
      throw Error(
        `Cart with user id:${userId} and book id:${bookId} not found`
      );
    }

    await cart.destroy({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    return `Cart deleted with user id:${userId} and book id:${bookId}`;
  }
};

module.exports = {
  createCart,
  getAllCarts,
  updateCart,
  deleteCart,
};
