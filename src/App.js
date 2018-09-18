import React, { Component } from 'react';

import { Header } from './shared/Header';
import { RentalList } from './components/rental/RentalList';
import { RentalDetail } from './components/rental/RentalDetail';

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      isRentalList: true
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate(){
    this.setState({
      isRentalList: !this.state.isRentalList
    });
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <button onClick={this.navigate}>Navigate away</button>
        <div className='container'>
          { this.state.isRentalList ? <RentalList /> : <RentalDetail /> }
        </div>

      </div>
    );
  }
}

export default App;
