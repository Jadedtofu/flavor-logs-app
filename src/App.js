import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import Landing from './Landing/Landing';
import ApiContext from './ApiContext';
// import config from './config';
import './App.css';
import MyLogs from './MyLogs/MyLogs';
import MyEateries from './MyEateries/MyEateries';

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
        <Nav />

        <Route
          exact path='/'
          component={Landing}
        />

        <Route
          path='/myLogs'
          component={MyLogs}
        />

        <Route
          path='/myEateries'
          component={MyEateries}
        />

        <Footer />
      </ApiContext.Provider>
    );
  }
}

export default App;
