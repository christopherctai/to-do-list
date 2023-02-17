import * as InfoHolders from './info-holders.js';
import * as Controllers from './controllers.js';
import * as Structurers from './structurers.js';


console.log("hello world");

const noteController = Controllers.noteController();
let noteOne = noteController.createNote("hi", "test description", "May 1st", "urgent");
console.log(noteOne);

let noteTwo = noteController.createNote('again', 'second note', 'right now', 'right now');

const projectController = Controllers.projectController();
let projectOne = projectController.createProject("new project");

let projectTwo = projectController.createProject('another new project');

const noteProjectStructurer = Structurers.noteProjectStructurer();
noteProjectStructurer.addNoteToProject(projectOne, noteOne);
console.log(projectOne);

noteProjectStructurer.deleteNoteFromProject(projectOne, noteOne);
console.log(projectOne);