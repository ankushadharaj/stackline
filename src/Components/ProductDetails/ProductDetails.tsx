import React from 'react';

import { LoadingElement } from '../LoadingElement/LoadingElement';
import { useGetProductDetails } from '../../ReduxStore/product/product.hooks';

import './ProductDetails.css';
export interface ProductDetailsInterface {
    productId: string;
}

export function ProductDetails({ productId }: ProductDetailsInterface) {
    const { productDetails, isLoading, isError } = useGetProductDetails(productId);

    return (
        <div className="product-details-container">
            {isLoading && <LoadingElement />}
            {!isLoading && !isError && 
                <>
                    <img src={productDetails.image} alt={productDetails.title} className="product-image" />
                    <div className="product-title"> 
                        {productDetails.title}
                    </div>
                    <div className="product-subtitle">
                        {productDetails.subtitle}
                    </div>
                    <div className="product-tags">
                        {productDetails.tags?.map((tag, index) => {
                            return <span className="tag" key={index}>{tag}</span>
                        })}
                    </div>
                </>
            }
        </div>
    )
}