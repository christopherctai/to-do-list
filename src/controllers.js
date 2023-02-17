// Controllers 
// Objects that can manipulate the notes or projects themselves 

import { noteFactory, projectFactory } from './info-holders';

const noteController = () => {
    let noteID = 0;
    const createNote = (title, description, dueDate, priority) => {
        let note = noteFactory(noteID, title, description, dueDate, priority);
        noteID++;
        return note;
    }

    // Allow users to change the title 
    const changeTitle = () => {
        
    }

    // Allow users to change the description of the note 
    const changeDescription = () => {

    }

    // Allow users to change the note's priority 
    const changePriority = () => {

    }

    return {
        createNote,
        changeTitle,
        changeDescription,
        changePriority
    }
}

const projectController = () => {
    let projectID = 0;
    let projects = [];

    // Create a new empty project 
    const createProject = (title) => {
        let project = projectFactory(projectID, title, []);
        projectID++;
        projects.push(project);
        return project;
    }

    // Delete a project 
    const deleteProject = (project) => {
        projects.splice(projects.indexOf(project), 1);
    }
    
    return {
        projects,
        createProject,
        deleteProject,
    }
}

export {
    projectController,
    noteController
}