import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import PaginationControls from '../../../../components/shared/PaginationControls/PaginationControls';

describe('tests for PaginationControls component', () => {
  const handleOffsetIncr = jest.fn();
  const handleOffsetDecr = jest.fn();
  const offset = 0;

  beforeEach(() => {
    handleOffsetDecr.mockClear();
    handleOffsetIncr.mockClear();
  });

  test('render must match snapshot', () => {
    const treeWithSmallIndicator = create(
      <PaginationControls
        small
        indicator
        offset={offset}
        handleOffsetIncr={handleOffsetIncr}
        handleOffsetDecr={handleOffsetDecr}
      />
    ).toJSON();
    expect(treeWithSmallIndicator).toMatchSnapshot();

    const treeWithIndicator = create(
      <PaginationControls
        indicator
        offset={offset}
        handleOffsetIncr={handleOffsetIncr}
        handleOffsetDecr={handleOffsetDecr}
      />
    ).toJSON();
    expect(treeWithIndicator).toMatchSnapshot();

    const treeWithoutIndicator = create(
      <PaginationControls
        handleOffsetIncr={handleOffsetIncr}
        handleOffsetDecr={handleOffsetDecr}
      />
    ).toJSON();
    expect(treeWithoutIndicator).toMatchSnapshot();
  });

  test('Increment click must trigger handleOffsetIncr prop', () => {
    const wrapper = shallow(
      <PaginationControls
        handleOffsetDecr={handleOffsetDecr}
        handleOffsetIncr={handleOffsetIncr}
      />
    );
    wrapper.find('.pagination-controls-incr-button').simulate('click');
    expect(handleOffsetDecr).toHaveBeenCalledTimes(0);
    expect(handleOffsetIncr).toHaveBeenCalledTimes(1);
  });

  test('Decrement click must trigger handleOffsetDecr prop', () => {
    const wrapper = shallow(
      <PaginationControls
        handleOffsetDecr={handleOffsetDecr}
        handleOffsetIncr={handleOffsetIncr}
      />
    );
    wrapper.find('.pagination-controls-decr-button').simulate('click');
    expect(handleOffsetIncr).toHaveBeenCalledTimes(0);
    expect(handleOffsetDecr).toHaveBeenCalledTimes(1);
  });
});
