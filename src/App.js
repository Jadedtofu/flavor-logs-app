import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import Landing from './Landing/Landing';
import './App.css';
import MyLogs from './MyLogs/MyLogs';
import MyEateries from './MyEateries/MyEateries';
import AddEatery from './AddEatery/AddEatery';
import AddLog from './AddLog/AddLog';
import EditEatery from './EditEatery/EditEatery';
import EditLog from './EditLog/EditLog';
import ApiContext from './ApiContext';
import config from './config';

class App extends Component {
  state = {
    eateries: [],
    flavorLogs: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/eateries`),
      fetch(`${config.API_ENDPOINT}/flavorLogs`)
    ])
    .then(([eateriesRes, flavorLogsRes]) => {
      if(!eateriesRes.ok) {
        return eateriesRes.json().then(e => Promise.reject(e))
      }
        if(!flavorLogsRes.ok) {
          return flavorLogsRes.json().then(e => Promise.reject(e))
        }
          return Promise.all([
            eateriesRes.json(),
            flavorLogsRes.json()
          ])
    })
    .then(([eateries, flavorLogs]) => {
      this.setState({ eateries, flavorLogs})
    })
    .catch(error => {
      console.log({ error })
    });
  }

  handleAddEatery = eatery => {
    this.setState({
      eateries: [
        ...this.state.eateries,
        eatery
      ]
    });
  }

  // unsure if this is working properly:
  handleEditEatery = eatery_id => {
    const updatedEateries = this.state.eateries.map(item => {
      if(item.id === eatery_id) {
        return { ...item, name: name, phone: phone, address: address, notes: notes}
      }
      return item;
    });
    this.setState({ eateries: updatedEateries});
  }

  handleDeleteEatery = eatery_id => {
    this.setState({
      eateries: this.state.eateries.filter(eatery => eatery.id !== eatery_id)
    });
  }

  handleAddLog = flavorLog => {
    this.setState({
      flavorLogs: [
        ...this.state.flavorLogs,
        flavorLog
      ]
    });
  }

  // unsure if this is working properly:
  handleEditLog = flavorLog_id => {
    const updatedLogs = this.state.flavorLogs.map(item => {
      if (item.id === flavorLog_id) {
        return { ...item, title: title, info: info, ordered: ordered, rating: rating, date: date, image_link: image_link, image_alt: image_alt, eatery_id: eatery_id }
      }
      return item;
    });
    this.setState({ flavorLogs: updatedLogs});
  }

  handleDeleteLog = flavorLog_id => {
    this.setState({
      flavorLogs: this.state.flavorLogs.filter(flavorLog => flavorLog.id !== flavorLog_id)
    });
  }

  render() {
    const value={
      eateries: this.state.eateries,
      flavorLogs: this.state.flavorLogs,
      addEatery: this.state.handleAddEatery,
      editEatery: this.state.handleEditEatery,
      deleteEatery: this.state.handleDeleteEatery,
      addLog: this.state.handleAddLog,
      editLog: this.state.handleEditLog,
      deleteLog: this.state.handleDeleteLog
    }
    // console.log(value);

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
          path='/editLog'
          component={EditLog}
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
