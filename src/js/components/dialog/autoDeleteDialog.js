import Dialog from "./dialog";
import tasks from "../../store/tasks";

class AutoDeleteDialog extends Dialog {
    constructor() {
        super(".dialog-auto-delete", ".form-auto-delete");

        this.timeInput = this.form.querySelector(".form-input-time");
    }

    open() {
        super.open();

        // Get the current auto-delete time, defaulting to 24 hours (86400000 ms) if not set
        const currentTime =
            tasks.getTasks()
                .getList()
                .find((task) => task.autoDeleteTime)?.autoDeleteTime || 86400000;

        this.timeInput.value = currentTime / 3600000; // Convert ms to hours
    }

    onSubmit(e) {
        e.preventDefault();

        const timeInHours = parseInt(this.timeInput.value, 10);
        const timeInMs = timeInHours * 3600000; // Convert hours to ms

        // Update all tasks with the new auto-delete time
        tasks.getTasks()
            .getList()
            .forEach((task) => {
                task.autoDeleteTime = timeInMs;
            });

        tasks.getTasks().save();
        console.log(`Auto-delete time set to ${timeInHours} hours (${timeInMs} ms)`);
        this.close();
    }
}

export default new AutoDeleteDialog();
