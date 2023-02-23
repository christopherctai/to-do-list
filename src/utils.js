const makeEditable = (element) => {
    element.setAttribute('contenteditable', 'true');
}

const makeUneditable = (element) => {
    element.setAttribute('contenteditable', 'false');
}

const openForm = () => {
    const form = document.querySelector('.add-note-form');
    form.classList.remove('hidden');
}

const closeForm = () => {
    const form = document.querySelector('.add-note-form');
    form.classList.add('hidden');
}


export {
    makeEditable,
    makeUneditable,
    openForm,
    closeForm
}