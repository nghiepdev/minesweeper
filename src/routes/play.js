import React, {useContext} from 'react';
import {MobXProviderContext} from 'mobx-react';
import {includes} from 'ramda';

const Play = ({match}) => {
  const {
    gameStore: {levelKeys},
  } = useContext(MobXProviderContext);

  const {
    params: {level},
  } = match;

  if (!includes(level, levelKeys)) {
    return <div>Level not found</div>;
  }

  return <div>Play level: {level}</div>;
};

export default Play;
