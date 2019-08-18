import * as actions from "../actions/action-types";
export function read() {
    return {
        type: actions.READ
    }
}

export function setError() {
    return {
        type: actions.READ_FAILED,
        data: undefined
    }
}

export function setSuccess(list) {
    return {
        type: actions.READ_SUCCESS,
        data: list
    }
}