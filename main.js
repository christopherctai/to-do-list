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
    const initButtons = () => {
        // Initialize the Project Form
        initAddProjectButton();
        initCloseProjectFormButton();
        initSubmitProjectButton();

        // Initialize the Note Form 
        initAddNoteButton();
        initCloseNoteFormButton();
        initSubmitNoteButton();

        // do stuff for checking 
        sidebarDisplayer().clearSidebar(); 
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
        title.addEventListener('blur', () => {
            updateNoteInfo(title, title.textContent, Note);
            console.log(Note.title);
        })
        
        // Create description
        let description = document.createElement('div');
        description.classList.add('description');
        description.textContent = Note.description;
        description.setAttribute('contenteditable', 'true');
        description.addEventListener('blur', () => {
            updateNoteInfo(description, description.textContent, Note);
        })
    
        // Create dueDate
        let dueDate = document.createElement('div');
        dueDate.classList.add('dueDate');
        dueDate.textContent = Note.dueDate;
        dueDate.setAttribute('contenteditable', 'true');
        dueDate.addEventListener('blur', () => {
            updateNoteInfo(dueDate, dueDate.textContent, Note);
        })
    
        // Create priority 
        let priority = document.createElement('div');
        priority.classList.add('priority'); 
        priority.textContent = Note.priority;
        priority.setAttribute('contenteditable', 'true');
        priority.addEventListener('blur', () => {
            updateNoteInfo(priority, priority.textContent, Note);
            console.log(Note.priority);
        })
    
        // Append elements
        note.append(button, title, description, dueDate, priority);
    
        return note;
    }

    const updateNoteInfo = (typeOfInfo, contentOfInfo, note) => {
        note.typeOfInfo = contentOfInfo; 
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








// Initialize the page 
const displayController = _displayers_js__WEBPACK_IMPORTED_MODULE_3__.displayController();
displayController.initButtons();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBTUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOVRBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNuRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUQ7QUFDRDtBQUNBO0FBQ0Y7QUFDVjs7QUFFRjs7QUFFbEM7QUFDQSwwQkFBMEIsNkRBQTRCO0FBQ3REIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9jb250cm9sbGVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2Rpc3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmZvLWhvbGRlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHJ1Y3R1cmVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvbnRyb2xsZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGNhbiBtYW5pcHVsYXRlIHRoZSBub3RlcyBvciBwcm9qZWN0cyB0aGVtc2VsdmVzIFxuXG5pbXBvcnQgeyBub3RlRmFjdG9yeSwgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL2luZm8taG9sZGVycyc7XG5cbmNvbnN0IG5vdGVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGxldCBub3RlSUQgPSAwO1xuICAgIGNvbnN0IGNyZWF0ZU5vdGUgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgICAgICBsZXQgbm90ZSA9IG5vdGVGYWN0b3J5KG5vdGVJRCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgICAgIG5vdGVJRCsrO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIHRpdGxlIFxuICAgIGNvbnN0IGNoYW5nZVRpdGxlID0gKCkgPT4ge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBub3RlIFxuICAgIGNvbnN0IGNoYW5nZURlc2NyaXB0aW9uID0gKCkgPT4ge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIG5vdGUncyBwcmlvcml0eSBcbiAgICBjb25zdCBjaGFuZ2VQcmlvcml0eSA9ICgpID0+IHtcblxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5vdGUsXG4gICAgICAgIGNoYW5nZVRpdGxlLFxuICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbixcbiAgICAgICAgY2hhbmdlUHJpb3JpdHlcbiAgICB9XG59XG5cbmNvbnN0IHByb2plY3RDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0SUQgPSAwO1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGVtcHR5IHByb2plY3QgXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHByb2plY3RJRCwgdGl0bGUsIFtdKTtcbiAgICAgICAgcHJvamVjdElEKys7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBhIHByb2plY3QgXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpLCAxKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvamVjdHMsXG4gICAgICAgIGNyZWF0ZVByb2plY3QsXG4gICAgICAgIGRlbGV0ZVByb2plY3QsXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHByb2plY3RDb250cm9sbGVyLFxuICAgIG5vdGVDb250cm9sbGVyXG59IiwiLy8gRGlzcGxheWVycyBcbi8vIE9iamVjdHMgdGhhdCB3aWxsIGRpc3BsYXkgdGhlIGdpdmVuIGluZm9ybWF0aW9uIFxuXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIENvbnRyb2xsZXJzIGZyb20gJy4vY29udHJvbGxlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcnMgZnJvbSAnLi9zdHJ1Y3R1cmVycy5qcyc7XG5cblxuLy8gQ3JlYXRlIGNvbnRyb2xsZXJzXG5jb25zdCBub3RlQ29udHJvbGxlciA9IENvbnRyb2xsZXJzLm5vdGVDb250cm9sbGVyKCk7XG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9IENvbnRyb2xsZXJzLnByb2plY3RDb250cm9sbGVyKCk7XG5jb25zdCBub3RlUHJvamVjdFN0cnVjdHVyZXIgPSBTdHJ1Y3R1cmVycy5ub3RlUHJvamVjdFN0cnVjdHVyZXIoKTtcblxuLy8gZGlzcGxheUNvbnRyb2xsZXIgY29udHJvbHMgdGhlIGRpc3BsYXkgb2YgdGhlIHRvLWRvIGxpc3QgXG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9ICgpID0+IHsgXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFByb2plY3QgRm9ybVxuICAgICAgICBpbml0QWRkUHJvamVjdEJ1dHRvbigpO1xuICAgICAgICBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbigpO1xuICAgICAgICBpbml0U3VibWl0UHJvamVjdEJ1dHRvbigpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIE5vdGUgRm9ybSBcbiAgICAgICAgaW5pdEFkZE5vdGVCdXR0b24oKTtcbiAgICAgICAgaW5pdENsb3NlTm90ZUZvcm1CdXR0b24oKTtcbiAgICAgICAgaW5pdFN1Ym1pdE5vdGVCdXR0b24oKTtcblxuICAgICAgICAvLyBkbyBzdHVmZiBmb3IgY2hlY2tpbmcgXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5jbGVhclNpZGViYXIoKTsgXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJyk7XG4gICAgICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wcm9qZWN0LWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtcHJvamVjdC1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIFByb2plY3RcbiAgICAgICAgICAgIGxldCBmb3JtSW5mbyA9IFV0aWxzLnByb2Nlc3NQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdChmb3JtSW5mbyk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgcHJvamVjdCBcbiAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICBmb3JtSW5mbywgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgc2lkZWJhclxuICAgICAgICAgICAgc2lkZWJhckRpc3BsYXllcigpLmRpc3BsYXlTaWRlYmFyKCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICBVdGlscy5jbGVhclByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZE5vdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtYnRuJyk7XG4gICAgICAgIGFkZE5vdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VOb3RlRm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VOb3RlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1ub3RlLWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlTm90ZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtbm90ZS1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IGFjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudCwgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBub3RlXG4gICAgICAgICAgICBsZXQgZm9ybUluZm8gPSBVdGlscy5wcm9jZXNzTm90ZUZvcm0oKTtcbiAgICAgICAgICAgIGxldCBub3RlID0gbm90ZUNvbnRyb2xsZXIuY3JlYXRlTm90ZShgJHtmb3JtSW5mb1swXX1gLCBcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1sxXX1gLFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzJdfWAsXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bM119YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gQWRkIG5vdGUgdG8gcHJvamVjdCBcbiAgICAgICAgICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlci5hZGROb3RlVG9Qcm9qZWN0KGFjdGl2ZVByb2plY3QsIG5vdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXNwbGF5IFByb2plY3QgXG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwIFxuICAgICAgICAgICAgVXRpbHMuY2xlYXJOb3RlRm9ybSgpO1xuICAgICAgICAgICAgVXRpbHMuY2xvc2VOb3RlRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXRCdXR0b25zXG4gICAgfVxufVxuXG5cbi8vIHNpZGViYXJEaXNwbGF5ZXIgZGlzcGxheXMgdGhlIHNpZGViYXIuIE5lZWRzIGFjY2VzcyB0byB0aGUgbGlzdCBvZiBwcm9qZWN0IHRpdGxlc1xuY29uc3Qgc2lkZWJhckRpc3BsYXllciA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNsZWFyU2lkZWJhciA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHNpZGViYXIudGV4dENvbnRlbnQgPSAnJzsgXG4gICAgICAgIHJldHVybiBzaWRlYmFyO1xuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlTaWRlYmFyID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2lkZWJhciA9IGNsZWFyU2lkZWJhcigpO1xuICAgICAgICBjcmVhdGVTaWRlYmFyRGlzcGxheShzaWRlYmFyKTtcbiAgICAgICAgaW5pdFByb2plY3RCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlU2lkZWJhckRpc3BsYXkgPSAoc2lkZWJhcikgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RDb250cm9sbGVyLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2lkZWJhckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgc2lkZWJhckJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAncHJvamVjdC1idG4nKTtcbiAgICAgICAgICAgIHNpZGViYXJCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1tpXS50aXRsZTtcbiAgICAgICAgICAgIHNpZGViYXIuYXBwZW5kKHNpZGViYXJCdXR0b24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFByb2plY3RCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWJ0bicpO1xuICAgICAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlzcGxheVNpZGViYXIsXG4gICAgICAgIGNsZWFyU2lkZWJhclxuICAgIH1cbn1cblxuLy8gcHJvamVjdERpc3BsYXllciBoZWxwcyBkaXNwbGF5cyB0aGUgcHJvamVjdFxuY29uc3QgcHJvamVjdERpc3BsYXllciA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5UHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGxldCBjb250ZW50ID0gY2xlYXJQcm9qZWN0Q29udGVudCgpO1xuICAgIFxuICAgICAgICAvLyBBcHBlbmQgdGhlIHRpdGxlIFxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0VGl0bGVEaXNwbGF5KHByb2plY3QpKTtcblxuICAgICAgICAvLyBBcHBlbmQgdGhlIGNvbnRlbnQgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3REaXNwbGF5KHByb2plY3QpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclByb2plY3RDb250ZW50ID0gKCkgPT4ge1xuICAgICAgICAvLyBTZWxlY3QgdGhlIGNvbnRlbnQgYXJlYSBcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICAgIFxuICAgICAgICAvLyBDbGVhciB0aGUgY29udGVudCBhcmVhXG4gICAgICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSAnJztcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0VGl0bGVEaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwcm9qZWN0IHRpdGxlIGRpdiBcbiAgICAgICAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10aXRsZScpO1xuICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBQcm9qZWN0LnRpdGxlOyBcblxuICAgICAgICByZXR1cm4gcHJvamVjdFRpdGxlO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3REaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwcm9qZWN0IGNvbnRlbnQgZGl2IFxuICAgICAgICBsZXQgcHJvamVjdENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdENvbnRlbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpOyBcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIG5vdGVzIHRvIHRoZSBwcm9qZWN0IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFByb2plY3Qubm90ZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm90ZSA9IGNyZWF0ZU5vdGVEaXNwbGF5KFByb2plY3Qubm90ZUFycmF5W2ldLCBQcm9qZWN0KTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50LmFwcGVuZENoaWxkKG5vdGUpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0Q29udGVudDtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY3JlYXRlTm90ZURpc3BsYXkgPSAoTm90ZSwgUHJvamVjdCkgPT4ge1xuICAgICAgICBsZXQgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub3RlLmNsYXNzTGlzdC5hZGQoJ25vdGUnKTtcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGJ1dHRvblxuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnZG9uZS1idG4nKTsgXG4gICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdEb25lISc7IFxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIuZGVsZXRlTm90ZUZyb21Qcm9qZWN0KFByb2plY3QsIE5vdGUpO1xuICAgICAgICAgICAgbm90ZS5yZW1vdmUoKTtcbiAgICAgICAgfSkgXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSB0aXRsZVxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBOb3RlLnRpdGxlO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVOb3RlSW5mbyh0aXRsZSwgdGl0bGUudGV4dENvbnRlbnQsIE5vdGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coTm90ZS50aXRsZSk7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgZGVzY3JpcHRpb25cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gTm90ZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBkZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlTm90ZUluZm8oZGVzY3JpcHRpb24sIGRlc2NyaXB0aW9uLnRleHRDb250ZW50LCBOb3RlKTtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGR1ZURhdGVcbiAgICAgICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWVEYXRlJyk7XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBOb3RlLmR1ZURhdGU7XG4gICAgICAgIGR1ZURhdGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVOb3RlSW5mbyhkdWVEYXRlLCBkdWVEYXRlLnRleHRDb250ZW50LCBOb3RlKTtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIHByaW9yaXR5IFxuICAgICAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTsgXG4gICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gTm90ZS5wcmlvcml0eTtcbiAgICAgICAgcHJpb3JpdHkuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlTm90ZUluZm8ocHJpb3JpdHksIHByaW9yaXR5LnRleHRDb250ZW50LCBOb3RlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE5vdGUucHJpb3JpdHkpO1xuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHNcbiAgICAgICAgbm90ZS5hcHBlbmQoYnV0dG9uLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlTm90ZUluZm8gPSAodHlwZU9mSW5mbywgY29udGVudE9mSW5mbywgbm90ZSkgPT4ge1xuICAgICAgICBub3RlLnR5cGVPZkluZm8gPSBjb250ZW50T2ZJbmZvOyBcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5UHJvamVjdFxuICAgIH1cbn1cblxuXG5cbmNvbnN0IGluaXROb3RlQnV0dG9ucyA9IChub3RlKSA9PiB7XG4gICAgY29uc3QgdGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRpdGxlJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZHVlRGF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHVlRGF0ZScpO1xuICAgIGNvbnN0IHByaW9yaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJpb3JpdHknKTtcblxuICAgIHRpdGxlcy5mb3JFYWNoKCh0aXRsZSkgPT4ge1xuICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVOb3RlSW5mbyh0aXRsZSwgdGl0bGUudGV4dENvbnRlbnQsIG5vdGUpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmlwdGlvbnMuZm9yRWFjaCgoZGVzY3JpcHRpb24pID0+IHtcbiAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlTm90ZUluZm8oZGVzY3JpcHRpb24sIGRlc2NyaXB0aW9uLnRleHRDb250ZW50LCBub3RlKTtcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZHVlRGF0ZXMuZm9yRWFjaCgoZHVlRGF0ZSkgPT4ge1xuICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU5vdGVJbmZvKGR1ZURhdGUsIGR1ZURhdGUudGV4dENvbnRlbnQsIG5vdGUpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBwcmlvcml0aWVzLmZvckVhY2goKHByaW9yaXR5KSA9PiB7XG4gICAgICAgIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZU5vdGVJbmZvKHByaW9yaXR5LCBwcmlvcml0eS50ZXh0Q29udGVudCwgbm90ZSk7XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZXhwb3J0IHtcbiAgICBkaXNwbGF5Q29udHJvbGxlciwgXG4gICAgcHJvamVjdERpc3BsYXllcixcbiAgICBzaWRlYmFyRGlzcGxheWVyXG59XG5cbi8qIHByb2plY3REaXNwbGF5ZXIgKERPTSlcbi1kaXNwbGF5cyBhIHByb2plY3QgXG4tcmVsaWVzIG9uIG5vdGVEaXNwbGF5ZXJcblxubm90ZURpc3BsYXllciAoRE9NKVxuLWRpc3BsYXlzIGEgbm90ZSBcblxuZGlzcGxheUNvbnRyb2xsZXIgKERPTSlcbi1kaXNwbGF5cyB0aGUgdG8tZG8tbGlzdCAgKi8iLCIvLyBJbmZvcm1hdGlvbiBob2xkZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGhvbGQgaW5mb3JtYXRpb24gZm9yIHRoZSB0by1kbyBsaXN0IFxuXG5cbi8vIE5vdGUgZmFjdG9yeSBjcmVhdGVzIG5vdGVzIFxuY29uc3Qgbm90ZUZhY3RvcnkgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247IFxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7IFxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgcHJpb3JpdHksXG4gICAgfVxufVxuXG5cbi8vIFByb2plY3QgZmFjdG9yeSBjcmVhdGVzIHByb2plY3RzIFxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoaWQsIHRpdGxlLCBub3RlQXJyYXkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIFxuICAgIC8vIEFkZCBhIG5vdGUgdG8gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGFkZE5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBub3RlIGZyb20gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZU5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkuc3BsaWNlKG5vdGVBcnJheS5pbmRleE9mKG5vdGUpLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIG5vdGVBcnJheSxcbiAgICAgICAgZ2V0VGl0bGUsXG4gICAgICAgIGFkZE5vdGUsIFxuICAgICAgICBkZWxldGVOb3RlXG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgbm90ZUZhY3RvcnksXG4gICAgcHJvamVjdEZhY3RvcnksXG59IiwiLy8gU3RydWN0dXJlcnNcbi8vIE9iamVjdHMgdGhhdCByZWxhdGUgdGhlIG5vdGVzIHRvIHRoZSBwcm9qZWN0cyBcbmNvbnN0IG5vdGVQcm9qZWN0U3RydWN0dXJlciA9ICgpID0+IHtcbiAgICBjb25zdCBhZGROb3RlVG9Qcm9qZWN0ID0gKHByb2plY3QsIG5vdGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5hZGROb3RlKG5vdGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVOb3RlRnJvbVByb2plY3QgPSAocHJvamVjdCwgbm90ZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZU5vdGUobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkTm90ZVRvUHJvamVjdCxcbiAgICAgICAgZGVsZXRlTm90ZUZyb21Qcm9qZWN0XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIsXG59XG4iLCJjb25zdCBtYWtlRWRpdGFibGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xufVxuXG5jb25zdCBtYWtlVW5lZGl0YWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScpO1xufVxuXG5jb25zdCBvcGVuTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1ub3RlLWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBvcGVuUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBwcm9jZXNzTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG5cbiAgICByZXR1cm4gW3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHldO1xufVxuXG5jb25zdCBwcm9jZXNzUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tdGl0bGVcIikudmFsdWU7XG4gICAgcmV0dXJuIHRpdGxlO1xufVxuXG5jb25zdCBjbGVhck5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKTtcblxuICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICBkdWVEYXRlLnZhbHVlID0gJyc7XG4gICAgcHJpb3JpdHkudmFsdWUgPSAnJztcbn1cblxuY29uc3QgY2xlYXJQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLXRpdGxlJyk7XG5cbiAgICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuXG5jb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0QXJyYXkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoU3RyaW5nKHByb2plY3ROYW1lKSA9PT0gU3RyaW5nKHByb2plY3RBcnJheVtpXS50aXRsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0QXJyYXlbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBtYWtlRWRpdGFibGUsXG4gICAgbWFrZVVuZWRpdGFibGUsXG4gICAgb3Blbk5vdGVGb3JtLFxuICAgIGNsb3NlTm90ZUZvcm0sXG4gICAgb3BlblByb2plY3RGb3JtLFxuICAgIGNsb3NlUHJvamVjdEZvcm0sXG4gICAgcHJvY2Vzc05vdGVGb3JtLFxuICAgIGNsZWFyTm90ZUZvcm0sXG4gICAgcHJvY2Vzc1Byb2plY3RGb3JtLFxuICAgIGNsZWFyUHJvamVjdEZvcm0sIFxuICAgIGdldEFjdGl2ZVByb2plY3Rcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIEluZm9Ib2xkZXJzIGZyb20gJy4vaW5mby1ob2xkZXJzLmpzJztcbmltcG9ydCAqIGFzIENvbnRyb2xsZXJzIGZyb20gJy4vY29udHJvbGxlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcnMgZnJvbSAnLi9zdHJ1Y3R1cmVycy5qcyc7XG5pbXBvcnQgKiBhcyBEaXNwbGF5ZXJzIGZyb20gJy4vZGlzcGxheWVycy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcblxuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG4vLyBJbml0aWFsaXplIHRoZSBwYWdlIFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSBEaXNwbGF5ZXJzLmRpc3BsYXlDb250cm9sbGVyKCk7XG5kaXNwbGF5Q29udHJvbGxlci5pbml0QnV0dG9ucygpO1xuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==