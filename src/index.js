import * as InfoHolders from './info-holders.js';
import * as Controllers from './controllers.js';


console.log("hello world");

const noteController = Controllers.noteController();
let noteOne = noteController.createNote("hi", "test description", "May 1st", "urgent");
console.log(noteOne);

const projectController = Controllers.projectController();
let projectOne = projectController.createProject("new project");

let projectTwo = projectController.createProject("second project");

projectOne.addNote(noteOne);
console.log(projectOne);

projectOne.deleteNote(noteOne);
console.log(projectOne);