export default class Store {
    #dataName;
    #currentId;
    #list;

    constructor (dataName) {
        const storageItem = localStorage.getItem (dataName);

        this.#dataName = dataName;
        this.#currentId = 0;
        this.#list = storageItem ? JSON.parse (storageItem) : [];

        this.#list.forEach ((item) => {
            const id = item.id;
            if (id >= this.#currentId) this.#currentId = id + 1;
        });
    }

    save () {
        localStorage.setItem (this.#dataName, JSON.stringify (this.#list));
    }

    add (item) {
        this.#list.push ({ ...item, id : item.id || this.#currentId });
        this.#currentId ++;
        this.save ();
    }

    update (id, updatedItem) {
        const index = this.#list.findIndex ((item) => item.id == id);
        if (index !== -1) {
            this.#list[index] = updatedItem;
            this.save ();
        }
    }

    delete (id) {
        const index = this.#list.findIndex ((item) => item.id == id);
        if (index !== -1) {
            this.#list.splice (index, 1);
            this.save ();
        }
    }

    filter (func) {
        this.#list = this.#list.filter (func);
        this.save ();
    }

    getList () {
        return this.#list;
    }

    getCurrentId () {
        return this.#currentId;
    }
}