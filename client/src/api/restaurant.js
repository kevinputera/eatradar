import Immutable from 'immutable';

export const restaurant = Immutable.Record({
  id: null,
  name: '',
  block: '',
  street: '',
  unit: '',
  level: '',
  postcode: '',
  dist: 0,
});
