import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './EditLog.css'
import { Link } from 'react-router-dom';
// import ApiContext from '../ApiContext';
// import config from '../config';

class EditLog extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    render() {
        return(
            <main className="edit-log-page" role="main">
                <header className="edit-log-header" role="banner">
                    <h1 className="edit-log-text">Edit a Log</h1>
                </header>

                <ShareForm>
                    <div className="field">
                        <label htmlFor="log-title">Log Title</label>
                        <input type="text" name="log-title" defaultValue="Best pho in town" required />
                    </div>

                    <div className="field">
                    <label htmlFor="eatery-select-text">Select a Eatery</label>
                    <select className="eatery-select" id="eatery-input" name="eatery-id">
                        <option value="eatery-1">Pho Mignon</option>
                        <option value="eatery-2">200° Bakery</option>
                        <option value="eatery-3">Mana Noodlehouse</option>
                    </select>
                    </div>

                    <div className="field">
                        <label htmlFor="log-ordered">Item(s) Ordered</label>
                        <textarea name="log-ordered" rows="3" defaultValue="P13 - Rare Steak and Flank beef Noodle Soup"></textarea>
                    </div>

                    <div className="field">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="log-rating" id="rating" defaultValue="1" min="1" max="5" />    
                    </div>

                    <div className="field">
                        <label htmlFor="log-date">Last Eaten Date</label>
                        <input type="date" name="eaten-date" id="eaten-date" defaultValue="2020-01-01" 
                         min="1980-01-01"/>
                    </div>

                    <div className="field">
                        <label htmlFor="log-info">Log Details</label>
                        <textarea name="log-info" rows="6" defaultValue="The broth is clear, flavorful, and not greasy at all! The rare steak was not overcooked; the flank was tender. The noodles were soft, but not too soft to break apart with chopsticks. Will go here again!" />
                    </div>

                    <div className="field">
                        <label htmlFor="image-link">Link to Image</label>
                        <input type="text" name="image-link" id="image-link" defaultValue="https://i.imgur.com/5NjgwCW.jpg"/>
                    </div>

                    <div className="field">
                        <label htmlFor="image-alt">Description for Image</label>
                        <input type="text" name="image-alt" id="image-alt" defaultValue="Coffee Bread Roll next to Cup of Latte"/>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="edit-log-back-btn"><Link to='/myLogs'>Back</Link></button>
                        <button type="submit" className="edit-log-form-btn"><Link to='/myLogs'>Edit</Link></button>
                    </div>
                </ShareForm>
            </main>
        );
    }
}

export default EditLog;