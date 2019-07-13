import React from 'react';

import RestaurantListContainer from './components/RestaurantList/RestaurantListContainer';
import RestaurantDetailContainer from './components/RestaurantDetail/RestaurantDetailContainer';
import SearchFilter from './components/SearchFilter/SearchFilter';
import Map from './components/Map/Map';

import './AppContainer.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      latitude: 1.3033702, // set default to point to the center of Singapore
      longitude: 103.8283541, // set default to point to the center of Singapore
      restaurantSelection: 0,
    };
  }

  componentDidMount() {
    // enable position tracking, if available
    this.watchPositionCallback = navigator.geolocation.watchPosition(
      res => {
        const coords = res.coords;
        this.updateLocation(coords);
      },
      error => console.log(error.message), // TODO: update this
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  }

  componentWillUnmount() {
    // clear position tracking
    navigator.geolocation.clearWatch(this.watchPositionCallback);
  }

  handleQueryInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleRefreshButtonClick = async () => {
    // manual get position trigger
    navigator.geolocation.getCurrentPosition(
      async res => {
        const coords = res.coords;
        await this.updateLocation(coords);
        console.log('manual trigger successful');
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };

  updateRestaurantSelection = id => {
    this.setState({ restaurantSelection: id });
  };

  clearRestaurantSelection = () => {
    this.setState({ restaurantSelection: null });
  };

  updateLocation = async ({ latitude, longitude }) => {
    this.setState({ latitude, longitude });
  };

  render() {
    return (
      <div className="app">
        <div className="map-wrapper">
          <Map
            query={this.state.query}
            restaurantSelection={this.state.restaurantSelection}
            updateRestaurantSelection={this.updateRestaurantSelection}
          />
        </div>
        <div className="search-filter-wrapper">
          <SearchFilter
            query={this.state.query}
            handleQueryInputChange={this.handleQueryInputChange}
            handleRefreshButtonClick={this.handleRefreshButtonClick}
          />
        </div>
        <div className="restaurant-list-wrapper card-wrapper">
          <RestaurantListContainer
            query={this.state.query}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            restaurantSelection={this.state.restaurantSelection}
            handleQueryInputChange={this.handleQueryInputChange}
            handleRefreshButtonClick={this.handleRefreshButtonClick}
            updateRestaurantSelection={this.updateRestaurantSelection}
            clearRestaurantSelection={this.clearRestaurantSelection}
          />
        </div>
        {this.state.restaurantSelection && (
          <div className="restaurant-detail-wrapper card-wrapper">
            <RestaurantDetailContainer
              restaurantSelection={this.state.restaurantSelection}
              clearRestaurantSelection={this.clearRestaurantSelection}
              ref={this.restaurantDetailRef}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
