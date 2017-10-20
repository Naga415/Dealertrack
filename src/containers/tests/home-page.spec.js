import React from "react";
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore";
import HomePage from "../home-page";
import Enzyme, { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-15";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore();
const props = {
  closeDialog: () => {},
  dialogStatus: true,
  populateValue: () => {},
  name: ""
};

describe("HomePage container", () => {
  it("renders <HomePage />", () => {
    const component = mount(
      <Provider store={store}>
        <HomePage {...props} />
      </Provider>
    );
    expect(toJSON(component, { mode: "shallow" })).toMatchSnapshot();
  });
});
