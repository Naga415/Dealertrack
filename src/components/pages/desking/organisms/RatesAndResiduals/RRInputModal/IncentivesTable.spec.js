/**
 * Created by RBANDERSON on 10/4/2017.
 */
/**
 * Created by RBANDERSON on 10/4/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import IncentivesTable from './IncentivesTable';
import Incentive from '../../../../../../models/RatesAndResiduals/Incentive';

const militaryIncentive = new Incentive();
militaryIncentive.id = 1;
militaryIncentive.name = "Military Incentive";
militaryIncentive.apr ='5.4';
militaryIncentive.expirationDate = '12/05/2018';
militaryIncentive.details = "Work hard, play harder";
militaryIncentive.exclusions =[2];
militaryIncentive.offer = 1234;

const gradIncentive = new Incentive();
gradIncentive.id = 2;
gradIncentive.name = "Recent Grad Incentive";
gradIncentive.apr ='5.4';
gradIncentive.expirationDate = '12/05/2017';
gradIncentive.details = "Work hard, play harder";
gradIncentive.exclusions =[1,3];
gradIncentive.offer = 1234;

const fridayIncentive = new Incentive();
fridayIncentive.id = 3;
fridayIncentive.name = "Friday Incentive";
fridayIncentive.apr ='5.4';
fridayIncentive.expirationDate = '11/05/2017';
fridayIncentive.details = "TGIF!!!";
fridayIncentive.exclusions =[];
fridayIncentive.offer = 1234;

const incentives = [militaryIncentive, gradIncentive, fridayIncentive];
const selectedIncentives = [gradIncentive];
const addSelectedIncentive = sinon.spy();
const removeSelectedIncentive = sinon.spy();

function setupProps(incentives, selectedIncentives){
  return {
    incentives,
    selectedIncentives,
    addSelectedIncentive,
    removeSelectedIncentive
  };
}

function setupmount (incentives, selectedIncentives) {
  const props = setupProps(incentives, selectedIncentives);
  return mount(<IncentivesTable {...props} />);
}



describe('ProgramsTable', ()=>{
  it('renders <IncentivesTable/> ', () => {
    const props = setupProps(incentives, selectedIncentives);
    const component = renderer.create(<IncentivesTable {...props}/>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render <IncentivesTable/> component with 0 programs selected', () => {
    const component = setupmount(incentives);
    expect(component.find('#RRIncentivesTable').length).toBe(1);
    expect(component.find('.griddle-row').length).toBe(3);
    expect(component.find({type:'checkbox',checked:true}).length).toBe(0);
  });

  it('should render <IncentivesTable/> component with 1 selected incentive, and its exclusions will be disabled', () => {
    const component = setupmount(incentives, [gradIncentive]);
    expect(component.find({type:'checkbox',disabled:true}).length).toBe(gradIncentive.exclusions.length);
  });

  it('triggers addSelectedIncentive event when incentive checkbox is clicked', () => {
    const component = setupmount(incentives);
    component.find(`#IncentiveCheckbox${fridayIncentive.id}`).simulate('click');
    expect(addSelectedIncentive.calledOnce).toEqual(true);
  });

  it('triggers removeSelectedIncentive event when checked incentive checkbox is clicked', () => {
    const component = setupmount(incentives, [fridayIncentive]);
    component.find(`#IncentiveCheckbox${fridayIncentive.id}`).simulate('click');
    expect(removeSelectedIncentive.calledOnce).toEqual(true);
  });
});
