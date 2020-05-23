import {TABLE_RESIZE} from "@/redux/types";

export function rootReducer(state, action) {
    let prevState;
    switch (action.type) {
    case TABLE_RESIZE:
        if (action.data.type === 'col') {
            prevState = {...state.colState} || {};
            prevState[action.data.id] = action.data.value;
            return {
                ...state,
                colState: prevState,
            };
        } else {
            prevState = {...state.rowState} || {};
            prevState[action.data.id] = action.data.value;
            return {
                ...state,
                rowState: prevState,
            };
        }
    default:
        return state;
    }
}
