import * as InfoHolders from './info-holders.js';
import * as Controllers from './controllers.js';
import * as Structurers from './structurers.js';
import * as Displayers from './displayers.js';
import * as Utils from './utils.js';

import { format } from 'date-fns';

// Test control 
console.log("hello world");


let date = new Date();
let dateFormatted = format(date, 'MM/dd/yyyy');
console.log(dateFormatted);


// Initialize the page 
const displayController = Displayers.displayController();
displayController.initButtons(); 



