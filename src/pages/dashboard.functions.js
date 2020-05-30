import {storage} from "@core/utils.";

function toHTML(key) {
    const table = storage(key);
    const param = getParam(key);
    const date = new Date(table.openedDate).toLocaleString();
    return `
        <li class="db__record">
            <a href="/#excel/${param}">${table.tableName}</a>
            <strong>${date}</strong>
        </li>
    `;
}

function getParam(key) {
    return key.split(':')[1];
}

function getAllKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('excel')) {
            keys.push(key);
        }
    }

    return keys;
}

export function createTableList() {
    const keys = getAllKeys();

    if (!keys.length) {
        return `<p>Вы ещё не создали ни одной таблицы</p>`;
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${[...keys].reverse().map(toHTML).join('')}
        </ul>
    `;
}
