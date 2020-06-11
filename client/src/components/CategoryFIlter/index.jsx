import React, { Component } from 'react';
import './style.scss';

class CategoryFilter extends Component {
  render() {
    return (
      <div>
        <h4>Filter the results by category</h4>
        <div className="second-section">
          <button className="category-button" onClick={() => this.props.clickMethod('Soup')}>
            <img className="category-image" src="/images/soup.png" alt="soup" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Fish')}>
            <img className="category-image" src="/images/fish.png" alt="fish" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Meat')}>
            <img className="category-image" src="/images/meat.png" alt="Meat" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Salad')}>
            <img className="category-image" src="/images/salad.png" alt="salad" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Pizza')}>
            <img className="category-image" src="/images/pizza.png" alt="pizza" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Pasta')}>
            <img className="category-image" src="/images/pasta.png" alt="pasta" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Desert')}>
            <img className="category-image" src="/images/desert.png" alt="desert" />
          </button>
        </div>
      </div>
    );
  }
}

export default CategoryFilter;

{
  /* <div className="first-section">
<h4>Show all the items in the Freezer</h4>
<button className="show-all-button" onClick={() => this.props.clickMethod('')}>
  Show all
</button>
</div> */
}
