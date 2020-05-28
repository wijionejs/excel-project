import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@core/constants";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: "Toolbar",
            ...options,
            listeners: ['click'],
            subscribe: ['currentStyles'],
        });
    }

    prepare() {
        this.initState(defaultStyles);
    }

    get template() {
        console.log('render');
        return createToolbar(this.state);
    }

    toHTML() {
        return this.template;
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles);
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data('type') === 'toolbar-button') {
            const property = JSON.parse($target.data('value'));
            this.$emit('toolbar:select-style', property);
        }
    }
}
