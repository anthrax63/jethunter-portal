// import external modules
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import internal(own) modules
import Router from './router';
import {IntlProvider, addLocaleData} from 'react-intl';
import messages from '../messages';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

[en, ru].forEach(addLocaleData);

addLocaleData([...en, ...ru]);

const App = (props) => <IntlProvider locale={props.locale} messages={messages[props.locale]}><Router {...props} /></IntlProvider>;


export default App;
