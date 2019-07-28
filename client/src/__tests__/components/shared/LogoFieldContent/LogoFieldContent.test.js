import React from 'react';
import { create } from 'react-test-renderer';

import {
  LogoFieldContent,
  LogoFieldContentLoading,
} from '../../../../components/shared/LogoFieldContent/LogoFieldContent';

describe('tests for LogoFieldContent component', () => {
  test('render must match snapshot', () => {
    const icon = 'phone';
    const content = <div>A content</div>;
    const tree = create(
      <LogoFieldContent icon={icon}>{content}</LogoFieldContent>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('tests for LogoFieldContentLoading component', () => {
  test('render must match snapshot', () => {
    const tree = create(<LogoFieldContentLoading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
