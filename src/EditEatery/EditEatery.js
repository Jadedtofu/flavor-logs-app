import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './EditEatery.css';
import { Link } from 'react-router-dom';
// import ApiContext from '../ApiContext';
// import config from '../config';

class EditEatery extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    render() {
        return (
            <main className="edit-eatery-page" role="main">
                <header className="edit-eatery-header" role="banner">
                    <h1 className="edit-eatery-text">Edit a Eatery</h1>
                </header>

                <ShareForm>
                    <div className="field">
                        <label htmlFor="eatery-name">Eatery</label>
                        <input type="text" name="eatery-name" defaultValue="Pho Mignon" required />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-phone">Phone Number</label>
                        <input type="text" name="eatery-phone" defaultValue="760-320-5210" />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-address">Address</label>
                        <input type="text" name="eatery-address" defaultValue="1235 North Island Street, San Diego, CA 92108" />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-notes">Additional Notes</label>
                        <textarea name="eatery-notes" rows="5" defaultValue="Open M-F 9 am - 9 pm, Sat 9 am - 11 pm, Sun 10 am - 8 pm" />
                    </div>

                    <div className="buttons">
                        <button type="submit" className="edit-eatery-back-btn"><Link to='/myEateries'>Back</Link></button>
                        <button type="submit" className="edit-eatery-form-btn"><Link to='/myEateries'>Edit</Link></button>
                    </div>
                </ShareForm>
            </main>
        );
    }
}

export default EditEatery;