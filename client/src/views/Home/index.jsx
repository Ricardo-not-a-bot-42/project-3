import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class HomeView extends Component {
  render() {
    return (
      <div>
        <section className="home-section-overview">
          <img src="/images/grey_blue_logo.png" alt="company-logo" />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend auctor nisl at
            laoreet. Donec eu efficitur velit. Vivamus porttitor.
          </div>
        </section>
        <section className="home-section-we-you">
          <article className="home-we-you">
            <h3>We</h3>
            <div className="home-steps">
              <div className="we-you-card">
                <small>Cook & Freeze</small>
                <img src="/images/cook.png" alt="cook" />
              </div>
              <div className="we-you-card">
                <small>Deliver</small>
                <img src="/images/delivery.png" alt="delivery" />
              </div>
            </div>
          </article>

          <article className="home-we-you">
            <h3>You</h3>
            <div className="home-steps">
              <div className="we-you-card">
                <small>Heat</small>
                <img src="/images/heat.png" alt="heat" />
              </div>
              <div className="we-you-card">
                <small>Enjoy!</small>
                <img src="/images/Tableware.png" alt="Tableware" />
              </div>
            </div>
          </article>
        </section>

        <section className="home-section-3">
          <h3>Featured</h3>
          <span>Place here meal component</span>
        </section>

        <div className="see-freezer">
          <Link className="linkAsButton" to="/freezer">
            See what's in the Freezer!
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeView;
