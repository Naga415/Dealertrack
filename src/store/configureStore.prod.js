import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import index from '../sagas/index';


export default function configureStore(initialState) {
  const sagaMiddleWare = createSagaMiddleware();
  const store= createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleWare,thunk)
    )
  );
  sagaMiddleWare.run(index);
  return store;
}
