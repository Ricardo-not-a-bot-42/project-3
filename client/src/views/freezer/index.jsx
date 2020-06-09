import React, { Component } from 'react';
import './style.scss';

import {
  listAllMeals,
  listPopularMeals,
  listRecommendedMeals,
} from './../../services/meals';
import MealList from './../../components/MealList';
import SearchBar from './../../components/SearchBar';
import CategoryFilter from './../../components/CategoryFIlter';

class FreezerView extends Component {
  constructor() {
    super();
    this.state = {
      allMeals: [],
      popularMeals: [],
      recommendedMeals: [],
      searchValue: '',
      categoryFilter: '',
      loaded: false,
    };
    this.recommendedMeals = [];
    this.popularMeals = [];
    this.allMeals = [];
  }

  loadMeals() {
    listAllMeals()
      .then((meals) => {
        this.allMeals = meals.meals;
        this.setState({
          allMeals: meals.meals,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    listPopularMeals()
      .then((meals) => {
        this.popularMeals = meals.meals;
        const topMeals = meals.meals.splice(0, meals.meals.length - 10);
        this.setState({
          popularMeals: topMeals,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    listRecommendedMeals(this.props.user)
      .then((meals) => {
        this.recommendedMeals = meals.meals;
        this.setState({
          recommendedMeals: meals.meals,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchFilter = (event) => {
    const value = event.target.value.toLowerCase();

    const recommendedMeals = this.recommendedMeals;
    const popularMeals = this.popularMeals;
    const allMeals = this.allMeals;
    const filteredRecommended = recommendedMeals.filter((meal) => {
      return (
        meal.name.toLowerCase().includes(value) &&
        meal.category.toLowerCase().includes(this.state.categoryFilter)
      );
    });
    const filteredPopular = popularMeals.filter((meal) => {
      return (
        meal.name.toLowerCase().includes(value) &&
        meal.category.toLowerCase().includes(this.state.categoryFilter)
      );
    });
    const filteredAll = allMeals.filter((meal) => {
      return (
        meal.name.toLowerCase().includes(value) &&
        meal.category.toLowerCase().includes(this.state.categoryFilter)
      );
    });
    this.setState({
      recommendedMeals: filteredRecommended,
      popularMeals: filteredPopular,
      allMeals: filteredAll,
      searchValue: value,
    });
  };

  categoryFiltering = (category) => {
    category = category.toLowerCase();
    const recommendedMeals = this.recommendedMeals;
    const popularMeals = this.popularMeals;
    const allMeals = this.allMeals;
    const filteredRecommended = recommendedMeals.filter((meal) => {
      return (
        meal.category.toLowerCase().includes(category) &&
        meal.name.toLowerCase().includes(this.state.searchValue)
      );
    });
    const filteredPopular = popularMeals.filter((meal) => {
      return (
        meal.category.toLowerCase().includes(category) &&
        meal.name.toLowerCase().includes(this.state.searchValue)
      );
    });
    const filteredAll = allMeals.filter((meal) => {
      return (
        meal.category.toLowerCase().includes(category) &&
        meal.name.toLowerCase().includes(this.state.searchValue)
      );
    });
    this.setState({
      recommendedMeals: filteredRecommended,
      popularMeals: filteredPopular,
      allMeals: filteredAll,
      categoryFilter: category,
    });
  };

  componentDidMount() {
    this.loadMeals();
  }

  render() {
    const allMeals = this.state.allMeals;
    const popularMeals = this.state.popularMeals;
    return (
      <div className='freezer-container'>
        <div className='search-bar-container'>
          <SearchBar
            updateMethod={this.searchFilter}
            value={this.state.searchValue}
          />
        </div>
        <div className='categories-container'>
          <CategoryFilter clickMethod={this.categoryFiltering} />
        </div>
        {this.state.loaded && (
          <div>
            <MealList
              title='Recommended'
              meals={this.state.recommendedMeals}
              user={this.props.user}
            />
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
