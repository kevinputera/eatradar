import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import CarouselPageIndicator from '../../../../../components/shared/Carousel/CarouselPageIndicator/CarouselPageIndicator';

describe('tests for CarouselPageIndicator component', () => {
  test('render must match snapshot', () => {
    const length = 5;
    const index = 3;
    const func = () => {};
    const tree = create(
      <CarouselPageIndicator length={length} index={index} jumpTo={func} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('click must trigger jumpTo prop with the correct index', () => {
    const length = 4;
    const activeIdx = 2;
    const jumpIdx = 1;
    const jumpTo = jest.fn();

    const wrapper = shallow(
      <CarouselPageIndicator length={length} index={activeIdx} jumpTo={jumpTo} />
    );

    const bars = wrapper.find('.carousel-page-bar');
    expect(bars.length).toBe(length);

    bars.at(jumpIdx).simulate('click');
    expect(jumpTo).toHaveBeenCalledTimes(1);
    expect(jumpTo).toHaveBeenCalledWith(jumpIdx);
  });
});
