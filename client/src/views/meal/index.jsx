import React, { Component } from 'react';
import { listSingleMeal } from './../../services/meals';
import { Link } from 'react-router-dom';

class MealView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
      loaded: false,
    };
    this.id = this.props.match.params.id;
  }
  componentDidMount() {
    listSingleMeal(this.id).then((meal) => {
      this.setState({
        meal,
        loaded: true,
      });
    });
  }

  render() {
    const meal = { ...this.state.meal };
    return (
      <div>
        {(this.state.loaded && (
          <div className='single-meal-container'>
            <img src={meal.photoUrl} alt='' />
            <div>
              <h1>{meal.name}</h1>
              <h2>{meal.ratings}</h2>
            </div>
            <h3>{meal.description}</h3>
            <h2>Ingredients</h2>
            <ul>
              {meal.ingredients.map((ingredient) => {
                return <li>{ingredient}</li>;
              })}
            </ul>
            <div className='admin-functions'>
              <button>Delete</button>
              <Link to={`/meal/${this.id}/edit`}>Edit</Link>
            </div>
          </div>
        )) || <div>Loading</div>}
      </div>
    );
  }
}

export default MealView;
