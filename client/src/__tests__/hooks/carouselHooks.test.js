import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import { useCarousel } from '../../hooks/carouselHooks';

describe('tests for useCarousel hook', () => {
  function Wrapper(props) {
    const [index, handlePrevClick, handleNextClick, jumpTo] = useCarousel({
      length: props.length,
      timeout: props.timeout,
    });
    return (
      <div
        id="wrapper"
        hooks={{ index, handleNextClick, handlePrevClick, jumpTo }}
      />
    );
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('handleNextClick advances index by one, wraps when overflow', () => {
    const length = 2;
    const timeout = 5000;
    const wrapper = shallow(<Wrapper length={length} timeout={timeout} />);

    const first = wrapper.find('#wrapper');
    const { handleNextClick, index } = first.prop('hooks');
    expect(index).toBe(0);

    // advances by one
    handleNextClick();
    const second = wrapper.find('#wrapper');
    expect(second.prop('hooks').index).toBe(1);

    // overflow, wrap
    handleNextClick();
    const third = wrapper.find('#wrapper');
    expect(third.prop('hooks').index).toBe(0);
  });

  test('handlePrevClick move back index by one, wraps when overflow', () => {
    const length = 4;
    const timeout = 5000;
    const wrapper = shallow(<Wrapper length={length} timeout={timeout} />);

    const first = wrapper.find('#wrapper');
    const { handlePrevClick, index } = first.prop('hooks');
    expect(index).toBe(0);

    // overflow, wrap
    handlePrevClick();
    const second = wrapper.find('#wrapper');
    expect(second.prop('hooks').index).toBe(3);

    // move back by one
    handlePrevClick();
    const third = wrapper.find('#wrapper');
    expect(third.prop('hooks').index).toBe(2);
  });

  test('jumpTo arbitrarily update index as desired', () => {
    const length = 5;
    const timeout = 5000;
    const wrapper = shallow(<Wrapper length={length} timeout={timeout} />);

    const before = wrapper.find('#wrapper');
    const { jumpTo, index } = before.prop('hooks');
    expect(index).toBe(0);

    // jumps to index 3
    jumpTo(3);
    const after = wrapper.find('#wrapper');
    expect(after.prop('hooks').index).toBe(3);
  });

  test('index is advanced every timeout, wraps when overflow', () => {
    const length = 5;
    const timeout = 5000;

    let wrapper;
    act(() => {
      wrapper = mount(<Wrapper length={length} timeout={timeout} />);
    });
    const first = wrapper.find('#wrapper');
    expect(first.prop('hooks').index).toBe(0);

    // go through one interval
    act(() => {
      jest.runOnlyPendingTimers();
    });
    wrapper.update();
    const second = wrapper.find('#wrapper');
    expect(second.prop('hooks').index).toBe(1);

    // overflow, wrap
    act(() => {
      jest.advanceTimersByTime(timeout * 4);
    });
    wrapper.update();
    const third = wrapper.find('#wrapper');
    expect(third.prop('hooks').index).toBe(0);
  });
});
