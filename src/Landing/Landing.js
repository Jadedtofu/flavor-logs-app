import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <main className="landing-page">
                <header className="app-header" role="banner">
                    <h1 className="app-title">Flavor Logs<i className="fas fa-utensils"></i></h1>
                </header>

                <section>
                    <header>
                        <h3>Getting started</h3>
                    </header>
                <p>[<em>Screenshot placeholder of Logs</em>]</p>
                <p>Flavor Log helps you remember the best dishes (or the not-so-best dishes) from new eateries as well as ones you like to frequent.</p>
                </section>

                <section>
                    <header>
                        <h3>Add a Eatery</h3>
                    </header>
                    <p>[<em>Screenshot placeholder of Add Eatery Form</em>]</p>
                    <p>Begin your log by adding a eatery, such as a new restaurant you visited, or an old bakery with your favorite desserts.</p>
                </section>

                <section>
                    <header>
                        <h3>Add a Log</h3>
                    </header>
                    <p>[<em>Screenshot placeholder of Add Log Form</em>]</p>
                    <p>Here, you can note details about the dish you had at a eatery, give it a rating, and the last date you ate it.</p>
                </section>

                <section>
                    <button className="view-logs-btn"><Link to='/myLogs'>View Logs</Link></button>
                </section>    

            </main>
        );
    }
}

export default Landing;
