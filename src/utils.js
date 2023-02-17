const makeEditable = (element) => {
    element.setAttribute('contenteditable', 'true');
}

const makeUneditable = (element) => {
    element.setAttribute('contenteditable', 'false');
}


export {
    makeEditable,
    makeUneditable,
}