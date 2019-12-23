import React, { Component } from 'react';
import './MyLogs.css';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
// import ApiContext from '../ApiContext';

class MyLogs extends Component {
    render() {
        return(
            <main role="main">
                <header className="my-logs-header" role="banner">
                    <h1 className="my-logs-title">My Logs</h1>
                </header>

                <section className="searchby sort">
                    <SearchBox />
                    <div className="sortby">
                        <select name="sortby">
                            <option value="sort-default">Sort by ...</option>
                            {/* <option value="name">Sort by Name</option> */}
                            <option value="rating">Select by Rating</option>
                            <option value="date">Sort by Date</option>
                        </select>
                    </div>
                </section>

                <section>
                    <button><Link to='/addLog'>Add a log</Link></button>
                </section>

                <section>
                <header>
                    <h2>Best pho in town
                        <button className="edit-log-btn"><i className="fas fa-pencil-alt"></i></button>
                        <button className="delete-log-btn"><i className="fas fa-trash-alt"></i></button>
                    </h2>
                    <h3>Pho Mignon</h3>
                </header>
                    <blockquote>The broth is clear, flavorful, and not greasy at all! The rare steak was not overcooked; the flank was tender. The noodles were soft, but not too soft to break apart with chopsticks. Will go here again!</blockquote>
                    <ul className="item-info">
                        <li>Ordered: P13 - Rare Steak and Flank Beef Noodle Soup</li>
                        <li className="rating">Rating: * * * * *</li>
                        <li className="last-date">Last Date Eaten: 11/10/19</li>
                    </ul>
                </section>

                <section>
                <header>
                    <h2>Softest Bread
                        <button className="edit-log-btn"><i className="fas fa-pencil-alt"></i></button>
                        <button className="delete-log-btn"><i className="fas fa-trash-alt"></i></button>
                    </h2>
                    <h3>200° Bakery</h3>
                </header>
                    <blockquote>The lines were a little long, but worth it. Softest bread roll to start the day. The aroma was perfect, resembling a nice cup of freshly brewed coffee, and the flavor was not overbearing.</blockquote>
                    <ul className="item-info">
                        <li>Ordered: Morning Coffee Roll</li>
                        <li className="rating">Rating: * * * * </li>
                        <li className="last-date">Last Date Eaten: 9/5/19</li>
                    </ul>
                </section>

                <section>
                <header>
                    <h2>Local Homemade Noodles - Asian Style
                        <button className="edit-log-btn"><i className="fas fa-pencil-alt"></i></button>
                        <button className="delete-log-btn"><i className="fas fa-trash-alt"></i></button>
                    </h2>
                    <h3>Mana Noodlehouse</h3>
                </header>
                    <blockquote>First time visiting this place. The noodles were definitely home made, but not of a very consistent shape. They tasted okay, but the broth was a little greasy and there weren't a lot of side dish selections. Might try again later to see if they improve over time.</blockquote>
                    <ul className="item-info">
                        <li>{'Ordered: Chicken & Noodles with Leek'}</li>
                        <li className="rating">Rating: * * *  </li>
                        <li className="last-date">Last Date Eaten: 7/5/19</li>
                    </ul>
                </section>    
            </main>
        );
    }
}

export default MyLogs;