import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Cell = ({value, opened, mine, forceOpen, onGameOver, onOpen}) => {
  function handleCheckMine() {
    if (mine) {
      return onGameOver();
    }
    onOpen();
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
  value: PropTypes.number.isRequired,
  opened: PropTypes.bool.isRequired,
  mine: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default Cell;
