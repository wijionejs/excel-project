import {clone} from "@core/utils.";
import {defaultStyles, defaultTableName} from "@core/constants";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    dataStyles: {},
    currentText: '',
    tableName: defaultTableName,
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON(),
};

const normalize = s => ({...defaultState, ...s, currentStyles: {}, currentText: ''});

export function getInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}
