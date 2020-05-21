import {range} from "@core/utils.";

export function isResize(event) {
    return !!event.target.dataset.resize;
}

export function isSelect(event) {
    return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
    const current = $current.id(true);
    const target = $target.id(true);

    const rows = range(current.row, target.row);
    const cols = range(current.col, target.col);

    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export function nextSelector(key, {row, col}) {
    switch (key) {
    case 'ArrowDown':
    case 'Enter':
        row++;
        break;
    case 'ArrowRight':
    case 'Tab':
        col++;
        break;
    case 'ArrowUp':
        row--;
        break;
    case 'ArrowLeft':
        col--;
        break;
    }
    return `[data-id="${row}:${col}"]`;
}
