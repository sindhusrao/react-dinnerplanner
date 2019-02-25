import React, { Component } from 'react';
import './DishDetails.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col } from 'reactstrap';
import { modelInstance } from '../data/DinnerModel';
import { Route } from 'react-router-dom';


//import Select from 'react-select';

class DishBody extends React.Component {
  render() {
    return (
      <div className="card-body">

        <h2>{this.props.title}</h2>

        <p className="body-content">{this.props.text}</p>

      </div>
    )
  }
}

class DishHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = {
      backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} id={image} className="card-header" />
    )
  }
}

class DishDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

      dishCard: this.props.match.params.id,
      numberOfIngredients : 0,
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dish : null,
      status: 'INITIAL'
    }

  }

  doSomething(dish){
    this.props.model.addDishToMenu(dish)
    console.log("dish added to meu "+dish)
    console.log("get menu : " +this.props.model.getMenu())
  }



  componentDidMount = () => {
    this.props.model.addObserver(this)
  
    modelInstance.getDish(this.state.dishCard).then(dish => {
      {console.log('get dish :) '+dish)}
      this.setState({
        status: 'LOADED',
        dish: dish,
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR',
      })
    })

    //let dishCard = this.props.match.params.id
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
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  handleClick(e) {
    e.preventDefault();
    console.log('The button was clicked.');
    modelInstance.addDishToMenu(modelInstance.getDish());
  }

  
  countIngredients(){
    let ingredientCount = 0;
    this.state.dish.extendedIngredients.map((ingredient) =>
      ingredientCount++  
    )
    return ingredientCount;
  } 


  render() {
    console.log('Inside dish details', this.state);
    let dishDetails = null;
    let ingredientTable = null;
   
   
    switch (this.state.status) {
      case 'INITIAL':
      dishDetails = <em>Loading dish details...</em>
      ingredientTable = <em>Loading ingredients table ...</em>
        break;
      case 'LOADED':



      let ingredientCost = 1*this.state.numberOfGuests;
      let ingredientAmount = this.state.numberOfGuests;
      let ingredientCount = 0;
    
         /*rows to the ingredient table in sidebar*/
        const rows = this.state.dish.extendedIngredients.map((ingredient) =>
          <tr> 
            {/* {ingredientCount++} */}
            {console.log("ingredient count : "+ingredientCount++)}
            <td> {ingredient.name} </td>
            <td> {ingredientAmount*ingredient.measures.metric.amount}</td>
            <td> {ingredient.measures.metric.unitShort}</td>
            <td> SEK </td>
            <td> {ingredientCost} </td>   
         </tr>
        )
        modelInstance.setDish(this.state.dish)
        dishDetails = 
          // <div id="dish.id"  key={this.state.dish.id} >
           <Col className="dishDetails" xs={12} md={4} large={4}>
            <h2>{this.state.dish.title} </h2>
            {console.log('dish details looping',this.state.dish, this.props)}
           
            <DishHeader image={this.state.dish.image} />
            {/* <DishBody title={this.state.dish.title} /> */}
            <p> {this.state.dish.instructions}</p>
            <Link to="/search">
              <button>Back To Search</button>
            </Link>
            <h4> Preparation </h4>
            <p> {this.state.dish.instructions}</p>
           </Col>
          {/* </div> */}

        ingredientTable = 
        <Col className="ingredientTable" xs={12} md={4} large={4}>
        {/* <div> */}
               <table id="simple-board">
                <thead>
                  <td className="tableCell">INGREDIENTS FOR {this.state.numberOfGuests} PEOPLE {" "} </td> 
                </thead>
                <tbody>
                    <hr/>
                    {rows}
                    <hr/>
                    <tr>
                      <td> <button onClick={() => this.doSomething(this.state.dish)}>Add To Menu</button>  </td>
                      <td> Cost: {this.countIngredients()*this.state.numberOfGuests}</td>
                    </tr>
                    {/* <button onClick={this.props.model.addDishToMenu(this.state.dish)}>Add To Menu</button> */}
                    {/* {console.log("this state dish :"+this.state.dish)} */}
                    {/* <button onClick={() => this.doSomething(this.state.dish)}>Add To Menu</button> */}
                </tbody>
            </table>
        {/* </div> */}
        </Col>

        break;
      default:
        dishDetails = 

        <div id="dish.id"  key={this.state.dish.id} >
              <b>Failed to load data, please try again</b>
              <Link to="/search">
                 <button>Back To Search</button>
              </Link>
        </div>

        ingredientTable = null
        break;
    }

    return (

      <Container>
        <Row>
           <Sidebar model={this.props.model}/>
           {dishDetails}
           {ingredientTable}
        </Row>
      </Container>
    );
  }
}

export default DishDetails;
