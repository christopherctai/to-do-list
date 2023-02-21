import * as InfoHolders from './info-holders.js';
import * as Controllers from './controllers.js';
import * as Structurers from './structurers.js';
import * as Displayers from './displayers.js';

// Test control 
console.log("hello world");

// Create a note
const noteController = Controllers.noteController();
const projectController = Controllers.projectController();
const noteProjectStructurer = Structurers.noteProjectStructurer();
const projectDisplayer = Displayers.projectDisplayer();

let noteOne = noteController.createNote("hi", "test description", "May 1st", "urgent");
let noteTwo = noteController.createNote('again', 'second note', 'right now', 'right now');

let projectOne = projectController.createProject("new project");

noteProjectStructurer.addNoteToProject(projectOne, noteOne);
noteProjectStructurer.addNoteToProject(projectOne, noteTwo);

/* projectDisplayer.displayProject(projectController.projects[0]);  */

