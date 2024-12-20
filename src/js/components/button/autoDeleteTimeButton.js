import timerIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/delete-clock-outline.svg"
import visibility from "../../utils/visibility"
import autoDeleteDialog from "../dialog/autoDeleteDialog";

const btn = document.querySelector (".btn.btn-timer");

(function addIcon () {
    btn.innerHTML = timerIcon;
}) ();

const showButton = () => {
    visibility.show (btn);
};

const hideButton = () => {
    visibility.hide (btn);
};

btn.addEventListener ("click", () => {
    autoDeleteDialog.open ();
});

export default { showButton, hideButton };