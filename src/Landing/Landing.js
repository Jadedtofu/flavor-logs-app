import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <main className="landing-page" role="main">
                <header className="start-header" role="banner">
                    <h1 className="start-title">Getting Started</h1>
                </header>

                <section>
                    <p>Flavor Log helps you remember the best dishes (or the not-so-best dishes) from new eateries as well as ones you like to frequent.</p>
                    <p>[<em>Screenshot placeholder of Logs</em>]</p>
                </section>

                <section>
                    <header>
                        <h3>Add a Eatery</h3>
                    </header>
                    <p>Begin your log by adding a eatery, such as a new restaurant you visited, or an old bakery with your favorite desserts.</p>
                    <p>[<em>Screenshot placeholder of Add Eatery Form</em>]</p>
                </section>

                <section>
                    <header>
                        <h3>Add a Log</h3>
                    </header>
                    <p>Here, you can note details about the dish you had at a eatery, give it a rating, and the last date you ate it.</p>
                    <p>[<em>Screenshot placeholder of Add Log Form</em>]</p>
                </section>

                <section>
                    <button className="view-logs-btn"><Link to='/myLogs'>View Logs</Link></button>
                </section>    

            </main>
        );
    }
}

export default Landing;