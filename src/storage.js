import * as Controllers from "./controllers.js";
import * as Displayers from './displayers.js'; 

function storeProjects() {
    window.localStorage.setItem('user', JSON.stringify(Displayers.projectController.projects));
}


export {
    storeProjects
}