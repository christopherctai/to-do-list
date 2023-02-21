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

console.log(projectController.projects);

projectDisplayer.displayProject(projectController.projects[0]); 


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFNkQ7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwREFBVztBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFEQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw4QkFBOEI7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFPQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0R0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlDOzs7Ozs7O1VDbkJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOaUQ7QUFDRDtBQUNBO0FBQ0Y7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMkRBQTBCO0FBQ2pELDBCQUEwQiw4REFBNkI7QUFDdkQsOEJBQThCLGtFQUFpQztBQUMvRCx5QkFBeUIsNERBQTJCOztBQUVwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NvbnRyb2xsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZGlzcGxheWVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZm8taG9sZGVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0cnVjdHVyZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvbnRyb2xsZXJzIFxuLy8gT2JqZWN0cyB0aGF0IGNhbiBtYW5pcHVsYXRlIHRoZSBub3RlcyBvciBwcm9qZWN0cyB0aGVtc2VsdmVzIFxuXG5pbXBvcnQgeyBub3RlRmFjdG9yeSwgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL2luZm8taG9sZGVycyc7XG5cbmNvbnN0IG5vdGVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGxldCBub3RlSUQgPSAwO1xuICAgIGNvbnN0IGNyZWF0ZU5vdGUgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgICAgICBsZXQgbm90ZSA9IG5vdGVGYWN0b3J5KG5vdGVJRCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgICAgIG5vdGVJRCsrO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIHRpdGxlIFxuICAgIGNvbnN0IGNoYW5nZVRpdGxlID0gKCkgPT4ge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB1c2VycyB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBub3RlIFxuICAgIGNvbnN0IGNoYW5nZURlc2NyaXB0aW9uID0gKCkgPT4ge1xuXG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdXNlcnMgdG8gY2hhbmdlIHRoZSBub3RlJ3MgcHJpb3JpdHkgXG4gICAgY29uc3QgY2hhbmdlUHJpb3JpdHkgPSAoKSA9PiB7XG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOb3RlLFxuICAgICAgICBjaGFuZ2VUaXRsZSxcbiAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24sXG4gICAgICAgIGNoYW5nZVByaW9yaXR5XG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0Q29udHJvbGxlciA9ICgpID0+IHtcbiAgICBsZXQgcHJvamVjdElEID0gMDtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBlbXB0eSBwcm9qZWN0IFxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeShwcm9qZWN0SUQsIHRpdGxlLCBbXSk7XG4gICAgICAgIHByb2plY3RJRCsrO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgYSBwcm9qZWN0IFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RzLFxuICAgICAgICBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwcm9qZWN0Q29udHJvbGxlcixcbiAgICBub3RlQ29udHJvbGxlclxufSIsIi8vIERpc3BsYXllcnMgXG4vLyBPYmplY3RzIHRoYXQgd2lsbCBkaXNwbGF5IHRoZSBnaXZlbiBpbmZvcm1hdGlvbiBcblxuXG5cbi8vIGRpc3BsYXlDb250cm9sbGVyIGNvbnRyb2xzIHRoZSBkaXNwbGF5IG9mIHRoZSB0by1kbyBsaXN0IFxuY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgXG59XG5cblxuLy8gcHJvamVjdERpc3BsYXllciBoZWxwcyBkaXNwbGF5cyB0aGUgcHJvamVjdFxuY29uc3QgcHJvamVjdERpc3BsYXllciA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5UHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIFNlbGVjdCB0aGUgY29udGVudCBhcmVhIFxuICAgICAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgXG4gICAgICAgIC8vIENsZWFyIHRoZSBjb250ZW50IGFyZWFcbiAgICAgICAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgIFxuICAgICAgICAvLyBBcHBlbmQgdGhlIGNvbnRlbnQgXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNyZWF0ZVByb2plY3REaXNwbGF5KHByb2plY3QpKTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGRpc3BsYXlQcm9qZWN0LFxuXG4gICAgfVxufVxuXG5cbmNvbnN0IGNyZWF0ZVByb2plY3REaXNwbGF5ID0gKFByb2plY3QpID0+IHtcbiAgICAvLyBDcmVhdGUgdGhlIHByb2plY3QgZGl2IFxuICAgIGxldCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7IFxuXG4gICAgLy8gQXBwZW5kIG5vdGVzIHRvIHRoZSBwcm9qZWN0IFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUHJvamVjdC5ub3RlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IG5vdGUgPSBjcmVhdGVOb3RlRGlzcGxheShQcm9qZWN0Lm5vdGVBcnJheVtpXSk7XG4gICAgICAgIHByb2plY3QuYXBwZW5kQ2hpbGQobm90ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmNvbnN0IGNyZWF0ZU5vdGVEaXNwbGF5ID0gKE5vdGUpID0+IHtcbiAgICBsZXQgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5vdGUuY2xhc3NMaXN0LmFkZCgnbm90ZScpO1xuXG4gICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IE5vdGUudGl0bGU7XG4gICAgXG4gICAgLy8gQ3JlYXRlIGRlc2NyaXB0aW9uXG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IE5vdGUuZGVzY3JpcHRpb247XG5cbiAgICAvLyBDcmVhdGUgZHVlRGF0ZVxuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWVEYXRlJyk7XG4gICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IE5vdGUuZHVlRGF0ZTtcblxuICAgIC8vIENyZWF0ZSBwcmlvcml0eSBcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpOyBcbiAgICBwcmlvcml0eS50ZXh0Q29udGVudCA9IE5vdGUucHJpb3JpdHk7XG5cbiAgICBub3RlLmFwcGVuZCh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcblxuICAgIHJldHVybiBub3RlO1xufVxuXG5cbi8vIG5vdGVEaXNwbGF5ZXIgZGlzcGxheXMgaW5kaXZpZHVhbCBub3RlcyBcbmNvbnN0IG5vdGVEaXNwbGF5ZXIgPSAoKSA9PiB7XG4gICAgXG59XG5cblxuLy8gc2lkZWJhckRpc3BsYXllciBkaXNwbGF5cyB0aGUgc2lkZWJhci4gTmVlZHMgYWNjZXNzIHRvIHRoZSBsaXN0IG9mIHByb2plY3QgdGl0bGVzXG5jb25zdCBzaWRlYmFyRGlzcGxheWVyID0gKCkgPT4ge1xuXG59XG5cbmV4cG9ydCB7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIsIFxuICAgIHByb2plY3REaXNwbGF5ZXIsXG4gICAgY3JlYXRlUHJvamVjdERpc3BsYXksXG5cbn1cblxuLyogcHJvamVjdERpc3BsYXllciAoRE9NKVxuLWRpc3BsYXlzIGEgcHJvamVjdCBcbi1yZWxpZXMgb24gbm90ZURpc3BsYXllclxuXG5ub3RlRGlzcGxheWVyIChET00pXG4tZGlzcGxheXMgYSBub3RlIFxuXG5kaXNwbGF5Q29udHJvbGxlciAoRE9NKVxuLWRpc3BsYXlzIHRoZSB0by1kby1saXN0ICAqLyIsIi8vIEluZm9ybWF0aW9uIGhvbGRlcnMgXG4vLyBPYmplY3RzIHRoYXQgaG9sZCBpbmZvcm1hdGlvbiBmb3IgdGhlIHRvLWRvIGxpc3QgXG5cblxuLy8gTm90ZSBmYWN0b3J5IGNyZWF0ZXMgbm90ZXMgXG5jb25zdCBub3RlRmFjdG9yeSA9IChpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBkZXNjcmlwdGlvbjsgXG4gICAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTsgXG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRpdGxlLCBcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGR1ZURhdGUsIFxuICAgICAgICBwcmlvcml0eSxcbiAgICB9XG59XG5cblxuLy8gUHJvamVjdCBmYWN0b3J5IGNyZWF0ZXMgcHJvamVjdHMgXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChpZCwgdGl0bGUsIG5vdGVBcnJheSkgPT4ge1xuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgXG4gICAgLy8gQWRkIGEgbm90ZSB0byBhIHByb2plY3QgXG4gICAgY29uc3QgYWRkTm90ZSA9IChub3RlKSA9PiB7XG4gICAgICAgIG5vdGVBcnJheS5wdXNoKG5vdGUpO1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBhIG5vdGUgZnJvbSBhIHByb2plY3QgXG4gICAgY29uc3QgZGVsZXRlTm90ZSA9IChub3RlKSA9PiB7XG4gICAgICAgIG5vdGVBcnJheS5zcGxpY2Uobm90ZUFycmF5LmluZGV4T2Yobm90ZSksIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgbm90ZUFycmF5LFxuICAgICAgICBnZXRUaXRsZSxcbiAgICAgICAgYWRkTm90ZSwgXG4gICAgICAgIGRlbGV0ZU5vdGVcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBub3RlRmFjdG9yeSxcbiAgICBwcm9qZWN0RmFjdG9yeSxcbn0iLCIvLyBTdHJ1Y3R1cmVyc1xuLy8gT2JqZWN0cyB0aGF0IHJlbGF0ZSB0aGUgbm90ZXMgdG8gdGhlIHByb2plY3RzIFxuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZE5vdGVUb1Byb2plY3QgPSAocHJvamVjdCwgbm90ZSkgPT4ge1xuICAgICAgICBwcm9qZWN0LmFkZE5vdGUobm90ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZU5vdGVGcm9tUHJvamVjdCA9IChwcm9qZWN0LCBub3RlKSA9PiB7XG4gICAgICAgIHByb2plY3QuZGVsZXRlTm90ZShub3RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGROb3RlVG9Qcm9qZWN0LFxuICAgICAgICBkZWxldGVOb3RlRnJvbVByb2plY3RcbiAgICB9XG59O1xuXG5leHBvcnQge1xuICAgIG5vdGVQcm9qZWN0U3RydWN0dXJlcixcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgSW5mb0hvbGRlcnMgZnJvbSAnLi9pbmZvLWhvbGRlcnMuanMnO1xuaW1wb3J0ICogYXMgQ29udHJvbGxlcnMgZnJvbSAnLi9jb250cm9sbGVycy5qcyc7XG5pbXBvcnQgKiBhcyBTdHJ1Y3R1cmVycyBmcm9tICcuL3N0cnVjdHVyZXJzLmpzJztcbmltcG9ydCAqIGFzIERpc3BsYXllcnMgZnJvbSAnLi9kaXNwbGF5ZXJzLmpzJztcblxuLy8gVGVzdCBjb250cm9sIFxuY29uc29sZS5sb2coXCJoZWxsbyB3b3JsZFwiKTtcblxuLy8gQ3JlYXRlIGEgbm90ZVxuY29uc3Qgbm90ZUNvbnRyb2xsZXIgPSBDb250cm9sbGVycy5ub3RlQ29udHJvbGxlcigpO1xuY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSBDb250cm9sbGVycy5wcm9qZWN0Q29udHJvbGxlcigpO1xuY29uc3Qgbm90ZVByb2plY3RTdHJ1Y3R1cmVyID0gU3RydWN0dXJlcnMubm90ZVByb2plY3RTdHJ1Y3R1cmVyKCk7XG5jb25zdCBwcm9qZWN0RGlzcGxheWVyID0gRGlzcGxheWVycy5wcm9qZWN0RGlzcGxheWVyKCk7XG5cbmxldCBub3RlT25lID0gbm90ZUNvbnRyb2xsZXIuY3JlYXRlTm90ZShcImhpXCIsIFwidGVzdCBkZXNjcmlwdGlvblwiLCBcIk1heSAxc3RcIiwgXCJ1cmdlbnRcIik7XG5sZXQgbm90ZVR3byA9IG5vdGVDb250cm9sbGVyLmNyZWF0ZU5vdGUoJ2FnYWluJywgJ3NlY29uZCBub3RlJywgJ3JpZ2h0IG5vdycsICdyaWdodCBub3cnKTtcblxubGV0IHByb2plY3RPbmUgPSBwcm9qZWN0Q29udHJvbGxlci5jcmVhdGVQcm9qZWN0KFwibmV3IHByb2plY3RcIik7XG5cbm5vdGVQcm9qZWN0U3RydWN0dXJlci5hZGROb3RlVG9Qcm9qZWN0KHByb2plY3RPbmUsIG5vdGVPbmUpO1xubm90ZVByb2plY3RTdHJ1Y3R1cmVyLmFkZE5vdGVUb1Byb2plY3QocHJvamVjdE9uZSwgbm90ZVR3byk7XG5cbmNvbnNvbGUubG9nKHByb2plY3RDb250cm9sbGVyLnByb2plY3RzKTtcblxucHJvamVjdERpc3BsYXllci5kaXNwbGF5UHJvamVjdChwcm9qZWN0Q29udHJvbGxlci5wcm9qZWN0c1swXSk7IFxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=