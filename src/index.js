import * as InfoHolders from './info-holders.js';
import * as Controllers from './controllers.js';
import * as Structurers from './structurers.js';
import * as Displayers from './displayers.js';
import * as Utils from './utils.js';

import { format } from 'date-fns';

// Initialize the application
const displayController = Displayers.displayController();
displayController.initializeApp();