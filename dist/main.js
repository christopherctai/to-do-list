/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers.js":
/*!****************************!*\
  !*** ./src/controllers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noteController": () => (/* binding */ noteController),
/* harmony export */   "projectController": () => (/* binding */ projectController)
/* harmony export */ });
/* harmony import */ var _info_holders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info-holders */ "./src/info-holders.js");
// Controllers 
// Objects that can manipulate the notes or projects themselves 



const noteController = () => {
    let noteID = 0;
    const createNote = (title, description, dueDate, priority) => {
        let note = (0,_info_holders__WEBPACK_IMPORTED_MODULE_0__.noteFactory)(noteID, title, description, dueDate, priority);
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
        let project = (0,_info_holders__WEBPACK_IMPORTED_MODULE_0__.projectFactory)(projectID, title, []);
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



/***/ }),

/***/ "./src/displayers.js":
/*!***************************!*\
  !*** ./src/displayers.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayController": () => (/* binding */ displayController),
/* harmony export */   "projectController": () => (/* binding */ projectController),
/* harmony export */   "projectDisplayer": () => (/* binding */ projectDisplayer),
/* harmony export */   "sidebarDisplayer": () => (/* binding */ sidebarDisplayer)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _controllers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers.js */ "./src/controllers.js");
/* harmony import */ var _structurers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structurers.js */ "./src/structurers.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
// Displayers 
// Objects that will display the given information 









// Create controllers
const noteController = _controllers_js__WEBPACK_IMPORTED_MODULE_1__.noteController();
let projectController = _controllers_js__WEBPACK_IMPORTED_MODULE_1__.projectController();
const noteProjectStructurer = _structurers_js__WEBPACK_IMPORTED_MODULE_2__.noteProjectStructurer();

