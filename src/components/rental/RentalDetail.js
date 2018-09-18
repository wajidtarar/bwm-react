
import React from 'react';

export class RentalDetail extends React.Component
{
    render(){

        console.log(this.props.match.params.id);
        debugger;

        return(
            <div>
                <h1>I am rental details of {this.props.match.params.id} </h1>
            </div>
        )
    }
}