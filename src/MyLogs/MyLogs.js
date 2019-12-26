import React, { Component } from 'react';
import './MyLogs.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ALog from '../ALog/ALog';

class MyLogs extends Component {
    static defaultProps = {
        match: {
            params: {}
        },

        history: {
            push: () => { } 
        }
    }

    static contextType = ApiContext;

    render() { 
        const { eateries=[], logs=[] } = this.context;

        const getEateriesForLog = (eateries=[], eateryId) => (
            (!eateryId) 
            ? eateries
            : eateries.filter(eatery => eatery.id === eateryId)
        );
        // console.log(getEateriesForLog(eateries, 3));
        // returns array of eatery objects, each within one array:
        let tempEateryNames = logs.map(log => getEateriesForLog(eateries, log.eatery_id));
        // console.log(tempEateryNames);
        // flattens eateries into array of objects:
        let eateryNames = [].concat.apply([], tempEateryNames);
        // console.log(eateryNames);

        // adds EateryNames into logs: (mutates the logs object)
        for (let i = 0, max = logs.length; i < max; i++) {
            for (let j = 0, max2 = eateryNames.length; j < max2; j++) {
                if(logs[i].eatery_id === eateryNames[j].id) {
                    logs[i].eateryName = eateryNames[j].name;
                }
            }
        }
        console.log(logs);

        // // sorting logic: actually sorts the log data and changes the render:
        // // implement switch case for these? ?? 
        // // review onClick value storage in state *** 

        // logs.sort((a, b) => (a.title > b.title) ? 1: -1) // sorts by title
        // logs.sort((a, b) => (a.eateryName > b.eateryName) ? 1: -1); // sort by eatery
        // logs.sort((a, b) => (a.ordered > b.ordered) ? 1: -1); // sorts by ordered
        // logs.sort((a, b) => (a.rating > b.rating) ? -1: 1); // sorts by rating

        // rendering all logs
        const logMapped = logs.map(log => 
            <ALog key={log.id}
                  id={log.id}
                  title={log.title}
                  info={log.info}
                  ordered={log.ordered}
                  rating={log.rating}
                  date={log.date}
                  eatery={log.eateryName}
            />
        );

        return(
            <main role="main">
                <header className="my-logs-header" role="banner">
                    <h1 className="my-logs-title">My Logs</h1>
                </header>

                <section className="sort-add">
                    <div className="sortby">
                        <select className="sortby-options">
                            <option value="default">Sort by All</option>
                            <option value="title">Sort by Title</option>
                            <option value="eatery">Sort by Eatery</option>
                            <option value="ordered">Sort by Ordered</option>
                            <option value="rating">Sort by Rating</option>
                        </select>
                    </div>
                    <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                </section>

                {logMapped}

            </main>
        );
    }
}

export default MyLogs;