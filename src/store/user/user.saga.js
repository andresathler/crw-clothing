import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";
import { createUserDocumentFromAuth, getCurrentUser } from "../../utils/firebase/firebase.utils";
import { signInFailed } from "./user.action";

export function* getSnapshotFroUserAuthentication(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log(userSnapshot);
        console.log(userSnapshot.data());
    } catch(error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return
        yield call(getSnapshotFroUserAuthentication, userAuth);
    } catch (error) {

    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
    yield all([call(onCheckUserSession)]);
}