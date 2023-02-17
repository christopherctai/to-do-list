// Information holders 
// Objects that hold information for the to-do list 

export const noteFactory = (title, description, dueDate, priority) => {
    return {
        title, 
        description,
        dueDate, 
        priority
    }
}

