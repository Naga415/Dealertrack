import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from './store/configureStore'; // eslint-disable-line import/default
import HomePage from "./components/HomePage";
import "@coxautokc/fusion-theme/dist/fusion-theme.min.css"; // eslint-disable-line
import "./index.scss";

const store = configureStore();

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal = event => {
    event.preventDefault();
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  populateValue = () => {};

  render() {
    return (
      <div>
        <a href="" onClick={this.openModal}>
          Open modal
        </a>
        <HomePage
          name="fees"
          closeDialog={this.closeModal}
          dialogStatus={this.state.showModal}
          populateValue={this.populateValue}
          zipCode={11111}
          dealId={123}
          scenarioId={234}
        />
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById("root")
);
