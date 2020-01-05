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
        fetch(`${config.API_ENDPOINT}/flavorLogs`)
        .then(flavorLogsRes => {
            return flavorLogsRes.json();
        })
        .then(flavorLogs => {
            // console.log(this.context.flavorLogs);
            // console.log(flavorLogs);
            this.context.flavorLogs = flavorLogs;
            // console.log(this.context.flavorLogs);
        });
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

            {eateryMapped}

            <section>
                <button className="add-eatery-btn"><Link to='/addEatery'>Add an Eatery</Link></button>
                <p>* Disclaimer: Deleting a eatery will delete ALL logs associated with that eatery</p>
            </section>
        </main>
        );
    }
}

export default MyEateries;
