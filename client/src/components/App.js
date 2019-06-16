import React, { Fragment } from 'react';
import RestaurantList from './RestaurantList/RestaurantList';
import RestaurantDetails from './RestaurantDetails/RestaurantDetails';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 border-right pr-1 pl-3">
          <RestaurantList />
        </div>
        <div className="col-md-6">
          <RestaurantDetails />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
