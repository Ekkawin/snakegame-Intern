import { useState, useEffect } from 'react';
import { SnakeContainer } from 'components/snakeContainer';
import { Head } from 'next/document';

export default () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState('ArrowLeft');
  const [time, setTime] = useState(3000);
  const [snakeHead, setSnakeHead] = useState({
    rows: 1,
    cols: 1,
  });
  const [food, setFood] = useState({
    rows: 1,
    cols: 9,
  });

  const gridType = (r, c) => {
    if (food?.rows === r && food?.cols === c) return 'foodposition';
    if (snakeHead?.rows === r && snakeHead?.cols === c) return 'headposition';
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
    console.log(direction);

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
    switch (direction) {
      case 'ArrowLeft':
        snakeHead.cols--;
        break;
      case 'ArrowUp':
        snakeHead.rows--;
        break;
      case 'ArrowDown':
        snakeHead.rows++;
        break;
      case 'ArrowRight':
      default:
        snakeHead.cols++;
        break;
    }

    console.log('This will run every second!');
  };

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      console.log(e.code);

      setDirection(e.code);
      setInterval(interval, 2000);
    });
  }, [direction]);
  console.log(food);

  return (
    <SnakeContainer>
      <div className="snakegrid">{item}</div>
    </SnakeContainer>
  );
};
