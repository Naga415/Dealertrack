"use strict";
import React from 'react';
import renderer from 'react-test-renderer';
import RebatesFormHeader from './RebatesFormHeader';

describe('RebatesFormHeader specs', () => {
  it('renders <RebatesFormHeader />', () => {
    const component = renderer.create(<RebatesFormHeader />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
