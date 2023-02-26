import * as Displayers from './displayers.js';

// Initialize the application
const displayController = Displayers.displayController();

if (localStorage.getItem('user') === null) {
    displayController.initializeApp();
} else {
    let projects = JSON.parse(window.localStorage.getItem('user'));
    displayController.initializeAppWithStorage(projects);   
}