import closeIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/close.svg";
import tasks from "../store/tasks";
import navigator from "../utils/navigator";
import visibility from "../utils/visibility";
import createIconButton from "./button/iconButton";

class UndoPopup {
    #popup;
    #task;
    #timeout;

    constructor (popup) {
        this.#popup = document.querySelector (popup);

        const undoBtn = this.#popup.querySelector (".btn-undo");
        undoBtn.addEventListener ("click", () => {
            if (!this.#task || this.#task.id == -1) return;

            tasks.getTasks ().add (this.#task);
            tasks.renderTasks (navigator.getActiveItem ().filter); 

            this.close ();
        });

        const closeBtn = createIconButton (closeIcon, "Close Popup", () => this.close ());
        this.#popup.appendChild (closeBtn);

        this.#popup.addEventListener ("mouseover", () => this.addTimeout ());
    }

    open (task) {
        visibility.show (this.#popup);
        this.#task = task;

        this.addTimeout ();
    }

    addTimeout () {
        clearTimeout (this.#timeout);
        this.#timeout = setTimeout (() => this.close, 5000);
    }

    close () {
        clearTimeout (this.#timeout);

        visibility.hide (this.#popup);
    }
}

const undoPopup = new UndoPopup (".popup-undo");
export default undoPopup;