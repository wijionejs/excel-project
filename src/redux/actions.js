import {
    APPLY_STYLE,
    CHANGE_OPENED_DATE,
    CHANGE_STYLES,
    CHANGE_TABLE_NAME,
    CHANGE_TEXT,
    TABLE_RESIZE,
} from "@/redux/types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data,
    };
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data,
    };
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data,
    };
}

export function applyStyles(data) {
    return {
        type: APPLY_STYLE,
        data,
    };
}

export function changeTableName(data) {
    return {
        type: CHANGE_TABLE_NAME,
        data,
    };
}

export function changeOpenedDate() {
    return {
        type: CHANGE_OPENED_DATE,
        data: new Date().toJSON(),
    };
}
