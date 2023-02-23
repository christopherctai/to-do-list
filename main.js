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
/* harmony export */   "projectDisplayer": () => (/* binding */ projectDisplayer),
/* harmony export */   "sidebarDisplayer": () => (/* binding */ sidebarDisplayer)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _controllers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers.js */ "./src/controllers.js");
/* harmony import */ var _structurers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structurers.js */ "./src/structurers.js");
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
        projectController.displayProject(projectController.projects[0]);
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
            
            // Display Project 
            projectDisplayer().displayProject(activeProject);

            // Clean up 
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.clearNoteForm();
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.closeNoteForm();
        })
    }

    return {
        initializeApp
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



const initNoteButtons = (note) => {
    const titles = document.querySelectorAll('.title');
    const descriptions = document.querySelectorAll('.description');
    const dueDates = document.querySelectorAll('.dueDate');
    const priorities = document.querySelectorAll('.priority');

    titles.forEach((title) => {
        title.addEventListener('change', () => {
            updateNoteInfo(title, title.textContent, note);
        })
    })

    descriptions.forEach((description) => {
        description.addEventListener('change', () => {
            updateNoteInfo(description, description.textContent, note);
        })
    })

    dueDates.forEach((dueDate) => {
        dueDate.addEventListener('change', () => {
            updateNoteInfo(dueDate, dueDate.textContent, note);
        })
    })

    priorities.forEach((priority) => {
        priority.addEventListener('change', () => {
            updateNoteInfo(priority, priority.textContent, note);
        })
    })
}



/* projectDisplayer (DOM)
-displays a project 
-relies on noteDisplayer

noteDisplayer (DOM)
-displays a note 

displayController (DOM)
-displays the to-do-list  */

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
/* harmony import */ var _info_holders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info-holders.js */ "./src/info-holders.js");
/* harmony import */ var _controllers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers.js */ "./src/controllers.js");
/* harmony import */ var _structurers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structurers.js */ "./src/structurers.js");
/* harmony import */ var _displayers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displayers.js */ "./src/displayers.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");








