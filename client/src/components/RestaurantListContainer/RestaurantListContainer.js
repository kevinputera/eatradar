import React from 'react';
import _ from 'lodash';
import http from '../../utils/http';

import RestaurantListFilter from '../RestaurantListFilter/RestaurantListFilter';
import RestaurantListContent from '../RestaurantListContent/RestaurantListContent';

import './RestaurantListContainer.css';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      query: '',
      contents: [],
      activeRestaurantIndex: null,
    };
    this.debouncedGetRestaurants = _.debounce(this.getRestaurants, 300);
  }

  async componentDidMount() {
    await this.getRestaurants();
  }

  getRestaurants = async q => {
    let params = {
      lat: this.props.latitude,
      lng: this.props.longitude,
      page: this.state.page,
      pageSize: this.state.pageSize, 
    };
    if (q) {
      params = { ...params, q: q }
    }
    const res = await http.get('/restaurants', params);
    const json = await res.json();
    this.setState({
      contents: json,
    });
  }

  handleQueryInputChange = async e => {
    this.setState({
      query: e.target.value,
    });
    await this.debouncedGetRestaurants(e.target.value);
  }

  handleRestaurantContentClick = index => {
    this.setState({
      activeRestaurantIndex: index,
    });
  }

  render() {
    return (
      <div className="restaurant-list-container">
        <RestaurantListFilter 
          handleQueryInputChange={this.handleQueryInputChange}
          handleRefreshButtonClick={this.props.handleRefreshButtonClick}
          query={this.state.query}
        />
        <RestaurantListContent
          handleRestaurantContentClick={this.handleRestaurantContentClick}
          activeRestaurantIndex={this.state.activeRestaurantIndex}
          contents={this.state.contents}
        />
      </div>
    );
  }
}

export default RestaurantList;