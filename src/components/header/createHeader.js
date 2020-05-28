export function createHeader({tableName}) {
    const title = tableName || 'Новая таблица';
    return `
            <input type="text" class="input second" value="${title}">
            <div>
                <div class="button">
                        <span class="material-icons">
                            delete
                        </span>
                </div>
                <div class="button">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                </div>
            </div>
        `;
}
