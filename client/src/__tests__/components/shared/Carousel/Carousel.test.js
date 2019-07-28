import React from 'react';
import { create } from 'react-test-renderer';

import Carousel from '../../../../components/shared/Carousel/Carousel';

describe('tests for Carousel component', () => {
  test('render must match snapshot', () => {
    const contents = [{ post: 'Post 1' }, { post: 'Post 2' }, { post: 'Post 3' }];
    const tree = create(<Carousel contents={contents} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
