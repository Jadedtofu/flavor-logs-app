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

  handleAddEatery = newEatery => {
    this.setState({
      eateries: [
        ...this.state.eateries,
        newEatery
      ]
    });
  }

  handleDeleteEatery = eatery_id => {
    this.setState({
      eateries: this.state.eateries.filter(eatery => eatery.id !== eatery_id)
    });
  }

  // unsure if this is working properly:
  // handleEditEatery = eatery => {
  //   const updatedEateries = this.state.eateries.map(item => {
  //     if(item.id === eatery.id) {
  //       return { ...item, name: eatery.name, phone: eatery.phone, address: eatery.address, notes: eatery.notes}
  //     }
  //     return item;
  //   });
  //   this.setState({ eateries: updatedEateries});
  // }

  handleEditEatery = eatery_id => {
    const updatedEateries = this.state.eateries.map(item => {
      if(item.id === eatery_id) {
        return {name: item.name, 
                phone: item.phone, 
                address: item.address, 
                notes: item.notes}
        }
      return item; // should return updated item?
    });
    this.setState({eateries: updatedEateries});
  }

  handleAddLog = newFlavorLog => {
    this.setState({
      flavorLogs: [
        ...this.state.flavorLogs,
        newFlavorLog
      ]
    });
  }

  handleDeleteLog = flavorLog_id => {
    this.setState({
      flavorLogs: this.state.flavorLogs.filter(flavorLog => flavorLog.id !== flavorLog_id)
    });
  }

  //unsure if this is working properly:
  handleEditLog = flavorLog => {
    const updatedLogs = this.state.flavorLogs.map(item => {
      if (item.id === flavorLog.id) {
        return { ...item, title: flavorLog.title, info: flavorLog.info, ordered: flavorLog.ordered, rating: flavorLog.rating, date: flavorLog.date, image_link: flavorLog.image_link, image_alt: flavorLog.image_alt, eatery_id: flavorLog.eatery_id }
      }
      return item;
    });
    this.setState({ flavorLogs: updatedLogs});
  }

  // handleEditLog = flavorLog_id => {
  //   const updatedFlavorLogs = this.state.flavorLogs.map(item => {
  //     if(item.id === flavorLog_id) {
  //       return {title: item.title, 
  //               info: item.info, 
  //               ordered: item.ordered,
  //               rating: item.rating, 
  //               date: item.date,
  //               image_link: item.image_link,
  //               image_alt: item.image_alt,
  //               eatery_id: item.eatery_id}
  //       }
  //     return item; // should return updated item
  //   });
  //   this.setState({eateries: updatedFlavorLogs});
  // }

  render() {
    const value={
      eateries: this.state.eateries,
      flavorLogs: this.state.flavorLogs,
      addEatery: this.handleAddEatery,
      editEatery: this.handleEditEatery,
      deleteEatery: this.handleDeleteEatery,
      addLog: this.handleAddLog,
      editLog: this.handleEditLog,
      deleteLog: this.handleDeleteLog
    }
    console.log(value);

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
          path='/editLog/:flavorLog_id'
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
          path='/editEatery/:eatery_id'
          component={EditEatery}
        />

        <Footer />
      </ApiContext.Provider>
    );
  }
}

export default App;
