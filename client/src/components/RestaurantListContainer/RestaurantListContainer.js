import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { getRestaurants } from '../../api/restaurantApi';

import RestaurantListFilter from '../RestaurantListFilter/RestaurantListFilter';
import RestaurantListContent from '../RestaurantListContent/RestaurantListContent';

import './RestaurantListContainer.css';

class RestaurantListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      page: 1,
      pageSize: 10,
      contents: Immutable.List(),
    };
    this.debouncedGetAndUpdateRestaurants = _.debounce(this.getAndUpdateRestaurants, 300);
  }

  async componentDidMount() {
    await this.getAndUpdateRestaurants();
  }

  handleQueryInputChange = async e => {
    this.setState({
      query: e.target.value,
    });
    await this.debouncedGetAndUpdateRestaurants(e.target.value);
  }

  getAndUpdateRestaurants = async query => {
    let params = {
      lat: this.props.latitude,
      lng: this.props.longitude,
      page: this.state.page,
      pageSize: this.state.pageSize,
      q: this.state.query, 
    };
    if (query) {
      params.q = query;
    }

    const restaurants = await getRestaurants(params);
    if (!Immutable.is(restaurants, this.state.contents)) {
      this.setState({
        contents: restaurants,
      });
      this.props.clearRestaurantSelection();
    }
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
          contents={this.state.contents}
        />
      </div>
    );
  }
}

export default RestaurantListContainer;
