import { createAction } from '@reduxjs/toolkit';

import { ProductSalesResponseType } from '../../Types/GetProductSalesDetails.type';

const GET_PRODUCT_SALES_REQUEST = 'GET_PRODUCT_SALES_REQUEST';
const GET_PRODUCT_SALES_SUCCESS = 'GET_PRODUCT_SALES_SUCCESS';
const GET_PRODUCT_SALES_FAILURE = 'GET_PRODUCT_SALES_FAILURE';


const getProductSalesRequest = createAction(GET_PRODUCT_SALES_REQUEST);

const getProductSalesSuccess = createAction<ProductSalesResponseType>(GET_PRODUCT_SALES_SUCCESS);

const getProductSalesFailure = createAction<any>(GET_PRODUCT_SALES_FAILURE);

export { getProductSalesRequest, getProductSalesSuccess, getProductSalesFailure }



