import React, { Component } from 'react';

class SearchBar extends Component {
  handleSubmission(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form action='' onSubmit={this.handleSubmission}>
          <input
            type='text'
            placeholder='Search'
            value={this.props.value}
            onChange={(event) => this.props.updateMethod(event)}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
