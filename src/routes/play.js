import React, {useEffect, useMemo, useContext} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {includes} from 'ramda';

import Mine from '../components/Mine';

const Play = ({match}) => {
  const {
    gameStore: {state, levelKeys, getLevelInfo, fetchMines},
  } = useContext(MobXProviderContext);

  const {
    params: {level},
  } = match;

  const invalidLevel = useMemo(() => !includes(level, levelKeys), [
    level,
    levelKeys,
  ]);

  const levelInfo = useMemo(() => getLevelInfo(level), [getLevelInfo, level]);

  useEffect(() => {
    if (!invalidLevel) {
      fetchMines(level);
    }
  }, [fetchMines, invalidLevel, level]);

  if (invalidLevel || !levelInfo) {
    return <div>Level not found</div>;
  }

  if (state === 'error') {
    return <div>Something went wrong</div>;
  }

  if (state === 'pending') {
    return <div>Please waiting...</div>;
  }

  function handleForceNewGame() {
    fetchMines(level);
  }

  return <Mine level={levelInfo} onForceNewGame={handleForceNewGame} />;
};

export default observer(Play);
