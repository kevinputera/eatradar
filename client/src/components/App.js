import React, { Fragment } from 'react';
import RestaurantList from './RestaurantList/RestaurantList';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 border-right">
          <RestaurantList />
        </div>
        <div className="col-md-6">
        </div>
      </div>
    </Fragment>
  );
}

export default App;
