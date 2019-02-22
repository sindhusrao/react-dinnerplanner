import React, { Component } from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import { modelInstance } from '../data/DinnerModel';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


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

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes(this.props.type,this.props.filter).then(dishes => {
      {console.log('calling model',this.props)}
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>
          <div onClick={console.log('looping',dish, this.props)} id="dish.id"  key={dish.id} className="card">
            <Link to={{pathname: '/DishDetails', state:{dish}}}>
              <DishHeader image={'https://spoonacular.com/recipeImages/' + dish.image} />
              <DishBody title={dish.title} />
            </Link>
          </div>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        {/* <h3 className="headline3">Dishes</h3> */}
        <Row>
          {dishesList}
        </Row>
      </div>
    );
  }
}

export default Dishes;
