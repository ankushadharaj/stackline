import React, { useMemo, useState } from 'react';
import { LineSeries, Crosshair, LineSeriesPoint, MarkSeries, FlexibleWidthXYPlot } from 'react-vis';
import { curveCatmullRom } from 'd3-shape';

import { LoadingElement } from '../LoadingElement/LoadingElement';
import { useGetProductSales } from '../../ReduxStore/product/product.hooks';
import { getChartData } from '../../utils/getChartData';
import { getReadableCash, getReadableDate } from '../../utils/convertToReadableUtils';

import './SalesChart.css';

interface SalesChartInterface {
    productId: string
}
export function SalesChart({ productId }: SalesChartInterface) {
    const { productSales, isLoading } = useGetProductSales(productId);

    const { labels, retailSalesData, wholesaleSalesData } = useMemo(() => getChartData(productSales!), [productSales]);

    const [crosshairValues, setCrosshairValues] = useState<LineSeriesPoint[]>([]);
    const [crosshairIndex, setCrosshairIndex] = useState<number | undefined>();

    return (
        <div className="sales-chart-container">
            <div className="sales-chart-title">Retail Sales</div>
            {isLoading && <LoadingElement />}
            <div className="sales-chart" >
                <FlexibleWidthXYPlot  
                    height={400} 
                    strokeWidth={3}
                    yDomain={[0,1500000]} /* Ideally the upper limit would be based on max value of either retail sale or wholesale sale */
                    onMouseLeave={() => {
                        setCrosshairValues([]);
                        setCrosshairIndex(undefined);
                    }}
                >
                    <LineSeries 
                        data={retailSalesData} 
                        curve={curveCatmullRom.alpha(0.3)} 
                        color="#03a9f4"
                        onNearestX={(value, { index }) => {
                            setCrosshairValues([value])
                            setCrosshairIndex(index)
                        }}
                    />
                    <LineSeries 
                        data={wholesaleSalesData}
                        curve={curveCatmullRom.alpha(0.3)}
                        color="#969696"   
                    />
                    <Crosshair values={crosshairValues}>
                        {crosshairValues.length > 0 && (
                            <div className="crosshair-overlay">
                                {crosshairValues.map((value, index) => (
                                    <div key={index}>
                                        <div>Week: {getReadableDate(value.x)}</div>
                                        <div className="retail-value">Retail Sales: {getReadableCash(value.y)}</div>
                                        <div className="wholesale-value">Wholesale Sales: {getReadableCash(value.sale.wholesaleSales)}</div>
                                        <div>Units Sold: {value.sale.unitsSold}</div>
                                        <div>Retailer Margin: {getReadableCash(value.sale.retailerMargin)}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Crosshair>
                    {crosshairIndex !== undefined && <MarkSeries data={[retailSalesData[crosshairIndex]]} color="#03a9f4" />}
                    {crosshairIndex !== undefined && <MarkSeries data={[wholesaleSalesData[crosshairIndex]]} color="#969696" />}
                </FlexibleWidthXYPlot>
            </div>
            <div className="sales-chart-x-axis">
                <div className="sales-chart-x-axis-labels">
                    {labels.map((label, index) => {
                        const month = label.split('').splice(0,3).join('').toUpperCase();
                        return <div className="sales-chart-label" key={index}>{month}</div>
                    })}
                </div>
            </div>                           
        </div>
    )
}