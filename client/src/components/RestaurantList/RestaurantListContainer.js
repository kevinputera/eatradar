import React from 'react';
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
      offset: 1,
      limit: 10,
      contents: [],
      total: 0,
      hasNext: true,
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
      this.state.offset !== prevState.offset ||
      this.state.limit !== prevState.limit
    ) {
      this.getAndUpdateRestaurants();
    }

    if (this.props.query !== prevProps.query) {
      this.throttledGetAndUpdateRestaurants();
    }
  }

  handleLimitChange = limit => {
    this.setState({ limit });
  };

  handleOffsetIncrement = () => {
    this.setState(state => {
      return { offset: state.hasNext ? state.offset + 1 : state.offset };
    });
  };

  handleOffsetDecrement = () => {
    this.setState(state => {
      return { offset: state.offset > 0 ? state.offset - 1 : 0 };
    });
  };

  getAndUpdateRestaurants = async () => {
    const params = {
      lat: this.props.latitude,
      lng: this.props.longitude,
      offset: this.state.offset,
      limit: this.state.limit,
    };
    if (this.props.query) {
      params.q = this.props.query;
    }

    try {
      const { total, contents, hasNext } = await getRestaurants(params);
      this.setState({ contents, total, hasNext });
      this.props.clearRestaurantSelection();
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
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
          handleLimitChange={this.handleLimitChange}
          handleOffsetIncrement={this.handleOffsetIncrement}
          handleOffsetDecrement={this.handleOffsetDecrement}
        />
      </div>
    );
  }
}

export default RestaurantListContainer;
