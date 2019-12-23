import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './AddEatery.css';
// import ApiContext from '../ApiContext';
// import config from '../config';

class AddEatery extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    render() {
        return (
            <main className="add-eatery-page" role="main">
                <header className="add-eatery-header" role="banner">
                    <h1 className="add-eatery-text">Add a Eatery</h1>
                </header>

                <ShareForm>
                    <div className="field">
                        <label htmlFor="eatery-name">Eatery</label>
                        <input type="text" name="eatery-name" placeholder="Pho Mignon" required />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-phone">Phone Number</label>
                        <input type="text" name="eatery-phone" placeholder="760-320-5210" />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-address">Address</label>
                        <input type="text" name="eatery-address" placeholder="1235 North Island Street, San Diego, CA 92108" />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-notes">Additional Notes</label>
                        <textarea name="eatery-notes" rows="5" placeholder="Open M-F 9 am - 9 pm, Sat 9 am - 11 pm, Sun 10 am - 8 pm"></textarea>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="add-eatery-form-btn">Add</button>
                    </div>
                </ShareForm>
            </main>
        );
    }
}

export default AddEatery;