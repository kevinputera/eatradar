import React from 'react';
import _ from 'lodash';

import RestaurantListFilter from '../RestaurantListFilter/RestaurantListFilter';
import RestaurantListContent from '../RestaurantListContent/RestaurantListContent';

import './RestaurantListContainer.css';

class RestaurantListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.debouncedGetAndUpdateRestaurants = _.debounce(this.props.getAndUpdateRestaurants, 300);
  }

  handleQueryInputChange = async e => {
    this.setState({
      query: e.target.value,
    });
    await this.debouncedGetAndUpdateRestaurants(e.target.value);
  }

  render() {
    return (
      <div className="restaurant-list-container">
        <RestaurantListFilter 
          handleQueryInputChange={this.handleQueryInputChange}
          handleRefreshButtonClick={this.props.handleRefreshButtonClick}
          query={this.state.query}
        />
        <RestaurantListContent
          updateRestaurantSelection={this.props.updateRestaurantSelection}
          restaurantSelection={this.props.restaurantSelection}
          contents={this.props.contents}
        />
      </div>
    );
  }
}

export default RestaurantListContainer;
