import React from 'react';

import PageLayout from '../PageLayout';
import { ProductDetails } from '../../Components/ProductDetails/ProductDetails';
import { SalesChart } from '../../Components/SalesChart/SalesChart';
import { SalesTable } from '../../Components/SalesTable/SalesTable';

import './ProductSalesDetails.css'

// Ideally the productId would be obtained from params
const productId = 'B007TIE0GQ'

export default function ProductSalesDetails() {
    return (
        <PageLayout>
            <div className="product-container">
                <div>
                    <ProductDetails productId={productId}/>
                </div>
                <div className="sales-container">
                    <SalesChart productId={productId} />
                    <SalesTable productId={productId}/>
                </div>
            </div>
        </PageLayout>
    )
}