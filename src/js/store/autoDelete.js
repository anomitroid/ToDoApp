import Store from "./store";
import tasks from "./tasks";
import navigator from "../utils/navigator";

const tasksList = tasks.getTasks ();

const autoDeleteCompletedTasks = () => {
    const completedTasks = tasksList.getList ().filter ((task) => task.completed);

    completedTasks.forEach (task => {
        const { id } = task;

        if (!task.autoDeleteTimerSet) {
            task.autoDeleteTimerSet = true;

            setTimeout (() => {
                tasksList.delete (id);
                tasks.renderTasks ((task) => task.completed);
                console.log (`autoDelete: Deleted task with id ${id} after 10 seconds`);
            }, 10000);
        }
    });
};

setInterval (autoDeleteCompletedTasks, 1000);
