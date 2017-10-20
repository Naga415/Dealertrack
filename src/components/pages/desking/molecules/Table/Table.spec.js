import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Table from './Table';
import { getFormattedNumber } from '../../../../../utils/numberFormatter';

describe('<Table/> component', () => {
  const columns = ["Column1", "Column2", "Column3"];
  const data = [
    {
      col1: 'Col1 value',
      col2: 1235,
      col3: 2450
    },
    {
      col1: 7853,
      col2: 'col2 value',
      col3: 78552
    }
  ];
  const dataMap = {
    col1: "Column1",
    col2: "Column2",
    col3: "Column3",
  };

  it('renders <Table/> that matches the data', () => {
    const component = renderer.create(<Table htmlId="NewTable" title="Back End Gross" data={data} columns={columns} dataMap={dataMap} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders <Table> with a formatted data when custom formatter are passed into it', () => {
    const dataFormatters = { 'number': getFormattedNumber };
    const component = shallow(<Table htmlId="NewTable" title="Back End Gross" data={data} columns={columns} dataMap={dataMap} dataFormatters={dataFormatters} />);
    expect(component.find('tbody tr').length).toBe(2);
    expect(component.find('tbody tr td').at(0).text()).toEqual('Col1 value');
    expect(component.find('tbody tr td').at(1).text()).toEqual('1,235');
    expect(component.find('tbody tr td').at(2).text()).toEqual('2,450');
  });
});
