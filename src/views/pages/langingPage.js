import carrdTemplate from '../../assets/templates/carrd/index.html';
import {Parser} from 'html-to-react';


const parser = new Parser();
const element = parser.parse(carrdTemplate);

export default () => element;
