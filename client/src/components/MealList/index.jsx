import React, { Component } from 'react';
import './style.scss';

import formatPrice from './../../helpers/format-price';
import { addRating } from './../../services/authentication';
import { setRating } from './../../services/meals';
import { Link } from 'react-router-dom';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: this.props.user.ratings
    };
  }

  increaseRating = (meal) => {
    const ratings = this.state.ratings;
    const id = meal._id;
    const mealRatings = meal.ratings;
    if (ratings.includes(meal.name)) {
      ratings.splice(ratings.indexOf(meal.name), 1);
      meal.ratings--;
      setRating(id, mealRatings - 1);
    } else {
      ratings.push(meal.name);
      meal.ratings++;
      setRating(id, mealRatings + 1);
    }
    addRating(meal.name);
    this.setState({
      ratings: ratings
    });
  };
  // console.log('user', props.user);
  render() {
    return (
      <div className="meal-list-container">
        <h4>{this.props.title} Meals</h4>
        <div className="meal-list">
          {(this.props.meals.length &&
            this.props.meals.map((meal) => (
              <div className="meals-container" key={Math.random() * 40}>
                <div className="img-container">
                  <img src={meal.photoUrl} alt={meal.name} />
                  <small> ★ {meal.ratings} | Rate this meal</small>
                  <button className="add-remove-button" onClick={() => this.increaseRating(meal)}>
                    {(this.state.ratings.includes(meal.name) && '-') || '+'}
                  </button>
                </div>
                <div className="meal-info">
                  <div className="name-price">
                    <Link to={`/meal/${meal._id}`}>
                      <p>{meal.name}</p>
                    </Link>
                    <span>{formatPrice(meal.price)}</span>
                  </div>
                  <span className="ingredients">
                    Ingredients:{'  '}
                    {meal.ingredients.map((ingredient) => {
                      return <span>{ingredient} </span>;
                    })}
                  </span>
                </div>
              </div>
            ))) || (
            <p>
              No meals to display!
              {this.props.title === 'Recommended' &&
                ' (Make sure to rate some meals to get recommendations)'}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default MealList;
