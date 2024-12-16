import createAddTaskButton from "./button/addTaskButton";
import { showSidebarBtn, setSidebarBtn } from "./button/sidebarButton";

const addSidebarIcon = () => {
    const header = document.querySelector (".main-header");
    const sidebarBtn = showSidebarBtn ();

    header.insertBefore (sidebarBtn, header.children[0]);
    setSidebarBtn (sidebarBtn);
};

const addNewTaskButton = (onClick = null) => {
    const content = document.querySelector (".main-content");
    content.appendChild (createAddTaskButton ("btn-add-task-l", onClick));
};

export default function createMainSection () {
    addSidebarIcon ();
    addNewTaskButton ();
}