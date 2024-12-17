import Store from "./store";
import TaskRenderer from "../taskRenderer";

const createTask = (
    title,
    description,
    dueDate,
    projectId = -1,
    priority = 4,
    completed = false
) => {
    return { title, description, dueDate, projectId, priority, completed };
};

const tasks = new Store ("tasks");
const getTasks = () => tasks;

const renderer = new TaskRenderer (".task-list", ".empty-state", tasks);

const renderTasks = (filter = (task) => task) => {
    renderer.render (filter);
}

export default { createTask, renderTasks, getTasks };