// Displayers 
// Objects that will display the given information 



// displayController controls the display of the to-do list 
const displayController = () => {
    
}


// projectDisplayer helps displays the project
const projectDisplayer = () => {
    const displayProject = () => {
        // Select the content area 
        let content = document.querySelector('.content');
    
        // Clear the content area
        content.textContent = '';
    
        // Append the content 
        content.append(createProjectDisplay());
    }


    return {
        displayProject,

    }
}


const createProjectDisplay = (projectArray) => {
    // Create the project div 
    let project = document.createElement('div');
    project.classList.append('project');

    // Append notes to the project 
    for (let i = 0; i < projectArray.length; i++) {
        let note = createNoteDisplay(projectArray[i]);
        project.appendChild(note);
    }

    return project;
}

const createNoteDisplay = (Note) => {
    let note = document.createElement('div');
    note.classList.add('note');

    // Create title
    let title = document.createElement('div');
    title.classList.add('title');
    title.textContent = Note.title;
    
    // Create description
    let description = document.createElement('div');
    description.classList.add('description');
    description.textContent = Note.description;

    // Create dueDate
    let dueDate = document.createElement('div');
    dueDate.classList.add('dueDate');
    dueDate.textContent = Note.dueDate;

    // Create priority 
    let priority = document.createElement('div');
    priority.classList.add('priority'); 
    priority.textContent = Note.priority;

    note.append(title, description, dueDate, priority);

    return note;
}


// noteDisplayer displays individual notes 
const noteDisplayer = () => {
    
}


// sidebarDisplayer displays the sidebar. Needs access to the list of project titles
const sidebarDisplayer = () => {

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