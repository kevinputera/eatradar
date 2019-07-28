import React from 'react';
import { create } from 'react-test-renderer';

import GoogleAttribution from '../../../../components/shared/GoogleAttribution/GoogleAttribution';

describe('tests for GoogleAttribution component', () => {
  test('render must match snapshot', () => {
    const tree = create(<GoogleAttribution />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
