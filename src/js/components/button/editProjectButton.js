import settingsIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/settings.svg";
import projects from "../../store/projects";
import visibility from "../../utils/visibility";
import projectDialog from "../dialog/projectDialog";

const btn = document.querySelector (".btn-project-edit");

(function addIcon () {
    btn.innerHTML = settingsIcon;
}) ();

const showButton = (id) => {
    btn.dataset.id = id;
    visibility.show (btn);
};

const hideButton = () => {
    visibility.hide (btn);
};

btn.addEventListener ("click", () => {
    const id = btn.dataset.id;

    projectDialog.open (
        projects.getProjects ().getList ().find ((project) => project.id == id)
    );
});

export default { showButton, hideButton };