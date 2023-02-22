// Displayers 
// Objects that will display the given information 

import { format } from 'date-fns';


// displayController controls the display of the to-do list 
const displayController = () => {
    
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


    return {
        displayProject,

    }
}


const createProjectDisplay = (Project) => {
    // Create the project div 
    let project = document.createElement('div');
    project.classList.add('project'); 

    // Append notes to the project 
    for (let i = 0; i < Project.noteArray.length; i++) {
        let note = createNoteDisplay(Project.noteArray[i]);
        project.appendChild(note);
    }

    return project;
}

const createNoteDisplay = (Note) => {
    let note = document.createElement('div');
    note.classList.add('note');

    // Create button
    let button = document.createElement('button');
    button.classList.add('btn', 'close-btn');
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


// noteDisplayer displays individual notes 
const noteDisplayer = () => {
    
}


// sidebarDisplayer displays the sidebar. Needs access to the list of project titles
const sidebarDisplayer = () => {

}

const updateInfo = (pieceOfInfo, contentOfInfo, project) => {
    project.pieceOfInfo = contentOfInfo; 
    
}

const initNoteButtons = () => {
    const titles = document.querySelectorAll('.title');
    const descriptions = document.querySelectorAll('.description');
    const dueDates = document.querySelectorAll('.dueDate');
    const priorities = document.querySelectorAll('.priority');

    titles.forEach((title) => {
        title.addEventListener('change', () => {
            updateInfo(title, title.textContent);
        })
    })

    descriptions.forEach((description) => {
        description.addEventListener('change', () => {
            updateInfo(description, description.textContent);
        })
    })

    dueDates.forEach((dueDate) => {
        dueDate.addEventListener('change', () => {
            updateInfo(dueDate, dueDate.textContent);
        })
    })

    priorities.forEach((priority) => {
        priority.addEventListener('change', () => {
            updateInfo(priority, priority.textContent);
        })
    })
}

export {
    displayController, 
    projectDisplayer,
    createProjectDisplay,

}

/* projectDisplayer (DOM)
-displays a project 
-relies on noteDisplayer

noteDisplayer (DOM)
-displays a note 

displayController (DOM)
-displays the to-do-list  */