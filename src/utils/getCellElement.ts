import { getReadableDate, getReadableCash } from "./convertToReadableUtils";

export function getCellElement(column: string, value: string | number): string | number {
    const cellValue: Record<string, string | number> = {
        weekEnding: getReadableDate(value),
        retailSales: getReadableCash(value),
        wholesaleSales: getReadableCash(value),
        unitsSold: value,
        retailerMargin: getReadableCash(value)
    }

    return cellValue[column];
}