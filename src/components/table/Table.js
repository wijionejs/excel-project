import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resize} from "@/components/table/table.resize";
import {
    isResize,
    isSelect,
    matrix,
    nextSelector,
} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import * as actions from "@/redux/actions";
import {defaultStyles} from "@core/constants";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        });
    }

    toHTML() {
        return createTable(40, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        this.selectCell($.find('[data-id="0:0"]'));

        this.$on('formula:input', (text) => {
            this.updateTextInStore(text);
            this.selection.current.text(text);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });

        this.$on('toolbar:select-style', styles => {
            this.selection.applyStyle(styles);
            this.$dispatch(actions.applyStyles({
                value: styles,
                ids: this.selection.selectedIds,
            }));
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }


    async resizeTable(event) {
        try {
            const data = await resize(event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.log('Resize error: ', e.message);
        }
    }

    onMousedown(event) {
        if (isResize(event)) {
            this.resizeTable(event);
        } else if (isSelect(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix(this.selection.current, $target)
                    .map(id => $.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            } else if (event.ctrlKey) {
                this.selection.select($target, true);
            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter',
            'Tab',
        ];

        const {key} = event;

        if (!keys.includes(key) || event.shiftKey) return;
        event.preventDefault();
        const id = this.selection.current.id(true);
        const $cell = $.find(nextSelector(key, id));
        if (!$cell.$el) return;
        this.selectCell($cell);
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: value,
        }));
    }
}
