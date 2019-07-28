import React from 'react';
import { create } from 'react-test-renderer';

import MapActionContainer from '../../../components/MapAction/MapActionContainer';

describe('tests for MapActionContainer component', () => {
  test('render must match snapshot', () => {
    const func = () => {};
    const tree = create(
      <MapActionContainer
        handleZoomIn={func}
        handleZoomOut={func}
        refreshLocation={func}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
