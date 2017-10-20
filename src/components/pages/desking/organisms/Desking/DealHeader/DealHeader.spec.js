import React from 'react';
import renderer from 'react-test-renderer';
import DealHeader from './DealHeader';
import { shallow, mount } from 'enzyme';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

function setupshallow (zipcode, creditscore) {
  const props = {
    htmlId:"DealerHeader",
    zipcode,
    creditscore: creditscore || undefined
  };
  return shallow(<DealHeader {...props} />);
}

function setupmount (zipcode, creditscore) {
  const props = {
    htmlId:"DealerHeader",
    zipcode,
    creditscore: creditscore || undefined
  };
  return mount(<DealHeader {...props} />);
}

describe('DealHeader', ()=>{
  it('renders <DealHeader />', () =>{
    const component = renderer.create(<DealHeader htmlId="DealHeader" zipcode="66203" creditscore={650} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render 2 <Button /> components', () => {
    const component = setupshallow('66203',650);
    expect(component.find(Button).length).toBe(2);
  });

  it('should render 850 as a default value for credit score', () => {
    const component = setupmount('66203');
    expect(component.props().creditscore).toEqual(850);
  });

  it('should render 66202 for zipcode and 750 for creditscore', () => {
    const props = {
      zipcode : '66203',
      creditscore: 750
    };
    const component = setupmount(props.zipcode, props.creditscore);
    expect(component.props().creditscore).toEqual(props.creditscore);
    expect(component.props().zipcode).toEqual(props.zipcode);
  });

  it('should show/hide the respective dialog when the Button is clicked', ()=> {
    const props = {
      htmlId:'DealerHeader',
      zipcode: '66201',
      creditscore: 750
    };
    const component = mount(<DealHeader {...props} />);
    component.find('#buttonZipcode').simulate('click');
    expect(component.state().showZipcodeModal).toEqual(true);
    component.find('#buttonZipcode').simulate('click');
    expect(component.state().showZipcodeModal).toEqual(false);
    component.find('#buttonCreditscore').simulate('click');
    expect(component.state().showCreditScoreModal).toEqual(true);
    component.find('#buttonCreditscore').simulate('click');
    expect(component.state().showCreditScoreModal).toEqual(false);
  });
});
