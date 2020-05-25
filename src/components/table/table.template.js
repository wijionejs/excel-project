const CODES = {
    A: 65,
    Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function widthFromState(state, idx) {
    return (state.colState[idx] || DEFAULT_WIDTH) + 'px';
}

function heightFromState(state, idx) {
    return (state.rowState[idx] || DEFAULT_HEIGHT) + 'px';
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function createRow(idx, content, height) {
    const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable" data-row-idx="${idx}" style="height: ${height};">
            <div class="row-info">
                ${idx ? idx : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>   
        </div>
    `;
}

function toColumn(state) {
    return function(letter, idx) {
        const width = widthFromState(state, idx);
        return `
        <div class="column" data-column-idx="${idx}" data-type="resizable" style="width: ${width};">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
    };
}

function toCell(row, state) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const width = widthFromState(state, col);
        const content = state.dataState[id] || '';
        return `
            <div class="cell" 
                data-cell-idx="${col}" 
                data-id="${id}" 
                contenteditable
                data-type="cell"
                style="width: ${width};"
            >${content}</div>
        `;
    };
}

export function createTable(rowsCount = 15, state) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn(state))
        .join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(i, state))
            .join('');
        const height = heightFromState(state, i+1);
        const row = createRow(i + 1, cells, height);
        rows.push(row);
    }

    return rows.join('');
}
