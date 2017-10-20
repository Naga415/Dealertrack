/**
 * Created by RBANDERSON on 9/15/2017.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';
import { mount} from 'enzyme';

describe('Tab', () => {
  const onChange = () => {

  };

  const blur = () => {

  };

  const onClickLink = () => {
 
  };

  const textLabelInputProps = {
    id:"TestId",
    name: "TestName",
    value: "TestValue",
    label: "TestLabel",
    onChange,
    onBlur: blur
  };

  const dropdownLabelInputProps ={...textLabelInputProps,...{options:[{label:1},{label:2}]}};

  const linkLabelInputProps ={...textLabelInputProps, ...{onClick:onClickLink}};

  function getInputNode(props) {
    return <Input {...props}/>;
  }
  
  function setupMount(props) {
    return mount(getInputNode(props));
  }

  it('renders <Input/>', () => {
    const component = renderer.create(getInputNode(textLabelInputProps));
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders label as text', () => {
    const component = setupMount(textLabelInputProps);
    expect(component.find('.desking-input__text-label').length).toBe(1);
  });

  it('renders label as dropdown', () => {
    const component = setupMount(dropdownLabelInputProps);
    expect(component.find('.desking-input__dropdown').length).toBe(1);
  });

  it('renders label as link', () => {
    const component = setupMount(linkLabelInputProps);
    expect(component.find('.desking-input__link-label').length).toBe(1);
  });
});
