import {observable, computed, decorate} from 'mobx';
import {compose, prop, map} from 'ramda';

class GameStore {
  level = [
    {
      name: 'beginger',
      label: 'Beginner',
      size: 9,
      mines: 10,
      cell: {
        width: 16,
        height: 16,
      },
    },
    {
      name: 'advantage',
      label: 'Advantage',
      size: 16,
      mines: 40,
      cell: {
        width: 21,
        height: 21,
      },
    },
  ];

  get levelKeys() {
    return compose(map(prop('name')))(this.level);
  }
}

decorate(GameStore, {
  level: observable,
  levelKeys: computed,
});

export const gameStore = new GameStore();

export default GameStore;
