import {
    APPLY_STYLE,
    CHANGE_OPENED_DATE,
    CHANGE_STYLES,
    CHANGE_TABLE_NAME,
    CHANGE_TEXT,
    TABLE_RESIZE,
} from "@/redux/types";

export function rootReducer(state, action) {
    let prevState;
    let field;
    let value;
    switch (action.type) {
    case TABLE_RESIZE:
        field = action.data.type === 'row' ? 'rowState' : 'colState';
        prevState = {...state[field]} || {};
        prevState[action.data.id] = action.data.value;
        return {
            ...state,
            [field]: prevState,
        };
    case CHANGE_TEXT:
        prevState = state.dataState || {};
        prevState[action.data.id] = action.data.value;
        return {
            ...state,
            dataState: prevState,
            currentText: action.data.value,
        };
    case CHANGE_STYLES:
        return {
            ...state,
            currentStyles: action.data,
        };
    case APPLY_STYLE:
        value = state.dataStyles || {};
        action.data.ids.forEach(id => {
            value[id] = {...value[id], ...action.data.value};
        });
        return {
            ...state,
            dataStyles: {...value},
            currentStyles: {...state.currentStyles, ...action.data.value},
        };
    case CHANGE_TABLE_NAME:
        return {
            ...state,
            tableName: action.data,
        };
    case CHANGE_OPENED_DATE:
        return {
            ...state,
            openedDate: action.data,
        };
    default:
        return state;
    }
}
