import {observable, computed, action, decorate} from 'mobx';
import {compose, prop, propEq, map} from 'ramda';
import Axios from 'axios';

class GameStore {
  state = 'pending';

  level = [
    {
      name: 'beginger',
      label: 'Beginner',
      size: 9,
      mines: 10,
      cell: '40px',
    },
    {
      name: 'advantage',
      label: 'Advantage',
      size: 16,
      mines: 40,
      cell: '35px',
    },
  ];

  mines = [];

  get levelKeys() {
    // TODO: remove soon
    // add for ignore mobx debug
    if (!this.level) {
      return undefined;
    }

    return compose(map(prop('name')))(this.level);
  }

  getLevelInfo = level => {
    return this.level.find(propEq('name', level));
  };

  fetchMines = async level => {
    this.state = 'pending';

    try {
      const {size, mines} = this.getLevelInfo(level);

      const {
        data: {data},
      } = await Axios.get(
        `https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`,
      );

      this.mines = data.map(({x, y}) => [x, y]);

      this.state = 'done';
    } catch (e) {
      this.state = 'error';
    }
  };
}

decorate(GameStore, {
  state: observable,
  level: observable,
  mines: observable,
  levelKeys: computed,
  fetchMines: action,
});

export const gameStore = new GameStore();

export default GameStore;
