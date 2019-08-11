import React, {useState, useEffect, memo} from 'react';
import PropTypes from 'prop-types';

const Timer = ({play, onPause}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let id;

    if (play) {
      id = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else {
      onPause(seconds);
    }

    return () => {
      clearInterval(id);
    };
  }, [onPause, play, seconds]);

  return <div>{seconds}</div>;
};

Timer.propTypes = {
  play: PropTypes.bool,
  onPause: PropTypes.func.isRequired,
};

export default memo(Timer);
