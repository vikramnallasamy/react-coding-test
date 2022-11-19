import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { LOGIN_SUCCESS, LOGIN_FAILURE,LOGIN, GET_PROFILE } from './constants'


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
      yield put({type: LOGIN_FAILURE, payload: json.message});
  } catch (e) {
    yield put({type: LOGIN_FAILURE, message: e.message});
  }
}

const fetchProfile = async (action) => {
  try {
    const response = await fetch('http://localhost:5000/getProfile',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${action.payload}`
      }
    })
    const data = await response.json()
    return data
  }
  catch(error) {
    return error
  }
}

function* getProfile(action) {
  const data = yield fetchProfile(action)
  console.log('getProfile Saga : ',data)
  yield put({type:GET_PROFILE, payload: data})
}

function* LoginPageSagas() {
  yield takeEvery(LOGIN, logIn);
}

function* getProfileSaga() {
  yield takeLatest(GET_PROFILE, getProfile);
}

export default function* rootSaga(){
  yield all([LoginPageSagas(), getProfileSaga()])
}