import Dialog from "./dialog";
import tasks from "../../store/tasks";
import visibility from "../../utils/visibility";

class AutoDeleteDialog extends Dialog {
    constructor () {
        super (".dialog-auto-delete", ".form-auto-delete");

        this.numberInput = this.form.querySelector (".form-input-auto-delete-number");
        this.unitInput = this.form.querySelector (".form-input-auto-delete-unit");
        this.error = this.form.querySelector (".form-error");

        this.submitBtn.disabled = true;

        this.numberInput.addEventListener ("input", () => this.validateInputs ());
        this.unitInput.addEventListener ("change", () => this.validateInputs ());
    }

    open (object) {
        console.log ("autoDeleteDialog: just opened the dialog.");

        super.open (object);
        
        this.numberInput.value = "";
        this.unitInput.value = "";
        visibility.hide (this.error);
        this.submitBtn.disabled = true;

        const button = document.querySelector (".btn.btn-timer");
        button.classList.remove ("popup-active");
    }

    validateInputs () {
        const numberValue = this.numberInput.value.trim ();
        const unitValue = this.unitInput.value;

        if (numberValue && unitValue) {
            this.submitBtn.disabled = false;
            visibility.hide (this.error);
        }
        else {
            this.submitBtn.disabled = true;

            if (numberValue || unitValue) visibility.show (this.error);
            else visibility.hide (this.error);  
        }
    }

    onSubmit (e) {
        e.preventDefault ();

        const numberValue = parseInt (this.numberInput.value.trim (), 10);
        const unitValue = this.unitInput.value;

        if (!numberValue || !unitValue) {
            visibility.show (this.error);
            return;
        }

        console.log (`autoDeleteDialog: Set auto-delete for ${numberValue} ${unitValue}`);

        this.autoDeleteTime = this.calculateMs (numberValue, unitValue);
        window.autoDeleteTime = this.autoDeleteTime;

        console.log (`autoDeleteDialog: Auto-delete timer set for ${window.autoDeleteTime} ms`);
        this.showPopup (numberValue, unitValue);
        console.log ("autoDeleteDialog: closing dialog");
        this.close ();
    }

    calculateMs (value, unit) {
        const unitToMs = {
            seconds : 1000,
            minutes : 1000 * 60,
            hours : 1000 * 60 * 60,
            days : 1000 * 60 * 60 * 24,
            weeks : 1000 * 60 * 60 * 24 * 7,
            months : 1000 * 60 * 60 * 24 * 30,
            years : 1000 * 60 * 60 * 24 * 365
        };

        return value * (unitToMs[unit] || 0);
    }

    showPopup (value, unit) {
        console.log ("autoDeleteDialog: showing popup");

        const button = document.querySelector (".btn.btn-timer");
        button.classList.add ("popup-active");

        button.style.setProperty ("--popup-content", `"Timer set to ${value} ${unit}`);        

        setTimeout (() => {
            button.classList.remove ("popup-active");
        }, 30000);
    }
}

export default new AutoDeleteDialog ();