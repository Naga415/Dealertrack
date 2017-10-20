"use strict";
import React from 'react';
import renderer from 'react-test-renderer';
import FeesFormHeader from './FeesFormHeader';

describe('FeesFormHeader specs', () => {
  it('renders <FeesFormHeader />', () => {
    const component = renderer.create(<FeesFormHeader />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
