export const directionControls = (directions, snakeHead) => {
  switch (directions) {
    case 'KeyA':
      snakeHead.cols--;

      break;
    case 'KeyW':
      snakeHead.rows--;

      break;
    case 'KeyS':
      snakeHead.rows++;

      break;
    case 'KeyD':
    default:
      snakeHead.cols++;

      break;
  }
};
