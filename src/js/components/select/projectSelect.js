import projectIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/project.svg";
import projects from "../../store/projects";
import Select from "./select";

export default class ProjectSelect extends Select {
    #project;

    constructor (
        parent,
        onClick = null,
        button = ".btn-label-project",
        popup = ".form-popup-project",
        input = ".form-input-project"
    ) {
        super (parent, button, popup, input, [], (e) => {
            this.#onClick (e);
            if (onClick) onClick (e);
        });

        this.setCurrentProject (null);
    }

    updateList () {
        this.setList (this.getProjectsList ());
    }

    getCurrentProject () {
        return this.#project;
    }

    setCurrentProject (project) {
        this.#project = project;

        console.log ("projectSelect: " + project);

        if (project) {
            const color = document.createElement ("div");
            color.classList = "project-color project-color-s";
            color.style.backgroundColor = project.color;

            this.getButton ().innerHTML = "";
            this.getButton ().appendChild (color);
            this.getButton ().innerHTML += project.name;

            this.getInput ().value = project.id;
        }
        else {
            this.getInput ().value = -1;
            this.getButton ().innerHTML = projectIcon + "Project";
        }
    }

    getProjectsList () {
        return [
            ...projects.getProjects ().getList (),
            { id : -1, name : "No Project", icon : projectIcon }
        ];   
    }

    #onClick (e) {
        const btn = e.target;
        const id = btn.dataset.id;
        const project = projects.find ((p) => p.id == id);

        this.setCurrentProject (project);
    }
}