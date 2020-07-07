import { useState, useEffect } from 'react';
import { SnakeContainer } from 'components/snakeContainer';
import { directionControls } from 'features/directionControls';
import { isEatFood, randomFoodPosition } from 'features/foodProcesses';
import { gridProcess, gridType } from 'features/gridProcesses';
import { gameOver } from 'features/gameOver';
import { useRouter } from 'next/router';
import { growTail } from 'features/growTail';

export default () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('ArrowLeft');
  const [time, setTime] = useState(1000);
  const [tail, setTail] = useState([]);
  const [eatFood, setEatFood] = useState(false);
  const [timeID, setTimeID] = useState(null);
  const [snakeHead, setSnakeHead] = useState({
    rows: 1,
    cols: 1,
  });
  const [food, setFood] = useState({
    rows: 1,
    cols: 9,
  });
  const router = useRouter();

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
    growTail(eatFood, tail, snakeHead, setEatFood);
    directionControls(direction, snakeHead);
    gridProcess(snakeHead);
    gameOver(tail, snakeHead, clearInterval(), timeID, router);
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

    console.log('This will run every second!');
  };

  useEffect(() => {
    console.log(direction, 'direction');

    const intervalID = setInterval(interval, time);
    setTimeID(intervalID);
    window.addEventListener('keydown', function (e) {
      console.log(e.code, 'setdirection');

      setDirection(e.code);
    });
    // setInterval(() => console.log(direction), 5000);
    return () => clearInterval(intervalID);
  }, [direction, eatFood]);
  console.log(food);

  return (
    <SnakeContainer>
      <div className="snakegrid">{item}</div>
    </SnakeContainer>
  );
};
