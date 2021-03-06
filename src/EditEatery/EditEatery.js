import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './EditEatery.css';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import ApiContext from '../ApiContext';
import config from '../config';

class EditEatery extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        },

        match: {
            params: {}
        }
    }

    constructor(props) {
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

    updateEateryName(eateryName) {
        this.setState({eateryName}, () => {this.validateEateryName(eateryName)});
    }

    validateEateryName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        // console.log(fieldValue)

        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            // console.log('made it');
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

    handleSubmit = e => {
        e.preventDefault();
        const eatery_id = this.props.match.params.eatery_id;

        const eateryToUpdate = {
            name: e.target['eatery-name'].value,
            phone: e.target['eatery-phone'].value,
            address: e.target['eatery-address'].value,
            notes: e.target['eatery-notes'].value
        };

        fetch(`${config.API_ENDPOINT}/eateries/${eatery_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eateryToUpdate)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
        })
        .then(() => {
            this.context.editEatery(eatery_id);
            // update context:
            Promise.all([
                fetch(`${config.API_ENDPOINT}/eateries`),
                fetch(`${config.API_ENDPOINT}/flavorLogs`)
            ])
            .then(([eateriesRes, flavorLogsRes]) => {
                if(!eateriesRes.ok) {
                    return eateriesRes.json().then(e => Promise.reject(e));
                }
                    if(!flavorLogsRes.ok) {
                        return flavorLogsRes.json().then(e => Promise.reject(e));
                    }
                    return Promise.all([
                        eateriesRes.json(),
                        flavorLogsRes.json()
                    ]);
            })
            .then(([eateries, flavorLogs]) => {
                this.context.eateries = eateries;
                this.context.flavorLogs = flavorLogs;
            })
            .then(() => {
                this.props.history.push('/myEateries');
            });
        })
        .catch(error => {
            console.error({error});
        });
    }

    render() {
        const { eateries=[] } = this.context;
        // need to update the values inside each input to be from the corresponding eatery id
        const eatery_id = this.props.match.params.eatery_id;

        let eateryToEdit = eateries.find(eatery => eatery.id.toString() === eatery_id.toString()); // this only works if I use .toString() or the id#
        // console.log(eateryToEdit); 
        
        let eateryName = '';
        let eateryPhone = '';
        let eateryAddress = '';
        let eateryNotes = '';
        for (let key in eateryToEdit) {
            if (key === 'name') {
                eateryName = eateryToEdit[key];
            }
            if (key === 'phone') {
                eateryPhone = eateryToEdit[key];
            }
            if (key === 'address') {
                eateryAddress = eateryToEdit[key];
            }
            if (key === 'notes') {
                eateryNotes = eateryToEdit[key];
            }
        }

        return (
            <main className="edit-eatery-page" role="main">
                <header className="edit-eatery-header" role="banner">
                    <h1 className="edit-eatery-text">Edit an Eatery</h1>
                </header>

                <ShareForm onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label htmlFor="eatery-name">Eatery *</label>
                        <input type="text" name="eatery-name" defaultValue={eateryName} required 
                            onChange={e => this.updateEateryName(e.target.value)} />
                          <ValidationError hasError={!this.state.eateryNameValid}
                            message={this.state.validationMessages.eateryNameName} />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-phone">Phone Number</label>
                        <input type="text" name="eatery-phone" defaultValue={eateryPhone} />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-address">Address</label>
                        <input type="text" name="eatery-address" defaultValue={eateryAddress} />
                    </div>

                    <div className="field">
                        <label htmlFor="eatery-notes">Additional Notes</label>
                        <textarea name="eatery-notes" rows="5" defaultValue={eateryNotes} />
                    </div>

                    <div className="buttons">
                        <button type="submit" className="edit-eatery-back-btn"><Link to='/myEateries'>Back</Link></button>
                        <button type="submit" className="edit-eatery-form-btn" >Edit</button>
                    </div>
                </ShareForm>

                <section>
                    <p className="required-fields">* Required fields</p>
                </section>
            </main>
        );
    }
}

export default EditEatery;