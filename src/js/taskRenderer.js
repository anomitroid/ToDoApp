import navigator from "./utils/navigator";
import formatDate from "./utils/date";
import projects from "./store/projects";
import createIconButton from "./components/button/iconButton";
import addEditDialog from "./components/dialog/addEditDialog";
import deleteDialog from "./components/dialog/deleteDialog";
import undoPopup from "./components/undoPopup";
import calendarIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/calendar.svg";
import editIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/edit.svg";
import deleteIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/delete.svg";
import showTaskDialog from "./components/dialog/showTaskDialog";
import visibility from "./utils/visibility";

export default class TaskRenderer {
    #parent;
    #emptyState;
    #tasks;

    constructor (parent, emptyState, tasks) {
        this.#parent = document.querySelector (parent);

        console.log ("taskRenderer: fine at parent" + this.#parent);

        this.#emptyState = document.querySelector (emptyState);
        this.#tasks = tasks;

        this.#parent.addEventListener ("click", (e) => {
            let target = e.target;

            console.log ("taskRenderer: clicked on " + target);
            console.log ("here");
            console.log (target);

            while (target.tagName == "path" || target.tagName == "svg") target = target.parentNode;

            console.log ("now here");
            console.log (target);

            if (!target.classList) return;

            if (target.classList.contains ("btn-check")) {
                console.log ("taskRenderer: clicked on check button" + e.target);

                const task = this.#findTask (target);

                console.log (task.completed, task);
                this.#tasks.update (task.id, { ...task, completed : true });
                console.log (task.completed, task);
                console.log (target);

                this.render (navigator.getActiveItem ().filter);

                // this.#tasks.delete (task.id);
                undoPopup.open (task);

                setTimeout (() => undoPopup.close (), 5000);
                console.log (target);
            }
            else if (target.classList.contains ("btn-task-edit")) {
                const task = this.#findTask (target);

                console.log ("taskRenderer: clicked on edit button" + e.target);

                addEditDialog.open (task);
            }
            else if (target.classList.contains ("btn-task-delete")) {
                const task = this.#findTask (target);

                deleteDialog.open ({ type : "task", id : task.id});
            }
            else if (target.classList.contains ("task-title") || target.classList.contains ("task-description")) {
                const task = this.#findTask (target);

                showTaskDialog.open (task);
            }
        });
    }

    render (filter = (task) => task) {
        this.#parent.innerHTML = "";

        const tasksInActiveSection = this.#tasks.getList ().filter (filter).length;

        if (tasksInActiveSection < 1 || this.#tasks.getList ().length < 1) {
            if (navigator.getActiveItem ().dataName === "today") {
                this.#emptyState.firstChild.textContent = "No more tasks today!";
                this.#emptyState.childNodes[1].textContent = "Add more tasks using the button below, or just call it a day!";
            }
            else if (navigator.getActiveItem ().dataName === "upcoming") {
                this.#emptyState.firstChild.textContent = "No tasks scheduled!";
                this.#emptyState.childNodes[1].textContent = "Add more tasks using the button below, or just call it a day!";
            }
            else if (navigator.getActiveItem ().dataName === "recently_completed") {
                this.#emptyState.firstChild.textContent = "No completed tasks yet!";
                this.#emptyState.childNodes[1].textContent = "Go complete your tasks or add tasks!";
            }
            else if (navigator.getActiveItem ().color) {
                this.#emptyState.firstChild.textContent = "No tasks in this project!";
                this.#emptyState.childNodes[1].textContent = "Add more tasks using the button below, or just call it a day!";
            }
            else {
                this.#emptyState.firstChild.textContent = "It's pretty empty here!";
                this.#emptyState.childNodes[1].textContent = "Add more tasks using the button below, or just call it a day!";
            }
    
            visibility.show (this.#emptyState);
            visibility.hide (this.#parent);
            return ;
        }

        const sorted = this.#tasks.getList ().filter (filter).sort ((a, b) => a.priority - b.priority || a.dueDate - b.dueDate);

        console.log ("taskRenderer: " + sorted);

        sorted.forEach ((task) => {
            this.#parent.appendChild (this.#renderTask (task));
        });

        visibility.hide (this.#emptyState);
        visibility.show (this.#parent);
    }

    #findTask (target) {
        let taskElement = target;
        
        while (taskElement && (!taskElement.classList.contains ("task") || taskElement == document.body)) {
            taskElement = taskElement.parentNode;
        }

        if (!taskElement || taskElement == document.body) return null;

        console.log ("taskRenderer - #findTask: found task" + taskElement.dataset.id);

        return this.#tasks.getList ().find ((task) => task.id == taskElement.dataset.id);
    }

    #renderTask (task) {
        const element = document.createElement ("li");
        element.classList = "task";
        element.dataset.id = task.id;

        const btn = document.createElement ("button");
        btn.type = "button";
        btn.classList = `btn btn-check btn-check-${task.priority}`;

        const container = document.createElement ("div");
        container.classList = "task-container";

        const info = document.createElement ("div");
        info.classList = "task-info";

        const title = document.createElement ("h3");
        title.classList = "task-title";
        title.textContent = task.title;
        info.appendChild (title);

        if (task.completed) {
            btn.classList.add ("checked");
            title.classList.add ("checked");
        }

        if (task.description) {
            const description = document.createElement ("p");
            description.classList = "task-description";
            description.textContent = task.description;
            info.appendChild (description);
        }

        if (task.dueDate) {
            const date = document.createElement ("div");
            const fdate = formatDate (task.dueDate);

            date.classList = `task-date ${fdate.dateClass}`;
            date.innerHTML = calendarIcon + fdate.formattedDate;

            info.appendChild (date);
        }

        const controls = document.createElement ("div");
        controls.classList = "task-controls";

        const btns = document.createElement ("div");
        btns.classList = "task-control-btns";

        const editBtn = createIconButton (editIcon, "Edit Task");
        editBtn.classList.add ("btn-task-edit");

        const deleteBtn = createIconButton (deleteIcon, "Delete Task");
        deleteBtn.classList.add ("btn-task-delete");

        btns.append (editBtn, deleteBtn);

        const project = document.createElement ("div");
        project.classList = "task-project";

        const projectTitle = document.createElement ("div");
        const taskProject = projects.find ((p) => p.id == task.projectId);

        projectTitle.classList = `task-project-title ${taskProject ? "" : "task-project-title-empty"}`;
        projectTitle.textContent = taskProject ? taskProject.name : "No Project";
        project.appendChild (projectTitle);

        if (taskProject) {
            const projectColor = document.createElement ("div");
            projectColor.classList = "project-color project-color-s";
            projectColor.style.backgroundColor = taskProject.color;
            project.append (projectColor);
        }

        controls.append (btns, project);
        container.append (info, controls);
        element.append (btn, container);

        return element;
    }
}