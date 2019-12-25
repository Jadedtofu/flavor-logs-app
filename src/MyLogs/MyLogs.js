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

        // sorted log titles below: 
        let getLogTitles = (logs) => {
            let logTitles = [];
            for (let i = 0, max = logs.length; i < max; i++) {
                logTitles.push(logs[i].title);
                // console.log(logTitles);
            }
            return logTitles;
        }
        let logTitles = getLogTitles(logs);

        let sortedLogTitles = logTitles.sort((a, b) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0;
        });
        // console.log(sortedLogTitles);
        
        const getLogSorted = (logs=[], sortedLogTitles) => {  // returns an array of the logs sorted by name !!
            let sortedTitleLogs = [];
            for(let i = 0, max = sortedLogTitles.length; i < max; i++) {
                if (!sortedLogTitles[i]) {
                    return logs;
                } else {
                    sortedTitleLogs.push(logs.filter(log => log.title === sortedLogTitles[i]));
                    // console.log(sortedLogs);
                }
            }
            return sortedTitleLogs;
        }
        let tempSortedTitleLogs = getLogSorted(logs, sortedLogTitles);

        let logsSortedByTitle = [].concat.apply([], tempSortedTitleLogs);
        console.log(logsSortedByTitle);

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

        // render of logs sorted by title:
        // const logsSortedTitleMapped = logsSortedByTitle.map(log => 
        //     <ALog key={log.id}
        //     id={log.id}
        //     title={log.title}
        //     info={log.info}
        //     ordered={log.ordered}
        //     rating={log.rating}
        //     date={log.date}
        //     eatery={getEateriesForLog(eateries, log.eatery_id)}
        //     />
        // );

        return(
            <main role="main">
                <header className="my-logs-header" role="banner">
                    <h1 className="my-logs-title">My Logs</h1>
                </header>

                <section>
                    <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                </section>

                {logMapped}
                {/* {logsSortedTitleMapped} */}

            </main>
        );
    }
}

export default MyLogs;