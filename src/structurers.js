// Structurers
// Objects that relate the notes to the projects 
const noteProjectStructurer = () => {
    const addNoteToProject = (project, note) => {
        console.log(project);
        project.addNote(note);
    };

    const deleteNoteFromProject = (project, note) => {
        console.log(project);
        project.deleteNote(note);
    }

    return {
        addNoteToProject,
        deleteNoteFromProject
    }
};

export {
    noteProjectStructurer,
}
