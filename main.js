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
/* harmony import */ var _displayers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayers.js */ "./src/displayers.js");





// Initialize the application
const displayController = _displayers_js__WEBPACK_IMPORTED_MODULE_0__.displayController();
displayController.initializeApp();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNuRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044Qzs7O0FBR1o7O0FBRWxDO0FBQ0EsMEJBQTBCLDZEQUE0QjtBQUN0RCxrQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kaXNwbGF5ZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5mby1ob2xkZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RydWN0dXJlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb250cm9sbGVycyBcbi8vIE9iamVjdHMgdGhhdCBjYW4gbWFuaXB1bGF0ZSB0aGUgbm90ZXMgb3IgcHJvamVjdHMgdGhlbXNlbHZlcyBcblxuaW1wb3J0IHsgbm90ZUZhY3RvcnksIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9pbmZvLWhvbGRlcnMnO1xuXG5jb25zdCBub3RlQ29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgbm90ZUlEID0gMDtcbiAgICBjb25zdCBjcmVhdGVOb3RlID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAgICAgbGV0IG5vdGUgPSBub3RlRmFjdG9yeShub3RlSUQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICBub3RlSUQrKztcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTm90ZSxcbiAgICB9XG59XG5cbmNvbnN0IHByb2plY3RDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0SUQgPSAwO1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGVtcHR5IHByb2plY3QgXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHByb2plY3RJRCwgdGl0bGUsIFtdKTtcbiAgICAgICAgcHJvamVjdElEKys7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBhIHByb2plY3QgXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpLCAxKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvamVjdHMsXG4gICAgICAgIGNyZWF0ZVByb2plY3QsXG4gICAgICAgIGRlbGV0ZVByb2plY3QsXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHByb2plY3RDb250cm9sbGVyLFxuICAgIG5vdGVDb250cm9sbGVyXG59IiwiLy8gRGlzcGxheWVycyBcbi8vIE9iamVjdHMgdGhhdCB3aWxsIGRpc3BsYXkgdGhlIGdpdmVuIGluZm9ybWF0aW9uIFxuXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIENvbnRyb2xsZXJzIGZyb20gJy4vY29udHJvbGxlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcnMgZnJvbSAnLi9zdHJ1Y3R1cmVycy5qcyc7XG5cblxuLy8gQ3JlYXRlIGNvbnRyb2xsZXJzXG5jb25zdCBub3RlQ29udHJvbGxlciA9IENvbnRyb2xsZXJzLm5vdGVDb250cm9sbGVyKCk7XG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9IENvbnRyb2xsZXJzLnByb2plY3RDb250cm9sbGVyKCk7XG5jb25zdCBub3RlUHJvamVjdFN0cnVjdHVyZXIgPSBTdHJ1Y3R1cmVycy5ub3RlUHJvamVjdFN0cnVjdHVyZXIoKTtcblxuLy8gZGlzcGxheUNvbnRyb2xsZXIgY29udHJvbHMgdGhlIGRpc3BsYXkgb2YgdGhlIHRvLWRvIGxpc3QgXG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9ICgpID0+IHsgXG4gICAgY29uc3QgaW5pdGlhbGl6ZUFwcCA9ICgpID0+IHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcHJvamVjdCBhbmQgbm90ZSBmb3JtIFxuICAgICAgICBpbml0QnV0dG9ucygpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNpZGViYXJcbiAgICAgICAgc2lkZWJhckRpc3BsYXllcigpLmNsZWFyU2lkZWJhcigpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgTWFpbiBQcm9qZWN0XG4gICAgICAgIHByb2plY3RDb250cm9sbGVyLmNyZWF0ZVByb2plY3QoJ015IFByb2plY3QnKTsgXG4gICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1swXSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFByb2plY3QgRm9ybVxuICAgICAgICBpbml0QWRkUHJvamVjdEJ1dHRvbigpO1xuICAgICAgICBpbml0Q2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbigpO1xuICAgICAgICBpbml0U3VibWl0UHJvamVjdEJ1dHRvbigpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIE5vdGUgRm9ybSBcbiAgICAgICAgaW5pdEFkZE5vdGVCdXR0b24oKTtcbiAgICAgICAgaW5pdENsb3NlTm90ZUZvcm1CdXR0b24oKTtcbiAgICAgICAgaW5pdFN1Ym1pdE5vdGVCdXR0b24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0QWRkUHJvamVjdEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idG4nKTtcbiAgICAgICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLm9wZW5Qcm9qZWN0Rm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRDbG9zZVByb2plY3RGb3JtQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZVByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXByb2plY3QtZm9ybS1idG4nKTtcbiAgICAgICAgY2xvc2VQcm9qZWN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0U3VibWl0UHJvamVjdEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1wcm9qZWN0LWJ0bicpO1xuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgUHJvamVjdFxuICAgICAgICAgICAgbGV0IGZvcm1JbmZvID0gVXRpbHMucHJvY2Vzc1Byb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KGZvcm1JbmZvKTtcblxuICAgICAgICAgICAgLy8gRGlzcGxheSBwcm9qZWN0IFxuICAgICAgICAgICAgbGV0IGFjdGl2ZVByb2plY3QgPSBVdGlscy5nZXRBY3RpdmVQcm9qZWN0KFxuICAgICAgICAgICAgICAgIGZvcm1JbmZvLCBcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gRGlzcGxheSBzaWRlYmFyXG4gICAgICAgICAgICBzaWRlYmFyRGlzcGxheWVyKCkuZGlzcGxheVNpZGViYXIoKTtcblxuICAgICAgICAgICAgLy8gQ2xlYW4gdXBcbiAgICAgICAgICAgIFV0aWxzLmNsZWFyUHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlUHJvamVjdEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0QWRkTm90ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkTm90ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1idG4nKTtcbiAgICAgICAgYWRkTm90ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLm9wZW5Ob3RlRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGluaXRDbG9zZU5vdGVGb3JtQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZU5vdGVGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLW5vdGUtZm9ybS1idG4nKTtcbiAgICAgICAgY2xvc2VOb3RlRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIFV0aWxzLmNsb3NlTm90ZUZvcm0oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBpbml0U3VibWl0Tm90ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1ub3RlLWJ0bicpO1xuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBHZXQgYWN0aXZlIHByb2plY3RcbiAgICAgICAgICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gVXRpbHMuZ2V0QWN0aXZlUHJvamVjdChcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZScpLnRleHRDb250ZW50LCBcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5vdGVcbiAgICAgICAgICAgIGxldCBmb3JtSW5mbyA9IFV0aWxzLnByb2Nlc3NOb3RlRm9ybSgpO1xuICAgICAgICAgICAgbGV0IG5vdGUgPSBub3RlQ29udHJvbGxlci5jcmVhdGVOb3RlKGAke2Zvcm1JbmZvWzBdfWAsIFxuICAgICAgICAgICAgICAgIGAke2Zvcm1JbmZvWzFdfWAsXG4gICAgICAgICAgICAgICAgYCR7Zm9ybUluZm9bMl19YCxcbiAgICAgICAgICAgICAgICBgJHtmb3JtSW5mb1szXX1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZVByb2plY3QpO1xuXG4gICAgICAgICAgICAvLyBBZGQgbm90ZSB0byBwcm9qZWN0IFxuICAgICAgICAgICAgbm90ZVByb2plY3RTdHJ1Y3R1cmVyLmFkZE5vdGVUb1Byb2plY3QoYWN0aXZlUHJvamVjdCwgbm90ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIERpc3BsYXkgUHJvamVjdCBcbiAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcblxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgXG4gICAgICAgICAgICBVdGlscy5jbGVhck5vdGVGb3JtKCk7XG4gICAgICAgICAgICBVdGlscy5jbG9zZU5vdGVGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdGlhbGl6ZUFwcFxuICAgIH1cbn1cblxuXG4vLyBzaWRlYmFyRGlzcGxheWVyIGRpc3BsYXlzIHRoZSBzaWRlYmFyLiBOZWVkcyBhY2Nlc3MgdG8gdGhlIGxpc3Qgb2YgcHJvamVjdCB0aXRsZXNcbmNvbnN0IHNpZGViYXJEaXNwbGF5ZXIgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjbGVhclNpZGViYXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpO1xuICAgICAgICBzaWRlYmFyLnRleHRDb250ZW50ID0gJyc7IFxuICAgICAgICByZXR1cm4gc2lkZWJhcjtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwbGF5U2lkZWJhciA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNpZGViYXIgPSBjbGVhclNpZGViYXIoKTtcbiAgICAgICAgY3JlYXRlU2lkZWJhckRpc3BsYXkoc2lkZWJhcik7XG4gICAgICAgIGluaXRQcm9qZWN0QnV0dG9ucygpO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVNpZGViYXJEaXNwbGF5ID0gKHNpZGViYXIpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RDb250cm9sbGVyLnByb2plY3RzW2ldLnRpdGxlICE9PSAnTXkgUHJvamVjdCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2lkZWJhckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIHNpZGViYXJCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ3Byb2plY3QtYnRuJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhckJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RDb250cm9sbGVyLnByb2plY3RzW2ldLnRpdGxlO1xuICAgICAgICAgICAgICAgIHNpZGViYXIuYXBwZW5kKHNpZGViYXJCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFByb2plY3RCdXR0b25zID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWJ0bicpO1xuICAgICAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFV0aWxzLmdldEFjdGl2ZVByb2plY3QoXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHByb2plY3REaXNwbGF5ZXIoKS5kaXNwbGF5UHJvamVjdChhY3RpdmVQcm9qZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlzcGxheVNpZGViYXIsXG4gICAgICAgIGNsZWFyU2lkZWJhclxuICAgIH1cbn1cblxuLy8gcHJvamVjdERpc3BsYXllciBoZWxwcyBkaXNwbGF5cyB0aGUgcHJvamVjdFxuY29uc3QgcHJvamVjdERpc3BsYXllciA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5UHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGxldCBjb250ZW50ID0gY2xlYXJQcm9qZWN0Q29udGVudCgpO1xuICAgIFxuICAgICAgICAvLyBBcHBlbmQgdGhlIHRpdGxlIFxuICAgICAgICBjb250ZW50LmFwcGVuZChjcmVhdGVQcm9qZWN0VGl0bGVEaXNwbGF5KHByb2plY3QpKTtcblxuICAgICAgICAvLyBBcHBlbmQgdGhlIGRlbGV0ZSBidXR0b25cbiAgICAgICAgY29udGVudC5hcHBlbmQoY3JlYXRlUHJvamVjdERlbGV0ZURpc3BsYXkocHJvamVjdCkpO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgY29udGVudCBcbiAgICAgICAgY29udGVudC5hcHBlbmQoY3JlYXRlUHJvamVjdERpc3BsYXkocHJvamVjdCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyUHJvamVjdENvbnRlbnQgPSAoKSA9PiB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgY29udGVudCBhcmVhIFxuICAgICAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgXG4gICAgICAgIC8vIENsZWFyIHRoZSBjb250ZW50IGFyZWFcbiAgICAgICAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RUaXRsZURpc3BsYXkgPSAoUHJvamVjdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIHByb2plY3QgdGl0bGUgZGl2IFxuICAgICAgICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IFByb2plY3QudGl0bGU7IFxuXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGl0bGU7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdERlbGV0ZURpc3BsYXkgPSAoUHJvamVjdCkgPT4ge1xuICAgICAgICBpZiAoUHJvamVjdC50aXRsZSA9PT0gJ015IFByb2plY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBkZWxldGVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2RlbGV0ZS1wcm9qZWN0LWJ0bicpO1xuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XG5cbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHByb2plY3RDb250cm9sbGVyLmRlbGV0ZVByb2plY3QoUHJvamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0RGlzcGxheWVyKCkuZGlzcGxheVByb2plY3QocHJvamVjdENvbnRyb2xsZXIucHJvamVjdHNbMF0pO1xuICAgICAgICAgICAgc2lkZWJhckRpc3BsYXllcigpLmRpc3BsYXlTaWRlYmFyKCk7XG4gICAgICAgICAgICBhbGVydChgJHtQcm9qZWN0LnRpdGxlfSBoYXMgYmVlbiBkZWxldGVkYCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWxldGVQcm9qZWN0QnV0dG9uO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3REaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwcm9qZWN0IGNvbnRlbnQgZGl2IFxuICAgICAgICBsZXQgcHJvamVjdENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdENvbnRlbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpOyBcbiAgICBcbiAgICAgICAgLy8gQXBwZW5kIG5vdGVzIHRvIHRoZSBwcm9qZWN0IFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFByb2plY3Qubm90ZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm90ZSA9IGNyZWF0ZU5vdGVEaXNwbGF5KFByb2plY3Qubm90ZUFycmF5W2ldLCBQcm9qZWN0KTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50LmFwcGVuZENoaWxkKG5vdGUpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0Q29udGVudDtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgY3JlYXRlTm90ZURpc3BsYXkgPSAoTm90ZSwgUHJvamVjdCkgPT4ge1xuICAgICAgICBsZXQgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub3RlLmNsYXNzTGlzdC5hZGQoJ25vdGUnKTtcbiAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGJ1dHRvblxuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnZG9uZS1idG4nKTsgXG4gICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdEb25lISc7IFxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIuZGVsZXRlTm90ZUZyb21Qcm9qZWN0KFByb2plY3QsIE5vdGUpO1xuICAgICAgICAgICAgbm90ZS5yZW1vdmUoKTtcbiAgICAgICAgfSkgXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSB0aXRsZVxuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBOb3RlLnRpdGxlO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgTm90ZS50aXRsZSA9IHRpdGxlLnRleHRDb250ZW50O1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgLy8gQ3JlYXRlIGRlc2NyaXB0aW9uXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IE5vdGUuZGVzY3JpcHRpb247XG4gICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBkdWVEYXRlXG4gICAgICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlRGF0ZScpO1xuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gTm90ZS5kdWVEYXRlO1xuICAgICAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIE5vdGUuZHVlRGF0ZSA9IGR1ZURhdGUudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIENyZWF0ZSBwcmlvcml0eSBcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5Jyk7IFxuICAgICAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IE5vdGUucHJpb3JpdHk7XG4gICAgICAgIHByaW9yaXR5LnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBOb3RlLnByaW9yaXR5ID0gcHJpb3JpdHkudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vIEFwcGVuZCBlbGVtZW50c1xuICAgICAgICBub3RlLmFwcGVuZChidXR0b24sIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgIFxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5UHJvamVjdFxuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLCBcbiAgICBwcm9qZWN0RGlzcGxheWVyLFxuICAgIHNpZGViYXJEaXNwbGF5ZXJcbn0iLCIvLyBJbmZvcm1hdGlvbiBob2xkZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGhvbGQgaW5mb3JtYXRpb24gZm9yIHRoZSB0by1kbyBsaXN0IFxuXG5cbi8vIE5vdGUgZmFjdG9yeSBjcmVhdGVzIG5vdGVzIFxuY29uc3Qgbm90ZUZhY3RvcnkgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247IFxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7IFxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgcHJpb3JpdHksXG4gICAgfVxufVxuXG5cbi8vIFByb2plY3QgZmFjdG9yeSBjcmVhdGVzIHByb2plY3RzIFxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoaWQsIHRpdGxlLCBub3RlQXJyYXkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIFxuICAgIC8vIEFkZCBhIG5vdGUgdG8gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGFkZE5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBub3RlIGZyb20gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZU5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkuc3BsaWNlKG5vdGVBcnJheS5pbmRleE9mKG5vdGUpLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIG5vdGVBcnJheSxcbiAgICAgICAgZ2V0VGl0bGUsXG4gICAgICAgIGFkZE5vdGUsIFxuICAgICAgICBkZWxldGVOb3RlXG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgbm90ZUZhY3RvcnksXG4gICAgcHJvamVjdEZhY3RvcnksXG59IiwiLy8gU3RydWN0dXJlcnNcbi8vIE9iamVjdHMgdGhhdCByZWxhdGUgdGhlIG5vdGVzIHRvIHRoZSBwcm9qZWN0cyBcbmNvbnN0IG5vdGVQcm9qZWN0U3RydWN0dXJlciA9ICgpID0+IHtcbiAgICBjb25zdCBhZGROb3RlVG9Qcm9qZWN0ID0gKHByb2plY3QsIG5vdGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5hZGROb3RlKG5vdGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVOb3RlRnJvbVByb2plY3QgPSAocHJvamVjdCwgbm90ZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZU5vdGUobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkTm90ZVRvUHJvamVjdCxcbiAgICAgICAgZGVsZXRlTm90ZUZyb21Qcm9qZWN0XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIsXG59XG4iLCJjb25zdCBtYWtlRWRpdGFibGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xufVxuXG5jb25zdCBtYWtlVW5lZGl0YWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScpO1xufVxuXG5jb25zdCBvcGVuTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbm90ZS1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VOb3RlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1ub3RlLWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBvcGVuUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgY2xvc2VQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBwcm9jZXNzTm90ZUZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVEYXRlXCIpLnZhbHVlO1xuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG5cbiAgICByZXR1cm4gW3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHldO1xufVxuXG5jb25zdCBwcm9jZXNzUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tdGl0bGVcIikudmFsdWU7XG4gICAgcmV0dXJuIHRpdGxlO1xufVxuXG5jb25zdCBjbGVhck5vdGVGb3JtID0gKCkgPT4ge1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZScpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKTtcblxuICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICBkdWVEYXRlLnZhbHVlID0gJyc7XG4gICAgcHJpb3JpdHkudmFsdWUgPSAnJztcbn1cblxuY29uc3QgY2xlYXJQcm9qZWN0Rm9ybSA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtLXRpdGxlJyk7XG5cbiAgICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuXG5jb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gKHByb2plY3ROYW1lLCBwcm9qZWN0QXJyYXkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoU3RyaW5nKHByb2plY3ROYW1lKSA9PT0gU3RyaW5nKHByb2plY3RBcnJheVtpXS50aXRsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0QXJyYXlbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtcbiAgICBtYWtlRWRpdGFibGUsXG4gICAgbWFrZVVuZWRpdGFibGUsXG4gICAgb3Blbk5vdGVGb3JtLFxuICAgIGNsb3NlTm90ZUZvcm0sXG4gICAgb3BlblByb2plY3RGb3JtLFxuICAgIGNsb3NlUHJvamVjdEZvcm0sXG4gICAgcHJvY2Vzc05vdGVGb3JtLFxuICAgIGNsZWFyTm90ZUZvcm0sXG4gICAgcHJvY2Vzc1Byb2plY3RGb3JtLFxuICAgIGNsZWFyUHJvamVjdEZvcm0sIFxuICAgIGdldEFjdGl2ZVByb2plY3Rcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJztcblxuXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5cbi8vIEluaXRpYWxpemUgdGhlIGFwcGxpY2F0aW9uXG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IERpc3BsYXllcnMuZGlzcGxheUNvbnRyb2xsZXIoKTtcbmRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpemVBcHAoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=