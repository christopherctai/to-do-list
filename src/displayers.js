// Displayers 
// Objects that will display the given information 

import { format } from 'date-fns';
import * as Utils from './utils.js';
import * as Controllers from './controllers.js';
import * as Structurers from './structurers.js';


// Create controllers
const noteController = Controllers.noteController();
const projectController = Controllers.projectController();
const noteProjectStructurer = Structurers.noteProjectStructurer();

// displayController controls the display of the to-do list 
const displayController = () => { 
    const initButtons = () => {
        // Initialize the Project Form
        initAddProjectButton();
        initCloseProjectFormButton();
        initSubmitProjectButton();

        // Initialize the Note Form 
        initAddNoteButton();
        initCloseNoteFormButton();
        initSubmitNoteButton();
    }

    const initAddProjectButton = () => {
        const addProjectButton = document.querySelector('.add-project-btn');
        addProjectButton.addEventListener('click', () => {
            Utils.openProjectForm();
        })
    }

    const initCloseProjectFormButton = () => {
        const closeProjectFormButton = document.querySelector('.close-project-form-btn');
        closeProjectFormButton.addEventListener('click', () => {
            Utils.closeProjectForm();
        })
    }

    const initSubmitProjectButton = () => {
        const submitButton = document.querySelector('.submit-project-btn');
        submitButton.addEventListener('click', () => {
            let formInfo = Utils.processProjectForm();
            projectController.createProject(formInfo);
            sidebarDisplayer().displaySidebar();
            Utils.clearProjectForm();
            Utils.closeProjectForm();
        })
    }

    const initAddNoteButton = () => {
        const addNoteButton = document.querySelector('.add-note-btn');
        addNoteButton.addEventListener('click', () => {
            Utils.openNoteForm();
        })
    }

    const initCloseNoteFormButton = () => {
        const closeNoteFormButton = document.querySelector('.close-note-form-btn');
        closeNoteFormButton.addEventListener('click', () => {
            Utils.closeNoteForm();
        })
    }

    const initSubmitNoteButton = () => {
        const submitButton = document.querySelector('.submit-note-btn');
        let activeProject = Utils.getActiveProject(
            document.querySelector('.project-title').textContent, 
            projectController.projects
        );
        submitButton.addEventListener('click', () => {
            let formInfo = Utils.processNoteForm();
            let note = noteController.createNote(`${formInfo[0]}`, 
                `${formInfo[1]}`,
                `${formInfo[2]}`,
                `${formInfo[3]}`);
            noteProjectStructurer.addNoteToProject(activeProject, note);
            Utils.clearNoteForm();
            Utils.closeNoteForm();
        })
    }

    return {
        initButtons
    }
}


// sidebarDisplayer displays the sidebar. Needs access to the list of project titles
const sidebarDisplayer = () => {

    const clearSidebar = () => {
        let sidebar = document.querySelector('.project-list');
        sidebar.textContent = ''; 
        return sidebar;
    }

    const displaySidebar = () => {
        let sidebar = clearSidebar();
        createSidebarDisplay(sidebar);
        initProjectButtons();
    }

    const createSidebarDisplay = (sidebar) => {
        for (let i = 0; i < projectController.projects.length; i++) {
            let sidebarButton = document.createElement('button');
            sidebarButton.classList.add('btn', 'project-btn');
            sidebarButton.textContent = projectController.projects[i].title;
            sidebar.append(sidebarButton);
        }
    }

    const initProjectButtons = () => {
        const projectButtons = document.querySelectorAll('.project-btn');
        projectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                let activeProject = Utils.getActiveProject(
                    button.textContent,
                    projectController.projects
                );
                console.log(activeProject);
                projectDisplayer().displayProject(activeProject);
            })
        })
    }

    return {
        displaySidebar,
        clearSidebar
    }
}


// projectDisplayer helps displays the project
const projectDisplayer = () => {
    const displayProject = (project) => {
        // Select the content area 
        let content = document.querySelector('.content');
    
        // Clear the content area
        content.textContent = '';
    
        // Append the content 
        content.append(createProjectDisplay(project));
    }

    const createProjectDisplay = (Project) => {
        // Create the project title div 
        let projectTitle = document.createElement('div');
        
        // Create the project content div 
        let projectContent = document.createElement('div');
        projectContent.classList.add('project'); 
    
        // Append notes to the project 
        for (let i = 0; i < Project.noteArray.length; i++) {
            let note = createNoteDisplay(Project.noteArray[i]);
            projectContent.appendChild(note);
        }
    
        return projectContent;
    }
    
    const createNoteDisplay = (Note) => {
        let note = document.createElement('div');
        note.classList.add('note');
    
        // Create button
        let button = document.createElement('button');
        button.classList.add('btn', 'done-btn'); 
        button.textContent = 'Done!';
    
        // Create title
        let title = document.createElement('div');
        title.classList.add('title');
        title.textContent = Note.title;
        title.setAttribute('contenteditable', 'true');
        
        // Create description
        let description = document.createElement('div');
        description.classList.add('description');
        description.textContent = Note.description;
        description.setAttribute('contenteditable', 'true');
    
    
        // Create dueDate
        let dueDate = document.createElement('div');
        dueDate.classList.add('dueDate');
        dueDate.textContent = Note.dueDate;
        dueDate.setAttribute('contenteditable', 'true');
    
    
        // Create priority 
        let priority = document.createElement('div');
        priority.classList.add('priority'); 
        priority.textContent = Note.priority;
        priority.setAttribute('contenteditable', 'true');
    
    
        // Append elements
        note.append(button, title, description, dueDate, priority);
    
        return note;
    }

    return {
        displayProject
    }
}




// noteDisplayer displays individual notes 
const noteDisplayer = () => {
    
}


const updateInfo = (pieceOfInfo, contentOfInfo, note) => {
    note.pieceOfInfo = contentOfInfo; 
    
}

const initNoteButtons = () => {
    const projectName = document.querySelector('.active').textContent;
    const titles = document.querySelectorAll('.title');
    const descriptions = document.querySelectorAll('.description');
    const dueDates = document.querySelectorAll('.dueDate');
    const priorities = document.querySelectorAll('.priority');

    titles.forEach((title) => {
        title.addEventListener('change', () => {
            updateInfo(title, title.textContent, note);
        })
    })

    descriptions.forEach((description) => {
        description.addEventListener('change', () => {
            updateInfo(description, description.textContent, note);
        })
    })

    dueDates.forEach((dueDate) => {
        dueDate.addEventListener('change', () => {
            updateInfo(dueDate, dueDate.textContent, note);
        })
    })

    priorities.forEach((priority) => {
        priority.addEventListener('change', () => {
            updateInfo(priority, priority.textContent, note);
        })
    })
}

export {
    displayController, 
    projectDisplayer,
    sidebarDisplayer
}

/* projectDisplayer (DOM)
-displays a project 
-relies on noteDisplayer

noteDisplayer (DOM)
-displays a note 

displayController (DOM)
-displays the to-do-list  */