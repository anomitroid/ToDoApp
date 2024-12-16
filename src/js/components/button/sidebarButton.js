import visibility from "../../utils/visibility";
import createIconButton from "./iconButton";
import sidebarIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/sidebar.svg";

let sidebarBtn;

const mainContainer = document.querySelector (".main-content");
const sidebar = document.querySelector (".sidebar");
const container = document.querySelector (".sidebar-container");
const background = document.querySelector (".sidebar-bg");

const createSidebarBtn = (onClick) => createIconButton (sidebarIcon, "Sidebar", onClick);
const setSidebarBtn = (btn) => (sidebarBtn = btn);

const showSidebar = () => {
    visibility.show (background);
    visibility.show (sidebar);

    if (sidebarBtn) visibility.hide (sidebarBtn);

    setTimeout (() => {
        sidebar.style.transform = "translateX(0)";
        setTimeout (() => {
            container.style.position = "static";
            mainContainer.classList.toggle ("sidebar-open");
        }, 150);
    }, 0);
};

const hideSidebar = () => {
    visibility.hide (background);
    container.style.position = "fixed";
    sidebar.style.transform = "translateX(-100%)";
    mainContainer.classList.toggle ("sidebar-open");

    setTimeout (() => {
        visibility.hide (sidebar);
        if (sidebarBtn) visibility.show (sidebarBtn);
    }, 300);
};

const showSidebarBtn = () => createSidebarBtn (showSidebar);
const hideSidebarBtn = () => createSidebarBtn (hideSidebar);

background.addEventListener ("click", hideSidebar);

export { showSidebarBtn, hideSidebarBtn, setSidebarBtn };