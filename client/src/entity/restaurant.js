import Immutable from 'immutable';

export const restaurant = Immutable.Record({
  id: null,
  name: null,
  block: null,
  street: null,
  unit: null,
  level: null,
  postcode: null,
  dist: null,
});
