import React from 'react';
import Immutable from 'immutable';
import { getRestaurants } from './api/restaurantApi';

import RestaurantListContainer from './components/RestaurantListContainer/RestaurantListContainer';
import RestaurantDetailContainer from './components/RestaurantDetailContainer/RestaurantDetailContainer';
import Map from './components/Map/Map';

import './AppContainer.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 1.3033702, // set default to point to the center of Singapore
      longitude: 103.8283541, // set default to point to the center of Singapore
      restaurantSelection: null,
      page: 1,
      pageSize: 10,
      contents: Immutable.List(),
    };
  }

  async componentDidMount() {
    // enable position tracking, if available
    this.watchPositionCallback = navigator.geolocation.watchPosition(
      async res => {
        const coords = res.coords;
        await this.updateLocationAndRefreshRestaurants(coords);
      },
      error => console.log(error.message), // TODO: update this
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    await this.getAndUpdateRestaurants();
  }

  componentWillUnmount() {
    // clear position tracking
    navigator.geolocation.clearWatch(this.watchPositionCallback);
  }

  handleRefreshButtonClick = async () => {
    // manual get position trigger
    navigator.geolocation.getCurrentPosition(
      async res => {
        const coords = res.coords;
        await this.updateLocationAndRefreshRestaurants(coords);
        console.log("manual trigger successful");
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
    )
  };

  updateLocationAndRefreshRestaurants = async ({ latitude, longitude }) => {
    this.setState({
      latitude,
      longitude 
    });
    await this.getAndUpdateRestaurants();
  };

  getAndUpdateRestaurants = async query => {
    let params = {
      lat: this.state.latitude,
      lng: this.state.longitude,
      page: this.state.page,
      pageSize: this.state.pageSize,
    };
    if (query) {
      params = { ...params, q: query };
    }

    const restaurants = await getRestaurants(params);
    if (!Immutable.is(restaurants, this.state.contents)) {
      this.setState({
        contents: restaurants,
      });
      this.clearRestaurantSelection();
    }
  }

  updateRestaurantSelection = id => {
    this.setState({
      restaurantSelection: id,
    });
  };

  clearRestaurantSelection = () => {
    this.setState({
      restaurantSelection: null,
    });
  };

  render() {
    const restaurantDetailContainer = this.state.restaurantSelection 
        ? <div className="restaurant-card-wrapper">
            <RestaurantDetailContainer
              contents={this.state.contents}
              restaurantSelection={this.state.restaurantSelection}
              clearRestaurantSelection={this.clearRestaurantSelection}
            />
          </div>
        : null;

    return (
      <div className="app">
        <div className="map-wrapper">
          <Map />
        </div>
        <div className="restaurant-list-detail-wrapper">
          <div className="restaurant-card-wrapper">
            <RestaurantListContainer 
              contents={this.state.contents}
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              restaurantSelection={this.state.restaurantSelection}
              handleRefreshButtonClick={this.handleRefreshButtonClick}
              updateRestaurantSelection={this.updateRestaurantSelection}
              getAndUpdateRestaurants={this.getAndUpdateRestaurants}
            />
          </div>

          {restaurantDetailContainer} 
        </div>
      </div>
    );
  }
}

export default App;
