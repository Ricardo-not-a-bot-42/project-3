import React, { Component } from 'react';

class CategoryFilter extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <button onClick={() => this.props.clickMethod('')}>All</button>
          </li>
          <li>
            <button onClick={() => this.props.clickMethod('Fast-food')}>
              Fast-food
            </button>
          </li>
          <li>
            <button onClick={() => this.props.clickMethod('Meat')}>Meat</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default CategoryFilter;
