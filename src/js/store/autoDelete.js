import Store from "./store";
import tasks from "./tasks";

const tasksList = tasks.getTasks ();

const autoDeleteTimers = new Map (); 

const autoDeleteCompletedTasks = () => {
    tasksList.getList ().forEach ((task) => {
        const { id, completed } = task;

        if (completed) {
            if (! autoDeleteTimers.has (id)) {
                const timer = setTimeout (() => {
                    tasksList.delete (id);
                    tasks.renderTasks ((task) => task.completed);
                    console.log (`autoDelete: Deleted task with id ${id} after 10 seconds`);
                    autoDeleteTimers.delete (id); 
                }, 10000);

                autoDeleteTimers.set (id, timer); 
                console.log (`autoDelete: Scheduled deletion for task with id ${id}`);
            }
        } 
        else {
            if (autoDeleteTimers.has (id)) {
                clearTimeout (autoDeleteTimers.get (id)); 
                autoDeleteTimers.delete (id); 
                console.log (`autoDelete: Canceled deletion for task with id ${id}`);
            }
        }
    });
};

setInterval(autoDeleteCompletedTasks, 1);