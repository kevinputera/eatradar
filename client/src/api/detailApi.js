import Immutable from 'immutable';
import { get } from '../utils/http';
import { details, openingHours, period, photo } from './details';

/**
 * Get the details of a restaurant
 * 
 * @param {number} id
 * @return {Immutable.Record} - details of a restaurant
 */
export const getDetails = async id => {
  try {
    const json = await get(`/details/${id}`);
    const raw = json.data.google;

    let hours;
    if (raw.opening_hours) {
      const now = raw.opening_hours.open_now;
      const periods = Immutable.List(raw.opening_hours.periods.map(p => period(p)));
      const text = Immutable.List(raw.opening_hours.weekday_text);
      hours = openingHours({
        open_now: now,
        periods: periods,
        weekday_text: text,
      });
    }

    let photos;
    if (raw.photos) {
      photos = Immutable.List(raw.photos.map(p => {
        let attributions;
        if (p.html_attributions) {
          attributions = Immutable.List(p.html_attributions);
        }
        return photo({
          html_attributions: attributions,
          url: p.url,
        });
      }));
    }

    return details({
      opening_hours: hours,
      phone_number: raw.phone_number,
      photos: photos,
      website: raw.website,
    });
  } catch (e) {
    return details();
  }
};