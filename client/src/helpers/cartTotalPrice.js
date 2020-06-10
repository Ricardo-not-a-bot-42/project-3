const cartMealTotal = (cart) => {
  return cart.reduce((acc, meal) => {
    return acc + meal.quantity;
  }, 0);
};

const cartTotalPrice = (cart) => {
  let totalAmount = cart.reduce(
    (sum, item) => sum + item.meal.price.amount * item.quantity,
    0
  );
  const mealAmount = cartMealTotal(cart);
  const originalAmount = totalAmount;
  let tenMealDiscountValue = 0;
  let fifteenMealDiscountValue = 0;
  if (mealAmount >= 5) {
    tenMealDiscountValue = totalAmount * 0.1;
    totalAmount -= tenMealDiscountValue;
  }
  if (mealAmount >= 10) {
    fifteenMealDiscountValue = totalAmount * 0.15;
    totalAmount -= fifteenMealDiscountValue;
  }

  const initialPrice = {
    amount: originalAmount,
    currency: 'EUR',
  };
  const totalPrice = {
    amount: totalAmount,
    currency: 'EUR',
  };
  const tenMealDiscount = {
    amount: tenMealDiscountValue,
    currency: 'EUR',
  };
  const fifteenMealDiscount = {
    amount: fifteenMealDiscountValue,
    currency: 'EUR',
  };
  // const cartValues
  return { totalPrice, tenMealDiscount, fifteenMealDiscount, initialPrice };
};

export { cartTotalPrice, cartMealTotal };
