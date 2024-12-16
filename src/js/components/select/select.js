import Popup from "../popup";

export default class Select extends Popup {
    #list;

    constructor (parent, button, popup, input, list, onClick) {
        super (parent, button, popup, input, (e) => this.#onClick (e, onClick));
        this.setList (list);
    }

    #fill () {
        this.getPopup ().innerHTML = "";

        this.#list.forEach ((item) => {
            const li = document.createElement ("li");
            li.classList = "form-select-list-item";

            const btn = document.createElement ("button");
            btn.type = "button";
            btn.classList = `btn btn-select ${item.classList}`;
            btn.dataset.value = item.name;
            btn.dataset.id = item.id;

            if (item.icon) btn.innerHTML = item.icon + item.name;
            else if (item.color) {
                const color = document.createElement ("div");

                color.classList = "project-color project-color-s";
                color.style.backgroundColor = item.color;

                btn.appendChild (color);
                btn.innerHTML += item.name;
            }

            li.appendChild (btn);
            this.getPopup ().appendChild (li);
        });
    }

    setList (list) {
        this.#list = list;
        this.#fill ();
    }

    #onClick (e, cb) {
        const target = e.target;
        if (target.classList.contains ("btn-select")) {
            cb (e);
            this.close ();
        }
    }
}