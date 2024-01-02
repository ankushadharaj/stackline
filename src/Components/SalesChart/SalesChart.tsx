import React, { useMemo, useState } from 'react';
import { XYPlot, LineSeries, Crosshair, LineSeriesPoint, MarkSeries } from 'react-vis';
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
            <XYPlot  
                className="sales-chart"
                width={1425} 
                height={400} 
                strokeWidth={3}
                yDomain={[0,1500000]}
                onMouseLeave={() => {
                    setCrosshairValues([]);
                    setCrosshairIndex(undefined);
                }}
            >
                <LineSeries 
                    data={retailSalesData} 
                    curve={curveCatmullRom.alpha(0.3)} 
                    color="#969696" 
                    onNearestX={(value, { index }) => {
                        setCrosshairValues([value])
                        setCrosshairIndex(index)
                    }}
                />
                <LineSeries 
                    data={wholesaleSalesData}
                    curve={curveCatmullRom.alpha(0.3)}
                    color="#03a9f4"
                    onNearestX={(value, { index }) => {
                        setCrosshairValues([value])
                        setCrosshairIndex(index)
                    }}    
                />
                <Crosshair values={crosshairValues}>
                    {crosshairValues.length > 0 && (
                        <div className="crosshair-overlay">
                            {crosshairValues.map((value, index) => (
                                <div key={index}>
                                    <div>Week: {getReadableDate(value.x)}</div>
                                    <div className="retail-value">Retail Sales: {getReadableCash(value.y)}</div>
                                    <div className="wholesale-value">Wholesale Sales: {getReadableCash(wholesaleSalesData[index].y)}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </Crosshair>
                {crosshairIndex !== undefined && <MarkSeries data={[retailSalesData[crosshairIndex]]} color="#969696" />}
                {crosshairIndex !== undefined && <MarkSeries data={[wholesaleSalesData[crosshairIndex]]} color= "#03a9f4"/>}
            </XYPlot>
            <div className="sales-chart-x-axis">
                {labels.map((label, index) => {
                    const month = label.split('').splice(0,3).join('').toUpperCase();
                    return <div className="sales-chart-label" key={index}>{month}</div>
                })}
            </div>
        </div>
    )
}