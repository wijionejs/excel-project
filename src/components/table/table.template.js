const CODES = {
    A: 65,
    Z: 90,
};

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function createRow(idx, content) {
    return `
        <div class="row">
            <div class="row-info">${idx ? idx : ''}</div>
            <div class="row-data">${content}</div>   
        </div>     
    `;
}

function toColumn(letter) {
    return `
        <div class="column">${letter}</div>
    `;
}

function toCell(content = '') {
    return `
        <div class="cell" contenteditable>${content}</div>
    `;
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
            .map(toCell)
            .join('');
        const row = createRow(i + 1, cells);
        rows.push(row);
    }

    return rows.join('');
}
