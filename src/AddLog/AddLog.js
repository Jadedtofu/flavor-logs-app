import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './AddLog.css';
import { Link } from 'react-router-dom';
// import ApiContext from '../ApiContext';
// import config from '../config';

class AddLog extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    render() {
        return(
            <main className="add-log-page" role="main">
                <header className="add-log-header" role="banner">
                    <h1 className="add-log-text">Add a Log</h1>
                </header>

                <ShareForm>
                    <div className="field">
                        <label htmlFor="log-title">Log Title</label>
                        <input type="text" name="log-title" placeholder="Best pho in town" required />
                    </div>

                    <div className="field">
                    <label htmlFor="eatery-select">Select a Eatery</label>
                    <select name="eatery-name">
                        <option value="eatery-1">Pho Mignon</option>
                        <option value="eatery-2">200° Bakery</option>
                        <option value="eatery-3">Mana Noodlehouse</option>
                    </select>
                    </div>

                    <div className="field">
                        <label htmlFor="item-ordered">Item(s) Ordered</label>
                        <textarea name="item-ordered" rows="3" placeholder="P13 - Rare Steak and Flank beef Noodle Soup" required></textarea>
                    </div>

                    <div className="field">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" defaultValue="1" min="1" max="5" required />    
                    </div>

                    <div className="field">
                        <label htmlFor="eaten-date">Last Eaten Date</label>
                        <input type="date" name="eaten-date" id="eaten-date" defaultValue="2019-12-24" min="1980-01-01" required />
                    </div>

                    <div className="field">
                        <label htmlFor="log-notes">Log Details</label>
                        <textarea name="log-notes" rows="6" placeholder="The broth is clear, flavorful, and not greasy at all! The rare steak was not overcooked; the flank was tender. The noodles were soft, but not too soft to break apart with chopsticks. Will go here again!"></textarea>
                    </div>

                    <div className="field">
                        <label htmlFor="image-link">Link to Image</label>
                        <input type="text" name="image-link" id="image-link" placeholder="https://i.imgur.com/5NjgwCW.jpg"/>
                    </div>

                    <div className="field">
                        <label htmlFor="image-alt">Description for Image</label>
                        <input type="text" name="image-alt" id="image-alt" placeholder="Coffee Bread Roll next to Cup of Latte"/>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="add-log-back-btn"><Link to='/myLogs'>Back</Link></button>
                        <button type="submit" className="add-log-form-btn"><Link to='/myLogs'>Add</Link></button>
                    </div>
                </ShareForm>
            </main>
        );
    }
}

export default AddLog;