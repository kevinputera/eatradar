import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { getRestaurants } from '../../api/restaurantApi';

import RestaurantListFilter from './RestaurantListFilter/RestaurantListFilter';
import RestaurantListContent from './RestaurantListContent/RestaurantListContent';
import RestaurantListNavigation from './RestaurantListNavigation/RestaurantListNavigation';

import './RestaurantListContainer.css';

class RestaurantListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      contents: Immutable.List(),
    };

    this.throttledGetAndUpdateRestaurants = _.throttle(
      this.getAndUpdateRestaurants,
      200
    );
  }

  componentDidMount() {
    this.getAndUpdateRestaurants();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.latitude !== prevProps.latitude ||
      this.props.longitude !== prevProps.longitude ||
      this.state.page !== prevState.page ||
      this.state.pageSize !== prevState.pageSize
    ) {
      this.getAndUpdateRestaurants();
    }

    if (this.props.query !== prevProps.query) {
      this.throttledGetAndUpdateRestaurants();
    }
  }

  handlePageSizeChange = size => {
    this.setState({ pageSize: size });
  };

  handlePageNext = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  handlePagePrev = () => {
    this.setState(state => {
      return { page: state.page > 1 ? state.page - 1 : 1 };
    });
  };

  getAndUpdateRestaurants = async () => {
    let params = {
      lat: this.props.latitude,
      lng: this.props.longitude,
      p: this.state.page,
      ps: this.state.pageSize,
      q: this.props.query,
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
          query={this.props.query}
          handleQueryInputChange={this.props.handleQueryInputChange}
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
