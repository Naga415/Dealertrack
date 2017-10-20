'use strict';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DeskingHeader from './Header';
import DealHeader from './DealHeader/DealHeader';
import DealActionBar from '../../molecules/DealActionBar/DealActionBar';

describe('Desking Header Tests', () => {
  const onHideGrossClick = sinon.spy();
  const props = {
    htmlId: "DeskingHeader",
    showGrossProfit: false,
    updateGrossDisplayStatus: onHideGrossClick
  };

  it('will render header', () => {
    const component = shallow(<DeskingHeader {...props} />);
    expect(component.find('.deal-header').length).toBe(1);
  });

  it('will render header with action menu and drop-down menu', () => {
    const component = shallow(<DeskingHeader {...props} />);
    expect(component.find(DealHeader).length).toBe(1);
    expect(component.find(DealActionBar).length).toBe(1);
  });
});
