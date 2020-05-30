export function createHeader({tableName}) {
    const title = tableName || 'Новая таблица';
    return `
            <input type="text" class="input second" value="${title}">
            <div>
                <div class="button" data-value="delete">
                        <span class="material-icons" data-value="delete">
                            delete
                        </span>
                </div>
                <div class="button" data-value="exit">
                        <span class="material-icons" data-value="exit">
                            exit_to_app
                        </span>
                </div>
            </div>
        `;
}
