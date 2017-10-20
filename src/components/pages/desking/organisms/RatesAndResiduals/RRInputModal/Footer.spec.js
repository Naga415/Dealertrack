/**
 * Created by RBANDERSON on 10/4/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Footer from './Footer';


const onCancel = sinon.spy();
const onApply = sinon.spy();

function setupProps(applyEnabled){
  return {
    applyEnabled,
    onCancel,
    onApply
  };
}

function setupmount (applyEnabled) {
  const props = setupProps(applyEnabled);
  return mount(<Footer {...props} />);
}

describe('Footer', ()=>{
  it('renders <Footer/> ', () => {
    const props = setupProps(true);
    const component = renderer.create(<Footer {...props}/>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render <Footer/> with apply button enabled', () => {
    const component = setupmount(true);
    expect(component.find({id:'RRModelApply',disabled:false}).length).toBe(1);
  });

  it('should render <Footer/> with apply button disabled', () => {
    const component = setupmount(false);
    expect(component.find({id:'RRModelApply',disabled:true}).length).toBe(1);
  });

  it('triggers onApply event when Apply button is clicked', () => {
    const component = setupmount(true);
    component.find(`#RRModelApply`).simulate('click');
    expect(onApply.calledOnce).toEqual(true);
  });
  
  it('triggers onCancel event when Cancel button is clicked', () => {
    const component = setupmount(true);
    component.find(`#RRModelCancel`).simulate('click');
    expect(onApply.calledOnce).toEqual(true);
  });
});
