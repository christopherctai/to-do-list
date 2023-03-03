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

    return {
        createNote,
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
        console.log(project);
        console.log(projects);
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