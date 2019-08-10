import React, {useState, useCallback, useMemo, useContext} from 'react';
import PropTypes from 'prop-types';
import {MobXProviderContext} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import Rodal from 'rodal';
import {includes} from 'ramda';

import Cell from './Cell';

const Mine = ({level, history, onForceNewGame}) => {
  const {
    gameStore: {mines},
  } = useContext(MobXProviderContext);
  const [modal, setModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [openCells, setOpenCells] = useState([]);

  const calculateMineCount = useCallback(
    (x, y) => {
      let mineCount = 0;

      for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, level.size); i++) {
        for (
          let j = Math.max(y - 1, 0);
          j <= Math.min(y + 1, level.size);
          j++
        ) {
          if (includes(`${i}-${j}`, mines)) {
            mineCount++;
          }
        }
      }

      return mineCount;
    },
    [level.size, mines],
  );

  const handleOpenCell = useCallback(
    (x, y) => {
      setOpenCells([...openCells, `${x}-${y}`]);

      // if (!calculateMineCount(x, y)) {
      //   for (
      //     let i = Math.max(x - 1, 0);
      //     i <= Math.min(x + 1, level.size);
      //     i++
      //   ) {
      //     for (
      //       let j = Math.max(y - 1, 0);
      //       j <= Math.min(y + 1, level.size);
      //       j++
      //     ) {
      //       console.log([i, j], openCells2);

      //       if (!includes(`${i}-${j}`, openCells2)) {
      //         handleOpenCell(i, j);
      //       }
      //     }
      //   }
      // }
    },
    [openCells],
  );

  const generateGrid = useMemo(() => {
    const rows = [];

    for (let i = 0; i < level.size; i++) {
      for (let j = 0; j < level.size; j++) {
        const mine = includes(`${i}-${j}`, mines);
        const opened = includes(`${i}-${j}`, openCells);

        rows.push(
          <Cell
            key={`${i}-${j}`}
            opened={opened}
            mine={mine}
            forceOpen={gameOver}
            value={calculateMineCount(i, j)}
            onGameOver={handleGameOver}
            onOpen={() => handleOpenCell(i, j)}
          />,
        );
      }
    }

    return rows;
  }, [
    handleOpenCell,
    calculateMineCount,
    gameOver,
    level.size,
    mines,
    openCells,
  ]);

  function handleGameOver() {
    setGameOver(true);
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  return (
    <div>
      <section
        className="mines-grid"
        style={{
          '--size': level.size,
          '--width': level.cell,
          '--height': level.cell,
        }}>
        {generateGrid}
      </section>
      <Rodal visible={modal} onClose={handleCloseModal}>
        <div className="rodal-header">
          <h2>Game result</h2>
        </div>
        <div className="rodal-body">
          {gameOver ? (
            <div>You lost the game in hh:mm:ss</div>
          ) : (
            <div>You won</div>
          )}
        </div>
        <div className="rodal-footer">
          <button onClick={onForceNewGame}>New game</button>
          <button onClick={() => history.push('/')}>Home page</button>
        </div>
      </Rodal>
    </div>
  );
};

Mine.propTypes = {
  level: PropTypes.object.isRequired,
  onForceNewGame: PropTypes.func.isRequired,
};

export default withRouter(Mine);
