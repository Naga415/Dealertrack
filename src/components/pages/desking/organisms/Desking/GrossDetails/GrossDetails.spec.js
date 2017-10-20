import React from 'react';
import renderer from 'react-test-renderer';
import GrossDetails from './GrossDetails';

describe('<GrossDetails/> component', () => {
  const frontGrossBreakdown = [

  ];

  const backGrossBreakdown = [

  ];

  it('renders <GrossDetails/> ', () => {
    const component = renderer.create(<GrossDetails htmlId="GrossDetails" frontGrossBreakdown={frontGrossBreakdown} backGrossBreakdown={backGrossBreakdown} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
