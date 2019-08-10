import React, {useState, useContext} from 'react';
import {MobXProviderContext} from 'mobx-react';
import {compose, prop, head} from 'ramda';

const Index = ({history}) => {
  const {
    gameStore: {level},
  } = useContext(MobXProviderContext);

  const [levelSelected, setLevel] = useState(
    compose(
      prop('name'),
      head,
    )(level),
  );

  function handleSelectLevel(e) {
    setLevel(e.target.value);
  }

  function handlePlayGame() {
    history.push(`/play/${levelSelected}`);
  }

  return (
    <div>
      <h3>Select game level:</h3>
      <select value={levelSelected} onChange={handleSelectLevel}>
        {level.map(({name, label}) => (
          <option key={name} value={name}>
            {label}
          </option>
        ))}
      </select>
      <div>
        <button onClick={handlePlayGame}>play now</button>
      </div>
    </div>
  );
};

export default Index;
