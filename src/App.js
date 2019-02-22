import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import DinnerOverview from './DinnerOverview/DinnerOverview';
import DinnerPrintout from './DinnerPrintout/DinnerPrintout';
import DishDetails from './DishDetails/DishDetails';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Jumbotron} from 'reactstrap';
import{Container, Row, Col} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
      title: 'Dinner Planner',
     
    }
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <Jumbotron fluid>       
             <h1 className="App-title" >{this.state.title}</h1>
        </Jumbotron>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/> 
          <Route path="/DinnerOverview" render={() => <DinnerOverview model={modelInstance}/>}/> 
          <Route path="/DinnerPrintout" render={() => <DinnerPrintout model={modelInstance}/>}/> 
          <Route path="/DishDetails" render={() => <DishDetails model={modelInstance}/>}/> 
        
        {/* </header> */}
      </div>
    );
  }
}

export default App;
