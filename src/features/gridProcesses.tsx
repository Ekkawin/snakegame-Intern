const checkGridRow = (snakeHead) => {
  switch (snakeHead.rows) {
    case -1:
      snakeHead.rows = 9;

      break;
    case 10:
      snakeHead.rows = 0;

      break;
    default:
  }
};
const checkGridCol = (snakeHead) => {
  switch (snakeHead.cols) {
    case -1:
      snakeHead.cols = 9;

      break;
    case 10:
      snakeHead.cols = 0;

      break;
    default:
  }
};
export const gridProcess = (snakeHead) => {
  checkGridRow(snakeHead);
  checkGridCol(snakeHead);
};

export const gridType = (food, snakeHead, tail, r, c) => {
  if (food?.rows === r && food?.cols === c) return 'foodposition';
  if (snakeHead?.rows === r && snakeHead?.cols === c) return 'headposition';
  if (tail.some((e) => e[0] == r && e[1] == c)) return 'snaketail';
  else return null;
};
