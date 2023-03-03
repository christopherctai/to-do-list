import * as Controllers from "./controllers.js";
import * as Displayers from './displayers.js'; 

function storeProjects(projects) {
    window.localStorage.setItem('user', JSON.stringify(projects));
}


export {
    storeProjects
}