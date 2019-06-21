import React from 'react';
import RestaurantList from './components/RestaurantListContainer/RestaurantListContainer';
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails';
import Map from './components/Map/Map';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 1.3033702, // set default to point to the center of Singapore
      longitude: 103.8283541, // set default to point to the center of Singapore
    };
    this.restaurantListRef = React.createRef();
  }

  componentDidMount() {
    // enable position tracking, if available
    this.watchPositionCallback = navigator.geolocation.watchPosition(
      async position => {
        this.setState({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude 
        });
        if (this.restaurantListRef) {
          await this.restaurantListRef.current.getRestaurants();
        }
      },
      error => console.log(error.message) // TODO: update this
    );
  }

  componentWillUnmount() {
    // clear position tracking
    navigator.geolocation.clearWatch(this.watchPositionCallback);
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
