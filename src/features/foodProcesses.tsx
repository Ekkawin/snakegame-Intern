export const isEatFood = (food, arr, callback) => {
  console.log('food', food);

  console.log('arr', arr);

  if (
    food.rows === arr[arr.length - 1][0] &&
    food.cols === arr[arr.length - 1][1]
  ) {
    callback(true);
    return true;
  } else {
    return false;
  }
};

export const randomFoodPosition = (food, arr) => {
  while (arr.some((e) => e[0] == food.rows && e[1] == food.cols)) {
    food.rows = Math.round(Math.random() * 9);
    food.cols = Math.round(Math.random() * 9);
  }
};
