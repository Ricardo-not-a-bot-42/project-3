import React, { Component } from 'react';
import { listSingleMeal, editMeal } from './../../../services/meals';
import './style.scss';

class MealEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      photoUrl: '',
      ingredients: [],
      category: '',
      price: 0,
      ratings: 0,
      ingredientPlaceholder: ''
    };
    this.id = this.props.match.params.id;
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, description, photoUrl, ingredients, category, price, ratings } = this.state;
    editMeal(this.id, {
      name,
      description,
      photoUrl,
      ingredients,
      category,
      price: { amount: price, currency: 'EUR' },
      ratings
    }).then((meal) => {
      console.log(meal);
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  addIngredient = () => {
    const ingredients = this.state.ingredients;
    ingredients.push(this.state.ingredientPlaceholder);
    this.setState({
      ingredients,
      ingredientPlaceholder: ''
    });
  };

  removeIngredient = (event, ingredient) => {
    const ingredients = this.state.ingredients;
    ingredients.splice(ingredients.indexOf(ingredient), 1);
    this.setState({
      ingredients
    });
  };

  componentDidMount() {
    listSingleMeal(this.id).then((meal) => {
      this.setState({
        name: meal.name,
        description: meal.description,
        photoUrl: meal.photoUrl,
        ingredients: meal.ingredients,
        category: meal.category,
        price: meal.price.amount,
        ratings: meal.ratings,
        loaded: true
      });
    });
  }

  render() {
    return (
      <div className="edit-view">
        <h2>Edit Meal</h2>
        <div className="form-edit-container">
          <h3>Edit Meal Details</h3>
          <form onSubmit={this.handleFormSubmission}>
            <label htmlFor="photoUrl-input">Image Url</label>
            <input
              type="text"
              name="photoUrl"
              value={this.state.photoUrl}
              placeholder="Meal Image"
              onChange={this.handleInputChange}
            />
            <label htmlFor="name-input">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Meal Name"
              onChange={this.handleInputChange}
            />
            <label htmlFor="description-input">Description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              placeholder="Description"
              onChange={this.handleInputChange}
            />
            <label htmlFor="category-input">Category</label>
            <input
              type="text"
              name="category"
              value={this.state.category}
              placeholder="Category"
              onChange={this.handleInputChange}
            />
            <h3>Edit Ingredients list</h3>
            {this.state.ingredients.map((ingredient) => {
              return (
                <div className="ingredient-list-create">
                  <div>{ingredient}</div>
                  <button
                    className="add-rem"
                    onClick={(event) => this.removeIngredient(event, ingredient)}
                  >
                    Remove item
                  </button>
                </div>
              );
            })}
            <div className="ingredients">
              <div className="ingredient-list-create">
                <input
                  type="text"
                  name="ingredientPlaceholder"
                  value={this.state.ingredientPlaceholder}
                  placeholder="New ingredient"
                  onChange={this.handleInputChange}
                />
                <button className="add-rem" onClick={this.addIngredient} type="button">
                  Add
                </button>
              </div>
            </div>
            <label htmlFor="category-input">
              Price <small>(€ x 100)</small>
            </label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              placeholder="Price"
              onChange={this.handleInputChange}
            />
            <button className="final-button">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MealEditView;
