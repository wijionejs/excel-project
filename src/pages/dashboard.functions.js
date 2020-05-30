function toHTML(table) {
    return `
        <li class="db__record">
            <a href="">${table.tableName}</a>
            <strong>06.12.2020</strong>
        </li>
    `;
}

function getAllTables() {
    const items = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('excel')) {
            items.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    return items;
}

export function createTableList() {
    const tables = getAllTables();

    if (!tables.length) {
        return `<p>Вы ещё не создали ни одной таблицы</p>`;
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${tables.map(toHTML).join('')}
        </ul>
    `;
}
