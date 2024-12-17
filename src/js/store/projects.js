import navigator from "../utils/navigator";
import tasks from "./tasks";
import Store from "./store";

const createProject = (name, color) => {
    return { name, color, dataName : name.replace (" ", "_").toLowerCase () };
};

const projects = new Store ("projects");
const getProjects = () => projects;

const find = (filter) => projects.getList ().find (filter);

const renderProjects = (container) => {
    container.innerHTML = "";

    projects.getList ().forEach ((project) => {
        const li = document.createElement ("li");

        if (li) console.log ("renderProjects: fine at li");

        li.classList = "sidebar-nav-list-item";

        const btn = document.createElement ("button");

        if (btn) console.log ("renderProjects: fine at btn");   

        btn.dataset.name = project.dataName;
        btn.dataset.id = project.id;
        btn.type = "button";
        btn.classList = "btn btn-sidebar btn-sidebar-s btn-project";
        btn.addEventListener ("click", () => {
            navigator.activate (project);
            navigator.updateNavigationDOM ("btn-sidebar", "main-title");
            tasks.renderTasks ((task) => (task.projectId == project.id) && !task.completed);
        });

        const color = document.createElement ("div");
        color.classList = "project-color project-color-s";
        color.style.background = project.color;

        btn.appendChild (color);
        btn.innerHTML += project.name;

        li.appendChild (btn);
        container.appendChild (li);
    });
};

export default { find, createProject, getProjects, renderProjects };