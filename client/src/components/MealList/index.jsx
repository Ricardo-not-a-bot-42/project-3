import React, { Component } from 'react';
import './style.scss';

import formatPrice from './../../helpers/format-price';
import { addRating } from './../../services/authentication';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: this.props.user.ratings,
    };
  }

  increaseRating = (meal) => {
    const ratings = this.state.ratings;
    if (ratings.includes(meal)) {
      ratings.splice(ratings.indexOf(meal), 1);
    } else {
      ratings.push(meal);
    }
    addRating(meal);
    this.setState({
      ratings: ratings,
    });
  };
  // console.log('user', props.user);
  render() {
    return (
      <div className='meal-list-container'>
        <h2>{this.props.title} Meals</h2>
        <div className='meal-list'>
          {this.props.meals.map((meal) => (
            <div className='meals-container' key={Math.random() * 40}>
              <div className='img-container'>
                <img src={meal.photoUrl} alt={meal.name} />
                <h4>{meal.ratings}</h4>
                <button onClick={() => this.increaseRating(meal.name)}>
                  {(this.state.ratings.includes(meal.name) && '-') || '+'}
                </button>
              </div>
              <div className='meal-info'>
                <div className='name-price'>
                  <h4>{meal.name}</h4>
                  <h5>{formatPrice(meal.price)}</h5>
                </div>
                <h4>Ingredients</h4>
                <ul>
                  {meal.ingredients.map((ingredient) => {
                    return <li>{ingredient}</li>;
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MealList;
