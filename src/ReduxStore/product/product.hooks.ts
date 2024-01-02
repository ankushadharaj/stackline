import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../rootReducer';
import { getProductSalesRequest } from './product.actions';

/**
 *  All the hooks used return an object containing:
 *      * data: data corresponding to hook name will be stored
 *      * isLoading: provides the loading state to wait while data is being fetched
 *      * isError: provides information regarding if there was an error during the call
 *      * error: if there has been an error, the error is stored to be used for error handling
 * 
 *  NOTE:  `isError` and `Error` states are available to be used, but these states are not used currently in this project.    
 */

function useGetProductSalesDetails() {
    const dispatch = useDispatch();

    const { data: productSalesDetails, isLoading, isError, error } = useSelector((state: RootState) => state.product);
    useEffect(() => {
        dispatch({ type: getProductSalesRequest.type });
    }, [dispatch]);

    return { productSalesDetails, isLoading, isError, error };
}

function useGetProductDetails(id: string) {
    const { productSalesDetails, isLoading, isError, error } = useGetProductSalesDetails();

    const productDetails = useMemo(() => {
        const saleDetail = productSalesDetails?.find((saleDetails) => saleDetails.id === id);
        return {
            title: saleDetail?.title,
            subtitle: saleDetail?.subtitle,
            image: saleDetail?.image,
            tags: saleDetail?.tags
        }
    },[productSalesDetails, id]);

    return { productDetails, isLoading, isError, error };
}

function useGetProductSales(id: string) {
    const { productSalesDetails, isLoading, isError, error } = useGetProductSalesDetails();
    const productSales = useMemo(() => {
        const saleDetail = productSalesDetails?.find((saleDetails) => saleDetails.id === id);
        return saleDetail?.sales;
    },[productSalesDetails, id]);

    return { productSales, isLoading, isError, error };
}



export { useGetProductSalesDetails, useGetProductDetails, useGetProductSales };

