import Immutable from 'immutable';

export const openingHours = Immutable.Record({
  open_now: null,
  periods: null,
  weekday_text: null,
});

export const period = Immutable.Record({
  close: null,
  open: null,
});

export const photo = Immutable.Record({
  html_attributions: null,
  url: null,
});

export const details = Immutable.Record({
  opening_hours: null,
  phone_number: null,
  photos: null,
  website: null,
});
