/**
 * Created by RBANDERSON on 10/4/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Lenders from './Lenders';

const umb = 'UMB';
const selectedLender = 'Ally';
const lenders = [umb, selectedLender];
const setSelectedLender = sinon.spy();
const props = {
  lenders,
  selectedLender,
  setSelectedLender
};

function setupmount () {
  return mount(<Lenders {...props} />);
}

describe('Lenders', ()=>{
  it('renders <Lenders/> ', () => {
    const component = renderer.create(<Lenders {...props}/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
  
  it('triggers addSelectedIncentive event when incentive checkbox is clicked', () => {
    const component = setupmount();
    component.find(`#LenderMenuItem${1}`).simulate('click');
    expect(setSelectedLender.calledOnce).toEqual(true);
  });
});
