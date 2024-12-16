export default class Dialog {
    constructor (dialog, form) {
        this.dialog = document.querySelector (dialog);
        this.form = document.querySelector (form);

        this.current = null;

        this.submitBtn = this.form.querySelector ('button[type = "submit"]');
        this.cancelBtn = this.form.querySelector (".btn-cancel");

        this.cancelBtn.addEventListener ("click", () => this.onCancel ());
        this.form.addEventListener ("submit", (e) => this.onSubmit (e));

        this.dialog.addEventListener ("click", (e) => {
            const rect = e.target.getBoundingClientRect ();
            if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY) this.close ();
        });
    }

    open (object = null) {
        this.current = object;
        this.dialog.showModal ();
    }

    close () {
        this.dialog.close ();
    }

    onSubmit (e) {
        e.preventDefault ();
        throw new Error ("onSubmit method must be implemented in the subClass");
    }

    onCancel () {
        this.close ();
    }
}