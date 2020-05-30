import {ExcelComponent} from "@core/ExcelComponent";
import {createHeader} from "@/components/header/createHeader";
import {$} from "@core/dom";
import * as actions from "@/redux/actions";
import {ActiveRoute} from "@core/router/ActiveRoute";
import {deleteFromStorage} from "@core/utils.";

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input', 'click'],
        });
    }

    toHTML() {
        return createHeader(this.store.getState());
    }

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(actions.changeTableName($target.input()));
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data('value') === 'delete') {
            const decision = confirm('Вы уверены что хотите удалить таблицу?');
            if (!decision) return;
            const id = ActiveRoute.param;
            deleteFromStorage(`excel:${id}`);
            ActiveRoute.navigate('');
        } else if ($target.data('value') === 'exit') {
            ActiveRoute.navigate('');
        }
    }
}
