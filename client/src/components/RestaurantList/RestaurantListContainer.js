import React from 'react';
import _ from 'lodash';
import { getRestaurants } from '../../api/restaurantApi';

import RestaurantListList from './RestaurantListList/RestaurantListList';

import './RestaurantListContainer.css';

class RestaurantListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      hasNext: true,
      offset: 0,
      offsetUpdating: false,
    };

    this.limit = 15; // number of additional items per fetch

    this.containerRef = React.createRef();

    this.throttledGetAndUpdateRestaurants = _.throttle(
      this.getAndUpdateRestaurants,
      200
    );
  }

  componentDidMount() {
    this.getAndUpdateRestaurants();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.offset !== prevState.offset) {
      this.getAndUpdateRestaurants(false);
    }

    if (
      this.props.latitude !== prevProps.latitude ||
      this.props.longitude !== prevProps.longitude
    ) {
      this.getAndUpdateRestaurants(true);
    }

    if (this.props.query !== prevProps.query) {
      this.throttledGetAndUpdateRestaurants(true);
    }
  }

  handleOffsetIncrement = () => {
    if (!this.state.offsetUpdating) {
      this.setState(state => {
        return {
          offset: state.hasNext ? state.offset + 1 : state.offset,
          offsetUpdating: true,
        };
      });
    }
  };

  getAndUpdateRestaurants = async reset => {
    const params = {
      lat: this.props.latitude,
      lng: this.props.longitude,
      offset: this.state.offset,
      limit: this.limit,
    };
    if (this.props.query) {
      params.q = this.props.query;
    }

    try {
      const { contents, hasNext } = await getRestaurants(params);
      if (reset) {
        this.setState({
          contents,
          hasNext,
          offset: 0,
          offsetUpdating: false,
        });
      } else {
        this.setState(state => ({
          contents: state.contents.concat(contents),
          hasNext,
          offset: 0,
          offsetUpdating: false,
        }));
      }
      this.props.clearRestaurantSelection();
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
    }
  };

  render() {
    return (
      <div className="restaurant-list-container" ref={this.containerRef}>
        <RestaurantListList
          hasNext={this.state.hasNext}
          contents={this.state.contents}
          containerEl={this.containerRef.current}
          restaurantSelection={this.props.restaurantSelection}
          handleOffsetIncrement={this.handleOffsetIncrement}
          updateRestaurantSelection={this.props.updateRestaurantSelection}
        />
      </div>
    );
  }
}

export default RestaurantListContainer;
