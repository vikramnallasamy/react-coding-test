import { call, put, takeEvery } from 'redux-saga/effects'
import { LOGIN_SUCCESS, LOGIN_FAILURE,LOGIN } from '../constants/constants'


function* logIn(action) {
  console.log('login=', action);
  try {
    const res = yield call(fetch, 'http://localhost:5001/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      });

    const json = yield call([res, 'json']);
    console.log('response in saga:')
    console.log(json)
    if (json.accessToken)
      yield put({type: LOGIN_SUCCESS, payload: json});
    else
      yield put({type: LOGIN_FAILURE, payload: json.response});
  } catch (e) {
    yield put({type: LOGIN_FAILURE, message: e.message});
  }
}


function* LoginPageSagas() {
  yield takeEvery(LOGIN, logIn);
}

export default LoginPageSagas;