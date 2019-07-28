import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from '@blueprintjs/core';

import CarouselNavigationButton from '../../../../../components/shared/Carousel/CarouselNavigationButton/CarouselNavigationButton';

describe('tests for CarouselNavigationButton component', () => {
  test('render must match snapshot', () => {
    const icon = 'chevron-left';
    const func = () => {};
    const tree = create(
      <CarouselNavigationButton icon={icon} handleClick={func} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('button click must trigger handleClick prop', () => {
    const icon = 'chevron-left';
    const handleClick = jest.fn();
    const wrapper = shallow(
      <CarouselNavigationButton icon={icon} handleClick={handleClick} />
    );
    expect(handleClick).toHaveBeenCalledTimes(0);
    wrapper.find(Button).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
