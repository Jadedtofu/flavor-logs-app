import React, { Component } from 'react';
import './ALog.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
// import config from '../config';

class ALog extends Component {
    static defaultProps = {
        match: {
          params: {}
        },
    }

    static contextType = ApiContext;

    render() {      // turn rating into stars !! 
        const { title, info, ordered, rating, date, eatery } = this.props;
        // console.log(this.props);

        const eateryName = eatery[0].name;
        // console.log(eateryName);

        return(
            <section>
                <header role="banner">
                    <h2 className="log-name">{title}</h2>
                    <h3 className="eatery-name">{eateryName}</h3>
                </header>

                <blockquote>
                    {info}
                </blockquote>

                <ul className='item-info'>
                    <li>Ordered: {ordered}</li>
                    <li className="rating">Rating: {rating} </li>
                    <li className="last-date">Last Date Eaten: {date}</li>
                </ul>

                <div className="edit-delete-btns">
                    <button className="edit-log-btn">
                        <Link to='/editLog'><i className="fas fa-pencil-alt"></i></Link>
                    </button>
                    <button className="delete-log-btn"><i className="fas fa-trash-alt"></i></button>
                </div>
            </section>
        );
    }
}

export default ALog;