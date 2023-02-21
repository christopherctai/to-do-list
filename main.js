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
/* harmony export */   "createProjectDisplay": () => (/* binding */ createProjectDisplay),
/* harmony export */   "displayController": () => (/* binding */ displayController),
/* harmony export */   "projectDisplayer": () => (/* binding */ projectDisplayer)
/* harmony export */ });
// Displayers 
// Objects that will display the given information 



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





// Test control 
console.log("hello world");

// Create a note
const noteController = _controllers_js__WEBPACK_IMPORTED_MODULE_1__.noteController();
const projectController = _controllers_js__WEBPACK_IMPORTED_MODULE_1__.projectController();
const noteProjectStructurer = _structurers_js__WEBPACK_IMPORTED_MODULE_2__.noteProjectStructurer();
const projectDisplayer = _displayers_js__WEBPACK_IMPORTED_MODULE_3__.projectDisplayer();

let noteOne = noteController.createNote("hi", "test description", "May 1st", "urgent");
let noteTwo = noteController.createNote('again', 'second note', 'right now', 'right now');

let projectOne = projectController.createProject("new project");

noteProjectStructurer.addNoteToProject(projectOne, noteOne);
noteProjectStructurer.addNoteToProject(projectOne, noteTwo);

/* projectDisplayer.displayProject(projectController.projects[0]);  */


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFNkQ7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwREFBVztBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFEQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQU9DOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVHQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUM7Ozs7Ozs7VUNuQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05pRDtBQUNEO0FBQ0E7QUFDRjs7QUFFOUM7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QiwyREFBMEI7QUFDakQsMEJBQTBCLDhEQUE2QjtBQUN2RCw4QkFBOEIsa0VBQWlDO0FBQy9ELHlCQUF5Qiw0REFBMkI7O0FBRXBEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxvRUFBb0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NvbnRyb2xsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZGlzcGxheWVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZm8taG9sZGVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvbnRyb2xsZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGNhbiBtYW5pcHVsYXRlIHRoZSBub3RlcyBvciBwcm9qZWN0cyB0aGVtc2VsdmVzIFxuXG5pbXBvcnQgeyBub3RlRmFjdG9yeSwgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL2luZm8taG9sZGVycyc7XG5cbmNvbnN0IG5vdGVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGxldCBub3RlSUQgPSAwO1xuICAgIGNvbnN0IGNyZWF0ZU5vdGUgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgICAgICBsZXQgbm90ZSA9IG5vdGVGYWN0b3J5KG5vdGVJRCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgICAgIG5vdGVJRCsrO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIHRpdGxlIFxuICAgIGNvbnN0IGNoYW5nZVRpdGxlID0gKCkgPT4ge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBub3RlIFxuICAgIGNvbnN0IGNoYW5nZURlc2NyaXB0aW9uID0gKCkgPT4ge1xuXG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdXNlcnMgdG8gY2hhbmdlIHRoZSBub3RlJ3MgcHJpb3JpdHkgXG4gICAgY29uc3QgY2hhbmdlUHJpb3JpdHkgPSAoKSA9PiB7XG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOb3RlLFxuICAgICAgICBjaGFuZ2VUaXRsZSxcbiAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24sXG4gICAgICAgIGNoYW5nZVByaW9yaXR5XG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdElEID0gMDtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwcm9qZWN0IFxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQsIHRpdGxlLCBbXSk7XG4gICAgICAgIHByb2plY3RJRCsrO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBub3RlQ29udHJvbGxlclxufSIsIi8vIERpc3BsYXllcnMgXG4vLyBPYmplY3RzIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBnaXZlbiBpbmZvcm1hdGlvbiBcblxuXG5cbi8vIGRpc3BsYXlDb250cm9sbGVyIGNvbnRyb2xzIHRoZSBkaXNwbGF5IG9mIHRoZSB0by1kbyBsaXN0IFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgXG59XG5cblxuLy8gcHJvamVjdERpc3BsYXllciBoZWxwcyBkaXNwbGF5cyB0aGUgcHJvamVjdFxuY29uc3QgcHJvamVjdERpc3BsYXllciA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5UHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgY29udGVudCBhcmVhIFxuICAgICAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgXG4gICAgICAgIC8vIENsZWFyIHRoZSBjb250ZW50IGFyZWFcbiAgICAgICAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgIFxuICAgICAgICAvLyBBcHBlbmQgdGhlIGNvbnRlbnQgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3REaXNwbGF5KHByb2plY3QpKTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0LFxuXG4gICAgfVxufVxuXG5cbmNvbnN0IGNyZWF0ZVByb2plY3REaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAvLyBDcmVhdGUgdGhlIHByb2plY3QgZGl2IFxuICAgIGxldCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7IFxuXG4gICAgLy8gQXBwZW5kIG5vdGVzIHRvIHRoZSBwcm9qZWN0IFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUHJvamVjdC5ub3RlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IG5vdGUgPSBjcmVhdGVOb3RlRGlzcGxheShQcm9qZWN0Lm5vdGVBcnJheVtpXSk7XG4gICAgICAgIHByb2plY3QuYXBwZW5kQ2hpbGQobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmNvbnN0IGNyZWF0ZU5vdGVEaXNwbGF5ID0gKE5vdGUpID0+IHtcbiAgICBsZXQgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5vdGUuY2xhc3NMaXN0LmFkZCgnbm90ZScpO1xuXG4gICAgLy8gQ3JlYXRlIGJ1dHRvblxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2Nsb3NlLWJ0bicpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdEb25lISc7XG5cbiAgICAvLyBDcmVhdGUgdGl0bGVcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gTm90ZS50aXRsZTtcbiAgICBcbiAgICAvLyBDcmVhdGUgZGVzY3JpcHRpb25cbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gTm90ZS5kZXNjcmlwdGlvbjtcblxuICAgIC8vIENyZWF0ZSBkdWVEYXRlXG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZURhdGUnKTtcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gTm90ZS5kdWVEYXRlO1xuXG4gICAgLy8gQ3JlYXRlIHByaW9yaXR5IFxuICAgIGxldCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5Jyk7IFxuICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gTm90ZS5wcmlvcml0eTtcblxuICAgIC8vIEFwcGVuZCBlbGVtZW50c1xuICAgIG5vdGUuYXBwZW5kKGJ1dHRvbiwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG5cbiAgICByZXR1cm4gbm90ZTtcbn1cblxuXG4vLyBub3RlRGlzcGxheWVyIGRpc3BsYXlzIGluZGl2aWR1YWwgbm90ZXMgXG5jb25zdCBub3RlRGlzcGxheWVyID0gKCkgPT4ge1xuICAgIFxufVxuXG5cbi8vIHNpZGViYXJEaXNwbGF5ZXIgZGlzcGxheXMgdGhlIHNpZGViYXIuIE5lZWRzIGFjY2VzcyB0byB0aGUgbGlzdCBvZiBwcm9qZWN0IHRpdGxlc1xuY29uc3Qgc2lkZWJhckRpc3BsYXllciA9ICgpID0+IHtcblxufVxuXG5leHBvcnQge1xuICAgIGRpc3BsYXlDb250cm9sbGVyLCBcbiAgICBwcm9qZWN0RGlzcGxheWVyLFxuICAgIGNyZWF0ZVByb2plY3REaXNwbGF5LFxuXG59XG5cbi8qIHByb2plY3REaXNwbGF5ZXIgKERPTSlcbi1kaXNwbGF5cyBhIHByb2plY3QgXG4tcmVsaWVzIG9uIG5vdGVEaXNwbGF5ZXJcblxubm90ZURpc3BsYXllciAoRE9NKVxuLWRpc3BsYXlzIGEgbm90ZSBcblxuZGlzcGxheUNvbnRyb2xsZXIgKERPTSlcbi1kaXNwbGF5cyB0aGUgdG8tZG8tbGlzdCAgKi8iLCIvLyBJbmZvcm1hdGlvbiBob2xkZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGhvbGQgaW5mb3JtYXRpb24gZm9yIHRoZSB0by1kbyBsaXN0IFxuXG5cbi8vIE5vdGUgZmFjdG9yeSBjcmVhdGVzIG5vdGVzIFxuY29uc3Qgbm90ZUZhY3RvcnkgPSAoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKCkgPT4gZGVzY3JpcHRpb247IFxuICAgIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7IFxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSwgXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlLCBcbiAgICAgICAgcHJpb3JpdHksXG4gICAgfVxufVxuXG5cbi8vIFByb2plY3QgZmFjdG9yeSBjcmVhdGVzIHByb2plY3RzIFxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoaWQsIHRpdGxlLCBub3RlQXJyYXkpID0+IHtcbiAgICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICAgIFxuICAgIC8vIEFkZCBhIG5vdGUgdG8gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGFkZE5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkucHVzaChub3RlKTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBub3RlIGZyb20gYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZU5vdGUgPSAobm90ZSkgPT4ge1xuICAgICAgICBub3RlQXJyYXkuc3BsaWNlKG5vdGVBcnJheS5pbmRleE9mKG5vdGUpLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIG5vdGVBcnJheSxcbiAgICAgICAgZ2V0VGl0bGUsXG4gICAgICAgIGFkZE5vdGUsIFxuICAgICAgICBkZWxldGVOb3RlXG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgbm90ZUZhY3RvcnksXG4gICAgcHJvamVjdEZhY3RvcnksXG59IiwiLy8gU3RydWN0dXJlcnNcbi8vIE9iamVjdHMgdGhhdCByZWxhdGUgdGhlIG5vdGVzIHRvIHRoZSBwcm9qZWN0cyBcbmNvbnN0IG5vdGVQcm9qZWN0U3RydWN0dXJlciA9ICgpID0+IHtcbiAgICBjb25zdCBhZGROb3RlVG9Qcm9qZWN0ID0gKHByb2plY3QsIG5vdGUpID0+IHtcbiAgICAgICAgcHJvamVjdC5hZGROb3RlKG5vdGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVOb3RlRnJvbVByb2plY3QgPSAocHJvamVjdCwgbm90ZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmRlbGV0ZU5vdGUobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkTm90ZVRvUHJvamVjdCxcbiAgICAgICAgZGVsZXRlTm90ZUZyb21Qcm9qZWN0XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBub3RlUHJvamVjdFN0cnVjdHVyZXIsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIEluZm9Ib2xkZXJzIGZyb20gJy4vaW5mby1ob2xkZXJzLmpzJztcbmltcG9ydCAqIGFzIENvbnRyb2xsZXJzIGZyb20gJy4vY29udHJvbGxlcnMuanMnO1xuaW1wb3J0ICogYXMgU3RydWN0dXJlcnMgZnJvbSAnLi9zdHJ1Y3R1cmVycy5qcyc7XG5pbXBvcnQgKiBhcyBEaXNwbGF5ZXJzIGZyb20gJy4vZGlzcGxheWVycy5qcyc7XG5cbi8vIFRlc3QgY29udHJvbCBcbmNvbnNvbGUubG9nKFwiaGVsbG8gd29ybGRcIik7XG5cbi8vIENyZWF0ZSBhIG5vdGVcbmNvbnN0IG5vdGVDb250cm9sbGVyID0gQ29udHJvbGxlcnMubm90ZUNvbnRyb2xsZXIoKTtcbmNvbnN0IHByb2plY3RDb250cm9sbGVyID0gQ29udHJvbGxlcnMucHJvamVjdENvbnRyb2xsZXIoKTtcbmNvbnN0IG5vdGVQcm9qZWN0U3RydWN0dXJlciA9IFN0cnVjdHVyZXJzLm5vdGVQcm9qZWN0U3RydWN0dXJlcigpO1xuY29uc3QgcHJvamVjdERpc3BsYXllciA9IERpc3BsYXllcnMucHJvamVjdERpc3BsYXllcigpO1xuXG5sZXQgbm90ZU9uZSA9IG5vdGVDb250cm9sbGVyLmNyZWF0ZU5vdGUoXCJoaVwiLCBcInRlc3QgZGVzY3JpcHRpb25cIiwgXCJNYXkgMXN0XCIsIFwidXJnZW50XCIpO1xubGV0IG5vdGVUd28gPSBub3RlQ29udHJvbGxlci5jcmVhdGVOb3RlKCdhZ2FpbicsICdzZWNvbmQgbm90ZScsICdyaWdodCBub3cnLCAncmlnaHQgbm93Jyk7XG5cbmxldCBwcm9qZWN0T25lID0gcHJvamVjdENvbnRyb2xsZXIuY3JlYXRlUHJvamVjdChcIm5ldyBwcm9qZWN0XCIpO1xuXG5ub3RlUHJvamVjdFN0cnVjdHVyZXIuYWRkTm90ZVRvUHJvamVjdChwcm9qZWN0T25lLCBub3RlT25lKTtcbm5vdGVQcm9qZWN0U3RydWN0dXJlci5hZGROb3RlVG9Qcm9qZWN0KHByb2plY3RPbmUsIG5vdGVUd28pO1xuXG4vKiBwcm9qZWN0RGlzcGxheWVyLmRpc3BsYXlQcm9qZWN0KHByb2plY3RDb250cm9sbGVyLnByb2plY3RzWzBdKTsgICovXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==