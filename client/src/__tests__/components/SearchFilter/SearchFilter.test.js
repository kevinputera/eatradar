import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { throttle } from 'lodash';
import { InputGroup } from '@blueprintjs/core';

import SearchFilter from '../../../components/SearchFilter/SearchFilter';

jest.mock('lodash');
const throttledFunc = jest.fn();
throttle.mockImplementation(jest.fn(() => throttledFunc));

describe('tests for SearchFilter component', () => {
  beforeEach(() => {
    throttledFunc.mockClear();
  });

  test('render must match snapshot', () => {
    const func = () => {};
    const tree = create(<SearchFilter updateQueryInput={func} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('input change must update input state and InputGroup value prop', () => {
    const event = { target: { value: 'a' } };
    const wrapper = shallow(<SearchFilter />);

    const before = wrapper.find(InputGroup);
    expect(before.prop('value')).toBe('');
    before.simulate('change', event);

    const after = wrapper.find(InputGroup);
    expect(after.prop('value')).toBe('a');
  });

  test('input change must trigger throttled updateQueryInput prop', () => {
    const event = { target: { value: 'a' } };
    const wrapper = shallow(<SearchFilter />);

    const input = wrapper.find(InputGroup);
    expect(throttledFunc).toHaveBeenCalledTimes(0);
    input.simulate('change', event);
    expect(throttledFunc).toHaveBeenCalledTimes(1);
    expect(throttledFunc).toHaveBeenCalledWith('a');
  });

  test('throttle must be created from updateQueryInput prop', () => {
    const func = () => {};
    shallow(<SearchFilter updateQueryInput={func} />);
    expect(throttle).toHaveBeenCalledWith(func, expect.any(Number));
  });
});
