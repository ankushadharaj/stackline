import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootProductSaga } from './product/product.sagas';
import { productSalesReducer } from './product/product.reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    product: productSalesReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => {
        const customMiddleware = getDefaultMiddleware().concat(sagaMiddleware as any);
        return customMiddleware;
      }
})

sagaMiddleware.run(rootProductSaga);

type RootState = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch

export { store };
export type { RootState, Dispatch }