// Initialize the application
const displayController = _displayers_js__WEBPACK_IMPORTED_MODULE_3__.displayController();
displayController.initializeApp();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFNQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqVUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztVQ25FQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05pRDtBQUNEO0FBQ0E7QUFDRjtBQUNWOztBQUVGOztBQUVsQztBQUNBLDBCQUEwQiw2REFBNEI7QUFDdEQsa0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NvbnRyb2xsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZGlzcGxheWVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZm8taG9sZGVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29udHJvbGxlcnMgXG4vLyBPYmplY3RzIHRoYXQgY2FuIG1hbmlwdWxhdGUgdGhlIG5vdGVzIG9yIHByb2plY3RzIHRoZW1zZWx2ZXMgXG5cbmltcG9ydCB7IG5vdGVGYWN0b3J5LCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vaW5mby1ob2xkZXJzJztcblxuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgbGV0IG5vdGVJRCA9IDA7XG4gICAgY29uc3QgY3JlYXRlTm90ZSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gbm90ZUZhY3Rvcnkobm90ZUlELCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgbm90ZUlEKys7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIC8vIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgdGl0bGUgXG4gICAgY29uc3QgY2hhbmdlVGl0bGUgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIG5vdGUgXG4gICAgY29uc3QgY2hhbmdlRGVzY3JpcHRpb24gPSAoKSA9PiB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIEFsbG93IHVzZXJzIHRvIGNoYW5nZSB0aGUgbm90ZSdzIHByaW9yaXR5IFxuICAgIGNvbnN0IGNoYW5nZVByaW9yaXR5ID0gKCkgPT4ge1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTm90ZSxcbiAgICAgICAgY2hhbmdlVGl0bGUsXG4gICAgICAgIGNoYW5nZURlc2NyaXB0aW9uLFxuICAgICAgICBjaGFuZ2VQcmlvcml0eVxuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgbGV0IHByb2plY3RJRCA9IDA7XG4gICAgbGV0IHByb2plY3RzID0gW107XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgZW1wdHkgcHJvamVjdCBcbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHRpdGxlKSA9PiB7XG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdElELCB0aXRsZSwgW10pO1xuICAgICAgICBwcm9qZWN0SUQrKztcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIGEgcHJvamVjdCBcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKHByb2plY3RzLmluZGV4T2YocHJvamVjdCksIDEpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9qZWN0cyxcbiAgICAgICAgY3JlYXRlUHJvamVjdCxcbiAgICAgICAgZGVsZXRlUHJvamVjdCxcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgcHJvamVjdENvbnRyb2xsZXIsXG4gICAgbm90ZUNvbnRyb2xsZXJcbn0iLCIvLyBEaXNwbGF5ZXJzIFxuLy8gT2JqZWN0cyB0aGF0IHdpbGwgZGlzcGxheSB0aGUgZ2l2ZW4gaW5mb3JtYXRpb24gXG5cbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgQ29udHJvbGxlcnMgZnJvbSAnLi9jb250cm9sbGVycy5qcyc7XG5pbXBvcnQgKiBhcyBTdHJ1Y3R1cmVycyBmcm9tICcuL3N0cnVjdHVyZXJzLmpzJztcblxuXG4vLyBDcmVhdGUgY29udHJvbGxlcnNcbmNvbnN0IG5vdGVDb250cm9sbGVyID0gQ29udHJvbGxlcnMubm90ZUNvbnRyb2xsZXIoKTtcbmNvbnN0IHByb2plY3RDb250cm9sbGVyID0gQ29udHJvbGxlcnMucHJvamVjdENvbnRyb2xsZXIoKTtcbmNvbnN0IG5vdGVQcm9qZWN0U3RydWN0dXJlciA9IFN0cnVjdHVyZXJzLm5vdGVQcm9qZWN0U3RydWN0dXJlcigpO1xuXG4vLyBkaXNwbGF5Q29udHJvbGxlciBjb250cm9scyB0aGUgZGlzcGxheSBvZiB0aGUgdG8tZG8gbGlzdCBcbmNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gKCkgPT4geyBcbiAgICBjb25zdCBpbml0aWFsaXplQXBwID0gKCkgPT4ge1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBwcm9qZWN0IGFuZCBub3RlIGZvcm0gXG4gICAgICAgIGluaXRCdXR0b25zKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2lkZWJhclxuICAgICAgICBzaWRlYmFyRGlzcGxheWVyKCkuY2xlYXJTaWRlYmFyKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBNYWluIFByb2plY3RcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdCgnTXkgUHJvamVjdCcpOyBcbiAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuZGlzcGxheVByb2plY3QocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBQcm9qZWN0IEZvcm1cbiAgICAgICAgaW5pdEFkZFByb2plY3RCdXR0b24oKTtcbiAgICAgICAgaW5pdENsb3NlUHJvamVjdEZvcm1CdXR0b24oKTtcbiAgICAgICAgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24oKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBOb3RlIEZvcm0gXG4gICAgICAgIGluaXRBZGROb3RlQnV0dG9uKCk7XG4gICAgICAgIGluaXRDbG9zZU5vdGVGb3JtQnV0dG9uKCk7XG4gICAgICAgIGluaXRTdWJtaXROb3RlQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJyk7XG4gICAgICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wcm9qZWN0LWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtcHJvamVjdC1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIFByb2plY3RcbiAgICAgICAgICAgIGxldCBmb3JtSW5mbyA9IFV0aWxzLnByb2Nlc3NQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdChmb3JtSW5mbyk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgcHJvamVjdCBcbiAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICBmb3JtSW5mbywgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgc2lkZWJhclxuICAgICAgICAgICAgc2lkZWJhckRpc3BsYXllcigpLmRpc3BsYXlTaWRlYmFyKCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICBVdGlscy5jbGVhclByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZE5vdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtYnRuJyk7XG4gICAgICAgIGFkZE5vdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VOb3RlRm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VOb3RlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1ub3RlLWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlTm90ZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtbm90ZS1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IGFjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudCwgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBub3RlXG4gICAgICAgICAgICBsZXQgZm9ybUluZm8gPSBVdGlscy5wcm9jZXNzTm90ZUZvcm0oKTtcbiAgICAgICAgICAgIGxldCBub3RlID0gbm90ZUNvbnRyb2xsZXIuY3JlYXRlTm90ZShgJHtmb3JtSW5mb1swXX1gLCBcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1sxXX1gLFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzJdfWAsXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bM119YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gQWRkIG5vdGUgdG8gcHJvamVjdCBcbiAgICAgICAgICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlci5hZGROb3RlVG9Qcm9qZWN0KGFjdGl2ZVByb2plY3QsIG5vdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXNwbGF5IFByb2plY3QgXG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwIFxuICAgICAgICAgICAgVXRpbHMuY2xlYXJOb3RlRm9ybSgpO1xuICAgICAgICAgICAgVXRpbHMuY2xvc2VOb3RlRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXRpYWxpemVBcHBcbiAgICB9XG59XG5cblxuLy8gc2lkZWJhckRpc3BsYXllciBkaXNwbGF5cyB0aGUgc2lkZWJhci4gTmVlZHMgYWNjZXNzIHRvIHRoZSBsaXN0IG9mIHByb2plY3QgdGl0bGVzXG5jb25zdCBzaWRlYmFyRGlzcGxheWVyID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY2xlYXJTaWRlYmFyID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcbiAgICAgICAgc2lkZWJhci50ZXh0Q29udGVudCA9ICcnOyBcbiAgICAgICAgcmV0dXJuIHNpZGViYXI7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheVNpZGViYXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaWRlYmFyID0gY2xlYXJTaWRlYmFyKCk7XG4gICAgICAgIGNyZWF0ZVNpZGViYXJEaXNwbGF5KHNpZGViYXIpO1xuICAgICAgICBpbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVTaWRlYmFyRGlzcGxheSA9IChzaWRlYmFyKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzaWRlYmFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBzaWRlYmFyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdwcm9qZWN0LWJ0bicpO1xuICAgICAgICAgICAgc2lkZWJhckJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RDb250cm9sbGVyLnByb2plY3RzW2ldLnRpdGxlO1xuICAgICAgICAgICAgc2lkZWJhci5hcHBlbmQoc2lkZWJhckJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbml0UHJvamVjdEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XG4gICAgICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcHJvamVjdERpc3BsYXllcigpLmRpc3BsYXlQcm9qZWN0KGFjdGl2ZVByb2plY3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5U2lkZWJhcixcbiAgICAgICAgY2xlYXJTaWRlYmFyXG4gICAgfVxufVxuXG4vLyBwcm9qZWN0RGlzcGxheWVyIGhlbHBzIGRpc3BsYXlzIHRoZSBwcm9qZWN0XG5jb25zdCBwcm9qZWN0RGlzcGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBjbGVhclByb2plY3RDb250ZW50KCk7XG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdGl0bGUgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3RUaXRsZURpc3BsYXkocHJvamVjdCkpO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgY29udGVudCBcbiAgICAgICAgY29udGVudC5hcHBlbmQoY3JlYXRlUHJvamVjdERpc3BsYXkocHJvamVjdCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyUHJvamVjdENvbnRlbnQgPSAoKSA9PiB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgY29udGVudCBhcmVhIFxuICAgICAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgXG4gICAgICAgIC8vIENsZWFyIHRoZSBjb250ZW50IGFyZWFcbiAgICAgICAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RUaXRsZURpc3BsYXkgPSAoUHJvamVjdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIHByb2plY3QgdGl0bGUgZGl2IFxuICAgICAgICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IFByb2plY3QudGl0bGU7IFxuXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGl0bGU7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdERpc3BsYXkgPSAoUHJvamVjdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIHByb2plY3QgY29udGVudCBkaXYgXG4gICAgICAgIGxldCBwcm9qZWN0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7IFxuICAgIFxuICAgICAgICAvLyBBcHBlbmQgbm90ZXMgdG8gdGhlIHByb2plY3QgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUHJvamVjdC5ub3RlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub3RlID0gY3JlYXRlTm90ZURpc3BsYXkoUHJvamVjdC5ub3RlQXJyYXlbaV0sIFByb2plY3QpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQuYXBwZW5kQ2hpbGQobm90ZSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHByb2plY3RDb250ZW50O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBjcmVhdGVOb3RlRGlzcGxheSA9IChOb3RlLCBQcm9qZWN0KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vdGUuY2xhc3NMaXN0LmFkZCgnbm90ZScpO1xuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYnV0dG9uXG4gICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdkb25lLWJ0bicpOyBcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ0RvbmUhJzsgXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlci5kZWxldGVOb3RlRnJvbVByb2plY3QoUHJvamVjdCwgTm90ZSk7XG4gICAgICAgICAgICBub3RlLnJlbW92ZSgpO1xuICAgICAgICB9KSBcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IE5vdGUudGl0bGU7XG4gICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLnRpdGxlID0gdGl0bGUudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgZGVzY3JpcHRpb25cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gTm90ZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBkZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGR1ZURhdGVcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWVEYXRlJyk7XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBOb3RlLmR1ZURhdGU7XG4gICAgICAgIGR1ZURhdGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS5kdWVEYXRlID0gZHVlRGF0ZS50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIHByaW9yaXR5IFxuICAgICAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTsgXG4gICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gTm90ZS5wcmlvcml0eTtcbiAgICAgICAgcHJpb3JpdHkuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUucHJpb3JpdHkgPSBwcmlvcml0eS50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzXG4gICAgICAgIG5vdGUuYXBwZW5kKGJ1dHRvbiwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgXG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0XG4gICAgfVxufVxuXG5cblxuY29uc3QgaW5pdE5vdGVCdXR0b25zID0gKG5vdGUpID0+IHtcbiAgICBjb25zdCB0aXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGl0bGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBkdWVEYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kdWVEYXRlJyk7XG4gICAgY29uc3QgcHJpb3JpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmlvcml0eScpO1xuXG4gICAgdGl0bGVzLmZvckVhY2goKHRpdGxlKSA9PiB7XG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU5vdGVJbmZvKHRpdGxlLCB0aXRsZS50ZXh0Q29udGVudCwgbm90ZSk7XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaXB0aW9ucy5mb3JFYWNoKChkZXNjcmlwdGlvbikgPT4ge1xuICAgICAgICBkZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVOb3RlSW5mbyhkZXNjcmlwdGlvbiwgZGVzY3JpcHRpb24udGV4dENvbnRlbnQsIG5vdGUpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkdWVEYXRlcy5mb3JFYWNoKChkdWVEYXRlKSA9PiB7XG4gICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlTm90ZUluZm8oZHVlRGF0ZSwgZHVlRGF0ZS50ZXh0Q29udGVudCwgbm90ZSk7XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIHByaW9yaXRpZXMuZm9yRWFjaCgocHJpb3JpdHkpID0+IHtcbiAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlTm90ZUluZm8ocHJpb3JpdHksIHByaW9yaXR5LnRleHRDb250ZW50LCBub3RlKTtcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLCBcbiAgICBwcm9qZWN0RGlzcGxheWVyLFxuICAgIHNpZGViYXJEaXNwbGF5ZXJcbn1cblxuLyogcHJvamVjdERpc3BsYXllciAoRE9NKVxuLWRpc3BsYXlzIGEgcHJvamVjdCBcbi1yZWxpZXMgb24gbm90ZURpc3BsYXllclxuXG5ub3RlRGlzcGxheWVyIChET00pXG4tZGlzcGxheXMgYSBub3RlIFxuXG5kaXNwbGF5Q29udHJvbGxlciAoRE9NKVxuLWRpc3BsYXlzIHRoZSB0by1kby1saXN0ICAqLyIsIi8vIEluZm9ybWF0aW9uIGhvbGRlcnMgXG4vLyBPYmplY3RzIHRoYXQgaG9sZCBpbmZvcm1hdGlvbiBmb3IgdGhlIHRvLWRvIGxpc3QgXG5cblxuLy8gTm90ZSBmYWN0b3J5IGNyZWF0ZXMgbm90ZXMgXG5jb25zdCBub3RlRmFjdG9yeSA9IChpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjsgXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTsgXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRpdGxlLCBcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGR1ZURhdGUsIFxuICAgICAgICBwcmlvcml0eSxcbiAgICB9XG59XG5cblxuLy8gUHJvamVjdCBmYWN0b3J5IGNyZWF0ZXMgcHJvamVjdHMgXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChpZCwgdGl0bGUsIG5vdGVBcnJheSkgPT4ge1xuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgXG4gICAgLy8gQWRkIGEgbm90ZSB0byBhIHByb2plY3QgXG4gICAgY29uc3QgYWRkTm90ZSA9IChub3RlKSA9PiB7XG4gICAgICAgIG5vdGVBcnJheS5wdXNoKG5vdGUpO1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBhIG5vdGUgZnJvbSBhIHByb2plY3QgXG4gICAgY29uc3QgZGVsZXRlTm90ZSA9IChub3RlKSA9PiB7XG4gICAgICAgIG5vdGVBcnJheS5zcGxpY2Uobm90ZUFycmF5LmluZGV4T2Yobm90ZSksIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgbm90ZUFycmF5LFxuICAgICAgICBnZXRUaXRsZSxcbiAgICAgICAgYWRkTm90ZSwgXG4gICAgICAgIGRlbGV0ZU5vdGVcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBub3RlRmFjdG9yeSxcbiAgICBwcm9qZWN0RmFjdG9yeSxcbn0iLCIvLyBTdHJ1Y3R1cmVyc1xuLy8gT2JqZWN0cyB0aGF0IHJlbGF0ZSB0aGUgbm90ZXMgdG8gdGhlIHByb2plY3RzIFxuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZE5vdGVUb1Byb2plY3QgPSAocHJvamVjdCwgbm90ZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmFkZE5vdGUobm90ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZU5vdGVGcm9tUHJvamVjdCA9IChwcm9qZWN0LCBub3RlKSA9PiB7XG4gICAgICAgIHByb2plY3QuZGVsZXRlTm90ZShub3RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGROb3RlVG9Qcm9qZWN0LFxuICAgICAgICBkZWxldGVOb3RlRnJvbVByb2plY3RcbiAgICB9XG59O1xuXG5leHBvcnQge1xuICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlcixcbn1cbiIsImNvbnN0IG1ha2VFZGl0YWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG59XG5cbmNvbnN0IG1ha2VVbmVkaXRhYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ2ZhbHNlJyk7XG59XG5cbmNvbnN0IG9wZW5Ob3RlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1ub3RlLWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBjbG9zZU5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IG9wZW5Qcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBjbG9zZVByb2plY3RGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IHByb2Nlc3NOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLnZhbHVlO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZURhdGVcIikudmFsdWU7XG4gICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcblxuICAgIHJldHVybiBbdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eV07XG59XG5cbmNvbnN0IHByb2Nlc3NQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS10aXRsZVwiKS52YWx1ZTtcbiAgICByZXR1cm4gdGl0bGU7XG59XG5cbmNvbnN0IGNsZWFyTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJyk7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlRGF0ZScpO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpO1xuXG4gICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICBkZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xuICAgIGR1ZURhdGUudmFsdWUgPSAnJztcbiAgICBwcmlvcml0eS52YWx1ZSA9ICcnO1xufVxuXG5jb25zdCBjbGVhclByb2plY3RGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWZvcm0tdGl0bGUnKTtcblxuICAgIHRpdGxlLnZhbHVlID0gJyc7XG59XG5cbmNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSAocHJvamVjdE5hbWUsIHByb2plY3RBcnJheSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChTdHJpbmcocHJvamVjdE5hbWUpID09PSBTdHJpbmcocHJvamVjdEFycmF5W2ldLnRpdGxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RBcnJheVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQge1xuICAgIG1ha2VFZGl0YWJsZSxcbiAgICBtYWtlVW5lZGl0YWJsZSxcbiAgICBvcGVuTm90ZUZvcm0sXG4gICAgY2xvc2VOb3RlRm9ybSxcbiAgICBvcGVuUHJvamVjdEZvcm0sXG4gICAgY2xvc2VQcm9qZWN0Rm9ybSxcbiAgICBwcm9jZXNzTm90ZUZvcm0sXG4gICAgY2xlYXJOb3RlRm9ybSxcbiAgICBwcm9jZXNzUHJvamVjdEZvcm0sXG4gICAgY2xlYXJQcm9qZWN0Rm9ybSwgXG4gICAgZ2V0QWN0aXZlUHJvamVjdFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgSW5mb0hvbGRlcnMgZnJvbSAnLi9pbmZvLWhvbGRlcnMuanMnO1xuaW1wb3J0ICogYXMgQ29udHJvbGxlcnMgZnJvbSAnLi9jb250cm9sbGVycy5qcyc7XG5pbXBvcnQgKiBhcyBTdHJ1Y3R1cmVycyBmcm9tICcuL3N0cnVjdHVyZXJzLmpzJztcbmltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5cbi8vIEluaXRpYWxpemUgdGhlIGFwcGxpY2F0aW9uXG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IERpc3BsYXllcnMuZGlzcGxheUNvbnRyb2xsZXIoKTtcbmRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpemVBcHAoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=