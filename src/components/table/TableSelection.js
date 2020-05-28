export class TableSelection {
    static className = 'selected';
    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el, ctrl = false) {
        if (!ctrl) this.clear();
        this.current = $el;
        this.group.push($el);
        $el.focus().addClass(TableSelection.className);
    }

    selectGroup($cells) {
        this.clear();
        $cells.forEach($cell => this.group.push($cell));
        this.group.forEach($cell => $cell.addClass(TableSelection.className));
    }

    get selectedIds() {
        return this.group.map(c => c.id());
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className));
        this.group = [];
    }

    applyStyle(styles) {
        this.group.forEach($cell => {
            $cell.setStyles(styles);
        });
    }
}
