import { useState, useEffect } from 'react';
import { SnakeContainer } from 'components/snakeContainer';
const keypress = (e) => {
  console.log('WORKING');

  console.log(e);
};

export default () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [grid, setGrid] = useState([]);
  const item = grid.map((e) => {
    return (
      <div className="snakegrid-item" key={e.rols + e.cols}>
        {' '}
      </div>
    );
  });
  useEffect(() => {
    const initialgrid = [];
    for (let rows = 0; rows < row; rows++) {
      console.log(rows);

      for (let cols = 0; cols < col; cols++) {
        initialgrid.push({
          rows,
          cols,
        });
      }
    }
    setGrid(initialgrid);
    window.addEventListener('keydown', function (e) {
      console.log(e);
    });
  }, []);
  console.log(grid);

  return (
    <div onKeyPress={(e) => console.log('hi')}>
      <SnakeContainer onKeyDown={keypress}>
        <div className="snakegrid" onKeyDown={(e) => console.log(e)}>
          {item}
        </div>
      </SnakeContainer>
    </div>
  );
};
