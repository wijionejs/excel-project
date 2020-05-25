import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
            subscribe: ['currentText'],
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" id="formula" contenteditable spellcheck="false">

            </div>
        `;
    }

    init() {
        super.init();
        this.$formula = $.find('#formula');
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text());
        });
    }

    onInput(event) {
        const text = event.target.textContent.trim();
        this.$emit('formula:input', text);
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula:enter');
        }
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText);
    }
}
