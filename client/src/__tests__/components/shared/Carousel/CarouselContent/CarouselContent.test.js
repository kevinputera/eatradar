import React from 'react';
import { create } from 'react-test-renderer';

import CarouselContent from '../../../../../components/shared/Carousel/CarouselContent/CarouselContent';

describe('tests for CarouselContent component', () => {
  test('render must match snapshot', () => {
    const post = 'A post';
    const title = 'A title';
    const link = 'https://www.eatradar.com';
    const author = 'An author';

    const tree = create(<CarouselContent content={{ post }} />).toJSON();
    expect(tree).toMatchSnapshot();

    const treeWithTitle = create(
      <CarouselContent content={{ post, title }} />
    ).toJSON();
    expect(treeWithTitle).toMatchSnapshot();

    const treeWithLink = create(
      <CarouselContent content={{ post, link }} />
    ).toJSON();
    expect(treeWithLink).toMatchSnapshot();

    const treeWithAuthor = create(
      <CarouselContent content={{ post, author }} />
    ).toJSON();
    expect(treeWithAuthor).toMatchSnapshot();
  });
});
