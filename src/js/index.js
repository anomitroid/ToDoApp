import "../scss/index.scss";
import createMainSection from "./components/main";
import createSidebar from "./components/sidebar";
import navigator from "./utils/navigator";
import tasks from "./store/tasks";

createSidebar ();
createMainSection ();

navigator.updateFullNav ();
navigator.updateNavigationDOM ();

window.addEventListener ("click", () => console.log (navigator.getActiveItem ()));

// tasks.renderTasks ();
document.addEventListener ("DOMContentLoaded", () => tasks.renderTasks (navigator.getActiveItem ().filter));