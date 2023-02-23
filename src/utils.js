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

const processForm = () => {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    return [title, description, dueDate, priority];
}

const clearForm = () => {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let dueDate = document.getElementById('dueDate');
    let priority = document.getElementById('priority');

    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = '';
}

export {
    makeEditable,
    makeUneditable,
    openNoteForm,
    closeNoteForm,
    openProjectForm,
    closeProjectForm,
    processForm,
    clearForm
}