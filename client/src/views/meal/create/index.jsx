import React, { Component } from 'react';
import { createNewMeal } from './../../../services/meals';

class MealCreateView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      photoUrl: '',
      ingredients: [],
      category: '',
      price: 0,
      ratings: 0,
      ingredientPlaceholder: '',
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      photoUrl,
      ingredients,
      category,
      price,
      ratings,
    } = this.state;
    createNewMeal({
      name,
      description,
      photoUrl,
      ingredients,
      category,
      price: { amount: price, currency: 'EUR' },
      ratings,
    }).then((meal) => {
      console.log(meal);
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  addIngredient = () => {
    const ingredients = this.state.ingredients;
    ingredients.push(this.state.ingredientPlaceholder);
    this.setState({
      ingredients,
      ingredientPlaceholder: '',
    });
  };

  removeIngredient = (event, ingredient) => {
    const ingredients = this.state.ingredients;
    ingredients.splice(ingredients.indexOf(ingredient), 1);
    this.setState({
      ingredients,
    });
  };

  render() {
    return (
      <div className='single-meal-container'>
        <form onSubmit={this.handleFormSubmission}>
          <input
            type='text'
            name='photoUrl'
            value={this.state.photoUrl}
            placeholder='Meal Image'
            onChange={this.handleInputChange}
          />
          <div>
            <input
              type='text'
              name='name'
              value={this.state.name}
              placeholder='Meal Name'
              onChange={this.handleInputChange}
            />
            <input
              type='text'
              name='description'
              value={this.state.description}
              placeholder='Description'
              onChange={this.handleInputChange}
            />
            <input
              type='text'
              name='category'
              value={this.state.category}
              placeholder='Category'
              onChange={this.handleInputChange}
            />
            {this.state.ingredients.map((ingredient) => {
              return (
                <div className='ingredient-list-create'>
                  <h3>{ingredient}</h3>
                  <button
                    onClick={(event) =>
                      this.removeIngredient(event, ingredient)
                    }
                  >
                    -
                  </button>
                </div>
              );
            })}
            <div>
              <input
                type='text'
                name='ingredientPlaceholder'
                value={this.state.ingredientPlaceholder}
                placeholder='Ingredient'
                onChange={this.handleInputChange}
              />
              <button onClick={this.addIngredient} type='button'>
                +
              </button>
            </div>
            <input
              type='number'
              name='price'
              value={this.state.price.amount}
              placeholder='Price'
              onChange={this.handleInputChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MealCreateView;
