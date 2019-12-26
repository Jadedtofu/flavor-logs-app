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

        // returns array of eatery object within an array:
        let tempEateryNames = logs.map(log => getEateriesForLog(eateries, log.eatery_id));
        // console.log(tempEateryNames);

        // flattens eateries into array of objects:
        let eateryNames = [].concat.apply([], tempEateryNames);
        // console.log(eateryNames);
        
        /*  *** ??  ***/ 
        logs[0].eateryName = eateryNames[0].name;
        logs[1].eateryName = eateryNames[1].name;
        logs[2].eateryName = eateryNames[2].name;
        logs[3].eateryName = eateryNames[3].name;
        logs[4].eateryName = eateryNames[4].name;
        // how to do the above but for the entire log using the entire eateryNames array? 
        console.log(logs);
        
        // sorting logic: (need logic for sort by eatery and date)
        // logs.sort((a, b) => (a.title > b.title) ? 1: -1) // sorts by title
        // logs.sort((a, b) => (a.ordered > b.ordered) ? 1: -1); // sorts by ordered
        // logs.sort((a, b) => (a.rating > b.rating) ? -1: 1); // sorts by rating 
        // logs.sort((a, b) => (a.eateryName > b.eateryName) ? 1: -1); // sort by eatery 
        // sort by date ?  ??  ? 
 
        // rendering all logs
        const logMapped = logs.map(log => 
            <ALog key={log.id}
                  id={log.id}
                  title={log.title}
                  info={log.info}
                  ordered={log.ordered}
                  rating={log.rating}
                  date={log.date}
                  eatery={getEateriesForLog(eateries, log.eatery_id)}
            />
        );

        // const sortby = 
        // (
        //     <div className="sortby">
        //         <select name="sortby">
        //             <option value="sort-default">Sort by Title</option>
        //             {/* <option value="eatery">Sort by Eatery</option>
        //             <option value="rating">Sort by Rating</option>
        //             <option value="date">Sort by Date</option> */}
        //         </select>
        //     </div>);

        return(
            <main role="main">
                <header className="my-logs-header" role="banner">
                    <h1 className="my-logs-title">My Logs</h1>
                </header>

                <section>
                    {/* {sortby} */}
                    <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                </section>

                {logMapped}


            </main>
        );
    }
}

export default MyLogs;