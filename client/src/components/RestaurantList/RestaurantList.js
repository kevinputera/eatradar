import React from 'react';
import _ from 'lodash';
import http from '../../utils/http';
import './RestaurantList.css';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 1.305004,
      longitude: 103.772474,
      page: 1,
      pageSize: 10,
      query: '',
      items: [],
    };
    this.debouncedGetRestaurants = _.debounce(this.getRestaurants, 300);
  }

  async componentDidMount() {
    const params = {
      lat: this.state.latitude,
      lng: this.state.longitude,
      page: this.state.page,
      pageSize: this.state.pageSize,
    };
    await this.getRestaurants(params);
  }

  getRestaurants = async params => {
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

    const params = {
      lat: this.state.latitude,
      lng: this.state.longitude,
      page: this.state.page,
      pageSize: this.state.pageSize,
      q: e.target.value,
    };
    this.debouncedGetRestaurants(params);
  }

  render() {
    const items = this.state.items.map((item, index) => 
      <li key={item.name + index}>
        <div>{item.name}</div>
        <div>{item.dist}</div>
        <div>
          <span>{item.block ? `${item.block} ` : ''}</span>
          <span>{item.street}</span>
          <span>{item.unit ? ` #${item.unit}` : ''}</span>
        </div>
      </li>
    );

    return (
      <div className="container">
        <form>
          <label htmlFor="search-query">query</label>
          <input 
            id="search-query"
            type="text"
            placeholder="search"
            value={this.state.query}
            onChange={this.handleQueryInputChange}
          />
        </form>

        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

export default RestaurantList;