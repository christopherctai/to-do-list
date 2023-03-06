import * as Displayers from './displayers.js';

// Initialize the application
const displayController = Displayers.displayController();

// The way the code is structured, projects and notes have functions attached 
// to them. This is problematic because their methods are lost through local storage. 

if (localStorage.getItem('user') === null) {
    displayController.initializeApp();
} else {
    displayController.initializeApp();

    /* let projects = JSON.parse(window.localStorage.getItem('user'));
    displayController.initializeAppWithStorage(projects);   */
}