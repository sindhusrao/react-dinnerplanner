import React, { Component } from 'react';
import './DishDetails.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col } from 'reactstrap';
import { modelInstance } from '../data/DinnerModel';


//import Select from 'react-select';

class DishDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        "ingredient 1",
        "ingredient 2",
        "ingredient 3"
      ]
    }

  }

  componentDidMount = () => {
    //const {handle} = this.props.match.params
    //const {dish} = this.props.location.state
    console.log(this.props);
    modelInstance.getDish("1004").then(dish => {
      {console.log('calling model',this.props)}
      this.setState({
        status: 'LOADED',
        dish: dish.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    console.log('Inside dish details', this.state);

    let dishDetails = null;
    switch (this.state.status) {
      case 'INITIAL':
      dishDetails = <em>Loading...</em>
        break;
      case 'LOADED':
      dishDetails = () => {
          <div>
            {this.state.dish}
          </div>
        }
        break;
      default:
      dishDetails = <b>Failed to load data, please try again</b>
        break;
    }

    return (

      <Container>
        <Row>
        <Sidebar model={this.props.model} />
        <Col xs={12} md={8} large={8}>
          <div className="DishDetails">
            {/*<h3>Dish Details</h3>*/}
            <hr></hr>
            <h4> Dish 1 title {this.state.dish}</h4>
            <h4> Dish 1 image here </h4>
            <p> Description of the dish bla bla bla bla bla </p>

            <Link to="/search">
              <button>Back To Search</button>
            </Link>

            <h4> Dish 1 preparation</h4>
            <p> How to prepare this dish add salt and sugar and shake. Then bake and serve cold. Bon Apetite!</p>
            {dishDetails}

            <section className="section">
              <ul>
                {this.state.list.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <button>Add To Menu</button>
          </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DishDetails;
