import { call, put, takeLatest, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as readActions from "../actions/read-actions";
import { Alert } from 'react-native'
import * as clients_json from '../assets/clients.json';
function* read() {
    if (!clients_json || !clients_json.data || clients_json.data == []) {
        yield put(readActions.setError());
    }
    else {
        yield put(readActions.setSuccess(clients_json.data));
    }
}

export function* readFlow() {
    yield takeLatest(actions.READ, read);
}