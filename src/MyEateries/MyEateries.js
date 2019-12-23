import React, { Component } from 'react';
import './MyEateries.css';
// import { Link } from 'react-router-dom';
// import ApiContext from '../ApiContext';

class MyEateries extends Component {
    render() {
        return(
        <main role="main">
            <header className="my-eateries-header" role="banner">
                <h1 className="my-eateries-title" >My Eateries</h1>
            </header>

            <section>
                <button>Add a Eatery</button>
            </section>

            <section>
                <header>
                    <h2>Pho Mignon</h2>
                </header>
                <ul>
                    <li>Phone Number: 760-320-5210</li>
                    <li>Address: 1235 North Island Street, 
                        San Diego, CA 92108</li>
                    <li>Additional Notes: Open M-F 9 am - 9 pm, Sat 9 am - 11 pm, Sun 10 am - 8 pm</li>
                </ul>
                <button>Edit</button>
                <button>Delete*</button>
            </section>

            <section>
                <header>
                    <h2>200° Bakery</h2>
                </header>
                <ul>
                    <li>Phone Number: 619-280-7599</li>
                    <li>Address: 8590 Elm Wake Drive, 
                        San Diego, CA 92123</li>
                    <li>Additional Notes: Open M-F 7 am - 5 pm, Sat 7 am - 8 pm, Sun 9 am - 3 pm</li>
                </ul>
                <button>Edit</button>
                <button>Delete*</button>
            </section>

            <section>
                <header>
                    <h2>Mana Noodlehouse</h2>
                </header>
                <ul>
                    <li>Phone Number: 858-780-2323</li>
                    <li>Address: 590 Convoy Street, 
                        San Diego, CA 92117</li>
                    <li>Additional Notes: Open M-F 11 am - 9 pm, Sat 11 am - 12 am, Sun 11 am - 6 pm</li>
                </ul>
                <button>Edit</button>
                <button>Delete*</button>
            </section>

            <section>
                <p>* Disclaimer: Deleting a eatery will delete ALL logs associated with that eatery</p>
            </section>    
        </main>
        );
    }
}

export default MyEateries;
