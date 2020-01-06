import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './AddEatery.css';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import ApiContext from '../ApiContext';
import config from '../config';

class AddEatery extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    constructor(props) {  // validation is only for Eatery Name as req'd field
        super(props);
        this.state = {
            eateryName: '',
            eateryNameValid: false,
            formValid: false,
            validationMessages: {
                eateryNameName: '',
            }
        }
    }

    addEateryName(eateryName) {
        this.setState({eateryName}, () => {this.validateEateryName(eateryName)});
    }

    validateEateryName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            fieldErrors.eateryNameName = 'Please type a name for this eatery';
            hasError = true;
        }

        this.setState({
            validationMessages: fieldErrors,
            eateryNameValid: !hasError
        }, this.formValid);
    }

    formValid() {
        this.setState({
            formValid: this.state.eateryNameValid
        });
    }

    static contextType = ApiContext;

    // adds eatery:
    handleSubmit = e => {
        e.preventDefault();
        const eatery = {
            name: e.target['eatery-name'].value,
            phone: e.target['eatery-phone'].value,
            address: e.target['eatery-address'].value,
            notes: e.target['eatery-notes'].value
        }

        fetch(`${config.API_ENDPOINT}/eateries`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eatery)
        })
        // .then(res => {
        //     console.log(eatery)
        // })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then(eatery => {
            this.context.addEatery(eatery);
            // update context
            Promise.all([
                fetch(`${config.API_ENDPOINT}/eateries`),
                fetch(`${config.API_ENDPOINT}/flavorLogs`)
            ])
            .then(([eateriesRes, flavorLogsRes]) => {
                if(!eateriesRes.ok) {
                    return eateriesRes.json().then(e => Promise.reject(e))
                }
                    if(!flavorLogsRes.ok) {
                        return flavorLogsRes.json().then(e => Promise.reject(e))
                    }
                    return Promise.all([
                        eateriesRes.json(),
                        flavorLogsRes.json()
                    ])
            })
            .then(([eateries, flavorLogs]) => {
                this.context.eateries = eateries;
                this.context.flavorLogs = flavorLogs;
            })
            .then(() => {
                this.props.history.push(`/myEateries`)
            })
        })
        .catch(error => {
            console.error({error})
        });
    }

    render() {
        return (
            <main className="add-eatery-page" role="main">
                <header className="add-eatery-header" role="banner">
                    <h1 className="add-eatery-text">Add an Eatery</h1>
                </header>

                <ShareForm onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label htmlFor="eatery-name">Eatery *</label>
                        <input type="text" name="eatery-name" placeholder="Pho Mignon" required
                          onChange={e => this.addEateryName(e.target.value)} />
                        <ValidationError hasError={!this.state.eateryNameValid}
                          message={this.state.validationMessages.eateryNameName} />
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
                        <button type="submit" className="add-eatery-back-btn"><Link to='/myEateries'>Back</Link></button>
                        <button type="submit" className="add-eatery-form-btn" disabled={!this.state.formValid}>Add</button>
                    </div>

                </ShareForm>
                <section>
                    <p className="required-field">* Required field</p>
                </section>
            </main>
        );
    }
}

export default AddEatery;