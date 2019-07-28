import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import YelpRatingStars from '../../../../components/shared/YelpRatingStars/YelpRatingStars';

import ONE from '../../../../components/shared/YelpRatingStars/large_1.png';

describe('tests for YelpRatingStars component', () => {
  test('render must match snapshot', () => {
    const rating = 3.2;

    const treeLarge = create(<YelpRatingStars large rating={rating} />).toJSON();
    expect(treeLarge).toMatchSnapshot();

    const treeWithRating = create(<YelpRatingStars rating={rating} />).toJSON();
    expect(treeWithRating).toMatchSnapshot();

    const treeWithoutRating = create(<YelpRatingStars />).toJSON();
    expect(treeWithoutRating).toMatchSnapshot();
  });

  test('png used must match rating', () => {
    const rating = 1.1;
    const wrapper = shallow(<YelpRatingStars rating={rating} />);
    const img = wrapper.find('img');
    expect(img.prop('src')).toBe(ONE);
  });
});
