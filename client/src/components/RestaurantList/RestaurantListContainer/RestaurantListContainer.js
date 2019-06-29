import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { getRestaurants } from '../../../api/restaurantApi';

import RestaurantListFilter from '../RestaurantListFilter/RestaurantListFilter';
import RestaurantListContent from '../RestaurantListContent/RestaurantListContent';
import RestaurantListNavigation from '../RestaurantListNavigation/RestaurantListNavigation';

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
    this.debouncedGetAndUpdateRestaurants = _.debounce(
      this.getAndUpdateRestaurants,
      300
    );
  }

  async componentDidMount() {
    await this.getAndUpdateRestaurants();
  }

  handleQueryInputChange = async e => {
    this.setState(
      { query: e.target.value },
      async () => await this.debouncedGetAndUpdateRestaurants()
    );
  };

  handlePageSizeChange = size => {
    this.setState(
      { pageSize: size },
      async () => await this.debouncedGetAndUpdateRestaurants()
    );
  };

  handlePageNext = () => {
    this.setState(
      state => {
        return { page: state.page + 1 };
      },
      async () => await this.debouncedGetAndUpdateRestaurants()
    );
  };

  handlePagePrev = () => {
    this.setState(
      state => {
        return { page: state.page > 1 ? state.page - 1 : 1 };
      },
      async () => await this.debouncedGetAndUpdateRestaurants()
    );
  };

  getAndUpdateRestaurants = async () => {
    let params = {
      lat: this.props.latitude,
      lng: this.props.longitude,
      p: this.state.page,
      ps: this.state.pageSize,
      q: this.state.query,
    };

    const restaurants = await getRestaurants(params);
    if (!Immutable.is(restaurants, this.state.contents)) {
      this.setState({
        contents: restaurants,
      });
      this.props.clearRestaurantSelection();
    }
  };

  render() {
    return (
      <div className="restaurant-list-container">
        <RestaurantListFilter
          query={this.state.query}
          handleQueryInputChange={this.handleQueryInputChange}
          handleRefreshButtonClick={this.props.handleRefreshButtonClick}
        />
        <RestaurantListContent
          contents={this.state.contents}
          restaurantSelection={this.props.restaurantSelection}
          updateRestaurantSelection={this.props.updateRestaurantSelection}
        />
        <RestaurantListNavigation
          pageSize={this.state.pageSize}
          handlePageSizeChange={this.handlePageSizeChange}
          handlePageNext={this.handlePageNext}
          handlePagePrev={this.handlePagePrev}
        />
      </div>
    );
  }
}

export default RestaurantListContainer;
