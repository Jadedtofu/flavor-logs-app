import React, { Component } from 'react';
import ShareForm from '../ShareForm/ShareForm';
import './EditLog.css'
import { Link } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import ApiContext from '../ApiContext';
import config from '../config';

class EditLog extends Component {
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
            flavorLogTitle: '',
            flavorLogEatery: '',
            flavorLogInfo: '',
            flavorLogTitleValid: false,
            flavorLogInfoValid: false,
            formValid: false,
            validationMessages: {
                flavorLogTitleTitle: '',
                flavorLogLogInfo: ''
            }
        }
    }

    updateFlavorLogTitle(flavorLogTitle) {
        this.setState({flavorLogTitle}, () => {this.validateFlavorLogTitle(flavorLogTitle)});
    }
    
    handleFlavorLogEatery(flavorLogEatery) {  // just update the name of the eatery
        this.setState({flavorLogEatery});
    }

    updateFlavorLogInfo(flavorLogInfo) {
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
            formValid: this.state.flavorLogTitleValid && this.state.flavorLogInfoValid
        });
    }

    static contextType = ApiContext;
    
    handleSubmit = e => {  
        e.preventDefault();
        const flavorLog_id = this.props.match.params.flavorLog_id;

        const flavorLogToUpdate = {
            title: e.target['log-title'].value,
            info: e.target['log-info'].value,
            ordered: e.target['log-ordered'].value,
            rating: e.target['log-rating'].value,
            date: e.target['log-date'].value,
            image_link: e.target['image-link'].value,
            image_alt: e.target['image-alt'].value,
            eatery_id: e.target['eatery-id'].value
        }

        fetch(`${config.API_ENDPOINT}/flavorLogs/${flavorLog_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(flavorLogToUpdate)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
        })
        .then(() => {
            this.context.editLog(flavorLog_id)
            // update context with new updated Flavor Log:

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
        const { eateries=[], flavorLogs=[] }  = this.context;

        const getEateriesForLog = (eateries=[], eateryId) => (
            (!eateryId) 
            ? eateries
            : eateries.filter(eatery => eatery.id === eateryId)
        );
        let tempEateryNames = flavorLogs.map(flavorLog => getEateriesForLog(eateries, flavorLog.eatery_id));
        let eateryNames = [].concat.apply([], tempEateryNames);

        for (let i = 0, max = flavorLogs.length; i < max; i++) {
            for (let j = 0, max2 = eateryNames.length; j < max2; j++) {
                if(flavorLogs[i].eatery_id === eateryNames[j].id) {
                    flavorLogs[i].eateryName = eateryNames[j].name;
                }
            }
        }
        // getting eateryName added to flavorLogs

        const flavorLog_id = this.props.match.params.flavorLog_id;

        let flavorLogToEdit = flavorLogs.find(flavorLog => flavorLog.id.toString() === flavorLog_id.toString()); // this only works if I use .toString() or the id#

        let flavorLogTitle = '';
        let flavorLogInfo = '';
        let flavorLogOrdered = '';
        let flavorLogRating = null;
        let flavorLogDate = '';
        let flavorLogImgLink = '';
        let flavorLogImgAlt = '';
        let flavorLogEateryId = null;
        let flavorLogEatery = '';
        for (let key in flavorLogToEdit) {
            if (key === 'title') {
                flavorLogTitle = flavorLogToEdit[key];
            }
            if (key === 'info' ) {
                flavorLogInfo = flavorLogToEdit[key];
            }
            if (key === 'ordered') {
                flavorLogOrdered = flavorLogToEdit[key];
            }
            if (key === 'rating') {
                flavorLogRating = flavorLogToEdit[key];
            }
            if (key === 'date') {
                flavorLogDate = flavorLogToEdit[key];
            }
            if (key === 'image_link') {
                flavorLogImgLink = flavorLogToEdit[key];
            }
            if (key === 'image_alt') {
                flavorLogImgAlt = flavorLogToEdit[key];
            }
            if (key === 'eatery_id') {
                flavorLogEateryId = flavorLogToEdit[key];
            }
            if (key === 'eateryName') {
                flavorLogEatery = flavorLogToEdit[key];
            }
        }

        let eateriesOptions = eateries.filter(eatery => eatery.id !== flavorLogEateryId);

        return(
            <main className="edit-log-page" role="main">
                <header className="edit-log-header" role="banner">
                    <h1 className="edit-log-text">Edit a Log</h1>
                </header>

                <ShareForm onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label htmlFor="log-title">Log Title *</label>
                        <input type="text" name="log-title" defaultValue={flavorLogTitle} required
                          onChange={e => this.updateFlavorLogTitle(e.target.value)} />
                          <ValidationError hasError={!this.state.flavorLogTitleValid}
                            message={this.state.validationMessages.flavorLogTitleTitle} />
                    </div> 

                    <div className="field"> 
                    <label htmlFor="eatery-select-text">Select an Eatery *</label>
                    <select className="eatery-select" id="eatery-input" name="eatery-id"
                      onChange={e => this.handleFlavorLogEatery(e.target.value)}>
                        <option className="options" value={flavorLogEateryId}>{flavorLogEatery}</option>
                        {eateriesOptions.map(eatery => 
                            <option key={eatery.id} value={eatery.id}>
                                {eatery.name}
                            </option>)}
                    </select>
                    </div>

                    <div className="field">
                        <label htmlFor="log-ordered">Item(s) Ordered</label>
                        <textarea name="log-ordered" rows="3" defaultValue={flavorLogOrdered}></textarea>
                    </div>

                    <div className="field">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="log-rating" id="rating" defaultValue={flavorLogRating} min="1" max="5" />    
                    </div>

                    <div className="field">
                        <label htmlFor="log-date">Last Eaten Date</label>
                        <input type="date" name="log-date" id="eaten-date" defaultValue={flavorLogDate} 
                         min="1980-01-01"/>
                    </div>

                    <div className="field">
                        <label htmlFor="log-info">Log Details *</label>
                        <textarea name="log-info" rows="6" defaultValue={flavorLogInfo}
                          onChange={e => this.updateFlavorLogInfo(e.target.value)} />
                          <ValidationError hasError={!this.state.flavorLogInfoValid}
                            message={this.state.validationMessages.flavorLogLogInfo} />
                    </div>

                    <div className="field">
                        <label htmlFor="image-link">Link to Image</label>
                        <input type="text" name="image-link" id="image-link" defaultValue={flavorLogImgLink}/>
                    </div>

                    <div className="field">
                        <label htmlFor="image-alt">Image Description for Screen Readers</label>
                        <input type="text" name="image-alt" id="image-alt" defaultValue={flavorLogImgAlt}/>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="edit-log-back-btn"><Link to='/myLogs'>Back</Link></button>
                        <button type="submit" className="edit-log-form-btn" >Edit</button>
                    </div>
                </ShareForm>
                <section>
                    <p className="required-fields">* Required fields</p>
                </section>
            </main>
        );
    }
}

export default EditLog;