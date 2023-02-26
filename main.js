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
const projectController = _controllers_js__WEBPACK_IMPORTED_MODULE_1__.projectController();
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

            // Store Projects
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects();

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
                `${formInfo[3]}`);
            console.log(activeProject);

            // Add note to project 
            noteProjectStructurer.addNoteToProject(activeProject, note);
            
            // Store Projects 
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects();

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
            projectController.deleteProject(Project);
            projectDisplayer().displayProject(projectController.projects[0]);
            sidebarDisplayer().displaySidebar();
            alert(`${Project.title} has been deleted`);

            // Store projects 
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects();
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
            _storage_js__WEBPACK_IMPORTED_MODULE_3__.storeProjects();
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

 

function storeProjects() {
    window.localStorage.setItem('user', JSON.stringify(_displayers_js__WEBPACK_IMPORTED_MODULE_1__.projectController.projects));
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
        project.addNote(note);
    };

    const deleteNoteFromProject = (project, note) => {
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
    let projects = JSON.parse(window.localStorage.getItem('user'));
    displayController.initializeAppWithStorage(projects);   
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFxQjtBQUNqQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ2dEO0FBQ0Y7O0FBRTlDO0FBQ0EsdURBQXVELHNFQUFxQztBQUM1Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O1VDbkVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7O0FBRTlDO0FBQ0EsMEJBQTBCLDZEQUE0Qjs7QUFFdEQ7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kaXNwbGF5ZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5mby1ob2xkZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29udHJvbGxlcnMgXG4vLyBPYmplY3RzIHRoYXQgY2FuIG1hbmlwdWxhdGUgdGhlIG5vdGVzIG9yIHByb2plY3RzIHRoZW1zZWx2ZXMgXG5cbmltcG9ydCB7IG5vdGVGYWN0b3J5LCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vaW5mby1ob2xkZXJzJztcblxuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgbGV0IG5vdGVJRCA9IDA7XG4gICAgY29uc3QgY3JlYXRlTm90ZSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gbm90ZUZhY3Rvcnkobm90ZUlELCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgbm90ZUlEKys7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5vdGUsXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdElEID0gMDtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwcm9qZWN0IFxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQsIHRpdGxlLCBbXSk7XG4gICAgICAgIHByb2plY3RJRCsrO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBub3RlQ29udHJvbGxlclxufSIsIi8vIERpc3BsYXllcnMgXG4vLyBPYmplY3RzIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBnaXZlbiBpbmZvcm1hdGlvbiBcblxuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBDb250cm9sbGVycyBmcm9tICcuL2NvbnRyb2xsZXJzLmpzJztcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXJzIGZyb20gJy4vc3RydWN0dXJlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG5cbi8vIENyZWF0ZSBjb250cm9sbGVyc1xuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSBDb250cm9sbGVycy5ub3RlQ29udHJvbGxlcigpO1xuY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSBDb250cm9sbGVycy5wcm9qZWN0Q29udHJvbGxlcigpO1xuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gU3RydWN0dXJlcnMubm90ZVByb2plY3RTdHJ1Y3R1cmVyKCk7XG5cbi8vIGRpc3BsYXlDb250cm9sbGVyIGNvbnRyb2xzIHRoZSBkaXNwbGF5IG9mIHRoZSB0by1kbyBsaXN0IFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKSA9PiB7IFxuICAgIGNvbnN0IGluaXRpYWxpemVBcHAgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHByb2plY3QgYW5kIG5vdGUgZm9ybSBcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBzaWRlYmFyXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5jbGVhclNpZGViYXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIE1haW4gUHJvamVjdFxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KCdNeSBQcm9qZWN0Jyk7IFxuICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxpemVBcHBXaXRoU3RvcmFnZSA9IChwcm9qZWN0cykgPT4ge1xuICAgICAgICAvLyBJbml0aWFsaXplIE1haW4gUHJvamVjdCBcbiAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzWzBdKTtcblxuICAgICAgICAvLyBEaXNwbGF5IHRoZSBvdGhlciBwcm9qZWN0cyBcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KHByb2plY3RzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIHNpZGViYXIgXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5kaXNwbGF5U2lkZWJhcigpXG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcHJvamVjdCBhbmQgbm90ZSBmb3JtXG4gICAgICAgIGluaXRCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFByb2plY3QgRm9ybVxuICAgICAgICBpbml0QWRkUHJvamVjdEJ1dHRvbigpO1xuICAgICAgICBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbigpO1xuICAgICAgICBpbml0U3VibWl0UHJvamVjdEJ1dHRvbigpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIE5vdGUgRm9ybSBcbiAgICAgICAgaW5pdEFkZE5vdGVCdXR0b24oKTtcbiAgICAgICAgaW5pdENsb3NlTm90ZUZvcm1CdXR0b24oKTtcbiAgICAgICAgaW5pdFN1Ym1pdE5vdGVCdXR0b24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0QWRkUHJvamVjdEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idG4nKTtcbiAgICAgICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLm9wZW5Qcm9qZWN0Rm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRDbG9zZVByb2plY3RGb3JtQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZVByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXByb2plY3QtZm9ybS1idG4nKTtcbiAgICAgICAgY2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0U3VibWl0UHJvamVjdEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1wcm9qZWN0LWJ0bicpO1xuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgUHJvamVjdFxuICAgICAgICAgICAgbGV0IGZvcm1JbmZvID0gVXRpbHMucHJvY2Vzc1Byb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KGZvcm1JbmZvKTtcblxuICAgICAgICAgICAgLy8gU3RvcmUgUHJvamVjdHNcbiAgICAgICAgICAgIFN0b3JhZ2Uuc3RvcmVQcm9qZWN0cygpO1xuXG4gICAgICAgICAgICAvLyBEaXNwbGF5IHByb2plY3QgXG4gICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgZm9ybUluZm8sIFxuICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KGFjdGl2ZVByb2plY3QpO1xuXG4gICAgICAgICAgICAvLyBEaXNwbGF5IHNpZGViYXJcbiAgICAgICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5kaXNwbGF5U2lkZWJhcigpO1xuXG4gICAgICAgICAgICAvLyBDbGVhbiB1cFxuICAgICAgICAgICAgVXRpbHMuY2xlYXJQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgVXRpbHMuY2xvc2VQcm9qZWN0Rm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRBZGROb3RlQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGROb3RlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1ub3RlLWJ0bicpO1xuICAgICAgICBhZGROb3RlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgVXRpbHMub3Blbk5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdENsb3NlTm90ZUZvcm1CdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb3NlTm90ZUZvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2Utbm90ZS1mb3JtLWJ0bicpO1xuICAgICAgICBjbG9zZU5vdGVGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgVXRpbHMuY2xvc2VOb3RlRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRTdWJtaXROb3RlQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LW5vdGUtYnRuJyk7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIC8vIEdldCBhY3RpdmUgcHJvamVjdFxuICAgICAgICAgICAgbGV0IGFjdGl2ZVByb2plY3QgPSBVdGlscy5nZXRBY3RpdmVQcm9qZWN0KFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LXRpdGxlJykudGV4dENvbnRlbnQsIFxuICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgbm90ZVxuICAgICAgICAgICAgbGV0IGZvcm1JbmZvID0gVXRpbHMucHJvY2Vzc05vdGVGb3JtKCk7XG4gICAgICAgICAgICBsZXQgbm90ZSA9IG5vdGVDb250cm9sbGVyLmNyZWF0ZU5vdGUoYCR7Zm9ybUluZm9bMF19YCwgXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bMV19YCxcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1syXX1gLFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzNdfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBub3RlIHRvIHByb2plY3QgXG4gICAgICAgICAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIuYWRkTm90ZVRvUHJvamVjdChhY3RpdmVQcm9qZWN0LCBub3RlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU3RvcmUgUHJvamVjdHMgXG4gICAgICAgICAgICBTdG9yYWdlLnN0b3JlUHJvamVjdHMoKTtcblxuICAgICAgICAgICAgLy8gRGlzcGxheSBQcm9qZWN0IFxuICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KGFjdGl2ZVByb2plY3QpO1xuXG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBcbiAgICAgICAgICAgIFV0aWxzLmNsZWFyTm90ZUZvcm0oKTtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0aWFsaXplQXBwLFxuICAgICAgICBpbml0aWFsaXplQXBwV2l0aFN0b3JhZ2VcbiAgICB9XG59XG5cblxuLy8gc2lkZWJhckRpc3BsYXllciBkaXNwbGF5cyB0aGUgc2lkZWJhci4gTmVlZHMgYWNjZXNzIHRvIHRoZSBsaXN0IG9mIHByb2plY3QgdGl0bGVzXG5jb25zdCBzaWRlYmFyRGlzcGxheWVyID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY2xlYXJTaWRlYmFyID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcbiAgICAgICAgc2lkZWJhci50ZXh0Q29udGVudCA9ICcnOyBcbiAgICAgICAgcmV0dXJuIHNpZGViYXI7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheVNpZGViYXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaWRlYmFyID0gY2xlYXJTaWRlYmFyKCk7XG4gICAgICAgIGNyZWF0ZVNpZGViYXJEaXNwbGF5KHNpZGViYXIpO1xuICAgICAgICBpbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVTaWRlYmFyRGlzcGxheSA9IChzaWRlYmFyKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1tpXS50aXRsZSAhPT0gJ015IFByb2plY3QnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpZGViYXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdwcm9qZWN0LWJ0bicpO1xuICAgICAgICAgICAgICAgIHNpZGViYXJCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1tpXS50aXRsZTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFwcGVuZChzaWRlYmFyQnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRQcm9qZWN0QnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcbiAgICAgICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVByb2plY3QgPSBVdGlscy5nZXRBY3RpdmVQcm9qZWN0KFxuICAgICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXlTaWRlYmFyLFxuICAgICAgICBjbGVhclNpZGViYXJcbiAgICB9XG59XG5cbi8vIHByb2plY3REaXNwbGF5ZXIgaGVscHMgZGlzcGxheXMgdGhlIHByb2plY3RcbmNvbnN0IHByb2plY3REaXNwbGF5ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBsZXQgY29udGVudCA9IGNsZWFyUHJvamVjdENvbnRlbnQoKTtcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIHRoZSB0aXRsZSBcbiAgICAgICAgY29udGVudC5hcHBlbmQoY3JlYXRlUHJvamVjdFRpdGxlRGlzcGxheShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBkZWxldGUgYnV0dG9uXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3REZWxldGVEaXNwbGF5KHByb2plY3QpKTtcblxuICAgICAgICAvLyBBcHBlbmQgdGhlIGNvbnRlbnQgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3REaXNwbGF5KHByb2plY3QpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclByb2plY3RDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICAvLyBTZWxlY3QgdGhlIGNvbnRlbnQgYXJlYSBcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICAgIFxuICAgICAgICAvLyBDbGVhciB0aGUgY29udGVudCBhcmVhXG4gICAgICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSAnJztcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0VGl0bGVEaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwcm9qZWN0IHRpdGxlIGRpdiBcbiAgICAgICAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10aXRsZScpO1xuICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBQcm9qZWN0LnRpdGxlOyBcblxuICAgICAgICByZXR1cm4gcHJvamVjdFRpdGxlO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3REZWxldGVEaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAgICAgaWYgKFByb2plY3QudGl0bGUgPT09ICdNeSBQcm9qZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZGVsZXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdkZWxldGUtcHJvamVjdC1idG4nKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuXG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5kZWxldGVQcm9qZWN0KFByb2plY3QpO1xuICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzWzBdKTtcbiAgICAgICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5kaXNwbGF5U2lkZWJhcigpO1xuICAgICAgICAgICAgYWxlcnQoYCR7UHJvamVjdC50aXRsZX0gaGFzIGJlZW4gZGVsZXRlZGApO1xuXG4gICAgICAgICAgICAvLyBTdG9yZSBwcm9qZWN0cyBcbiAgICAgICAgICAgIFN0b3JhZ2Uuc3RvcmVQcm9qZWN0cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVsZXRlUHJvamVjdEJ1dHRvbjtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0RGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgcHJvamVjdCBjb250ZW50IGRpdiBcbiAgICAgICAgbGV0IHByb2plY3RDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTsgXG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCBub3RlcyB0byB0aGUgcHJvamVjdCBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBQcm9qZWN0Lm5vdGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vdGUgPSBjcmVhdGVOb3RlRGlzcGxheShQcm9qZWN0Lm5vdGVBcnJheVtpXSwgUHJvamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudC5hcHBlbmRDaGlsZChub3RlKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gcHJvamVjdENvbnRlbnQ7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNyZWF0ZU5vdGVEaXNwbGF5ID0gKE5vdGUsIFByb2plY3QpID0+IHtcbiAgICAgICAgbGV0IG5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm90ZS5jbGFzc0xpc3QuYWRkKCdub3RlJyk7XG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBidXR0b25cbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2RvbmUtYnRuJyk7IFxuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnRG9uZSEnOyBcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbm90ZVByb2plY3RTdHJ1Y3R1cmVyLmRlbGV0ZU5vdGVGcm9tUHJvamVjdChQcm9qZWN0LCBOb3RlKTtcbiAgICAgICAgICAgIC8vIFN0b3JlIFByb2plY3RzIFxuICAgICAgICAgICAgU3RvcmFnZS5zdG9yZVByb2plY3RzKCk7XG4gICAgICAgICAgICBub3RlLnJlbW92ZSgpO1xuICAgICAgICB9KSBcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IE5vdGUudGl0bGU7XG4gICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLnRpdGxlID0gdGl0bGUudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgZGVzY3JpcHRpb25cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gTm90ZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBkZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGR1ZURhdGVcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWVEYXRlJyk7XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBOb3RlLmR1ZURhdGU7XG4gICAgICAgIGR1ZURhdGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS5kdWVEYXRlID0gZHVlRGF0ZS50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIHByaW9yaXR5IFxuICAgICAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTsgXG4gICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gTm90ZS5wcmlvcml0eTtcbiAgICAgICAgcHJpb3JpdHkuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUucHJpb3JpdHkgPSBwcmlvcml0eS50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzXG4gICAgICAgIG5vdGUuYXBwZW5kKGJ1dHRvbiwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgXG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0XG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIsIFxuICAgIHByb2plY3RDb250cm9sbGVyLFxuICAgIHByb2plY3REaXNwbGF5ZXIsXG4gICAgc2lkZWJhckRpc3BsYXllclxufSIsIi8vIEluZm9ybWF0aW9uIGhvbGRlcnMgXG4vLyBPYmplY3RzIHRoYXQgaG9sZCBpbmZvcm1hdGlvbiBmb3IgdGhlIHRvLWRvIGxpc3QgXG5cblxuLy8gTm90ZSBmYWN0b3J5IGNyZWF0ZXMgbm90ZXMgXG5jb25zdCBub3RlRmFjdG9yeSA9IChpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjsgXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTsgXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRpdGxlLCBcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGR1ZURhdGUsIFxuICAgICAgICBwcmlvcml0eSxcbiAgICB9XG59XG5cblxuLy8gUHJvamVjdCBmYWN0b3J5IGNyZWF0ZXMgcHJvamVjdHMgXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChpZCwgdGl0bGUsIG5vdGVBcnJheSkgPT4ge1xuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgXG4gICAgLy8gQWRkIGEgbm90ZSB0byBhIHByb2plY3QgXG4gICAgY29uc3QgYWRkTm90ZSA9IChub3RlKSA9PiB7XG4gICAgICAgIG5vdGVBcnJheS5wdXNoKG5vdGUpO1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBhIG5vdGUgZnJvbSBhIHByb2plY3QgXG4gICAgY29uc3QgZGVsZXRlTm90ZSA9IChub3RlKSA9PiB7XG4gICAgICAgIG5vdGVBcnJheS5zcGxpY2Uobm90ZUFycmF5LmluZGV4T2Yobm90ZSksIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgbm90ZUFycmF5LFxuICAgICAgICBnZXRUaXRsZSxcbiAgICAgICAgYWRkTm90ZSwgXG4gICAgICAgIGRlbGV0ZU5vdGVcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBub3RlRmFjdG9yeSxcbiAgICBwcm9qZWN0RmFjdG9yeSxcbn0iLCJpbXBvcnQgKiBhcyBDb250cm9sbGVycyBmcm9tIFwiLi9jb250cm9sbGVycy5qc1wiO1xuaW1wb3J0ICogYXMgRGlzcGxheWVycyBmcm9tICcuL2Rpc3BsYXllcnMuanMnOyBcblxuZnVuY3Rpb24gc3RvcmVQcm9qZWN0cygpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShEaXNwbGF5ZXJzLnByb2plY3RDb250cm9sbGVyLnByb2plY3RzKSk7XG59XG5cblxuZXhwb3J0IHtcbiAgICBzdG9yZVByb2plY3RzXG59IiwiLy8gU3RydWN0dXJlcnNcbi8vIE9iamVjdHMgdGhhdCByZWxhdGUgdGhlIG5vdGVzIHRvIHRoZSBwcm9qZWN0cyBcbmNvbnN0IG5vdGVQcm9qZWN0U3RydWN0dXJlciA9ICgpID0+IHtcbiAgICBjb25zdCBhZGROb3RlVG9Qcm9qZWN0ID0gKHByb2plY3QsIG5vdGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5hZGROb3RlKG5vdGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVOb3RlRnJvbVByb2plY3QgPSAocHJvamVjdCwgbm90ZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZU5vdGUobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkTm90ZVRvUHJvamVjdCxcbiAgICAgICAgZGVsZXRlTm90ZUZyb21Qcm9qZWN0XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIsXG59XG4iLCJjb25zdCBtYWtlRWRpdGFibGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xufVxuXG5jb25zdCBtYWtlVW5lZGl0YWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScpO1xufVxuXG5jb25zdCBvcGVuTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1ub3RlLWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBvcGVuUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBwcm9jZXNzTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG5cbiAgICByZXR1cm4gW3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHldO1xufVxuXG5jb25zdCBwcm9jZXNzUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tdGl0bGVcIikudmFsdWU7XG4gICAgcmV0dXJuIHRpdGxlO1xufVxuXG5jb25zdCBjbGVhck5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKTtcblxuICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICBkdWVEYXRlLnZhbHVlID0gJyc7XG4gICAgcHJpb3JpdHkudmFsdWUgPSAnJztcbn1cblxuY29uc3QgY2xlYXJQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLXRpdGxlJyk7XG5cbiAgICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuXG5jb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0QXJyYXkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoU3RyaW5nKHByb2plY3ROYW1lKSA9PT0gU3RyaW5nKHByb2plY3RBcnJheVtpXS50aXRsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0QXJyYXlbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBtYWtlRWRpdGFibGUsXG4gICAgbWFrZVVuZWRpdGFibGUsXG4gICAgb3Blbk5vdGVGb3JtLFxuICAgIGNsb3NlTm90ZUZvcm0sXG4gICAgb3BlblByb2plY3RGb3JtLFxuICAgIGNsb3NlUHJvamVjdEZvcm0sXG4gICAgcHJvY2Vzc05vdGVGb3JtLFxuICAgIGNsZWFyTm90ZUZvcm0sXG4gICAgcHJvY2Vzc1Byb2plY3RGb3JtLFxuICAgIGNsZWFyUHJvamVjdEZvcm0sIFxuICAgIGdldEFjdGl2ZVByb2plY3Rcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJztcblxuLy8gSW5pdGlhbGl6ZSB0aGUgYXBwbGljYXRpb25cbmNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gRGlzcGxheWVycy5kaXNwbGF5Q29udHJvbGxlcigpO1xuXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSA9PT0gbnVsbCkge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpemVBcHAoKTtcbn0gZWxzZSB7XG4gICAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUFwcFdpdGhTdG9yYWdlKHByb2plY3RzKTsgICBcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=