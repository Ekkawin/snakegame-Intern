import { useState, useEffect } from 'react';
import { SnakeContainer } from 'components/snakeContainer';
import { useRouter, Router } from 'next/router';
import { isEatFood, randomFoodPosition } from 'features/foodProcesses';
import { gridProcess, gridType } from 'features/gridProcesses';
import { directionControls } from 'features/directionControls';

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

  const router = useRouter();
  const gameOver = () => {
    if (tail.some((e) => e[0] == snakeHead.rows && e[1] == snakeHead.cols)) {
      console.log('Game Over');
      router.push('/gameover');
    }
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
    directionControls(direction, snakeHead);

    gridProcess(snakeHead);
    if (
      isEatFood(
        food,
        tail.concat([[snakeHead.rows, snakeHead.cols]]),
        setEatFood
      )
    ) {
      randomFoodPosition(food, tail.concat([[snakeHead.rows, snakeHead.cols]]));
      setTime(time * 0.7 + 100);
    }
    const initialgrid = [];
    for (let rows = 0; rows < row; rows++) {
      for (let cols = 0; cols < col; cols++) {
        initialgrid.push({
          rows,
          cols,
          propItem: gridType(food, snakeHead, tail, rows, cols),
        });
      }
    }
    setGrid(initialgrid);
  };

  useEffect(() => 
    console.log(direction, 'direction');

    const intervalID = setInterval(interval, time);
    window.addEventListener('keydown', function (e) {
      console.log(e.code, 'setdirection');
      console.log(snakeHead);

      setDirection(e.code);
    });
    // setInterval(() => console.log(direction), 5000);
    return () => {clearInterval(intervalID);
  }, [direction, eatFood]);

  return (
    <SnakeContainer>
      <div className="snakegrid">{item}</div>
    </SnakeContainer>
  );
};
