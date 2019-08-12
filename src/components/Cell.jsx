import React, {memo, useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {MobXProviderContext} from 'mobx-react';

const Cell = ({x, y, opened, level, forceOpen, onGameOver}) => {
  const {
    gameStore: {calculateMineCount, checkCellIsMine, handleCellOpen},
  } = useContext(MobXProviderContext);

  const mine = checkCellIsMine({x, y});
  const value = calculateMineCount({x, y}, level);

  function handleCheckMine() {
    if (mine) {
      return onGameOver();
    }

    handleCellOpen({x, y}, level);
  }

  return (
    <div
      className={clsx('cell', {
        'is-mine': mine,
        opened: opened || forceOpen,
        empty: !value,
      })}
      onClick={handleCheckMine}>
      {mine ? <img src="/bomb.png" alt="bomb" /> : <span>{value}</span>}
    </div>
  );
};

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default memo(Cell);
