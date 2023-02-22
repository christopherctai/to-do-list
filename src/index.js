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



// Create a note
const noteController = Controllers.noteController();
const projectController = Controllers.projectController();
const noteProjectStructurer = Structurers.noteProjectStructurer();
const projectDisplayer = Displayers.projectDisplayer();

let noteOne = noteController.createNote("hi", "test description", dateFormatted, "urgent");
let noteTwo = noteController.createNote('again', 'second note', 'right now', 'right now');

let projectOne = projectController.createProject("new project");

noteProjectStructurer.addNoteToProject(projectOne, noteOne);
noteProjectStructurer.addNoteToProject(projectOne, noteTwo);

projectDisplayer.displayProject(projectController.projects[0]); 



