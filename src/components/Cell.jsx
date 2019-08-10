import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Cell = ({mine, forceOpen, onGameOver}) => {
  function handleCheckMine() {
    if (mine) {
      return onGameOver();
    }
  }

  return (
    <div
      className={clsx('cell', {'is-mine': mine, opened: forceOpen})}
      onClick={handleCheckMine}>
      {mine ? <img src="/bomb.png" alt="bomb" /> : <span>1</span>}
    </div>
  );
};

Cell.propTypes = {
  mine: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default Cell;
