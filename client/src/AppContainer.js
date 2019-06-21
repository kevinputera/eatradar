import React from 'react';
import RestaurantList from './components/RestaurantListContainer/RestaurantListContainer';
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails';
import Map from './components/Map/Map';

import './AppContainer.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 1.3033702, // set default to point to the center of Singapore
      longitude: 103.8283541, // set default to point to the center of Singapore
    };
    this.restaurantListRef = React.createRef();
  }

  getLocationAndRefreshRestaurants = async ({ latitude, longitude }) => {
    this.setState({
      latitude,
      longitude 
    });
    if (this.restaurantListRef) {
      await this.restaurantListRef.current.getRestaurants();
    }
  }

  componentDidMount() {
    // enable position tracking, if available
    this.watchPositionCallback = navigator.geolocation.watchPosition(
      async res => {
        const coords = res.coords;
        await this.getLocationAndRefreshRestaurants(coords);
      },
      error => console.log(error.message) // TODO: update this
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
        await this.getLocationAndRefreshRestaurants(coords);
        console.log("manual trigger successful");
      },
      error => console.log(error.message),
      { timeout: 10000 },
    )
  }

  render() {
    return (
      <div className="app">
        <div className="map-column">
          <Map />
        </div>
        <div className="restaurant-list-column">
          <RestaurantList 
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            handleRefreshButtonClick={this.handleRefreshButtonClick}
            ref={this.restaurantListRef}
          />
        </div>
        <div className="restaurant-detail-column">
          <RestaurantDetails />
        </div>
      </div>
    );
  }
}

export default App;
