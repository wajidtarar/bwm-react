import React from 'react';

import { RentalCard } from './RentalCard';

export class RentalList extends React.Component{
    
    constructor(){ 
        super();

        this.state = {
            rentals: [1,2,3]
        }

        this.addRental = this.addRental.bind(this);
    }

    renderRentals(){
        return this.state.rentals.map((rental) => {
            return (
                <RentalCard />
            )
        });
    }

    addRental(){
        const newRentals = this.state.rentals;
        newRentals.push(1);
        this.setState({
            rentals: newRentals
        });
    }

    render (){
        return(
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <div className='row'>
                    {this.renderRentals()}
                </div>
                <button onClick={this.addRental} > Add Rental </button>
            </section>
        )
    }
}