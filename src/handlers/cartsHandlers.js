const {
  createCart,
  getAllCarts,
  updateCart,
  deleteCart,
} = require("../controllers/cartsControllers");

const postCartHandler = async (req, res) => {
  const { title, cover, price, quantity, userId, bookId } = req.body;
  try {
    const response = await createCart(
      title,
      cover,
      price,
      quantity,
      userId,
      bookId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllCartsHandler = async (req, res) => {
  try {
    const response = await getAllCarts();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCartHandler = async (req, res) => {
  const { title, cover, price, quantity, userId, bookId } = req.body;

  const updateData = {
    title,
    cover,
    price,
    quantity,
  };

  try {
    const response = await updateCart(userId, bookId, updateData);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteCartHandler = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const response = await deleteCart(userId, bookId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCartHandler,
  getAllCartsHandler,
  updateCartHandler,
  deleteCartHandler,
};
