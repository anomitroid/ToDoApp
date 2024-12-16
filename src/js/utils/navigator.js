import projects from "../store/projects";
import deleteProjectButton from "../components/button/deleteProjectButton";
import editProjectButton from "../components/button/editProjectButton";
import inboxIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/inbox.svg";
import starIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/star.svg";
import calendarIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/calendar.svg";
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
    createNavItem ("All Tasks", inboxIcon, true, (task) => task),
    createNavItem ("Today", starIcon, false, (task) => task.dueDate && isToday (task.dueDate) || isBefore (task.dueDate, startOfToday ())),
    createNavItem ("Upcoming", calendarIcon, false, (task) => task.dueDate && isToday (task.dueDate) || isAfter (task.dueDate, startOfToday ()))
];

let fullNav = [];

const updateFullNav = () => {
    const projectsWithFilters = projects.getProjects ().getList ().map ((project) => {
        return {
            ...project,
            filter : (task) => task.projectId == project.id
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
    !!fullNav.find ((i) => i.name.toLowerCase () == title.toLowerCase ());
};

const updateNavigationDOM = () => {
    const btns = [...document.querySelectorAll (`button.btn-sidebar`)];
    const activeBtn = btns.find ((btn) => btn.classList.contains ("active"));
    const activeItem = getActiveItem ();

    if (activeBtn && activeBtn.dataset.name == activeItem.dataName) return ;

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
    }
    else {
        visibility.hide (colorElement);

        deleteProjectButton.hideButton ();
        editProjectButton.hideButton ();
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