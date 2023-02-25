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
        projectDisplayer().displayProject(projectController.projects[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsUkE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztVQ25FQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05pRDtBQUNEO0FBQ0E7QUFDRjtBQUNWOztBQUVGOztBQUVsQztBQUNBLDBCQUEwQiw2REFBNEI7QUFDdEQsa0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NvbnRyb2xsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZGlzcGxheWVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZm8taG9sZGVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29udHJvbGxlcnMgXG4vLyBPYmplY3RzIHRoYXQgY2FuIG1hbmlwdWxhdGUgdGhlIG5vdGVzIG9yIHByb2plY3RzIHRoZW1zZWx2ZXMgXG5cbmltcG9ydCB7IG5vdGVGYWN0b3J5LCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vaW5mby1ob2xkZXJzJztcblxuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgbGV0IG5vdGVJRCA9IDA7XG4gICAgY29uc3QgY3JlYXRlTm90ZSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgICAgIGxldCBub3RlID0gbm90ZUZhY3Rvcnkobm90ZUlELCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgbm90ZUlEKys7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5vdGUsXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdElEID0gMDtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwcm9qZWN0IFxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQsIHRpdGxlLCBbXSk7XG4gICAgICAgIHByb2plY3RJRCsrO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBub3RlQ29udHJvbGxlclxufSIsIi8vIERpc3BsYXllcnMgXG4vLyBPYmplY3RzIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBnaXZlbiBpbmZvcm1hdGlvbiBcblxuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBDb250cm9sbGVycyBmcm9tICcuL2NvbnRyb2xsZXJzLmpzJztcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXJzIGZyb20gJy4vc3RydWN0dXJlcnMuanMnO1xuXG5cbi8vIENyZWF0ZSBjb250cm9sbGVyc1xuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSBDb250cm9sbGVycy5ub3RlQ29udHJvbGxlcigpO1xuY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSBDb250cm9sbGVycy5wcm9qZWN0Q29udHJvbGxlcigpO1xuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gU3RydWN0dXJlcnMubm90ZVByb2plY3RTdHJ1Y3R1cmVyKCk7XG5cbi8vIGRpc3BsYXlDb250cm9sbGVyIGNvbnRyb2xzIHRoZSBkaXNwbGF5IG9mIHRoZSB0by1kbyBsaXN0IFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKSA9PiB7IFxuICAgIGNvbnN0IGluaXRpYWxpemVBcHAgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHByb2plY3QgYW5kIG5vdGUgZm9ybSBcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBzaWRlYmFyXG4gICAgICAgIHNpZGViYXJEaXNwbGF5ZXIoKS5jbGVhclNpZGViYXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIE1haW4gUHJvamVjdFxuICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KCdNeSBQcm9qZWN0Jyk7IFxuICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBQcm9qZWN0IEZvcm1cbiAgICAgICAgaW5pdEFkZFByb2plY3RCdXR0b24oKTtcbiAgICAgICAgaW5pdENsb3NlUHJvamVjdEZvcm1CdXR0b24oKTtcbiAgICAgICAgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24oKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBOb3RlIEZvcm0gXG4gICAgICAgIGluaXRBZGROb3RlQnV0dG9uKCk7XG4gICAgICAgIGluaXRDbG9zZU5vdGVGb3JtQnV0dG9uKCk7XG4gICAgICAgIGluaXRTdWJtaXROb3RlQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnRuJyk7XG4gICAgICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1wcm9qZWN0LWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlUHJvamVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdFByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtcHJvamVjdC1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIFByb2plY3RcbiAgICAgICAgICAgIGxldCBmb3JtSW5mbyA9IFV0aWxzLnByb2Nlc3NQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdChmb3JtSW5mbyk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgcHJvamVjdCBcbiAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICBmb3JtSW5mbywgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIERpc3BsYXkgc2lkZWJhclxuICAgICAgICAgICAgc2lkZWJhckRpc3BsYXllcigpLmRpc3BsYXlTaWRlYmFyKCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICBVdGlscy5jbGVhclByb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZVByb2plY3RGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEFkZE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZE5vdGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtYnRuJyk7XG4gICAgICAgIGFkZE5vdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5vcGVuTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0Q2xvc2VOb3RlRm9ybUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VOb3RlRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1ub3RlLWZvcm0tYnRuJyk7XG4gICAgICAgIGNsb3NlTm90ZUZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFN1Ym1pdE5vdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtbm90ZS1idG4nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gR2V0IGFjdGl2ZSBwcm9qZWN0XG4gICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudCwgXG4gICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBub3RlXG4gICAgICAgICAgICBsZXQgZm9ybUluZm8gPSBVdGlscy5wcm9jZXNzTm90ZUZvcm0oKTtcbiAgICAgICAgICAgIGxldCBub3RlID0gbm90ZUNvbnRyb2xsZXIuY3JlYXRlTm90ZShgJHtmb3JtSW5mb1swXX1gLCBcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1sxXX1gLFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzJdfWAsXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bM119YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gQWRkIG5vdGUgdG8gcHJvamVjdCBcbiAgICAgICAgICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlci5hZGROb3RlVG9Qcm9qZWN0KGFjdGl2ZVByb2plY3QsIG5vdGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXNwbGF5IFByb2plY3QgXG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG5cbiAgICAgICAgICAgIC8vIENsZWFuIHVwIFxuICAgICAgICAgICAgVXRpbHMuY2xlYXJOb3RlRm9ybSgpO1xuICAgICAgICAgICAgVXRpbHMuY2xvc2VOb3RlRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXRpYWxpemVBcHBcbiAgICB9XG59XG5cblxuLy8gc2lkZWJhckRpc3BsYXllciBkaXNwbGF5cyB0aGUgc2lkZWJhci4gTmVlZHMgYWNjZXNzIHRvIHRoZSBsaXN0IG9mIHByb2plY3QgdGl0bGVzXG5jb25zdCBzaWRlYmFyRGlzcGxheWVyID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY2xlYXJTaWRlYmFyID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcbiAgICAgICAgc2lkZWJhci50ZXh0Q29udGVudCA9ICcnOyBcbiAgICAgICAgcmV0dXJuIHNpZGViYXI7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheVNpZGViYXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaWRlYmFyID0gY2xlYXJTaWRlYmFyKCk7XG4gICAgICAgIGNyZWF0ZVNpZGViYXJEaXNwbGF5KHNpZGViYXIpO1xuICAgICAgICBpbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVTaWRlYmFyRGlzcGxheSA9IChzaWRlYmFyKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1tpXS50aXRsZSAhPT0gJ015IFByb2plY3QnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpZGViYXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdwcm9qZWN0LWJ0bicpO1xuICAgICAgICAgICAgICAgIHNpZGViYXJCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1tpXS50aXRsZTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFwcGVuZChzaWRlYmFyQnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRQcm9qZWN0QnV0dG9ucyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcbiAgICAgICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVByb2plY3QgPSBVdGlscy5nZXRBY3RpdmVQcm9qZWN0KFxuICAgICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLnByb2plY3RzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QoYWN0aXZlUHJvamVjdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXlTaWRlYmFyLFxuICAgICAgICBjbGVhclNpZGViYXJcbiAgICB9XG59XG5cbi8vIHByb2plY3REaXNwbGF5ZXIgaGVscHMgZGlzcGxheXMgdGhlIHByb2plY3RcbmNvbnN0IHByb2plY3REaXNwbGF5ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBsZXQgY29udGVudCA9IGNsZWFyUHJvamVjdENvbnRlbnQoKTtcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIHRoZSB0aXRsZSBcbiAgICAgICAgY29udGVudC5hcHBlbmQoY3JlYXRlUHJvamVjdFRpdGxlRGlzcGxheShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBjb250ZW50IFxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0RGlzcGxheShwcm9qZWN0KSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJQcm9qZWN0Q29udGVudCA9ICgpID0+IHtcbiAgICAgICAgLy8gU2VsZWN0IHRoZSBjb250ZW50IGFyZWEgXG4gICAgICAgIGxldCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICBcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnRlbnQgYXJlYVxuICAgICAgICBjb250ZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdFRpdGxlRGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgcHJvamVjdCB0aXRsZSBkaXYgXG4gICAgICAgIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gUHJvamVjdC50aXRsZTsgXG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RUaXRsZTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0RGlzcGxheSA9IChQcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgcHJvamVjdCBjb250ZW50IGRpdiBcbiAgICAgICAgbGV0IHByb2plY3RDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTsgXG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCBub3RlcyB0byB0aGUgcHJvamVjdCBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBQcm9qZWN0Lm5vdGVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vdGUgPSBjcmVhdGVOb3RlRGlzcGxheShQcm9qZWN0Lm5vdGVBcnJheVtpXSwgUHJvamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudC5hcHBlbmRDaGlsZChub3RlKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gcHJvamVjdENvbnRlbnQ7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNyZWF0ZU5vdGVEaXNwbGF5ID0gKE5vdGUsIFByb2plY3QpID0+IHtcbiAgICAgICAgbGV0IG5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm90ZS5jbGFzc0xpc3QuYWRkKCdub3RlJyk7XG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBidXR0b25cbiAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2RvbmUtYnRuJyk7IFxuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnRG9uZSEnOyBcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbm90ZVByb2plY3RTdHJ1Y3R1cmVyLmRlbGV0ZU5vdGVGcm9tUHJvamVjdChQcm9qZWN0LCBOb3RlKTtcbiAgICAgICAgICAgIG5vdGUucmVtb3ZlKCk7XG4gICAgICAgIH0pIFxuICAgIFxuICAgICAgICAvLyBDcmVhdGUgdGl0bGVcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gTm90ZS50aXRsZTtcbiAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUudGl0bGUgPSB0aXRsZS50ZXh0Q29udGVudDtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZSBkZXNjcmlwdGlvblxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBOb3RlLmRlc2NyaXB0aW9uO1xuICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLnRleHRDb250ZW50O1xuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvLyBDcmVhdGUgZHVlRGF0ZVxuICAgICAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZURhdGUnKTtcbiAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IE5vdGUuZHVlRGF0ZTtcbiAgICAgICAgZHVlRGF0ZS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLmR1ZURhdGUgPSBkdWVEYXRlLnRleHRDb250ZW50O1xuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvLyBDcmVhdGUgcHJpb3JpdHkgXG4gICAgICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpOyBcbiAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBOb3RlLnByaW9yaXR5O1xuICAgICAgICBwcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS5wcmlvcml0eSA9IHByaW9yaXR5LnRleHRDb250ZW50O1xuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHNcbiAgICAgICAgbm90ZS5hcHBlbmQoYnV0dG9uLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlzcGxheVByb2plY3RcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBkaXNwbGF5Q29udHJvbGxlciwgXG4gICAgcHJvamVjdERpc3BsYXllcixcbiAgICBzaWRlYmFyRGlzcGxheWVyXG59IiwiLy8gSW5mb3JtYXRpb24gaG9sZGVycyBcbi8vIE9iamVjdHMgdGhhdCBob2xkIGluZm9ybWF0aW9uIGZvciB0aGUgdG8tZG8gbGlzdCBcblxuXG4vLyBOb3RlIGZhY3RvcnkgY3JlYXRlcyBub3RlcyBcbmNvbnN0IG5vdGVGYWN0b3J5ID0gKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcbiAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IGRlc2NyaXB0aW9uOyBcbiAgICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHByaW9yaXR5OyBcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGl0bGUsIFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZHVlRGF0ZSwgXG4gICAgICAgIHByaW9yaXR5LFxuICAgIH1cbn1cblxuXG4vLyBQcm9qZWN0IGZhY3RvcnkgY3JlYXRlcyBwcm9qZWN0cyBcbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKGlkLCB0aXRsZSwgbm90ZUFycmF5KSA9PiB7XG4gICAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcbiAgICBcbiAgICAvLyBBZGQgYSBub3RlIHRvIGEgcHJvamVjdCBcbiAgICBjb25zdCBhZGROb3RlID0gKG5vdGUpID0+IHtcbiAgICAgICAgbm90ZUFycmF5LnB1c2gobm90ZSk7XG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIGEgbm90ZSBmcm9tIGEgcHJvamVjdCBcbiAgICBjb25zdCBkZWxldGVOb3RlID0gKG5vdGUpID0+IHtcbiAgICAgICAgbm90ZUFycmF5LnNwbGljZShub3RlQXJyYXkuaW5kZXhPZihub3RlKSwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBub3RlQXJyYXksXG4gICAgICAgIGdldFRpdGxlLFxuICAgICAgICBhZGROb3RlLCBcbiAgICAgICAgZGVsZXRlTm90ZVxuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIG5vdGVGYWN0b3J5LFxuICAgIHByb2plY3RGYWN0b3J5LFxufSIsIi8vIFN0cnVjdHVyZXJzXG4vLyBPYmplY3RzIHRoYXQgcmVsYXRlIHRoZSBub3RlcyB0byB0aGUgcHJvamVjdHMgXG5jb25zdCBub3RlUHJvamVjdFN0cnVjdHVyZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTm90ZVRvUHJvamVjdCA9IChwcm9qZWN0LCBub3RlKSA9PiB7XG4gICAgICAgIHByb2plY3QuYWRkTm90ZShub3RlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlTm90ZUZyb21Qcm9qZWN0ID0gKHByb2plY3QsIG5vdGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5kZWxldGVOb3RlKG5vdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZE5vdGVUb1Byb2plY3QsXG4gICAgICAgIGRlbGV0ZU5vdGVGcm9tUHJvamVjdFxuICAgIH1cbn07XG5cbmV4cG9ydCB7XG4gICAgbm90ZVByb2plY3RTdHJ1Y3R1cmVyLFxufVxuIiwiY29uc3QgbWFrZUVkaXRhYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbn1cblxuY29uc3QgbWFrZVVuZWRpdGFibGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAnZmFsc2UnKTtcbn1cblxuY29uc3Qgb3Blbk5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5vdGUtZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IGNsb3NlTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuY29uc3Qgb3BlblByb2plY3RGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IGNsb3NlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgcHJvY2Vzc05vdGVGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlRGF0ZVwiKS52YWx1ZTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuXG4gICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5XTtcbn1cblxuY29uc3QgcHJvY2Vzc1Byb2plY3RGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLXRpdGxlXCIpLnZhbHVlO1xuICAgIHJldHVybiB0aXRsZTtcbn1cblxuY29uc3QgY2xlYXJOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWVEYXRlJyk7XG4gICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5Jyk7XG5cbiAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgZHVlRGF0ZS52YWx1ZSA9ICcnO1xuICAgIHByaW9yaXR5LnZhbHVlID0gJyc7XG59XG5cbmNvbnN0IGNsZWFyUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybS10aXRsZScpO1xuXG4gICAgdGl0bGUudmFsdWUgPSAnJztcbn1cblxuY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9IChwcm9qZWN0TmFtZSwgcHJvamVjdEFycmF5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFN0cmluZyhwcm9qZWN0TmFtZSkgPT09IFN0cmluZyhwcm9qZWN0QXJyYXlbaV0udGl0bGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEFycmF5W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7XG4gICAgbWFrZUVkaXRhYmxlLFxuICAgIG1ha2VVbmVkaXRhYmxlLFxuICAgIG9wZW5Ob3RlRm9ybSxcbiAgICBjbG9zZU5vdGVGb3JtLFxuICAgIG9wZW5Qcm9qZWN0Rm9ybSxcbiAgICBjbG9zZVByb2plY3RGb3JtLFxuICAgIHByb2Nlc3NOb3RlRm9ybSxcbiAgICBjbGVhck5vdGVGb3JtLFxuICAgIHByb2Nlc3NQcm9qZWN0Rm9ybSxcbiAgICBjbGVhclByb2plY3RGb3JtLCBcbiAgICBnZXRBY3RpdmVQcm9qZWN0XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBJbmZvSG9sZGVycyBmcm9tICcuL2luZm8taG9sZGVycy5qcyc7XG5pbXBvcnQgKiBhcyBDb250cm9sbGVycyBmcm9tICcuL2NvbnRyb2xsZXJzLmpzJztcbmltcG9ydCAqIGFzIFN0cnVjdHVyZXJzIGZyb20gJy4vc3RydWN0dXJlcnMuanMnO1xuaW1wb3J0ICogYXMgRGlzcGxheWVycyBmcm9tICcuL2Rpc3BsYXllcnMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5cbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcblxuLy8gSW5pdGlhbGl6ZSB0aGUgYXBwbGljYXRpb25cbmNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gRGlzcGxheWVycy5kaXNwbGF5Q29udHJvbGxlcigpO1xuZGlzcGxheUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUFwcCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==