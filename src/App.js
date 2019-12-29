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
// import config from './config';

class App extends Component {
  state = {
    eateries: [
      {
        id: 1, 
        name: "Pho Mignon", 
        phone: "760-320-5210", 
        address: "1235 North Island Street, San Diego, CA 92108", 
        notes: "Open M-F 9 am - 9 pm, Sat 9 am - 11 pm, Sun 10 am - 8 pm"
      },
      {
        id: 2, 
        name: "200° Bakery", 
        phone: "619-280-7599", 
        address: "8590 Elm Wake Drive, San Diego, CA 92123", 
        notes: "Open M-F 7 am - 5 pm, Sat 7 am - 8 pm, Sun 9 am - 3 pm"
      },
      {
        id: 3, 
        name: "Mana Noodlehouse", 
        phone: "858-780-2323", 
        address: "590 Convoy Street, San Diego, CA 92117", 
        notes: "Open M-F 11 am - 9 pm, Sat 11 am - 12 am, Sun 11 am - 6 pm"
      }
    ],

    logs: [
      {
        id: 1, 
        title: "Best pho in town", 
        info: "The broth is clear, flavorful, and not greasy at all! The rare steak was not overcooked; the flank was tender. The noodles were soft, but not too soft to break apart with chopsticks. Will go here again!",
        ordered: "P13 - Rare Steak and Flank Beef Noodle Soup", 
        rating: 5, 
        date: "2019-11-10T00:00:00.000Z", 
        eatery_id: 1
      },
      {
        id: 2, 
        title: "Softest bread", 
        info: "The lines were a little long, but worth it. Softest bread roll to start the day. The aroma was perfect, resembling a nice cup of freshly brewed coffee, and the flavor was not overbearing", 
        ordered: "Morning Coffee Roll", 
        rating: 4, 
        date: "2019-09-05T00:00:00.000Z", 
        eatery_id: 2},
      {
        id: 3, 
        title: "Local Homemade Noodles", 
        info: "First time visiting this place. The noodles were definitely home made, but not of a very consistent shape. They tasted okay, but the broth was a little greasy and there weren't a lot of side dish selections. Might try again later to see if they improve over time.",
        ordered: "Chicken & Noodles with Leek",
        rating: 3,
        date: "2019-07-05T00:00:00.000Z",
        eatery_id: 3
      },
      {
        id: 4, 
        title: "Fluffy cake", 
        info: "Usually the go-to is bread, but wanted to give the cakes a try. The Peach Fluff caught my eye. The colors were pleasant, and there were small decorative, edible peaches on top. It wasn't overly sweet, but was sweet enough. The cake feels like it melts when eaten, moist and soft, very fluffy like peach cotton candy.",
        ordered: "Peach Fluff Layered Cake",
        rating: 5,
        date: "2019-12-10T00:00:00.000Z",
        eatery_id: 2
      },
      {
        id: 5, 
        title: "Smooth noodles", 
        info: "Tried to eat their noodles again later. The broth and noodle quality improved quite a lot. They're a more consistent shape now and the broth is less greasy. The meat and vegetable ratio was really nice as well. Great aroma.",
        ordered: "Lamb Noodle Broth with Chives and Mushrooms",
        rating: 4,
        date: "2019-11-09T00:00:00.000Z",
        eatery_id: 3
      },
    ]
  };

  // state = {
  //   eateries: [],
  //   logs: []
  // };

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
