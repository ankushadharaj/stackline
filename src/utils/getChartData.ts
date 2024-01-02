import type { LineSeriesPoint } from "react-vis";

import { Sales } from "../Types/GetProductSalesDetails.type";

function getMonth(week: Date) {
    const month = week.toLocaleString('en-US', { month: 'long' });
    return month
}

export function getChartData(productSales: Sales) {
    const retailSalesData: LineSeriesPoint[] = [];
    const wholesaleSalesData: LineSeriesPoint[] = [];
    const labels: string[] = []

    productSales?.forEach((sale) => {
        const week = new Date(sale.weekEnding + 'T00:00:00')
        const label = getMonth(week);
        retailSalesData.push({
            x: week.getTime(),
            y: sale.retailSales
        });
        wholesaleSalesData.push({
            x: week.getTime(),
            y: sale.wholesaleSales
        })
        if(!labels.includes(label)) labels.push(label);
    });
    
    return { labels, retailSalesData, wholesaleSalesData };
}