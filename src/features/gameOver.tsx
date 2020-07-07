import { callbackify } from 'util';
export const gameOver = (tail, snakeHead, callback, timeID, router) => {
  if (tail.some((e) => e[0] == snakeHead.rows && e[1] == snakeHead.cols)) {
    console.log('Game Over');
    // callback(timeID);
    router.push('/gameover');
  }
};
