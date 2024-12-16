import calendarIcon from "!!raw-loader!C:/Users/anomi/OneDrive/Desktop/HTML/To-Do-List/src/assets/icons/calendar.svg";
import formatDate from "../../utils/date";

export default class DatePicker {
    #label;
    #input;
    #date;

    constructor (
        parent,
        onChange = null,
        label = ".btn-label-date",
        input = ".form-input-date"
    ) {
        const parentElement = document.querySelector (parent);

        this.#label = parentElement.querySelector (label);
        this.#input = parentElement.querySelector (input);

        this.#input.classList.add ("form-date-picker-input");

        this.#resetLabelClass ();
        this.#updateLabel ();

        this.#label.addEventListener ("click", (e) => {
            e.preventDefault ();
            this.#input.showPicker ();
        });

        this.#input.addEventListener ("change", (e) => {
            const value = e.target.value;

            this.updateDate (value ? new Date (value) : null);
            if (onChange) onChange (e);
        });
    }

    #resetLabelClass () {
        this.#label.classList = "btn btn-label task-date";
    }

    #updateLabel () {
        const formattedDate = formatDate (this.#date);

        this.#label.innerHTML = calendarIcon + formattedDate.formattedDate;
        this.#label.appendChild (this.#input);

        this.#resetLabelClass ();

        if (this.#date) this.#label.classList.add (`task-date-${formattedDate.dateClass}`);
    }

    updateDate (date) {
        this.#date = date;
        this.#updateLabel ();
    }

    getDate () {
        return this.#date;
    }
}