// displayController controls the display of the to-do list 
const displayController = () => { 
    const initializeApp = () => {
        // Initialize the project and note form 
        initButtons();

        // Initialize the sidebar
        sidebarDisplayer().clearSidebar();

        // Initialize Main Project
        projectController.createProject('My Project'); 
        projectDisplayer().displayProject(projectController.projects[0]);

    }
    
    const initializeAppWithStorage = (projects) => {
        // Reset projects
        projectController.projects = projects;
        
        // Initialize Main Project 
        projectDisplayer().displayProject(projectController.projects[0]);

        // Display the other projects 
        for (let i = 1; i < projects.length; i++) {
            projectDisplayer().displayProject(projects[i]);
        }

        // Display the sidebar 
        sidebarDisplayer().displaySidebar()

        // Initialize the project and note form 
        initButtons();
    }

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
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.openProjectForm();
        })
    }

    const initCloseProjectFormButton = () => {
        const closeProjectFormButton = document.querySelector('.close-project-form-btn');
        closeProjectFormButton.addEventListener('click', () => {
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.closeProjectForm();
        })
    }

    const initSubmitProjectButton = () => {
        const submitButton = document.querySelector('.submit-project-btn');
        submitButton.addEventListener('click', () => {
            // Create Project
            let formInfo = _utils_js__WEBPACK_IMPORTED_MODULE_0__.processProjectForm();
            
            projectController.createProject(formInfo);

            console.log(projectController.projects);

            // Store Projects
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects(projectController.projects);

            // Display project 
            let activeProject = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getActiveProject(
                formInfo, 
                projectController.projects
            );
            projectDisplayer().displayProject(activeProject);

            // Display sidebar
            sidebarDisplayer().displaySidebar();

            // Clean up
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.clearProjectForm();
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.closeProjectForm();
        })
    }

    const initAddNoteButton = () => {
        const addNoteButton = document.querySelector('.add-note-btn');
        addNoteButton.addEventListener('click', () => {
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.openNoteForm();
        })
    }

    const initCloseNoteFormButton = () => {
        const closeNoteFormButton = document.querySelector('.close-note-form-btn');
        closeNoteFormButton.addEventListener('click', () => {
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.closeNoteForm();
        })
    }

    const initSubmitNoteButton = () => {
        const submitButton = document.querySelector('.submit-note-btn');
        submitButton.addEventListener('click', () => {
            // Get active project
            let activeProject = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getActiveProject(
                document.querySelector('.project-title').textContent, 
                projectController.projects
            );

            // Create note
            let formInfo = _utils_js__WEBPACK_IMPORTED_MODULE_0__.processNoteForm();
            let note = noteController.createNote(`${formInfo[0]}`, 
                `${formInfo[1]}`,
                `${formInfo[2]}`,
                `${formInfo[3]}`
            );

            // Add note to project 
            noteProjectStructurer.addNoteToProject(activeProject, note);
            
            // Store Projects 
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects(projectController.projects);

            // Display Project 
            projectDisplayer().displayProject(activeProject);

            // Clean up 
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.clearNoteForm();
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.closeNoteForm();
        })
    }

    return {
        initializeApp,
        initializeAppWithStorage
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
            if (projectController.projects[i].title !== 'My Project') {
                let sidebarButton = document.createElement('button');
                sidebarButton.classList.add('btn', 'project-btn');
                sidebarButton.textContent = projectController.projects[i].title;
                sidebar.append(sidebarButton);
            }
        }
    }

    const initProjectButtons = () => {
        const projectButtons = document.querySelectorAll('.project-btn');
        projectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                let activeProject = _utils_js__WEBPACK_IMPORTED_MODULE_0__.getActiveProject(
                    button.textContent,
                    projectController.projects
                );
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
        let content = clearProjectContent();
    
        // Append the title 
        content.append(createProjectTitleDisplay(project));

        // Append the delete button
        content.append(createProjectDeleteDisplay(project));

        // Append the content 
        content.append(createProjectDisplay(project));
    }

    const clearProjectContent = () => {
        // Select the content area 
        let content = document.querySelector('.content');
    
        // Clear the content area
        content.textContent = '';

        return content;
    }

    const createProjectTitleDisplay = (Project) => {
        // Create the project title div 
        let projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = Project.title; 

        return projectTitle;
    }

    const createProjectDeleteDisplay = (Project) => {
        if (Project.title === 'My Project') {
            return '';
        }
        
        let deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('btn', 'delete-project-btn');
        deleteProjectButton.textContent = 'Delete';

        deleteProjectButton.addEventListener('click', () => {
            console.log(projectController.projects);

            projectController.deleteProject(Project);
            // Store projects 
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects(projectController.projects); 

            projectDisplayer().displayProject(projectController.projects[0]);
            sidebarDisplayer().displaySidebar();
            alert(`${Project.title} has been deleted`);

        });

        return deleteProjectButton;
    }

    const createProjectDisplay = (Project) => {
        // Create the project content div 
        let projectContent = document.createElement('div');
        projectContent.classList.add('project'); 
    
        // Append notes to the project 
        for (let i = 0; i < Project.noteArray.length; i++) {
            let note = createNoteDisplay(Project.noteArray[i], Project);
            projectContent.appendChild(note);
        }
    
        return projectContent;
    }
    
    const createNoteDisplay = (Note, Project) => {
        let note = document.createElement('div');
        note.classList.add('note');
    
        // Create button
        let button = document.createElement('button');
        button.classList.add('btn', 'done-btn'); 
        button.textContent = 'Done!'; 
        button.addEventListener('click', () => {
            noteProjectStructurer.deleteNoteFromProject(Project, Note);
            // Store Projects 
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects(projectController.projects);
            note.remove();
        }) 
    
        // Create title
        let title = document.createElement('div');
        title.classList.add('title');
        title.textContent = Note.title;
        title.setAttribute('contenteditable', 'true');
        title.addEventListener('input', () => {
            Note.title = title.textContent;
        })
        
        // Create description
        let description = document.createElement('div');
        description.classList.add('description');
        description.textContent = Note.description;
        description.setAttribute('contenteditable', 'true');
        description.addEventListener('input', () => {
            Note.description = description.textContent;
        })
    
        // Create dueDate
        let dueDate = document.createElement('div');
        dueDate.classList.add('dueDate');
        dueDate.textContent = Note.dueDate;
        dueDate.setAttribute('contenteditable', 'true');
        dueDate.addEventListener('input', () => {
            Note.dueDate = dueDate.textContent;
        })
    
        // Create priority 
        let priority = document.createElement('div');
        priority.classList.add('priority'); 
        priority.textContent = Note.priority;
        priority.setAttribute('contenteditable', 'true');
        priority.addEventListener('input', () => {
            Note.priority = priority.textContent;
        })
    
        // Append elements
        note.append(button, title, description, dueDate, priority);
    
        return note;
    }

    return {
        displayProject
    }
}




/***/ }),

