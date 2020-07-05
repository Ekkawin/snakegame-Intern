import { useState, useEffect } from 'react';
import { SnakeContainer } from 'components/snakeContainer';
import { Head } from 'next/document';

export default () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [grid, setGrid] = useState([]);
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
    console.log(e);
    console.log(e.propItem);

    return (
      <div
        className={
          e.propItem ? `${e.propItem}` + ' snakegrid-item' : 'snakegrid-item'
        }
        key={e.rols + e.cols}
      >
        {' '}
      </div>
    );
  });

  useEffect(() => {
    setFood({
      rows: 1,
      cols: 1,
    });
    setSnakeHead({
      rows: 1,
      cols: 9,
    });
    const initialgrid = [];
    for (let rows = 0; rows < row; rows++) {
      console.log(rows);

      for (let cols = 0; cols < col; cols++) {
        initialgrid.push({
          rows,
          cols,
          propItem: gridType(rows, cols),
        });
      }
    }
    setGrid(initialgrid);
    window.addEventListener('keydown', function (e) {
      console.log(e);
    });
  }, []);
  console.log(food);

  return (
    <SnakeContainer>
      <div className="snakegrid">{item}</div>
    </SnakeContainer>
  );
};
