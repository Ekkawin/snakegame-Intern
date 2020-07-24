export const growTail = (eatFood, tail, snakeHead, callback) => {
  if (eatFood) {
    // console.log('tailpop eat food TRUE');

    tail.unshift([snakeHead.rows, snakeHead.cols]);
    callback(false);
  } else {
    // console.log('tailpop eat food FALSE');
    tail.unshift([snakeHead.rows, snakeHead.cols]);
    tail.pop();
  }
};
