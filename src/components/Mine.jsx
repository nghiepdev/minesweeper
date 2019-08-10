import React, {useState, useMemo, useContext} from 'react';
import PropTypes from 'prop-types';
import {MobXProviderContext} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import Rodal from 'rodal';
import {any, equals} from 'ramda';

import Cell from './Cell';

const Mine = ({level, history, onForceNewGame}) => {
  const {
    gameStore: {mines},
  } = useContext(MobXProviderContext);
  const [gameOver, setGameOver] = useState(false);

  const generateGrid = useMemo(() => {
    const rows = [];

    for (let i = 0; i < level.size; i++) {
      for (let j = 0; j < level.size; j++) {
        const mine = any(mine => equals(mine, [i, j]), mines);
        rows.push(
          <Cell
            key={`${i}-${j}`}
            mine={mine}
            forceOpen={gameOver}
            onGameOver={handleGameOver}
          />,
        );
      }
    }

    return rows;
  }, [gameOver, level.size, mines]);

  function handleGameOver() {
    setGameOver(true);
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
      <Rodal
        visible={gameOver}
        onClose={() => {}}
        closeMaskOnClick={false}
        showCloseButton={false}>
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
