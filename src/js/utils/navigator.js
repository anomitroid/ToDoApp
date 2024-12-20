import projects from "../store/projects";
import deleteProjectButton from "../components/button/deleteProjectButton";
import editProjectButton from "../components/button/editProjectButton";
import autoDeleteTimeButton from "../components/button/autoDeleteTimeButton";
import inboxIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/inbox.svg";
import starIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/star.svg";
import calendarIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/calendar.svg";
import checkIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/check.svg"
import { isAfter, isBefore, isToday, startOfToday } from "date-fns";
import visibility from "./visibility";

const createNavItem = (name, icon, active, filter) => {
    return {
        name,
        dataName : name.replace (" ", "_").toLowerCase (),
        icon,
        active,
        filter
    };
};

const mainNav = [
    createNavItem ("All Tasks", inboxIcon, true, (task) => !task.completed && task),
    createNavItem ("Today", starIcon, false, (task) => !task.completed && (task.dueDate && isToday (task.dueDate) || isBefore (task.dueDate, startOfToday ()))),
    createNavItem ("Upcoming", calendarIcon, false, (task) => !task.completed && (task.dueDate && isToday (task.dueDate) || isAfter (task.dueDate, startOfToday ()))),
    createNavItem ("Recently Completed", checkIcon, false, (task) => task.completed)
];

let fullNav = [];

const updateFullNav = () => {
    const projectsWithFilters = projects.getProjects ().getList ().map ((project) => {
        return {
            ...project,
            filter : (task) => (task.projectId == project.id) && !task.completed
        };
    });

    fullNav = [...mainNav, ...projectsWithFilters];
}

const getActiveItem = () => fullNav.find ((item) => item.active);

const activate = (navItem) => {
    updateFullNav ();

    fullNav.forEach (
        (item) => (item.active = item.dataName == navItem.dataName ? true : false)
    );
};

const exists = (title) => {
    return !!fullNav.find ((i) => i.name.toLowerCase () == title.toLowerCase ());
};

const updateNavigationDOM = () => {
    const btns = [...document.querySelectorAll (`button.btn-sidebar`)];
    const activeBtn = btns.find ((btn) => btn.classList.contains ("active"));
    const activeItem = getActiveItem ();

    if (activeBtn && activeBtn.dataset.name == activeItem.dataName) return ;

    const addTaskButton = document.querySelector (".btn-add-task-l");

    if (activeItem.dataName == "recently_completed") addTaskButton.style.display = "none";
    else addTaskButton.style.display = "flex";

    const targetBtn = btns.find ((btn) => btn.dataset.name == activeItem.dataName);
    if (!targetBtn) return ;

    btns.forEach ((btn) => btn.classList.remove ("active"));
    targetBtn.classList.add ("active");

    const colorElement = document.querySelector (".main-title-project");

    if (activeItem.color) {
        colorElement.style.backgroundColor = activeItem.color;
        visibility.show (colorElement);

        deleteProjectButton.showButton (targetBtn.dataset.id);
        editProjectButton.showButton (targetBtn.dataset.id);

        autoDeleteTimeButton.hideButton ();
    }
    else {
        visibility.hide (colorElement);

        deleteProjectButton.hideButton ();
        editProjectButton.hideButton ();

        autoDeleteTimeButton.showButton ();
    }

    const titleElement = document.querySelector (".main-title");
    titleElement.textContent = activeItem.name;
};

export default {
    mainNav,
    getActiveItem,
    activate,
    updateFullNav,
    exists,
    updateNavigationDOM
};