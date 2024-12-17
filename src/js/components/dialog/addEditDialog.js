import navigator from "../../utils/navigator";
import tasks from "../../store/tasks";
import DatePicker from "../picker/datePicker";
import ProjectSelect from "../select/projectSelect";
import projects from "../../store/projects";
import PrioritySelect from "../select/prioritySelect";
import Dialog from "./dialog";
import { startOfToday } from "date-fns";

const DIALOG_CLASS = ".dialog-add-edit";

class AddEditDialog extends Dialog {
    constructor () {
        super (DIALOG_CLASS, ".form-add-edit");

        this.datePicker = new DatePicker (DIALOG_CLASS);
        this.projectSelect = new ProjectSelect (DIALOG_CLASS);
        this.prioritySelect = new PrioritySelect (DIALOG_CLASS);

        this.nameInput = this.form.querySelector (".form-input-title");
        this.descriptionInput = this.form.querySelector (".form-input-description");
    }

    open (object) {
        console.log ("addEditDialog: just opened the dialog");

        super.open (object);

        console.log ("addEditDialog: " + (this.current ? "edit" : "add"));

        const activeItem = navigator.getActiveItem ();

        console.log (activeItem);

        console.log ((activeItem.color ? "project" : "not a project"));

        this.projectSelect.updateList ();

        if (activeItem.color) {
            const activeProjectId = activeItem.id;
            this.projectSelect.updateList ();

            console.log ("addEditDialog: updated projects list");

            const selectedProject = projects.find ((project) => project.id == activeProjectId);

            console.log ("addEditDialog: - selected project : " + selectedProject.id);
            
            this.projectSelect.setCurrentProject (selectedProject);
        }
        else {
            this.projectSelect.setCurrentProject (
                this.current && this.current.projectId ? projects.find ((project) => project.id == this.current.projectId) : null
            );
        }

        const description = (this.current && this.current.description) || "";

        this.descriptionInput.value = description;
        this.descriptionInput.parentNode.dataset.value = description;

        if (activeItem.dataName == "today") {
            if (this.current && !this.current.dueDate) this.datePicker.updateDate (null);
            else this.datePicker.updateDate ((this.current && this.current.dueDate) || startOfToday ());
        }
        else this.datePicker.updateDate ((this.current && this.current.dueDate) || null);

        this.nameInput.value = (this.current && this.current.title) || "";
        this.submitBtn.textContent = this.current ? "Edit Task" : "Add Task";
        // this.datePicker.updateDate ((this.current && this.current.dueDate) || null);
        this.prioritySelect.setCurrentPriority ((this.current && this.current.priority) || 4);
    }

    onSubmit (e) {
        console.log ("addEditDialog: just clicked to add a task");

        e.preventDefault ();

        const task = tasks.createTask (
            this.nameInput.value,
            this.descriptionInput.value || null,
            this.datePicker.getDate (),
            this.projectSelect.getInput ().value,
            this.prioritySelect.getInput ().value
        )

        if (this.current && this.current.id !== -1) {
            const id = this.current.id;
            tasks.getTasks ().update (id, { ...task, id });
        }
        else tasks.getTasks ().add (task);

        console.log("Active filter:", navigator.getActiveItem().filter);

        const activeItem = navigator.getActiveItem ();

        if (activeItem.color) tasks.renderTasks ((task) => (task.projectId == activeItem.id) && !task.completed);
        else tasks.renderTasks (navigator.getActiveItem ().filter); 

        console.log("Tasks after filter:", tasks.getTasks().getList().filter(navigator.getActiveItem().filter));
        console.log ("addEditDialog: TASK CREATED");
        this.close ();
    }
}

export default new AddEditDialog ();