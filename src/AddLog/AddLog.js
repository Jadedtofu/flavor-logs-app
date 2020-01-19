import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './AddLog.css';
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import ApiContext from '../ApiContext';
import config from '../config';

class AddLog extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            flavorLogTitle: '',
            flavorLogEatery: '',
            flavorLogInfo: '',
            flavorLogDate: '',
            flavorLogTitleValid: false,
            flavorLogEateryValid: false,
            flavorLogInfoValid: false,
            formValid: false,
            validationMessages: {
                flavorLogTitleTitle: '',
                flavorLogEateryName: '',
                flavorLogLogInfo: '',
            }
        }
    }

    addFlavorLogTitle(flavorLogTitle) {
        this.setState({flavorLogTitle}, () => {this.validateFlavorLogTitle(flavorLogTitle)});
    }

    addFlavorLogEatery(flavorLogEatery) {
        this.setState({flavorLogEatery}, () => {this.validateFlavorLogEatery(flavorLogEatery)});
    }

    addFlavorLogInfo(flavorLogInfo) {
        this.setState({flavorLogInfo}, () => {this.validateFlavorLogInfo(flavorLogInfo)});
    }

    validateFlavorLogTitle(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
            fieldErrors.flavorLogTitleTitle = 'Please type a title for this Flavor Log';
            hasError = true;
        }

        this.setState({
            validationMessages: fieldErrors,
            flavorLogTitleValid: !hasError
        }, this.formValid);
    }

    validateFlavorLogEatery(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        if(fieldValue === "empty") {
            fieldErrors.flavorLogEateryName = 'Please select an eatery';
            hasError = true;
        }

        this.setState({
            validationMessages: fieldErrors,
            flavorLogEateryValid: !hasError
        }, this.formValid);
    }

    validateFlavorLogInfo(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        if(fieldValue.length === 0) {
            fieldErrors.flavorLogLogInfo = 'Please type some details for this Flavor Log';
            hasError = true;
        }

        this.setState({
            validationMessages: fieldErrors,
            flavorLogInfoValid: !hasError
        }, this.formValid);
    }

    formValid() {
        this.setState({
            formValid: this.state.flavorLogTitleValid && this.state.flavorLogEateryValid && this.state.flavorLogInfoValid
        });
    }
    
    static contextType = ApiContext;

    handleSubmit = e => {
        e.preventDefault();
        const flavorLog = {
            title: e.target['log-title'].value,
            info: e.target['log-info'].value,
            ordered: e.target['log-ordered'].value,
            rating: e.target['log-rating'].value,
            date: e.target['log-date'].value,
            image_link: e.target['image-link'].value,
            image_alt: e.target['image-alt'].value,
            eatery_id: e.target['eatery-id'].value
        }

        fetch(`${config.API_ENDPOINT}/flavorLogs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(flavorLog)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            return res.json();
        })
        .then(flavorLog => {
            this.context.addLog(flavorLog);
            // update context
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
                this.props.history.push(`/myLogs`);
            });
        })
        .catch(error => {
            console.error({ error });
        });
    }

    render() {
        const { eateries=[] } = this.context;

        return(
            <main className="add-log-page" role="main">
                <header className="add-log-header" role="banner">
                    <h1 className="add-log-text">Add a Log</h1>
                </header>

                <ShareForm onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="log-title-text" htmlFor="log-title">Log Title *</label>
                        <input type="text" name="log-title" placeholder="Best pho in town" required
                          onChange={e => this.addFlavorLogTitle(e.target.value)} />
                          <ValidationError hasError={!this.state.flavorLogTitleValid}
                            message={this.state.validationMessages.flavorLogTitleTitle} />
                    </div>

                    <div className="field">
                    <label htmlFor="eatery-select-text">Select an Eatery *</label>
                    <select className="eatery-select" id="eatery-input" name="eatery-id"
                      onChange={e => this.addFlavorLogEatery(e.target.value)} >
                        <option className="options" value="empty">...</option>
                        {eateries.map(eatery =>
                            <option key={eatery.id} value={eatery.id}>
                                {eatery.name}
                            </option>
                        )}
                    </select>
                    <ValidationError hasError={!this.state.flavorLogEateryValid}
                      message={this.state.validationMessages.flavorLogEateryName} />
                    </div>

                    <div className="field">
                        <label htmlFor="log-ordered">Item(s) Ordered</label>
                        <textarea name="log-ordered" rows="3" placeholder="P13 - Rare Steak and Flank beef Noodle Soup"></textarea>
                    </div>

                    <div className="field">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="log-rating" id="rating" defaultValue="3" min="1" max="5" />    
                    </div>

                    <div className="field">
                        <label htmlFor="eaten-date">Last Eaten Date</label>
                        <input className="eaten-date-text" type="date" name="log-date" id="eaten-date" defaultValue="2020-01-15"
                         min="1980-01-01"/>
                    </div>

                    <div className="field">
                        <label htmlFor="log-info">Log Details *</label>
                        <textarea name="log-info" rows="6" placeholder="The broth is clear, flavorful, and not greasy at all! The rare steak was not overcooked; the flank was tender. The noodles were soft, but not too soft to break apart with chopsticks. Will go here again!"
                          onChange={e => this.addFlavorLogInfo(e.target.value)} />
                          <ValidationError hasError={!this.state.flavorLogInfoValid}
                            message={this.state.validationMessages.flavorLogLogInfo} />
                    </div>

                    <div className="field">
                        <label htmlFor="image-link">Link to Image</label>
                        <input type="text" name="image-link" id="image-link" placeholder="https://i.imgur.com/5NjgwCW.jpg"/>
                    </div>

                    <div className="field">
                        <label htmlFor="image-alt">Image Description for Screen Readers</label>
                        <input type="text" name="image-alt" id="image-alt" placeholder="Coffee Bread Roll next to Cup of Latte"/>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="add-log-back-btn"><Link to='/myLogs'>Back</Link></button>
                        <button type="submit" className="add-log-form-btn" >Add</button>
                    </div>
                </ShareForm>
                
                <section>
                    <p className="required-fields">* Required fields</p>
                </section>
            </main>
        );
    }
}

export default AddLog;