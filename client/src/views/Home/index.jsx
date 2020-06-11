import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import MealList from './../../components/MealList';
import { listPopularMeals } from './../../services/meals';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredMeals: [],
    };
  }

  setFeaturedMeals = () => {
    listPopularMeals()
      .then((meals) => {
        const topMeals = meals.meals.splice(0, 4);
        console.log(topMeals);
        this.setState({
          featuredMeals: topMeals,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.setFeaturedMeals();
  };

  render() {
    return (
      <div>
        <section className='home-section-overview'>
          <img src='/images/grey_blue_logo.png' alt='company-logo' />
          <div>
            Home and hand-made meals with natural and mindfully-sourced
            ingredients sustainably delivered at your home. <br /> Because we
            believe that eating healthy and having a balanced diet should be
            easy!
          </div>
        </section>
        <section className='home-section-we-you'>
          <article className='home-we-you'>
            <h3>We</h3>
            <div className='home-steps'>
              <div className='we-you-card'>
                <small>Cook & Freeze</small>
                <img src='/images/cook.png' alt='cook' />
              </div>
              <div className='we-you-card'>
                <small>Deliver</small>
                <img src='/images/delivery.png' alt='delivery' />
              </div>
            </div>
          </article>

          <article className='home-we-you'>
            <h3>You</h3>
            <div className='home-steps'>
              <div className='we-you-card'>
                <small>Heat</small>
                <img src='/images/heat.png' alt='heat' />
              </div>
              <div className='we-you-card'>
                <small>Enjoy!</small>
                <img src='/images/Tableware.png' alt='Tableware' />
              </div>
            </div>
          </article>
        </section>

        <section className='home-section-3'>
          <MealList
            title='Featured'
            meals={this.state.featuredMeals}
            user={this.props.user}
          />
        </section>

        <div className='see-freezer'>
          <Link className='linkAsButton' to='/freezer'>
            See what's in the Freezer!
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeView;
