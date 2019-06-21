import React from 'react';
import _ from 'lodash';
import http from '../../utils/http';

import RestaurantListFilter from '../RestaurantListFilter/RestaurantListFilter';

import './RestaurantListContainer.css';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      query: '',
      items: [],
    };
    this.debouncedGetRestaurants = _.debounce(this.getRestaurants, 300);
  }

  async componentDidMount() {
    await this.getRestaurants();
  }

  getRestaurants = async q => {
    let params;
    if (q) {
      params = {
        lat: this.props.latitude,
        lng: this.props.longitude,
        page: this.state.page,
        pageSize: this.state.pageSize,
        q: q,
      };
    } else {
      params = {
        lat: this.props.latitude,
        lng: this.props.longitude,
        page: this.state.page,
        pageSize: this.state.pageSize,
      }; 
    }
    const res = await http.get('/restaurants', params);
    const json = await res.json();
    this.setState({
      items: json,
    });
  }

  handleQueryInputChange = async e => {
    this.setState({
      query: e.target.value,
    });
    this.debouncedGetRestaurants(e.target.value);
  }

  render() {
    const items = this.state.items.map((item, index) => 
      <button 
        key={item.name + index}
        className=""
      >
        <div>{item.name}</div>
        <div>{item.dist}</div>
        <div>
          <span>{item.block ? `${item.block} ` : ''}</span>
          <span>{item.street}</span>
          <span>{item.unit ? ` #${item.unit}` : ''}</span>
        </div>
      </button>
    );

    return (
      <div className="restaurant-list-container">
        <RestaurantListFilter 
          handleQueryInputChange={this.handleQueryInputChange}
          query={this.state.query}
        />
        <div className="">
          {items}
        </div>
      </div>
    );
  }
}

export default RestaurantList;