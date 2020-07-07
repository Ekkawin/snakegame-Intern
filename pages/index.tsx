import { useState, useEffect } from 'react';
import { SnakeContainer } from 'components/snakeContainer';
import { useRouter, Router } from 'next/router';

export default () => {
  useRouter();
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('KeyD');
  const [time, setTime] = useState(1000);
  const [tail, setTail] = useState([]);
  const [eatFood, setEatFood] = useState(false);
  const [snakeHead, setSnakeHead] = useState({
    rows: 1,
    cols: 1,
  });
  const [food, setFood] = useState({
    rows: 1,
    cols: 9,
  });
  const isEatFood = (arr) => {
    console.log(food.rows, arr[arr.length - 1][0]);
    console.log(food.cols, arr[arr.length - 1][0]);
    console.log(arr);

    if (
      food.rows === arr[arr.length - 1][0] &&
      food.cols === arr[arr.length - 1][1]
    ) {
      setEatFood(true);
      setTime(time * 0.7 + 100);
      console.log(time);

      while (arr.some((e) => e[0] == food.rows && e[1] == food.cols)) {
        food.rows = Math.round(Math.random() * (row - 1));
        food.cols = Math.round(Math.random() * (col - 1));
      }
    }
    console.log('FoodPosition', food.rows, food.cols);
  };
  const tailPop = () => {
    if (eatFood) {
      console.log('tailpop eat food TRUE');

      tail.unshift([snakeHead.rows, snakeHead.cols]);
      setEatFood(false);
    } else {
      console.log('tailpop eat food FALSE');
      tail.unshift([snakeHead.rows, snakeHead.cols]);
      tail.pop();
    }
  };
  const checkGridRow = () => {
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
  const checkGridCol = () => {
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
  const router = useRouter();
  const gameOver = () => {
    if (tail.some((e) => e[0] == snakeHead.rows && e[1] == snakeHead.cols)) {
      console.log('Game Over');
      router.push('/gameover');
    }
  };

  const gridType = (r, c) => {
    if (food?.rows === r && food?.cols === c) return 'foodposition';
    if (snakeHead?.rows === r && snakeHead?.cols === c) return 'headposition';
    if (tail.some((e) => e[0] == r && e[1] == c)) return 'snaketail';
    else return null;
  };

  const item = grid.map((e) => {
    return (
      <div
        className={
          e.propItem ? `${e.propItem}` + ' snakegrid-item' : 'snakegrid-item'
        }
        key={`${e.rows} ${e.cols}`}
      >
        {' '}
      </div>
    );
  });
  const interval = () => {
    tailPop();
    switch (direction) {
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
    checkGridRow();
    console.log('chage head row', snakeHead.rows);

    checkGridCol();
    console.log('chage head col', snakeHead.cols);
    gameOver();
    isEatFood(tail.concat([[snakeHead.rows, snakeHead.cols]]));

    const initialgrid = [];
    for (let rows = 0; rows < row; rows++) {
      for (let cols = 0; cols < col; cols++) {
        initialgrid.push({
          rows,
          cols,
          propItem: gridType(rows, cols),
        });
      }
    }
    setGrid(initialgrid);
  };

  useEffect(() => {
    console.log(direction, 'direction');

    const intervalID = setInterval(interval, time);
    window.addEventListener('keydown', function (e) {
      console.log(e.code, 'setdirection');
      console.log(snakeHead);

      setDirection(e.code);
    });
    // setInterval(() => console.log(direction), 5000);
    return () => clearInterval(intervalID);
  }, [direction, eatFood]);

  return (
    <SnakeContainer>
      <div className="snakegrid">{item}</div>
    </SnakeContainer>
  );
};
