import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {MobXProviderContext} from 'mobx-react';

const Cell = ({cell, opened, level, forceOpen, onGameOver}) => {
  const {
    gameStore: {calculateMineCount, checkCellIsMine, handleCellOpen},
  } = useContext(MobXProviderContext);

  const mine = checkCellIsMine(cell);
  const value = calculateMineCount(cell, level);

  function handleCheckMine() {
    if (mine) {
      return onGameOver();
    }

    handleCellOpen(cell, level);
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
  cell: PropTypes.object.isRequired,
  level: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default Cell;
