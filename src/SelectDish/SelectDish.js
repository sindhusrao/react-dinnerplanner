import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';


const scaryAnimals = [
  { label: "Alligators", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 },
];

class DisplayDishes extends React.Component {
  render() {

      return (
         <Row className="Dishes">
              <Dishes type={this.props.term} filter={this.props.filter} />
         </Row>
      );
  }
}

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishTypes: this.props.model.getAllTypes(),
      term :'',
      filter : ''
    } 
    this.searchHandler = this.searchHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
  }

  searchHandler(event){
    console.log("search term",event.target.value)
    this.setState({term : event.target.value})
  }

  filterHandler(event){
    console.log("filter input",event.target.value)
    this.setState({filter : event.target.value})
  }

  searchFilterHandler = () => {
    console.log("Input",this.term,this.filter )
    this.setState({
      term : this.term,
      filter : this.filter
    })
  }

  render() {

    /*rows to the menu table in sidebar*/
    const showTypes = this.state.dishTypes.map((type) =>
      <option value={type}>{type}</option>
    )

    // this.shouldComponentUpdate = (nextProps, nextState) => {
    //   if (this.state == null)
    //     return true;
  
    //   if (this.state.term == nextState.term && this.state.filter == nextState.filter)
    //     return false;
        
    //   return true;
    // }

    return (
      // <div className="SelectDish">
      <Container >
        <Row>
          {/* We pass the model as property to the Sidebar component */}
          <Sidebar model={this.props.model} />
          <Col xs={12} md={8} large={8}>

            <Row className="findDish">
              <h4 className="headline4">FIND A DISH</h4>

            </Row>
            <Row className="SearchBar">
              <div className="content">
                {/* <div className="container"> */}
                <section className="section">
                  <form className="form" id="addItemForm">
                    <input
                      type="text"
                      className="input"
                      id="addInput"
                      placeholder="Enter key words"
                      value={this.state.term}
                      onChange={this.searchHandler}
                    />
                    <select className="dropDownSearch" id="selectType" value={this.state.filter} onChange={this.filterHandler}>
                      <option value="all">all</option>
                      {showTypes}
                    </select>
                    {/* <button className="buttonis-info" onClick={this.searchFilterHandler}>
                      Search
                    </button> */}
                  </form>
                </section>

                {/* </div> */}
              </div>
            </Row>
            {console.log("Testing Search",this.state.term,this.state.filter)}
            <DisplayDishes  term={this.state.term}  filter={this.state.filter} />
          </Col>
        </Row>
      </Container>
      // </div>
    );
  }
}

export default SelectDish;