/***/ "./src/info-holders.js":
/*!*****************************!*\
  !*** ./src/info-holders.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noteFactory": () => (/* binding */ noteFactory),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory)
/* harmony export */ });
// Information holders 
// Objects that hold information for the to-do list 


// Note factory creates notes 
const noteFactory = (id, title, description, dueDate, priority) => {
    const getTitle = () => title;
    const getDescription = () => description; 
    const getDueDate = () => dueDate;
    const getPriority = () => priority; 
    
    return {
        id,
        title, 
        description,
        dueDate, 
        priority,
    }
}


// Project factory creates projects 
const projectFactory = (id, title, noteArray) => {
    const getTitle = () => title;
    
    // Add a note to a project 
    const addNote = (note) => {
        noteArray.push(note);
    }

    // Delete a note from a project 
    const deleteNote = (note) => {
        noteArray.splice(noteArray.indexOf(note), 1);
    }

    return {
        id,
        title,
        noteArray,
        getTitle,
        addNote, 
        deleteNote
    }
}




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storeProjects": () => (/* binding */ storeProjects)
/* harmony export */ });
/* harmony import */ var _controllers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers.js */ "./src/controllers.js");
/* harmony import */ var _displayers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayers.js */ "./src/displayers.js");

 

function storeProjects(projects) {
    window.localStorage.setItem('user', JSON.stringify(projects));
}




/***/ }),

/***/ "./src/structurers.js":
/*!****************************!*\
  !*** ./src/structurers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noteProjectStructurer": () => (/* binding */ noteProjectStructurer)
/* harmony export */ });
// Structurers
// Objects that relate the notes to the projects 
const noteProjectStructurer = () => {
    const addNoteToProject = (project, note) => {
        console.log(project);
        project.addNote(note);
    };

    const deleteNoteFromProject = (project, note) => {
        console.log(project);
        project.deleteNote(note);
    }

    return {
        addNoteToProject,
        deleteNoteFromProject
    }
};




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearNoteForm": () => (/* binding */ clearNoteForm),
/* harmony export */   "clearProjectForm": () => (/* binding */ clearProjectForm),
/* harmony export */   "closeNoteForm": () => (/* binding */ closeNoteForm),
/* harmony export */   "closeProjectForm": () => (/* binding */ closeProjectForm),
/* harmony export */   "getActiveProject": () => (/* binding */ getActiveProject),
/* harmony export */   "makeEditable": () => (/* binding */ makeEditable),
/* harmony export */   "makeUneditable": () => (/* binding */ makeUneditable),
/* harmony export */   "openNoteForm": () => (/* binding */ openNoteForm),
/* harmony export */   "openProjectForm": () => (/* binding */ openProjectForm),
/* harmony export */   "processNoteForm": () => (/* binding */ processNoteForm),
/* harmony export */   "processProjectForm": () => (/* binding */ processProjectForm)
/* harmony export */ });
const makeEditable = (element) => {
    element.setAttribute('contenteditable', 'true');
}

const makeUneditable = (element) => {
    element.setAttribute('contenteditable', 'false');
}

const openNoteForm = () => {
    const form = document.querySelector('.add-note-form');
    form.classList.remove('hidden');
}

const closeNoteForm = () => {
    const form = document.querySelector('.add-note-form');
    form.classList.add('hidden');
}

const openProjectForm = () => {
    const form = document.querySelector('.add-project-form');
    form.classList.remove('hidden');
}

const closeProjectForm = () => {
    const form = document.querySelector('.add-project-form');
    form.classList.add('hidden');
}

const processNoteForm = () => {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    return [title, description, dueDate, priority];
}

const processProjectForm = () => {
    let title = document.getElementById("project-form-title").value;
    return title;
}

const clearNoteForm = () => {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let dueDate = document.getElementById('dueDate');
    let priority = document.getElementById('priority');

    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';
}

const clearProjectForm = () => {
    let title = document.getElementById('project-form-title');

    title.value = '';
}

const getActiveProject = (projectName, projectArray) => {
    for (let i = 0; i < projectArray.length; i++) {
        if (String(projectName) === String(projectArray[i].title)) {
            return projectArray[i];
        }
    }

}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _displayers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayers.js */ "./src/displayers.js");


// Initialize the application
const displayController = _displayers_js__WEBPACK_IMPORTED_MODULE_0__.displayController();

