export const stockPrice = async (req, res, next) => {
  try {
    const price = getMockStockPrice();
    console.log(price);
    // return response
    return res.status(200).json({
      success: true,
      message: "Here is stock price",
      data: {
        price,
      },
    });
  } catch (err) {
    next(err);
  }
};
