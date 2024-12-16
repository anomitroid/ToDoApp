import addIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/plus-circle.svg";
import addEditDialog from "../dialog/addEditDialog";

export default function createAddTaskButton (classList) {
    const btn = document.createElement ("button");

    btn.classList = `btn btn-add-task ${classList}`;
    btn.innerHTML = addIcon + "Add Task";
    btn.addEventListener ("click", () => addEditDialog.open ());

    return btn;
}