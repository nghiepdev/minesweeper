import React from 'react';
import {Provider} from 'mobx-react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import * as stores from './stores';

import Index from './routes';
import Play from './routes/play';

function App() {
  return (
    <div className="App">
      <h1 className="App-header">Minesweeper</h1>
      <Provider {...stores}>
        <Router>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/play/:level" component={Play} />{' '}
            <Route render={() => <div>Page not found</div>} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
