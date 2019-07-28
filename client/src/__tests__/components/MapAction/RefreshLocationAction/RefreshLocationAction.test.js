import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from '@blueprintjs/core';

import RefreshLocationAction from '../../../../components/MapAction/RefreshLocationAction/RefreshLocationAction';

describe('tests for RefreshLocationAction component', () => {
  test('render must match snapshot', () => {
    const tree = create(<RefreshLocationAction />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('button clicks must trigger location refresh function prop', () => {
    const refreshLocation = jest.fn();
    const wrapper = shallow(
      <RefreshLocationAction refreshLocation={refreshLocation} />
    );
    wrapper.find(Button).simulate('click');
    expect(refreshLocation).toHaveBeenCalledTimes(1);
  });
});
