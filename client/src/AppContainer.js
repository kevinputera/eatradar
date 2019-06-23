import React from 'react';

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
    };
    this.restaurantListRef = React.createRef();
    this.restaurantDetailRef = React.createRef();
  }

  async componentDidMount() {
    // enable position tracking, if available
    this.watchPositionCallback = navigator.geolocation.watchPosition(
      async res => {
        const coords = res.coords;
        await this.updateLocationAndRefreshRestaurantList(coords);
      },
      error => console.log(error.message), // TODO: update this
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
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
        await this.updateLocationAndRefreshRestaurantList(coords);
        console.log("manual trigger successful");
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
    )
  };

  updateRestaurantSelection = async restaurant => {
    this.setState(
      { restaurantSelection: restaurant },
      async () => await this.restaurantDetailRef.current.getAndUpdateDetails()
    );
  };

  clearRestaurantSelection = () => {
    this.setState({
      restaurantSelection: null,
    });
  };

  updateLocationAndRefreshRestaurantList = async ({ latitude, longitude }) => {
    this.setState({
      latitude,
      longitude 
    });
    await this.restaurantListRef.current.debouncedGetAndUpdateRestaurants();
  };

  render() {
    const restaurantDetailContainer = this.state.restaurantSelection 
        ? <div className="restaurant-card-wrapper">
            <RestaurantDetailContainer
              restaurantSelection={this.state.restaurantSelection}
              clearRestaurantSelection={this.clearRestaurantSelection}
              ref={this.restaurantDetailRef}
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
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              restaurantSelection={this.state.restaurantSelection}
              handleRefreshButtonClick={this.handleRefreshButtonClick}
              updateRestaurantSelection={this.updateRestaurantSelection}
              clearRestaurantSelection={this.clearRestaurantSelection}
              ref={this.restaurantListRef}
            />
          </div>

          {restaurantDetailContainer} 
        </div>
      </div>
    );
  }
}

export default App;