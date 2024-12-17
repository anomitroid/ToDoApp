import tasks from "../store/tasks";
import projects from "../store/projects";
import theme from "../utils/theme";
import navigator from "../utils/navigator";
import createAddTaskButton from "./button/addTaskButton";
import createIconButton from "./button/iconButton";
import { hideSidebarBtn } from "./button/sidebarButton";
import addProjectIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/plus.svg";
import projectDialog from "./dialog/projectDialog";

const createSidebarButton = (navItem, classList, onClick = null) => {
    const { name, dataName, icon } = navItem;
    const btn = document.createElement ("button");

    btn.type = "button";
    btn.classList = `btn btn-sidebar ${classList || ""}`;
    btn.innerHTML = icon + name;
    btn.dataset.name = dataName;

    if (onClick) btn.addEventListener ("click", onClick);

    return btn;
};

const createNavListItem = (child) => {
    const li = document.createElement ("li");

    li.classList = "sidebar-nav-list-item";
    li.appendChild (child);

    return li;
};

const addHeaderIcons = () => {
    const themeBtn = createIconButton (
        theme.getCurrentThemeIcon (),
        "Change Theme",
        (e) => {
            theme.switchTheme ();
            theme.setThemeDOM (e.target);
        }
    );
    const sidebarBtn = hideSidebarBtn ();

    const header = document.querySelector (".sidebar-header");
    header.append (themeBtn, sidebarBtn);

    theme.setThemeDOM (themeBtn);
};

const addMainNavButtons = () => {
    const nav = document.querySelector (".sidebar-nav-list-main");
    nav.appendChild (
        createNavListItem (createAddTaskButton ("btn-sidebar btn-sidebar-l"))
    );

    navigator.mainNav.forEach ((element) => {
        const btn = createSidebarButton (element, "btn-sidebar-l", () => {
            navigator.activate (element);
            navigator.updateNavigationDOM ();
            tasks.renderTasks (element.filter);
        });

        nav.appendChild (createNavListItem (btn));
    });
};

const addProjectSection = () => {
    const btn = createIconButton (addProjectIcon, "Add Project", () => projectDialog.open (null));
    const header = document.querySelector (".sidebar-projects-header");

    header.appendChild (btn);
    projects.renderProjects (document.querySelector (".sidebar-nav-list-projects"));
};

export default function createSidebar () {
    addHeaderIcons ();
    addMainNavButtons ();
    addProjectSection ();
};