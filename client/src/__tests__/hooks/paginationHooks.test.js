import React from 'react';
import { shallow } from 'enzyme';

import { usePaginatedContent } from '../../hooks/paginationHooks';

describe('tests for usePaginatedContent hook', () => {
  function Wrapper(props) {
    const [offset, handleOffsetDecr, handleOffsetIncr] = usePaginatedContent(
      props.size
    );
    return (
      <div id="wrapper" hooks={{ offset, handleOffsetDecr, handleOffsetIncr }} />
    );
  }

  test('handleOffsetIncr advances offset by one, wraps if overflow', () => {
    const size = 2;
    const wrapper = shallow(<Wrapper size={size} />);

    const first = wrapper.find('#wrapper');
    const { offset, handleOffsetIncr } = first.prop('hooks');
    expect(offset).toBe(0);

    // advance by one
    handleOffsetIncr();
    const second = wrapper.find('#wrapper');
    expect(second.prop('hooks').offset).toBe(1);

    // overflow, wrap
    handleOffsetIncr();
    const third = wrapper.find('#wrapper');
    expect(third.prop('hooks').offset).toBe(0);
  });

  test('handleOffsetDecr moves back offset by one, wraps if overflow', () => {
    const size = 5;
    const wrapper = shallow(<Wrapper size={size} />);

    const first = wrapper.find('#wrapper');
    const { offset, handleOffsetDecr } = first.prop('hooks');
    expect(offset).toBe(0);

    // overflow, wrap
    handleOffsetDecr();
    const second = wrapper.find('#wrapper');
    expect(second.prop('hooks').offset).toBe(4);

    // move back by one
    handleOffsetDecr();
    const third = wrapper.find('#wrapper');
    expect(third.prop('hooks').offset).toBe(3);
  });
});
