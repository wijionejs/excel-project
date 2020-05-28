import {storage} from "@core/utils.";
import {defaultStyles, defaultTableName} from "@core/constants";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    dataStyles: {},
    currentText: '',
    tableName: defaultTableName,
    currentStyles: defaultStyles,
};

const normalize = s => ({...defaultState, ...s, currentStyles: {}, currentText: ''});

export const initialState = normalize(storage('excel-state')) || defaultState;
