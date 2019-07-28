import React from 'react';
import { create } from 'react-test-renderer';

import YelpAttribution from '../../../../components/shared/YelpAttribution/YelpAttribution';

describe('tests for YelpAttribution component', () => {
  test('render must match snapshot', () => {
    const tree = create(<YelpAttribution />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
