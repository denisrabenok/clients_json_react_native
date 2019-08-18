import * as actions from "../actions/action-types";

export default function readReducer(state, action = {}) {
    switch (action.type) {
        case actions.READ_FAILED:
            return state.set('data', undefined);
        case actions.READ_SUCCESS: {
            return state.withMutations(state => state
                .set('data', action.data));
        }
        default:
            return state
    }
}