import { autoRehydrate, persistStore } from "redux-persist-immutable";
import { combineReducers } from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import { REHYDRATE } from "redux-persist/constants";
import Immutable from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { AsyncStorage } from "react-native";
import readReducer from "../reducers/readReducer";

import createSagaMiddleware from "redux-saga";

import * as readSaga from "../saga/read-saga";


const combinedReducers = combineReducers({
    clients_list: readReducer
});

const initialState = new Immutable.Map({
    clients_list: Immutable.Map({
        data: undefined
    })
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combinedReducers,
        initialState,
        compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({ log: true })));

    persistStore(
        store,
        {
            storage: AsyncStorage,
            blacklist: ['root'],
        }
    );
    return {
        ...store, runSaga: [
            sagaMiddleware.run(readSaga.readFlow)
        ]
    };
}