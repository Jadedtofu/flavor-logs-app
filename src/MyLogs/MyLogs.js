import React, { Component } from 'react';
import './MyLogs.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ALog from '../ALog/ALog';
// import SearchBox from '../SearchBox/SearchBox';

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

    render() {  // figure out sort? 
        // const searchbox = 
        // (<div className="searchby sort">
        //     <SearchBox />
        //     <div className="sortby">
        //         <select name="sortby">
        //             <option value="sort-default">Sort by ...</option>
        //             <option value="eatery">Sort by Eatery</option>
        //             <option value="rating">Sort by Rating</option>
        //             <option value="date">Sort by Date</option>
        //         </select>
        //     </div>
        // </div>);
        
        const { eateries=[], logs=[] } = this.context;

        const getEateriesForLog = (eateries=[], eateryId) => (
            (!eateryId) 
            ? eateries
            : eateries.filter(eatery => eatery.id === eateryId)
        );
        // console.log(getEateriesForLog(eateries, 3));

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
                    {/* {searchbox} */}
                    <button className="add-log-btn"><Link to='/addLog'>Add a log</Link></button>
                </section>

                {logMapped}

            </main>
        );
    }
}

export default MyLogs;