if (localStorage.getItem('user') === null) {
    displayController.initializeApp();
} else {
    displayController.initializeApp();
    /* let projects = JSON.parse(window.localStorage.getItem('user'));
    displayController.initializeAppWithStorage(projects); */    
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4QkFBOEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBcUI7QUFDakM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hWQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NnRDtBQUNGOztBQUU5QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNuRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044Qzs7QUFFOUM7QUFDQSwwQkFBMEIsNkRBQTRCOztBQUV0RDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kaXNwbGF5ZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5mby1ob2xkZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29udHJvbGxlcnMgXG4vLyBPYmplY3RzIHRoYXQgY2FuIG1hbmlwdWxhdGUgdGhlIG5vdGVzIG9yIHByb2plY3RzIHRoZW1zZWx2ZXMgXG5cbmltcG9ydCB7IG5vdGVGYWN0b3J5LCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vaW5mby1ob2xkZXJzJztcblxuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgbGV0IG5vdGVJRCA9IDA7XG4gICAgY29uc3QgY3JlYXRlTm90ZSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gbm90ZUZhY3Rvcnkobm90ZUlELCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgbm90ZUlEKys7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5vdGUsXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdElEID0gMDtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwcm9qZWN0IFxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQsIHRpdGxlLCBbXSk7XG4gICAgICAgIHByb2plY3RJRCsrO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBub3RlQ29udHJvbGxlclxufSIsIi8vIERpc3BsYXllcnMgXG4vLyBPYmplY3RzIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBnaXZlbiBpbmZvcm1hdGlvbiBcblxuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBDb250cm9sbGVycyBmcm9tICcuL2NvbnRyb2xsZXJzLmpzJztcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXJzIGZyb20gJy4vc3RydWN0dXJlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG5cblxuLy8gQ3JlYXRlIGNvbnRyb2xsZXJzXG5jb25zdCBub3RlQ29udHJvbGxlciA9IENvbnRyb2xsZXJzLm5vdGVDb250cm9sbGVyKCk7XG5sZXQgcHJvamVjdENvbnRyb2xsZXIgPSBDb250cm9sbGVycy5wcm9qZWN0Q29udHJvbGxlcigpO1xuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gU3RydWN0dXJlcnMubm90ZVByb2plY3RTdHJ1Y3R1cmVyKCk7XG5cbi8vIGRpc3BsYXlDb250cm9sbGVyIGNvbnRyb2xzIHRoZSBkaXNwbGF5IG9mIHRoZSB0by1kbyBsaXN0IFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKSA9PiB7IFxuICAgIGNvbnN0IGluaXRpYWxpemVBcHAgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHByb2plY3QgYW5kIG5vdGUgZm9ybSBcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBzaWRlYmFyXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5jbGVhclNpZGViYXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIE1haW4gUHJvamVjdFxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KCdNeSBQcm9qZWN0Jyk7IFxuICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbMF0pO1xuXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGluaXRpYWxpemVBcHBXaXRoU3RvcmFnZSA9IChwcm9qZWN0cykgPT4ge1xuICAgICAgICAvLyBSZXNldCBwcm9qZWN0c1xuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyA9IHByb2plY3RzO1xuICAgICAgICBcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBNYWluIFByb2plY3QgXG4gICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1swXSk7XG5cbiAgICAgICAgLy8gRGlzcGxheSB0aGUgb3RoZXIgcHJvamVjdHMgXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChwcm9qZWN0c1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEaXNwbGF5IHRoZSBzaWRlYmFyIFxuICAgICAgICBzaWRlYmFyRGlzcGxheWVyKCkuZGlzcGxheVNpZGViYXIoKVxuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHByb2plY3QgYW5kIG5vdGUgZm9ybSBcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0QnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgUHJvamVjdCBGb3JtXG4gICAgICAgIGluaXRBZGRQcm9qZWN0QnV0dG9uKCk7XG4gICAgICAgIGluaXRDbG9zZVByb2plY3RGb3JtQnV0dG9uKCk7XG4gICAgICAgIGluaXRTdWJtaXRQcm9qZWN0QnV0dG9uKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgTm90ZSBGb3JtIFxuICAgICAgICBpbml0QWRkTm90ZUJ1dHRvbigpO1xuICAgICAgICBpbml0Q2xvc2VOb3RlRm9ybUJ1dHRvbigpO1xuICAgICAgICBpbml0U3VibWl0Tm90ZUJ1dHRvbigpO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRBZGRQcm9qZWN0QnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ0bicpO1xuICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgVXRpbHMub3BlblByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdENsb3NlUHJvamVjdEZvcm1CdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb3NlUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtcHJvamVjdC1mb3JtLWJ0bicpO1xuICAgICAgICBjbG9zZVByb2plY3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgVXRpbHMuY2xvc2VQcm9qZWN0Rm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRTdWJtaXRQcm9qZWN0QnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LXByb2plY3QtYnRuJyk7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBQcm9qZWN0XG4gICAgICAgICAgICBsZXQgZm9ybUluZm8gPSBVdGlscy5wcm9jZXNzUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdChmb3JtSW5mbyk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcblxuICAgICAgICAgICAgLy8gU3RvcmUgUHJvamVjdHNcbiAgICAgICAgICAgIFN0b3JhZ2Uuc3RvcmVQcm9qZWN0cyhwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgcHJvamVjdCBcbiAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICBmb3JtSW5mbywgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgc2lkZWJhclxuICAgICAgICAgICAgc2lkZWJhckRpc3BsYXllcigpLmRpc3BsYXlTaWRlYmFyKCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICBVdGlscy5jbGVhclByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZE5vdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtYnRuJyk7XG4gICAgICAgIGFkZE5vdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VOb3RlRm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VOb3RlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1ub3RlLWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlTm90ZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtbm90ZS1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IGFjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudCwgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBub3RlXG4gICAgICAgICAgICBsZXQgZm9ybUluZm8gPSBVdGlscy5wcm9jZXNzTm90ZUZvcm0oKTtcbiAgICAgICAgICAgIGxldCBub3RlID0gbm90ZUNvbnRyb2xsZXIuY3JlYXRlTm90ZShgJHtmb3JtSW5mb1swXX1gLCBcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1sxXX1gLFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzJdfWAsXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bM119YFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gQWRkIG5vdGUgdG8gcHJvamVjdCBcbiAgICAgICAgICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlci5hZGROb3RlVG9Qcm9qZWN0KGFjdGl2ZVByb2plY3QsIG5vdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTdG9yZSBQcm9qZWN0cyBcbiAgICAgICAgICAgIFN0b3JhZ2Uuc3RvcmVQcm9qZWN0cyhwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cyk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgUHJvamVjdCBcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgXG4gICAgICAgICAgICBVdGlscy5jbGVhck5vdGVGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdGlhbGl6ZUFwcCxcbiAgICAgICAgaW5pdGlhbGl6ZUFwcFdpdGhTdG9yYWdlXG4gICAgfVxufVxuXG5cbi8vIHNpZGViYXJEaXNwbGF5ZXIgZGlzcGxheXMgdGhlIHNpZGViYXIuIE5lZWRzIGFjY2VzcyB0byB0aGUgbGlzdCBvZiBwcm9qZWN0IHRpdGxlc1xuY29uc3Qgc2lkZWJhckRpc3BsYXllciA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNsZWFyU2lkZWJhciA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHNpZGViYXIudGV4dENvbnRlbnQgPSAnJzsgXG4gICAgICAgIHJldHVybiBzaWRlYmFyO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlTaWRlYmFyID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2lkZWJhciA9IGNsZWFyU2lkZWJhcigpO1xuICAgICAgICBjcmVhdGVTaWRlYmFyRGlzcGxheShzaWRlYmFyKTtcbiAgICAgICAgaW5pdFByb2plY3RCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlU2lkZWJhckRpc3BsYXkgPSAoc2lkZWJhcikgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RDb250cm9sbGVyLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbaV0udGl0bGUgIT09ICdNeSBQcm9qZWN0Jykge1xuICAgICAgICAgICAgICAgIGxldCBzaWRlYmFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhckJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAncHJvamVjdC1idG4nKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyQnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbaV0udGl0bGU7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5hcHBlbmQoc2lkZWJhckJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbml0UHJvamVjdEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XG4gICAgICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KGFjdGl2ZVByb2plY3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5U2lkZWJhcixcbiAgICAgICAgY2xlYXJTaWRlYmFyXG4gICAgfVxufVxuXG4vLyBwcm9qZWN0RGlzcGxheWVyIGhlbHBzIGRpc3BsYXlzIHRoZSBwcm9qZWN0XG5jb25zdCBwcm9qZWN0RGlzcGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBjbGVhclByb2plY3RDb250ZW50KCk7XG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdGl0bGUgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3RUaXRsZURpc3BsYXkocHJvamVjdCkpO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0RGVsZXRlRGlzcGxheShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBjb250ZW50IFxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0RGlzcGxheShwcm9qZWN0KSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJQcm9qZWN0Q29udGVudCA9ICgpID0+IHtcbiAgICAgICAgLy8gU2VsZWN0IHRoZSBjb250ZW50IGFyZWEgXG4gICAgICAgIGxldCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICBcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnRlbnQgYXJlYVxuICAgICAgICBjb250ZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdFRpdGxlRGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgcHJvamVjdCB0aXRsZSBkaXYgXG4gICAgICAgIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gUHJvamVjdC50aXRsZTsgXG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RUaXRsZTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0RGVsZXRlRGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIGlmIChQcm9qZWN0LnRpdGxlID09PSAnTXkgUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnZGVsZXRlLXByb2plY3QtYnRuJyk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuXG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5kZWxldGVQcm9qZWN0KFByb2plY3QpO1xuICAgICAgICAgICAgLy8gU3RvcmUgcHJvamVjdHMgXG4gICAgICAgICAgICBTdG9yYWdlLnN0b3JlUHJvamVjdHMocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpOyBcblxuICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzWzBdKTtcbiAgICAgICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5kaXNwbGF5U2lkZWJhcigpO1xuICAgICAgICAgICAgYWxlcnQoYCR7UHJvamVjdC50aXRsZX0gaGFzIGJlZW4gZGVsZXRlZGApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWxldGVQcm9qZWN0QnV0dG9uO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3REaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwcm9qZWN0IGNvbnRlbnQgZGl2IFxuICAgICAgICBsZXQgcHJvamVjdENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdENvbnRlbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpOyBcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIG5vdGVzIHRvIHRoZSBwcm9qZWN0IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFByb2plY3Qubm90ZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm90ZSA9IGNyZWF0ZU5vdGVEaXNwbGF5KFByb2plY3Qubm90ZUFycmF5W2ldLCBQcm9qZWN0KTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50LmFwcGVuZENoaWxkKG5vdGUpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0Q29udGVudDtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY3JlYXRlTm90ZURpc3BsYXkgPSAoTm90ZSwgUHJvamVjdCkgPT4ge1xuICAgICAgICBsZXQgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub3RlLmNsYXNzTGlzdC5hZGQoJ25vdGUnKTtcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGJ1dHRvblxuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnZG9uZS1idG4nKTsgXG4gICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdEb25lISc7IFxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIuZGVsZXRlTm90ZUZyb21Qcm9qZWN0KFByb2plY3QsIE5vdGUpO1xuICAgICAgICAgICAgLy8gU3RvcmUgUHJvamVjdHMgXG4gICAgICAgICAgICBTdG9yYWdlLnN0b3JlUHJvamVjdHMocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMpO1xuICAgICAgICAgICAgbm90ZS5yZW1vdmUoKTtcbiAgICAgICAgfSkgXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSB0aXRsZVxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBOb3RlLnRpdGxlO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS50aXRsZSA9IHRpdGxlLnRleHRDb250ZW50O1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGRlc2NyaXB0aW9uXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IE5vdGUuZGVzY3JpcHRpb247XG4gICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBkdWVEYXRlXG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlRGF0ZScpO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gTm90ZS5kdWVEYXRlO1xuICAgICAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUuZHVlRGF0ZSA9IGR1ZURhdGUudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBwcmlvcml0eSBcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5Jyk7IFxuICAgICAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IE5vdGUucHJpb3JpdHk7XG4gICAgICAgIHByaW9yaXR5LnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLnByaW9yaXR5ID0gcHJpb3JpdHkudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCBlbGVtZW50c1xuICAgICAgICBub3RlLmFwcGVuZChidXR0b24sIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgIFxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5UHJvamVjdFxuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLCBcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBwcm9qZWN0RGlzcGxheWVyLFxuICAgIHNpZGViYXJEaXNwbGF5ZXJcbn0iLCIvLyBJbmZvcm1hdGlvbiBob2xkZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGhvbGQgaW5mb3JtYXRpb24gZm9yIHRoZSB0by1kbyBsaXN0IFxuXG5cbi8vIE5vdGUgZmFjdG9yeSBjcmVhdGVzIG5vdGVzIFxuY29uc3Qgbm90ZUZhY3RvcnkgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247IFxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7IFxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgcHJpb3JpdHksXG4gICAgfVxufVxuXG5cbi8vIFByb2plY3QgZmFjdG9yeSBjcmVhdGVzIHByb2plY3RzIFxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoaWQsIHRpdGxlLCBub3RlQXJyYXkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIFxuICAgIC8vIEFkZCBhIG5vdGUgdG8gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGFkZE5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBub3RlIGZyb20gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZU5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkuc3BsaWNlKG5vdGVBcnJheS5pbmRleE9mKG5vdGUpLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIG5vdGVBcnJheSxcbiAgICAgICAgZ2V0VGl0bGUsXG4gICAgICAgIGFkZE5vdGUsIFxuICAgICAgICBkZWxldGVOb3RlXG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgbm90ZUZhY3RvcnksXG4gICAgcHJvamVjdEZhY3RvcnksXG59IiwiaW1wb3J0ICogYXMgQ29udHJvbGxlcnMgZnJvbSBcIi4vY29udHJvbGxlcnMuanNcIjtcbmltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJzsgXG5cbmZ1bmN0aW9uIHN0b3JlUHJvamVjdHMocHJvamVjdHMpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgc3RvcmVQcm9qZWN0c1xufSIsIi8vIFN0cnVjdHVyZXJzXG4vLyBPYmplY3RzIHRoYXQgcmVsYXRlIHRoZSBub3RlcyB0byB0aGUgcHJvamVjdHMgXG5jb25zdCBub3RlUHJvamVjdFN0cnVjdHVyZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTm90ZVRvUHJvamVjdCA9IChwcm9qZWN0LCBub3RlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpO1xuICAgICAgICBwcm9qZWN0LmFkZE5vdGUobm90ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZU5vdGVGcm9tUHJvamVjdCA9IChwcm9qZWN0LCBub3RlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpO1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZU5vdGUobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkTm90ZVRvUHJvamVjdCxcbiAgICAgICAgZGVsZXRlTm90ZUZyb21Qcm9qZWN0XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIsXG59XG4iLCJjb25zdCBtYWtlRWRpdGFibGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xufVxuXG5jb25zdCBtYWtlVW5lZGl0YWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScpO1xufVxuXG5jb25zdCBvcGVuTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1ub3RlLWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBvcGVuUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBwcm9jZXNzTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG5cbiAgICByZXR1cm4gW3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHldO1xufVxuXG5jb25zdCBwcm9jZXNzUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tdGl0bGVcIikudmFsdWU7XG4gICAgcmV0dXJuIHRpdGxlO1xufVxuXG5jb25zdCBjbGVhck5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKTtcblxuICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICBkdWVEYXRlLnZhbHVlID0gJyc7XG4gICAgcHJpb3JpdHkudmFsdWUgPSAnJztcbn1cblxuY29uc3QgY2xlYXJQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLXRpdGxlJyk7XG5cbiAgICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuXG5jb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0QXJyYXkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoU3RyaW5nKHByb2plY3ROYW1lKSA9PT0gU3RyaW5nKHByb2plY3RBcnJheVtpXS50aXRsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0QXJyYXlbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBtYWtlRWRpdGFibGUsXG4gICAgbWFrZVVuZWRpdGFibGUsXG4gICAgb3Blbk5vdGVGb3JtLFxuICAgIGNsb3NlTm90ZUZvcm0sXG4gICAgb3BlblByb2plY3RGb3JtLFxuICAgIGNsb3NlUHJvamVjdEZvcm0sXG4gICAgcHJvY2Vzc05vdGVGb3JtLFxuICAgIGNsZWFyTm90ZUZvcm0sXG4gICAgcHJvY2Vzc1Byb2plY3RGb3JtLFxuICAgIGNsZWFyUHJvamVjdEZvcm0sIFxuICAgIGdldEFjdGl2ZVByb2plY3Rcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJztcblxuLy8gSW5pdGlhbGl6ZSB0aGUgYXBwbGljYXRpb25cbmNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gRGlzcGxheWVycy5kaXNwbGF5Q29udHJvbGxlcigpO1xuXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSA9PT0gbnVsbCkge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpemVBcHAoKTtcbn0gZWxzZSB7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUFwcCgpO1xuICAgIC8qIGxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgIGRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpemVBcHBXaXRoU3RvcmFnZShwcm9qZWN0cyk7ICovICAgIFxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==