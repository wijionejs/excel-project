const CODES = {
    A: 65,
    Z: 90,
};

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function createRow(idx, content) {
    const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${idx ? idx : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>   
        </div>
    `;
}

function toColumn(letter, idx) {
    return `
        <div class="column" data-column-idx="${idx}" data-type="resizable">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function toCell(row) {
    return function(content = '', col) {
        return `
            <div class="cell" 
                data-cell-idx="${col}" 
                data-id="${row}:${col}" 
                contenteditable
                data-type="cell"
            >${content}</div>
        `;
    };
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(i))
            .join('');
        const row = createRow(i + 1, cells);
        rows.push(row);
    }

    return rows.join('');
}
