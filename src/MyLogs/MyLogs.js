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

        // rendering logs
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

        return(
            <main role="main">
                <header className="my-logs-header" role="banner">
                    <h1 className="my-logs-title">My Logs</h1>
                </header>

                <section>
                    <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                </section>

                {logMapped}

            </main>
        );
    }
}

export default MyLogs;