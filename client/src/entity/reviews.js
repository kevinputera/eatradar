import Immutable from 'immutable';

export const review = Immutable.Record({
  author_name: null,
  author_url: null,
  language: null,
  profile_photo_url: null,
  rating: null,
  relative_time_description: null,
  text: null,
  time: null,
});

export const reviews = Immutable.Record({
  rating: null,
  reviews: null,
});

export const reviewsAgg = Immutable.Record({
  google: null,
  yelp: null,
});
