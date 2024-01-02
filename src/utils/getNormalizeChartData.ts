import type { LineSeriesPoint } from "react-vis";

export function getNormalizeChartData(salesData: LineSeriesPoint[]) {
    const minSales = Math.min(...salesData.map((sale) => sale.y));
    const maxSales = Math.max(...salesData.map((sale) => sale.y));

    const normalizedSalesData = salesData.map((sale) => ({
        x: sale.x,
        y: (sale.y - minSales)/(maxSales - minSales),
        label: sale.label
    }));

    return normalizedSalesData;
}