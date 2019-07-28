import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from '@blueprintjs/core';

import ZoomAction from '../../../../components/MapAction/ZoomAction/ZoomAction';

describe('tests for ZoomAction component', () => {
  test('render must match snapshot', () => {
    const tree = create(<ZoomAction />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('zoom-in click must trigger handleZoomIn prop', () => {
    const handleZoomIn = jest.fn();
    const wrapper = shallow(<ZoomAction handleZoomIn={handleZoomIn} />);
    wrapper.find('.zoom-in-button').simulate('click');
    expect(handleZoomIn).toHaveBeenCalledTimes(1);
  });

  test('zoom-out click must trigger handleZoomOut prop', () => {
    const handleZoomOut = jest.fn();
    const wrapper = shallow(<ZoomAction handleZoomOut={handleZoomOut} />);
    wrapper.find('.zoom-out-button').simulate('click');
    expect(handleZoomOut).toHaveBeenCalledTimes(1);
  });
});
