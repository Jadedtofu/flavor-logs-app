import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <main className="landing-page" role="main">
                <header className="title-header" role="banner">
                    <h1 className="title-name">Flavor Logs</h1>
                    <h2 className="title-sub">A record of dishes you've eaten at your favorite places</h2>
                </header>

                <section>
                    <header >
                        <h3 className="landing-sub-header">Getting Started</h3>
                    </header>
                    <p className="landing-info">Flavor Log helps you remember the best dishes (or the not-so-best dishes) from new eateries as well as ones you like to frequent.</p>
                    <img className="my-logs-gif" src="https://i.imgur.com/463Ne0w.gif" alt="Scrolling gif of My Logs Page"></img>
                </section>
                <section>
                    <header >
                        <h3 className="landing-sub-header">Add an Eatery</h3>
                    </header>
                    <p className="landing-info">Begin your log by adding a eatery, such as a new restaurant you visited, or an old bakery with your favorite desserts.</p>
                    <img className="add-eatery-gif" src="https://i.imgur.com/H62MVNm.gif" alt="Scrolling gif of Add Eatery Form"></img>
                </section>

                <section>
                    <header >
                        <h3 className="landing-sub-header">Add a Log</h3>
                    </header>
                    <p className="landing-info">Here, you can note details about the dish you had at a eatery, give it a rating, the last date you ate it, and even add an image.</p>
                    <img className="add-log-gif" src="https://i.imgur.com/FYBTU2r.gif" alt="Scrolling gif of Add Log Form"></img>
                </section>

                <section>
                    <button className="view-logs-btn"><Link to='/myLogs'>View Logs</Link></button>
                </section>    

            </main>
        );
    }
}

export default Landing;
