import React from 'react';
import renderer from 'react-test-renderer';
import Tab from './Tab';
import TabContent from './TabContent';
import { mount } from 'enzyme';
import Radio from 'react-bootstrap/lib/Radio';

describe('Tab', () => {
  function getTabNode() {
    const onTabSelect = () => {

    };

    const props = {
      htmlId: "Tab",
      selectedValue: "Finance",
      onTabSelect
    };

    return (
      <Tab {...props}>
        <TabContent htmlId="FinanceDeal" label="Finance">
          Finance Content
        </TabContent>
        <TabContent htmlId="LeaseDeal" label="Lease">
          Lease Content
        </TabContent>
        <TabContent htmlId="CashDeal" isDefault={true} label="Cash">
          Cash Content
        </TabContent>
        <TabContent htmlId="BalloonDeal" label="Balloon">
          Balloon Content
        </TabContent>
      </Tab>
    );
  }

  function setupmount() {
    return mount(getTabNode());
  }

  it('renders <Tab/>', () => {
    const component = renderer.create(getTabNode());
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders 4 tab selectors', () => {
    const component = setupmount();
    expect(component.find('.selectInput').length).toBe(4);
  });

  it('renders Tab with the active <TabContent/>', () => {
    const component = setupmount();
    expect(component.find(TabContent).length).toBe(1);
  });

  it('renders Tab with the active <TabContent/> which is Finance', () => {
    const component = setupmount();
    expect(component.find(TabContent).length).toBe(1);
    expect(component.find(TabContent).props().label).toEqual('Finance');
  });

  it('renders Tab with the new active <TabContent/> that corresponds to the clicked selector', () => {
    const component = setupmount();
    const selectors = component.find(Radio);
    expect(selectors.length).toBe(4);
    selectors.find({ value: 'Finance' }).simulate('change');
    expect(component.find(TabContent).props().label).toEqual('Finance');
  });
});
