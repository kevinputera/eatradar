import React from 'react';
import './RestaurantList.css';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      query: '',
    };
  }

  async componentDidMount() {
  }

  handleQueryInputChange = e => {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="name-query">query</label>
        <input 
          id="name-query"
          type="text"
          placeholder="search"
          value={this.state.query}
          onChange={this.handleQueryInputChange}
        />
      </form>
    );
  }
}

export default RestaurantList;