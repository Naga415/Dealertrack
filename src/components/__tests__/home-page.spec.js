import React from "react";
import Enzyme, { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-15";
import sinon from "sinon";
import HomePage from "../home-page";
import FullPageModal from "@coxautokc/fusion-ui-components/lib/FullPageModal";
import { assert } from "chai";

const props = {
  currentTab: 2,
  feeTaxSetup: { data: [] },
  fetchFeeTaxData: () => {},
  fetchTaxData: () => {},
  isDisabled: false,
  closeDialog: sinon.spy(),
  dialogStatus: true,
  populateValue: sinon.spy(),
  name: "taxes",
  noTaxes: false,
  profile: null,
  state: "",
  taxSetup: {},
  updateCurrentTab: () => {},
  updateEditTaxProfileInput: () => {},
  updateTaxSetupInput: () => {},
  zipcode: ""
};

Enzyme.configure({ adapter: new Adapter() });

describe("HomePage", () => {
  let component;

  afterEach(function(done) {
    props.closeDialog.reset();
    props.populateValue.reset();
    done();
  });

  it("renders <HomePage />", () => {
    component = shallow(<HomePage {...props} />);
    expect(toJSON(component)).toMatchSnapshot();
  });

  it("saves the content when button is clicked", () => {
    component = shallow(<HomePage {...props} />);
    const footer = shallow(component.find(FullPageModal).prop("footer"));
    footer
      .findWhere(b => b.prop("className") === "save-btn")
      .shallow()
      .simulate("click");
    assert(props.populateValue.calledWith(props.name, "0"));
    assert(props.closeDialog.calledOnce);
  });
});
