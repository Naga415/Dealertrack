import React from 'react';
import {render} from 'react-dom';
import HomePage from './components/HomePage';
import '@coxautokc/fusion-theme/dist/fusion-theme.min.css'; // eslint-disable-line
import './index.scss';

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
          Rebates
        </a>
        <HomePage
          name="rebate"
          closeDialog={this.closeModal}
          dialogStatus={this.state.showModal}
          populateValue={this.populateValue}
        />
      </div>
    );
  }
}

render(
  <div>
    <Wrapper />
  </div>,
  document.getElementById("root")
);
