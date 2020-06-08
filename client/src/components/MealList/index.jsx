import React from 'react';
import './style.scss';

import formatPrice from './../../helpers/format-price';

function MealList(props) {
  console.log(props.meals);
  return (
    <div className='meal-list-container'>
      <h2>{props.title} Meals</h2>
      <div className='meal-list'>
        {props.meals.map((meal) => (
          <div className='meals-container'>
            <div className='img-container'>
              <img src={meal.photoUrl} alt={meal.name} />
              <h4>{meal.ratings}</h4>
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

export default MealList;
