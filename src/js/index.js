import "../scss/index.scss";
import createMainSection from "./components/main";
import createSidebar from "./components/sidebar";
import navigator from "./utils/navigator";
import tasks from "./store/tasks";
import "./store/autoDelete";
import siteIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/check-all.svg";

let link = document.querySelector ("link[rel ~= 'icon']");
if (!link) {
    link = document.createElement ("link");
    link.rel = "icon";
    document.head.appendChild (link);
}
const blob = new Blob ([siteIcon], { type : "image/svg+xml" });
const blobURL = URL.createObjectURL (blob);
link.href = blobURL;

createSidebar ();
createMainSection ();

navigator.updateFullNav ();
navigator.updateNavigationDOM ();

window.addEventListener ("click", () => console.log (navigator.getActiveItem ()));

// tasks.renderTasks ();
document.addEventListener ("DOMContentLoaded", () => tasks.renderTasks (navigator.getActiveItem ().filter));