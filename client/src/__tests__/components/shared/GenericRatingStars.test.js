import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import GenericRatingStars from '../../../components/shared/GenericRatingStars/GenericRatingStars';

describe('tests for GenericRatingStars component', () => {
  test('render must match snapshot', () => {
    const rating = 4.5;

    const treeLarge = create(<GenericRatingStars large rating={rating} />).toJSON();
    expect(treeLarge).toMatchSnapshot();

    const treeWithRating = create(<GenericRatingStars rating={rating} />).toJSON();
    expect(treeWithRating).toMatchSnapshot();

    const treeWithoutRating = create(<GenericRatingStars />).toJSON();
    expect(treeWithoutRating).toMatchSnapshot();
  });

  test('width of overlay must match rating', () => {
    const rating = 3.5;
    const width = '70%';
    const wrapper = shallow(<GenericRatingStars rating={rating} />);
    const overlay = wrapper.find('.generic-stars-overlay');
    expect(overlay.prop('style')).toEqual({ width });
  });
});
