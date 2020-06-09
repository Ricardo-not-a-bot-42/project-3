import React, { Component } from 'react';
import './style.scss';

class CategoryFilter extends Component {
  render() {
    return (
      <div>
        <div className="first-section">
          <h4>Show all the items in the Freezer</h4>
          <button className="show-all-button" onClick={() => this.props.clickMethod('')}>
            Show all
          </button>
        </div>

        <h4>Filter the results by category</h4>
        <div className="second-section">
          <button className="category-button" onClick={() => this.props.clickMethod('Desert')}>
            <img className="category-image" src="/images/desert.png" alt="desert" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Pork')}>
            <img className="category-image" src="/images/pork.png" alt="pork" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Fish')}>
            <img className="category-image" src="/images/fish.png" alt="fish" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Beef')}>
            <img className="category-image" src="/images/beef.png" alt="beef" />
          </button>

          <button className="category-button" onClick={() => this.props.clickMethod('Salad')}>
            <img className="category-image" src="/images/salad.png" alt="salad" />
          </button>
        </div>
      </div>
    );
  }
}

export default CategoryFilter;
