import React, { Component } from 'react';
import './style.scss';

import {
  listAllMeals,
  listPopularMeals,
  listRecommendedMeals,
} from './../../services/meals';
import MealList from './../../components/MealList';

class FreezerView extends Component {
  constructor() {
    super();
    this.state = {
      allMeals: [],
      popularMeals: [],
      loaded: false,
    };
  }

  loadMeals() {
    listAllMeals()
      .then((meals) => {
        this.setState({
          allMeals: meals.meals,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    listPopularMeals()
      .then((meals) => {
        this.setState({
          popularMeals: meals.meals,
          meals,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    listRecommendedMeals(this.props.user);
  }

  componentDidMount() {
    this.loadMeals();
  }

  render() {
    console.log('Popular: ', this.state.allMeals);
    const allMeals = this.state.allMeals;
    const popularMeals = this.state.popularMeals;
    return (
      <div className='freezer-container'>
        <div className='search-bar-container'></div>
        <div className='categories-container'></div>
        {this.state.loaded && (
          <div>
            <MealList
              title='Popular'
              meals={popularMeals}
              user={this.props.user}
            />
            <MealList title='All' meals={allMeals} user={this.props.user} />
          </div>
        )}
      </div>
    );
  }
}

export default FreezerView;
