import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Container, Row, Col} from 'reactstrap';
import{Button} from 'reactstrap';
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'

//cookies
import cookie from 'react-cookies'


class Sidebar extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu : this.props.model.getMenu(),
      totalCost: 0, 

    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)

    //cookies
    this.state =  { 
      numberOfGuests: cookie.load('numberOfGuests'),
      menu : this.props.model.getMenu(),
    }

  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }


  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu : this.props.model.getMenu()
    })

    cookie.save('numberOfGuests', this.props.model.getNumberOfGuests(), { path: '/' })
   // cookie.save('menu', this.props.model.getMenu(), { path: '/' })
    console.log("cookie menu :", cookie.load('menu'))
    console.log("cookie numberOfGuests :", cookie.load('numberOfGuests'))

  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  countIngredients(dish){
    let ingredientCount = 0;
    dish.extendedIngredients.map((ingredient) =>
      ingredientCount++  
    )
    return ingredientCount;
  } 

  doSomething(dish){
    this.props.model.removeDishFromMenu(dish.id)
    console.log("dish dish removed from meu "+dish.title)
    console.log("get menu after delete: " +this.props.model.getMenu())
  }
  
  

  render() {

    /*rows to the menu table in sidebar*/
    const rows = this.state.menu.map((dish) =>
      <tr>
         
        {/* {Object.keys(dish).map(function(attr) {
          return (
            <td className="tableCell">{dish[attr]}</td>
            
          )
        })} */}
        <td> {dish.title}</td>
        <td> {this.countIngredients(dish)*this.state.numberOfGuests}</td>
 
       <Button className="deleteDish" variant="info" onClick={() => this.doSomething(dish)}>x</Button>

      </tr>
    )


    /*total cost calculation*/
      const arrSum = arr => arr.reduce((a,b) => a + b, 0)
      var totalCostArray = this.state.menu.map((dish) =>  this.countIngredients(dish) * this.state.numberOfGuests)
      var totalCost = arrSum(totalCostArray)
     
    return (
  
      <Col className="Sidebar" xs={12} md={4} large={4}>
          <Row>
              <h5 className="headline5"> My Dinner </h5>
          </Row>  
          <Row>
              <p>
              People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
              <br/>
              Total no. people: {this.state.numberOfGuests}
              </p>
          </Row> 
          <Row>
            <table id="simple-board">
                <thead>
                  <td className="tableCell">Dish name{" "} </td> <td className="tableCell">Cost {" "}</td> 
                </thead>
                <tbody>
                    <hr/>
                    {rows}
                    <hr/>
                </tbody>
            </table>
          </Row> 
          <Row>
            <p>Total Cost: {totalCost} SEK</p>
          </Row> 
          <Row>
              <Link to="/DinnerOverview">
                    <button>Confirm Dinner</button>
              </Link>
          </Row> 
    </Col>
    
    );
  }
}

export default Sidebar;

{/*
var TableComponent = React.createClass({
  render: function() {
    // Data
    var dataColumns = this.props.data.columns;
    var dataRows = this.props.data.rows;

    var tableHeaders = (<thead>
          <tr>
            {dataColumns.map(function(column) {
              return <th>{column}</th>; })}
          </tr>
      </thead>);

    var tableBody = dataRows.map(function(row) {
      return (
        <tr>
          {dataColumns.map(function(column) {
            return <td>{row[column]}</td>; })}
        </tr>); });
     
    // Decorate with Bootstrap CSS
    return (<table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        {tableBody}
      </table>) }});
        

// Example Data
var tableData = {
  columns: ['Service', 'Cost/Unit', 'Unit', 'Units Requested'],
  rows: [{
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'foo',
    'Unit': null,
    'Cost/Unit': undefined,
    'Units Requested': 42
  }]
};


  <TableComponent data = {tableData} />,
  document.getElementById('table-component');
*/}