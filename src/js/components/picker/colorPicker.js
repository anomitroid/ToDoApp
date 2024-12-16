import Popup from "../popup";

const COLORS = [
    "#dc2626",
    "#ea580c",
    "#d97706",
    "#ca8a04",
    "#65a30d",
    "#16a34a",
    "#059669",
    "#0d9488",
    "#0891b2",
    "#0284c7",
    "#2563eb",
    "#4f46e5"
];

export default class ColorPicker extends Popup {
    constructor (
        parent,
        button = ".form-color",
        popup = ".form-popup-color",
        input = ".form-input-color"
    ) {
        super (parent, button, popup, input, (e) => this.#onClick (e));

        COLORS.forEach ((color) => {
            const li = document.createElement ("li");
            li.classList = "form-color-popup-item";

            const btn = document.createElement ("button");
            btn.classList = "btn project-color project-color-m";
            btn.style.backgroundColor = color;
            btn.dataset.color = color;
            btn.type = "button";

            li.appendChild (btn);
            this.getPopup ().appendChild (li);
        });

        const color = COLORS[0];
        this.getButton ().style.backgroundColor = color;
        this.getInput ().value = color;
    }

    #onClick (e) {
        const target = e.target;
        if (target.classList.contains ("project-color")) {
            const color = target.dataset.color;

            this.getInput ().value = color;
            this.getButton ().style.backgroundColor = color;
            this.close ();
        }
    }

    updateColor (obj) {
        const currentColor = (obj && obj.color) || COLORS[0];
        this.getButton ().style.backgroundColor = currentColor;
        this.getInput ().value = currentColor;
    }
}