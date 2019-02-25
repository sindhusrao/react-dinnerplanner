import React, { Component } from 'react';
import './DinnerOverview.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Container, Row, Col} from 'reactstrap';
import { modelInstance } from '../data/DinnerModel';



class DishHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = {
      backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} id={image} className="card-header"/>
    )
  }
}

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

class DinnerOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu : this.props.model.getMenu() //here fetch from dinnerModel menu the dishes from sideBar
    }

  }

  countIngredients(dish){
    let ingredientCount = 0;
    dish.extendedIngredients.map((ingredient) =>
      ingredientCount++  
    )
    return ingredientCount;
  } 


   // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
  //   modelInstance.getAllDishes().then(dishes => {
  //     this.setState({
  //       status: 'LOADED',
  //       dishes: dishes.results
  //     })
  //   }).catch(() => {
  //     this.setState({
  //       status: 'ERROR'
  //     })
  //   })
  }
  
  render() {
    let dishMenu = null;

      /*total cost calculation*/
      const arrSum = arr => arr.reduce((a,b) => a + b, 0)
      var totalCostArray = this.state.menu.map((dish) =>  this.countIngredients(dish) * this.state.numberOfGuests)
      var totalCost = arrSum(totalCostArray)

    dishMenu = this.state.menu.map((dish) =>
          <div className="card">
                  <DishHeader image={dish.image} />
                  <DishBody title={dish.title} />
          </div>
        )

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    // switch (this.state.status) {
    //   case 'INITIAL':
    //     dishMenu = <em>Loading...</em>
    //     break;
    //   case 'LOADED':
    //     dishMenu = this.state.menu.map((dish) =>
    //       <div className="card">
    //               <DishHeader image={'https://spoonacular.com/recipeImages/'+dish.image} />
    //               <DishBody title={dish.title} />
    //       </div>
    //     )
    //     break;
    //   default:
    //     dishMenu = <b>Failed to load data, please try again</b>
    //     break;
    // }
    return (
      <div className="DinnerOverview">

      <Row className="row">
            <Col xs={6} md={8} large={12}>
              <h4>My Dinner: {this.state.numberOfGuests} people</h4> 
            </Col>
            <Col>  
              <Link to="/search">
                <button>Go back and edit dinner</button>
              </Link>
            </Col>
      </Row>
      <hr/>
      <Row className="row">
  
           {dishMenu}

      </Row>
      <Row className="row">
        <p>Total Price: {totalCost}  SEK</p>
       
      </Row>
      <Row className="row">
        <Link to="/DinnerPrintout">
              <button className="printBtn">Print Full Recipe</button>
        </Link>
      </Row>
         
      </div>
    );
  }
}

export default DinnerOverview;
