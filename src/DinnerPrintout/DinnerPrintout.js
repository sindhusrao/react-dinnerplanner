import React, { Component } from 'react';
import './DinnerPrintout.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Container, Row, Col} from 'reactstrap';

//import Select from 'react-select';





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



class DinnerPrintout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu : this.props.model.getMenu() //here fetch from dinnerModel menu the dishes from sideBar
    }

  }
  
  render() {
    let dishMenu = null;
    dishMenu = this.state.menu.map((dish) =>
        <Row>
            <Col xs={12} md={4} large={4}>
                  <DishHeader image={dish.image} />
            </Col>
            <Col  xs={12} md={4} large={4}>
                  <h2>{dish.title} </h2>
                  <p> {dish.instructions}</p>
            
            </Col >
            <Col  xs={12} md={4} large={4}>
                  <h4> Preparation </h4>
                  <p> {dish.instructions}</p>
            </Col>
        </Row>
    )
    return (
      <div className="DinnerPrintout">
      {/*<h3>Dinner Printout</h3>*/}

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
      <Row className="row2">
          {dishMenu}
          {/* <Col xs={12} md={4} large={4}>
              <h4> Dish 1 image here </h4>
          </Col>
          <Col xs={12} md={4} large={4}>
              <h4> Dish 1 title</h4>
              <p> Description of the dish bla bla bla bla bla </p>
          </Col>
          <Col xs={12} md={4} large={4}>
              <h4> Dish 1 preparation</h4>
              <p> How to prepare this dish add salt and sugar and shake. Then bake and serve cold. Bon Apetite!</p>
          </Col> */}
      </Row>
     




{/* 
        <h4>My Dinner: # people</h4>

        <Link to="/search">
            <button>Go back and edit dinner</button>
        </Link>

        <hr ></hr>
        <h4> Dish 1 image here </h4>
        <h4> Dish 1 title</h4>
        <p> Description of the dish bla bla bla bla bla </p>
        <h4> Dish 1 preparation</h4>
        <p> How to prepare this dish add salt and sugar and shake. Then bake and serve cold. Bon Apetite!</p>
        <hr ></hr>
        <h4> Dish 2 image here </h4>
        <h4> Dish 2 title</h4>
        <p> Description of the dish bla bla bla bla bla </p>
        <h4> Dish 2 preparation</h4>
        <p> How to prepare this dish add salt and sugar and shake. Then bake and serve cold. Bon Apetite!</p>
        <hr ></hr> */}

                  
      </div>
    );
  }
}

export default DinnerPrintout;
