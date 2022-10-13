import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';

initializeBlock(() => <App/>);
