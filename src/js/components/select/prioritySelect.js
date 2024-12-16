import flagIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/flag.svg";
import Select from "./select";

const PRIORITIES = [
    { id : 1, name : "High", classList : "btn-select-priority-1", icon : flagIcon},
    { id : 2, name : "Medium", classList : "btn-select-priority-2", icon : flagIcon},
    { id : 3, name : "Low", classList : "btn-select-priority-3", icon : flagIcon},
    { id : 4, name : "No Priority", classList : "btn-select-priority-4", icon : flagIcon}
];

export default class PrioritySelect extends Select {
    #priority;

    constructor (
        parent, 
        onClick = null,
        button = ".btn-label-priority",
        popup = ".form-popup-priority",
        input = ".form-input-priority"
    ) {
        super (parent, button, popup, input, PRIORITIES, (e) => {
            this.#onClick (e);
            if (onClick) onClick (e);
        });
        this.setCurrentPriority (4);
    }

    getCurrentPriority () {
        return this.#priority;
    }

    setCurrentPriority (id) {
        for (let i = 0; i < PRIORITIES.length; i ++) {
            this.getButton ().classList.remove (`btn-label-priority-${PRIORITIES[i].id}`);
        }
        const priority = PRIORITIES.find ((p) => p.id == id);

        // console.log("prioritySelect:", priority.icon);

        this.getButton ().classList.add (`btn-label-priority-${id}`);
        this.getButton ().innerHTML = priority.icon + priority.name;
        this.getInput ().value = id;

        this.#priority = id;
    }

    #onClick (e) {
        this.setCurrentPriority (e.target.dataset.id);
    }
}