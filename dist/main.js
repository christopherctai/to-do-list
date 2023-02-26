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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFxQjtBQUNqQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ2dEO0FBQ0Y7O0FBRTlDO0FBQ0EsdURBQXVELHNFQUFxQztBQUM1Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O1VDbkVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7O0FBRTlDO0FBQ0EsMEJBQTBCLDZEQUE0Qjs7QUFFdEQ7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kaXNwbGF5ZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5mby1ob2xkZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29udHJvbGxlcnMgXG4vLyBPYmplY3RzIHRoYXQgY2FuIG1hbmlwdWxhdGUgdGhlIG5vdGVzIG9yIHByb2plY3RzIHRoZW1zZWx2ZXMgXG5cbmltcG9ydCB7IG5vdGVGYWN0b3J5LCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vaW5mby1ob2xkZXJzJztcblxuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgbGV0IG5vdGVJRCA9IDA7XG4gICAgY29uc3QgY3JlYXRlTm90ZSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gbm90ZUZhY3Rvcnkobm90ZUlELCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgbm90ZUlEKys7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5vdGUsXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdElEID0gMDtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwcm9qZWN0IFxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQsIHRpdGxlLCBbXSk7XG4gICAgICAgIHByb2plY3RJRCsrO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBub3RlQ29udHJvbGxlclxufSIsIi8vIERpc3BsYXllcnMgXG4vLyBPYmplY3RzIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBnaXZlbiBpbmZvcm1hdGlvbiBcblxuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBDb250cm9sbGVycyBmcm9tICcuL2NvbnRyb2xsZXJzLmpzJztcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXJzIGZyb20gJy4vc3RydWN0dXJlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG5cbi8vIENyZWF0ZSBjb250cm9sbGVyc1xuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSBDb250cm9sbGVycy5ub3RlQ29udHJvbGxlcigpO1xuY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSBDb250cm9sbGVycy5wcm9qZWN0Q29udHJvbGxlcigpO1xuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gU3RydWN0dXJlcnMubm90ZVByb2plY3RTdHJ1Y3R1cmVyKCk7XG5cbi8vIGRpc3BsYXlDb250cm9sbGVyIGNvbnRyb2xzIHRoZSBkaXNwbGF5IG9mIHRoZSB0by1kbyBsaXN0IFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKSA9PiB7IFxuICAgIGNvbnN0IGluaXRpYWxpemVBcHAgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHByb2plY3QgYW5kIG5vdGUgZm9ybSBcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBzaWRlYmFyXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5jbGVhclNpZGViYXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIE1haW4gUHJvamVjdFxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KCdNeSBQcm9qZWN0Jyk7IFxuICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxpemVBcHBXaXRoU3RvcmFnZSA9IChwcm9qZWN0cykgPT4ge1xuICAgICAgICAvLyBJbml0aWFsaXplIE1haW4gUHJvamVjdCBcbiAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzWzBdKTtcblxuICAgICAgICAvLyBEaXNwbGF5IHRoZSBvdGhlciBwcm9qZWN0cyBcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KHByb2plY3RzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIHNpZGViYXIgXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5kaXNwbGF5U2lkZWJhcigpXG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcHJvamVjdCBhbmQgbm90ZSBmb3JtIFxuICAgICAgICBpbml0QnV0dG9ucygpO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBQcm9qZWN0IEZvcm1cbiAgICAgICAgaW5pdEFkZFByb2plY3RCdXR0b24oKTtcbiAgICAgICAgaW5pdENsb3NlUHJvamVjdEZvcm1CdXR0b24oKTtcbiAgICAgICAgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24oKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBOb3RlIEZvcm0gXG4gICAgICAgIGluaXRBZGROb3RlQnV0dG9uKCk7XG4gICAgICAgIGluaXRDbG9zZU5vdGVGb3JtQnV0dG9uKCk7XG4gICAgICAgIGluaXRTdWJtaXROb3RlQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJyk7XG4gICAgICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wcm9qZWN0LWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtcHJvamVjdC1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIFByb2plY3RcbiAgICAgICAgICAgIGxldCBmb3JtSW5mbyA9IFV0aWxzLnByb2Nlc3NQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdChmb3JtSW5mbyk7XG5cbiAgICAgICAgICAgIC8vIFN0b3JlIFByb2plY3RzXG4gICAgICAgICAgICBTdG9yYWdlLnN0b3JlUHJvamVjdHMoKTtcblxuICAgICAgICAgICAgLy8gRGlzcGxheSBwcm9qZWN0IFxuICAgICAgICAgICAgbGV0IGFjdGl2ZVByb2plY3QgPSBVdGlscy5nZXRBY3RpdmVQcm9qZWN0KFxuICAgICAgICAgICAgICAgIGZvcm1JbmZvLCBcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gRGlzcGxheSBzaWRlYmFyXG4gICAgICAgICAgICBzaWRlYmFyRGlzcGxheWVyKCkuZGlzcGxheVNpZGViYXIoKTtcblxuICAgICAgICAgICAgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgIFV0aWxzLmNsZWFyUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0QWRkTm90ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkTm90ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1idG4nKTtcbiAgICAgICAgYWRkTm90ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLm9wZW5Ob3RlRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRDbG9zZU5vdGVGb3JtQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZU5vdGVGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLW5vdGUtZm9ybS1idG4nKTtcbiAgICAgICAgY2xvc2VOb3RlRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0U3VibWl0Tm90ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1ub3RlLWJ0bicpO1xuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBHZXQgYWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZScpLnRleHRDb250ZW50LCBcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5vdGVcbiAgICAgICAgICAgIGxldCBmb3JtSW5mbyA9IFV0aWxzLnByb2Nlc3NOb3RlRm9ybSgpO1xuICAgICAgICAgICAgbGV0IG5vdGUgPSBub3RlQ29udHJvbGxlci5jcmVhdGVOb3RlKGAke2Zvcm1JbmZvWzBdfWAsIFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzFdfWAsXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bMl19YCxcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1szXX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZVByb2plY3QpO1xuXG4gICAgICAgICAgICAvLyBBZGQgbm90ZSB0byBwcm9qZWN0IFxuICAgICAgICAgICAgbm90ZVByb2plY3RTdHJ1Y3R1cmVyLmFkZE5vdGVUb1Byb2plY3QoYWN0aXZlUHJvamVjdCwgbm90ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFN0b3JlIFByb2plY3RzIFxuICAgICAgICAgICAgU3RvcmFnZS5zdG9yZVByb2plY3RzKCk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgUHJvamVjdCBcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgXG4gICAgICAgICAgICBVdGlscy5jbGVhck5vdGVGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdGlhbGl6ZUFwcCxcbiAgICAgICAgaW5pdGlhbGl6ZUFwcFdpdGhTdG9yYWdlXG4gICAgfVxufVxuXG5cbi8vIHNpZGViYXJEaXNwbGF5ZXIgZGlzcGxheXMgdGhlIHNpZGViYXIuIE5lZWRzIGFjY2VzcyB0byB0aGUgbGlzdCBvZiBwcm9qZWN0IHRpdGxlc1xuY29uc3Qgc2lkZWJhckRpc3BsYXllciA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNsZWFyU2lkZWJhciA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHNpZGViYXIudGV4dENvbnRlbnQgPSAnJzsgXG4gICAgICAgIHJldHVybiBzaWRlYmFyO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlTaWRlYmFyID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2lkZWJhciA9IGNsZWFyU2lkZWJhcigpO1xuICAgICAgICBjcmVhdGVTaWRlYmFyRGlzcGxheShzaWRlYmFyKTtcbiAgICAgICAgaW5pdFByb2plY3RCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlU2lkZWJhckRpc3BsYXkgPSAoc2lkZWJhcikgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RDb250cm9sbGVyLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbaV0udGl0bGUgIT09ICdNeSBQcm9qZWN0Jykge1xuICAgICAgICAgICAgICAgIGxldCBzaWRlYmFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhckJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAncHJvamVjdC1idG4nKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyQnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbaV0udGl0bGU7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5hcHBlbmQoc2lkZWJhckJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbml0UHJvamVjdEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XG4gICAgICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KGFjdGl2ZVByb2plY3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5U2lkZWJhcixcbiAgICAgICAgY2xlYXJTaWRlYmFyXG4gICAgfVxufVxuXG4vLyBwcm9qZWN0RGlzcGxheWVyIGhlbHBzIGRpc3BsYXlzIHRoZSBwcm9qZWN0XG5jb25zdCBwcm9qZWN0RGlzcGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBjbGVhclByb2plY3RDb250ZW50KCk7XG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdGl0bGUgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3RUaXRsZURpc3BsYXkocHJvamVjdCkpO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0RGVsZXRlRGlzcGxheShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBjb250ZW50IFxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0RGlzcGxheShwcm9qZWN0KSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJQcm9qZWN0Q29udGVudCA9ICgpID0+IHtcbiAgICAgICAgLy8gU2VsZWN0IHRoZSBjb250ZW50IGFyZWEgXG4gICAgICAgIGxldCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICBcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnRlbnQgYXJlYVxuICAgICAgICBjb250ZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdFRpdGxlRGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgcHJvamVjdCB0aXRsZSBkaXYgXG4gICAgICAgIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gUHJvamVjdC50aXRsZTsgXG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RUaXRsZTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0RGVsZXRlRGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIGlmIChQcm9qZWN0LnRpdGxlID09PSAnTXkgUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnZGVsZXRlLXByb2plY3QtYnRuJyk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZGVsZXRlUHJvamVjdChQcm9qZWN0KTtcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1swXSk7XG4gICAgICAgICAgICBzaWRlYmFyRGlzcGxheWVyKCkuZGlzcGxheVNpZGViYXIoKTtcbiAgICAgICAgICAgIGFsZXJ0KGAke1Byb2plY3QudGl0bGV9IGhhcyBiZWVuIGRlbGV0ZWRgKTtcblxuICAgICAgICAgICAgLy8gU3RvcmUgcHJvamVjdHMgXG4gICAgICAgICAgICBTdG9yYWdlLnN0b3JlUHJvamVjdHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlbGV0ZVByb2plY3RCdXR0b247XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdERpc3BsYXkgPSAoUHJvamVjdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIHByb2plY3QgY29udGVudCBkaXYgXG4gICAgICAgIGxldCBwcm9qZWN0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7IFxuICAgIFxuICAgICAgICAvLyBBcHBlbmQgbm90ZXMgdG8gdGhlIHByb2plY3QgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUHJvamVjdC5ub3RlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub3RlID0gY3JlYXRlTm90ZURpc3BsYXkoUHJvamVjdC5ub3RlQXJyYXlbaV0sIFByb2plY3QpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQuYXBwZW5kQ2hpbGQobm90ZSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHByb2plY3RDb250ZW50O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBjcmVhdGVOb3RlRGlzcGxheSA9IChOb3RlLCBQcm9qZWN0KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGUuY2xhc3NMaXN0LmFkZCgnbm90ZScpO1xuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYnV0dG9uXG4gICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdkb25lLWJ0bicpOyBcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ0RvbmUhJzsgXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlci5kZWxldGVOb3RlRnJvbVByb2plY3QoUHJvamVjdCwgTm90ZSk7XG4gICAgICAgICAgICAvLyBTdG9yZSBQcm9qZWN0cyBcbiAgICAgICAgICAgIFN0b3JhZ2Uuc3RvcmVQcm9qZWN0cygpO1xuICAgICAgICAgICAgbm90ZS5yZW1vdmUoKTtcbiAgICAgICAgfSkgXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSB0aXRsZVxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBOb3RlLnRpdGxlO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS50aXRsZSA9IHRpdGxlLnRleHRDb250ZW50O1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGRlc2NyaXB0aW9uXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IE5vdGUuZGVzY3JpcHRpb247XG4gICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBkdWVEYXRlXG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlRGF0ZScpO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gTm90ZS5kdWVEYXRlO1xuICAgICAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUuZHVlRGF0ZSA9IGR1ZURhdGUudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBwcmlvcml0eSBcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5Jyk7IFxuICAgICAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IE5vdGUucHJpb3JpdHk7XG4gICAgICAgIHByaW9yaXR5LnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLnByaW9yaXR5ID0gcHJpb3JpdHkudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCBlbGVtZW50c1xuICAgICAgICBub3RlLmFwcGVuZChidXR0b24sIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgIFxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5UHJvamVjdFxuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLCBcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBwcm9qZWN0RGlzcGxheWVyLFxuICAgIHNpZGViYXJEaXNwbGF5ZXJcbn0iLCIvLyBJbmZvcm1hdGlvbiBob2xkZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGhvbGQgaW5mb3JtYXRpb24gZm9yIHRoZSB0by1kbyBsaXN0IFxuXG5cbi8vIE5vdGUgZmFjdG9yeSBjcmVhdGVzIG5vdGVzIFxuY29uc3Qgbm90ZUZhY3RvcnkgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247IFxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7IFxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgcHJpb3JpdHksXG4gICAgfVxufVxuXG5cbi8vIFByb2plY3QgZmFjdG9yeSBjcmVhdGVzIHByb2plY3RzIFxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoaWQsIHRpdGxlLCBub3RlQXJyYXkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIFxuICAgIC8vIEFkZCBhIG5vdGUgdG8gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGFkZE5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBub3RlIGZyb20gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZU5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkuc3BsaWNlKG5vdGVBcnJheS5pbmRleE9mKG5vdGUpLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIG5vdGVBcnJheSxcbiAgICAgICAgZ2V0VGl0bGUsXG4gICAgICAgIGFkZE5vdGUsIFxuICAgICAgICBkZWxldGVOb3RlXG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgbm90ZUZhY3RvcnksXG4gICAgcHJvamVjdEZhY3RvcnksXG59IiwiaW1wb3J0ICogYXMgQ29udHJvbGxlcnMgZnJvbSBcIi4vY29udHJvbGxlcnMuanNcIjtcbmltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJzsgXG5cbmZ1bmN0aW9uIHN0b3JlUHJvamVjdHMoKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoRGlzcGxheWVycy5wcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cykpO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgc3RvcmVQcm9qZWN0c1xufSIsIi8vIFN0cnVjdHVyZXJzXG4vLyBPYmplY3RzIHRoYXQgcmVsYXRlIHRoZSBub3RlcyB0byB0aGUgcHJvamVjdHMgXG5jb25zdCBub3RlUHJvamVjdFN0cnVjdHVyZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTm90ZVRvUHJvamVjdCA9IChwcm9qZWN0LCBub3RlKSA9PiB7XG4gICAgICAgIHByb2plY3QuYWRkTm90ZShub3RlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlTm90ZUZyb21Qcm9qZWN0ID0gKHByb2plY3QsIG5vdGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5kZWxldGVOb3RlKG5vdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZE5vdGVUb1Byb2plY3QsXG4gICAgICAgIGRlbGV0ZU5vdGVGcm9tUHJvamVjdFxuICAgIH1cbn07XG5cbmV4cG9ydCB7XG4gICAgbm90ZVByb2plY3RTdHJ1Y3R1cmVyLFxufVxuIiwiY29uc3QgbWFrZUVkaXRhYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbn1cblxuY29uc3QgbWFrZVVuZWRpdGFibGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAnZmFsc2UnKTtcbn1cblxuY29uc3Qgb3Blbk5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IGNsb3NlTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuY29uc3Qgb3BlblByb2plY3RGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IGNsb3NlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgcHJvY2Vzc05vdGVGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKS52YWx1ZTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuXG4gICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5XTtcbn1cblxuY29uc3QgcHJvY2Vzc1Byb2plY3RGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLXRpdGxlXCIpLnZhbHVlO1xuICAgIHJldHVybiB0aXRsZTtcbn1cblxuY29uc3QgY2xlYXJOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWVEYXRlJyk7XG4gICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5Jyk7XG5cbiAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgZHVlRGF0ZS52YWx1ZSA9ICcnO1xuICAgIHByaW9yaXR5LnZhbHVlID0gJyc7XG59XG5cbmNvbnN0IGNsZWFyUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS10aXRsZScpO1xuXG4gICAgdGl0bGUudmFsdWUgPSAnJztcbn1cblxuY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9IChwcm9qZWN0TmFtZSwgcHJvamVjdEFycmF5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFN0cmluZyhwcm9qZWN0TmFtZSkgPT09IFN0cmluZyhwcm9qZWN0QXJyYXlbaV0udGl0bGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEFycmF5W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7XG4gICAgbWFrZUVkaXRhYmxlLFxuICAgIG1ha2VVbmVkaXRhYmxlLFxuICAgIG9wZW5Ob3RlRm9ybSxcbiAgICBjbG9zZU5vdGVGb3JtLFxuICAgIG9wZW5Qcm9qZWN0Rm9ybSxcbiAgICBjbG9zZVByb2plY3RGb3JtLFxuICAgIHByb2Nlc3NOb3RlRm9ybSxcbiAgICBjbGVhck5vdGVGb3JtLFxuICAgIHByb2Nlc3NQcm9qZWN0Rm9ybSxcbiAgICBjbGVhclByb2plY3RGb3JtLCBcbiAgICBnZXRBY3RpdmVQcm9qZWN0XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBEaXNwbGF5ZXJzIGZyb20gJy4vZGlzcGxheWVycy5qcyc7XG5cbi8vIEluaXRpYWxpemUgdGhlIGFwcGxpY2F0aW9uXG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IERpc3BsYXllcnMuZGlzcGxheUNvbnRyb2xsZXIoKTtcblxuaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykgPT09IG51bGwpIHtcbiAgICBkaXNwbGF5Q29udHJvbGxlci5pbml0aWFsaXplQXBwKCk7XG59IGVsc2Uge1xuICAgIGxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgIGRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpemVBcHBXaXRoU3RvcmFnZShwcm9qZWN0cyk7ICAgXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9