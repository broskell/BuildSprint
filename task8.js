const tasks = [
  { id: 1, title: 'Review variables', completed: true },
  { id: 2, title: 'Practice functions', completed: false },
];

const addTask = (tasks, title) => {
    let newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    }
    return [...tasks, newTask];
}

const completeTask = (tasks, taskId) => {
    return tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                completed: true
            }
        }
        return task;
    });
}

const removeTask = (tasks, taskId) => {
    return tasks.filter(task => task.id !== taskId)
}

const countIncompleteTasks = (tasks) => {
    return tasks.filter(task => task.completed == false).length
}

const withNewTask = addTask(tasks, 'Build task utilities');
console.log(withNewTask.map((task) => task.title));
const completed = completeTask(withNewTask, 2);
console.log(countIncompleteTasks(completed));
console.log(removeTask(completed, 1).map((task) => task.id));
console.log(tasks.length);
console.log(countIncompleteTasks(tasks));