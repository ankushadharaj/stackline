import { createReducer } from '@reduxjs/toolkit';
import { ProductSalesResponseType } from '../../Types/GetProductSalesDetails.type';
import { InitialState } from '../../Types/ReduxStore.type';
import { getProductSalesRequest, getProductSalesSuccess, getProductSalesFailure } from './product.actions';


const initialState: InitialState<ProductSalesResponseType> = {
    data: undefined,
    isLoading: false,
    isError: false,
    error: null
};

export const productSalesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getProductSalesRequest, (state) => ({...state, isLoading: true, isError: false, error: null}))
        .addCase(getProductSalesSuccess, (state, action) => ({...state, data: action.payload, isLoading: false, isError: false, error: null}))
        .addCase(getProductSalesFailure, (state, action) => ({...state, isLoading: false, isError: false, error: action.payload}));
});