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
import AddEatery from './AddEatery/AddEatery';
import AddLog from './AddLog/AddLog';
import EditEatery from './EditEatery/EditEatery';

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
          path='/addLog'
          component={AddLog}
        />

        <Route
          path='/myEateries'
          component={MyEateries}
        />

        <Route 
          path='/addEatery'
          component={AddEatery}
        />

        <Route
          path='/editEatery'
          component={EditEatery}
        />

        <Footer />
      </ApiContext.Provider>
    );
  }
}

export default App;
