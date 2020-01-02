import React, { Component } from 'react';
import './MyEateries.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import Eatery from '../Eatery/Eatery';
// import SearchBox from '../SearchBox/SearchBox';

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

    handleDeleteEatery = () => {  // not sure if this goes here
        this.props.history.push('/myEateries');
    }

    handleEditEatery = () => {
        this.props.history.push('/myEateries');
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
                    onEditEatery={this.handleEditEatery}
                />
        );

        return(
        <main role="main">
            <header className="my-eateries-header" role="banner">
                <h1 className="my-eateries-title" >My Eateries</h1>
            </header>

            {/* <section className="searchby">
                <SearchBox />
            </section> */}

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
