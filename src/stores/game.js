import {observable, computed, action, decorate} from 'mobx';
import {compose, prop, propEq, map, includes} from 'ramda';
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

  cellOpened = [];

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

  calculateMineCount = ({x, y}, level) => {
    const {size} = this.getLevelInfo(level);
    let mineCount = 0;

    for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, size); i++) {
      for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, size); j++) {
        if (this.checkCellIsMine({x: i, y: j})) {
          mineCount++;
        }
      }
    }

    return mineCount;
  };

  checkCellOpened = ({x, y}) => {
    return includes(`${x}-${y}`, this.cellOpened);
  };

  checkCellIsMine = ({x, y}) => {
    return includes(`${x}-${y}`, this.mines);
  };

  handleCellOpen = ({x, y}, level) => {
    if (this.checkCellOpened({x, y}) || this.checkCellIsMine({x, y})) {
      return;
    }

    const {size} = this.getLevelInfo(level);

    this.cellOpened = [...this.cellOpened, `${x}-${y}`];

    if (this.calculateMineCount({x, y}, level) === 0) {
      for (let i = Math.max(x - 1, 0); i < Math.min(x + 1, size); i++) {
        for (let j = Math.max(y - 1, 0); j < Math.min(y + 1, size); j++) {
          this.handleCellOpen({x: i, y: j}, level);
        }
      }
    }
  };

  fetchMines = async level => {
    this.state = 'pending';
    this.cellOpened = [];

    try {
      const {size, mines} = this.getLevelInfo(level);

      const {
        data: {data},
      } = await Axios.get(
        `https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`,
      );

      this.mines = data.map(({x, y}) => `${x}-${y}`);

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
  cellOpened: observable,
  levelKeys: computed,
  fetchMines: action,
  calculateMineCount: action,
  checkCellOpened: action,
  checkCellIsMine: action,
  handleCellOpen: action,
});

export const gameStore = new GameStore();

export default GameStore;
