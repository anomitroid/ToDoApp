import projects from "../../store/projects";
import tasks from "../../store/tasks";
import navigator from "../../utils/navigator";
import Dialog from "./dialog";

class DeleteDialog extends Dialog {
    constructor () {
        super (".dialog-delete", ".form-delete");

        this.title = this.form.querySelector (".form-title");
    }

    open (object) {
        if (!object || !object.type || object.id === -1) return;

        this.current = object;

        this.title.textContent = `Are you sure you want to delete this ${this.current.type}?`;
        this.submitBtn.textContent = `Delete ${this.current.type}`;

        this.dialog.showModal ();
    }

    onSubmit (e) {
        e.preventDefault ();

        const id = this.current.id;
        if (id === -1) return;

        if (this.current.type == "task") tasks.getTasks ().delete (id);
        else if (this.current.type == "project") {
            projects.getProjects ().delete (id);
            projects.renderProjects (document.querySelector (".sidebar-nav-list-projects"));
            tasks.getTasks ().filter ((task) => task.projectId !== id);
            
            navigator.activate (navigator.mainNav[0]);
            navigator.updateNavigationDOM ();
        }

        tasks.renderTasks (navigator.getActiveItem ().filter);
        this.close ();
    }
}

export default new DeleteDialog ();