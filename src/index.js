import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers/reducers';
import App from './App';
import rootSaga from './sagas/sagas';
import { BrowserRouter } from 'react-router-dom';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);
render(
   <Provider store={store}>
     <BrowserRouter>
        <App />
     </BrowserRouter>
   </Provider>,
document.getElementById('root'),
)