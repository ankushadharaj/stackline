import { put, takeLatest, all } from 'redux-saga/effects';

import { ProductSalesResponseType } from '../../Types/GetProductSalesDetails.type';
import { InitialState } from '../../Types/ReduxStore.type';
import { axiosClient } from '../../Axios/axiosClient';
import { getProductSalesRequest, getProductSalesSuccess, getProductSalesFailure } from './product.actions';


function* getProductSalesDetails() {
    try {
        const res: InitialState<ProductSalesResponseType> = yield axiosClient.get('getProductSalesDetails');
        yield put({ type: getProductSalesSuccess.type, payload: res.data });
    } catch (error: any) {
        yield put({ type: getProductSalesFailure.type, payload: error.message})
    }
}

function* watchGetProductSalesDetails() {
    yield takeLatest(getProductSalesRequest.type, getProductSalesDetails);
}

export function* rootProductSaga() {
    yield all([watchGetProductSalesDetails()]);
}

