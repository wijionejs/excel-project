import {storage} from "@core/utils.";
import {defaultStyles} from "@core/constants";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    dataStyles: {},
    currentText: '',
    currentStyles: defaultStyles,
};

const normalize = s => ({...s, currentStyles: {}, currentText: ''});

export const initialState = normalize(storage('excel-state')) || defaultState;
