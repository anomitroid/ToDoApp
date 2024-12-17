import deleteIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/TodoApp/src/assets/icons/delete.svg";
import visibility from "../../utils/visibility";
import deleteDialog from "../dialog/deleteDialog";

const btn = document.querySelector (".btn.btn-delete");

(function addIcon () {
    btn.innerHTML = deleteIcon;
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

    console.log (id);
    deleteDialog.open ({ type : "project", id });
});

export default { showButton, hideButton };