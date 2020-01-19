import React, { Component } from 'react';
import './MyEateries.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import Eatery from '../Eatery/Eatery';
import config from '../config';

class MyEateries extends Component {
    static defaultProps = {
        match: {
            params: {}
        },

        history: {
            push: () => { } 
        }
    }

    static contextType = ApiContext;

    handleDeleteEatery = () => {  
        this.props.history.push('/myEateries');
        // update the logs below
        Promise.all([
            fetch(`${config.API_ENDPOINT}/eateries`),
            fetch(`${config.API_ENDPOINT}/flavorLogs`)
        ])
        .then(([eateriesRes, flavorLogsRes]) => {
            if(!eateriesRes.ok) {
                return eateriesRes.json().then(e => Promise.reject(e));
            }
                if(!flavorLogsRes.ok) {
                    return flavorLogsRes.json().then(e => Promise.reject(e));
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

    render() {
        const { eateries=[] } = this.context;

        const eateryMapped = eateries.map(eatery => 
            <Eatery key={eatery.id}
                    id={eatery.id}
                    name={eatery.name}
                    phone={eatery.phone}
                    address={eatery.address}
                    notes={eatery.notes} 
                    onDeleteEatery={this.handleDeleteEatery}
                />
        );

        return(
        <main role="main">
            <header className="my-eateries-header" role="banner">
                <h1 className="my-eateries-title" >My Eateries</h1>
            </header>

            <section>
                <button className="add-eatery-btn"><Link to='/addEatery'>Add an Eatery</Link></button>
            </section>

            {eateryMapped}

            <section>
                <p className="disclaimer-text">* <span className="disclaimer-bold">Disclaimer:</span> Deleting a eatery will delete ALL logs associated with that eatery</p>
            </section>
        </main>
        );
    }
}

export default MyEateries;
