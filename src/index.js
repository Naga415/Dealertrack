import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore'; // eslint-disable-line import/default
import DeskingPage from './components/pages/desking/DeskingPage';

import { Provider } from 'react-redux';
import '@coxautokc/fusion-theme/dist/fusion-theme.min.css'; // eslint-disable-line
import './index.scss';
import {initialize} from './actions/applicationActions';
import 'babel-polyfill';
import queryString from 'query-string';

const store = configureStore();
const searchParams = queryString.parse(window.location.search);
const leadId = searchParams.leadId ? searchParams.leadId : null;
const dealId = searchParams.dealId ? searchParams.dealId : null;
store.dispatch(initialize(dealId, leadId));

render(<Provider store={store}><DeskingPage/></Provider>, document.getElementById('root'));
