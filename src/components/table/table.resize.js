import {$} from "@core/dom";

export function resize(type, event) {
    const types = {
        row: {
            minSizeType: 'minHeight',
            sizeType: 'height',
            resizeSide: 'bottom',
            cursorPos: 'clientY',
        },
        col: {
            minSizeType: 'minWidth',
            sizeType: 'width',
            resizeSide: 'right',
            cursorPos: 'clientX',
        },
    };
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const minSize = parseInt($parent.css(types[type].minSizeType));
    const columnIdx = $parent.data('column-idx');

    $resizer
        .css('opacity', '1')
        .css('zIndex', '250')
        .css(types[type].resizeSide === 'right'
            ? 'bottom'
            : 'right', '-5000px');

    const move = (e) => {
        const delta = coords[types[type].resizeSide] - e[types[type].cursorPos];
        if (delta + minSize > coords[types[type].sizeType]) return;
        $resizer.css(types[type].resizeSide, delta + 'px');
    };

    const up = (e) => {
        $resizer.clearCss();
        $('body').off('mousemove', move).off('mouseup', up);
        const delta = coords[types[type].resizeSide] - e[types[type].cursorPos];
        const newSize = coords[types[type].sizeType] - delta > minSize
            ? coords[types[type].sizeType] - delta
            : minSize;
        $parent.css(types[type].sizeType, newSize + 'px');
        if (type === 'col') {
            $.findAll(`[data-cell-idx="${columnIdx}"]`)
                .forEach(cell => cell.css('width', newSize + 'px'));
        }
    };

    $('body')
        .on('mousemove', move)
        .on('mouseup', up);
}
