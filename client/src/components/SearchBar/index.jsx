import React, { Component } from 'react';
import './style.scss';

class SearchBar extends Component {
  handleSubmission(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Search by a specific dish</h3>
        <form action="" onSubmit={this.handleSubmission}>
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={this.props.value}
            onChange={(event) => this.props.updateMethod(event)}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
