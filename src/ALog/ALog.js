// import React, { Component } from 'react';
// import './ALog.css';
// // import ApiContext from '../ApiContext';
// // import config from '../config';

// class ALog extends Component {
//     static defaultProps = {
//         match: {
//           params: {}
//         },
//     }

//     render() {
//         // const { log } = this.props;
//         return(
//             <section>
//             <header>
//                 <h2 className="log-name">Log Name
//                     <button className="edit-log-btn">
//                         <Link to='/editLog'><i className="fas fa-pencil-alt"></i></Link>
//                     </button>
//                     <button className="delete-log-btn"><i className="fas fa-trash-alt"></i></button>
//                 </h2>
//                 <h3 className="eatery-name">
//                     Eatery Name
//                 </h3>
//             </header>

//             <blockquote>
//                 Log Detail Description
//             </blockquote>

//                 <ul className='item-info'>
//                     <li>Ordered: {log.ordered}</li>
//                     <li className="rating">Rating: {log.rating}</li>
//                     <li className="last-date">Last Date Eaten: {log.date}</li>
//                 </ul>

//             </section>
//         );
//     }
// }

// export default ALog;