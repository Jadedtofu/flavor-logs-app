import React, { Component } from 'react';
import './MyLogs.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ALog from '../ALog/ALog';
import config from '../config';

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

    handleDeleteLog = () => {
        this.props.history.push('/myLogs');
        // update the eateries below 
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
            this.context.eateries = eateries;
            this.context.flavorLogs = flavorLogs;
        })
    }

    something = () => {
        console.log(this.context.flavorLogs);
    }

    render() { 
        const { eateries=[], flavorLogs=[] } = this.context;

        const getEateriesForLog = (eateries=[], eateryId) => (
            (!eateryId) 
            ? eateries
            : eateries.filter(eatery => eatery.id === eateryId)
        );
        // console.log(getEateriesForLog(eateries, 3));
        // returns array of eatery objects, each within one array:
        let tempEateryNames = flavorLogs.map(flavorLog => getEateriesForLog(eateries, flavorLog.eatery_id));
        // console.log(tempEateryNames);
        // flattens eateries into array of objects:
        let eateryNames = [].concat.apply([], tempEateryNames);
        // console.log(eateryNames);

        // adds EateryNames into logs: (mutates the logs object)
        for (let i = 0, max = flavorLogs.length; i < max; i++) {
            for (let j = 0, max2 = eateryNames.length; j < max2; j++) {
                if(flavorLogs[i].eatery_id === eateryNames[j].id) {
                    flavorLogs[i].eateryName = eateryNames[j].name;
                }
            }
        }
        // console.log(flavorLogs);

        // // sorting logic: actually sorts the log data and changes the render:
        // // implement switch case for these? ?? 
        // // review onClick value storage in state *** 

        // logs.sort((a, b) => (a.title > b.title) ? 1: -1) // sorts by title
        // logs.sort((a, b) => (a.eateryName > b.eateryName) ? 1: -1); // sort by eatery
        // logs.sort((a, b) => (a.ordered > b.ordered) ? 1: -1); // sorts by ordered
        // logs.sort((a, b) => (a.rating > b.rating) ? -1: 1); // sorts by rating

        // rendering all logs
        const logsMapped = flavorLogs.map(flavorLog => 
            <ALog key={flavorLog.id}
                  id={flavorLog.id}
                  title={flavorLog.title}
                  info={flavorLog.info}
                  ordered={flavorLog.ordered}
                  rating={flavorLog.rating}
                  date={flavorLog.date}
                  image={flavorLog.image_link}
                  image_alt={flavorLog.image_alt}
                  eatery={flavorLog.eateryName}
                  onDeleteLog={this.handleDeleteLog}
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
                        <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                    </div>
                </section>

                {/* <section className="add-log-section">
                    <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                </section> */}

                {logsMapped}

            </main>
        );
    }
}

export default MyLogs;