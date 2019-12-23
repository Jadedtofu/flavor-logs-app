import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import ApiContext from './ApiContext';
// import config from './config';
import './App.css';

class App extends Component {
  state = {
    eateries: [],
    logs: []
  };

  render() {
    const value={
      eateries: this.state.eateries,
      logs: this.state.logs,
      // addEatery: this.state.handleAddEatery,
      // editEatery: this.state.handleEditEatery,
      // deleteEatery: this.state.handleDeleteEatery,
      // addLog: this.state.handleAddLog,
      // editLog: this.state.handleEditLog,
      // deleteLog: this.state.handleDeleteLog
    }

    return(    
      <ApiContext.Provider value={value}>
        <main className="App">
          Main
        </main>
      </ApiContext.Provider>
    );
  }
}

export default App;
