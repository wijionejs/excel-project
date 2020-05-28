import {ExcelComponent} from "@core/ExcelComponent";
import {createHeader} from "@/components/header/createHeader";
import {$} from "@core/dom";
import * as actions from "@/redux/actions";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input'],
        });
    }

    toHTML() {
        return createHeader(this.store.getState());
    }

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(actions.changeTableName($target.input()));
    }
}
