import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {MobXProviderContext, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import Rodal from 'rodal';
import {includes} from 'ramda';

import Cell from './Cell';
import Timer from './Timer';

import {secondsToTime} from '../helpers';

const Mine = ({level, history, onForceNewGame}) => {
  const [modal, setModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const {
    gameStore: {mines, cellOpened},
  } = useContext(MobXProviderContext);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
    setModal(true);
  }, []);

  const generateGrid = useMemo(() => {
    const rows = [];

    for (let i = 0; i < level.size; i++) {
      for (let j = 0; j < level.size; j++) {
        rows.push(
          <Cell
            key={`${i}-${j}`}
            x={i}
            y={j}
            forceOpen={gameOver}
            onGameOver={handleGameOver}
            level={level.name}
            opened={includes(`${i}-${j}`, cellOpened)}
          />,
        );
      }
    }

    return rows;
  }, [level.size, level.name, gameOver, handleGameOver, cellOpened]);

  const play = useMemo(() => {
    return !!cellOpened.length;
  }, [cellOpened.length]);

  const isWin = useMemo(() => {
    return cellOpened.length >= level.size * level.size - mines.length;
  }, [cellOpened, level.size, mines]);

  useEffect(() => {
    if (isWin) {
      setModal(isWin);
    }
  }, [isWin]);

  function handleCloseModal() {
    setModal(false);
  }

  const handleGetTimer = useCallback(timer => {
    setTimer(timer);
  }, []);

  return (
    <div>
      <Timer play={play && !isWin && !gameOver} onPause={handleGetTimer} />
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
            <div>You lost the game in {secondsToTime(timer)}</div>
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

export default withRouter(observer(Mine));
