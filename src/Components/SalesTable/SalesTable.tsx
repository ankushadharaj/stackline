import React, { useState, useMemo, useEffect } from 'react';
import { 
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    ColumnDef,
    SortingState,
} from '@tanstack/react-table'; 

import { ColumnHeader } from './ColumnHeader/ColumnHeader';
import { LoadingElement } from '../LoadingElement/LoadingElement';
import { useGetProductSales } from '../../ReduxStore/product/product.hooks';
import { getCellElement } from '../../utils/getCellElement';
import { COLUMNS } from '../../Constants/Table.constants';
import { Sales, Sale } from '../../Types/GetProductSalesDetails.type';

import './SalesTable.css';

interface SalesTableInterface {
    productId: string;
}

export function SalesTable({ productId }: SalesTableInterface) { 
    const { productSales, isLoading } = useGetProductSales(productId);

    const [tableData, setTableData] = useState<Sales>([]);

    useEffect(() => {
        const data = productSales ? productSales : [] as Sales
        setTableData(data)
    },[productSales])

    const columns = useMemo<ColumnDef<Sale, string | number>[]>(() => COLUMNS.map((column) => {
        return {
            id: column.columnId,
            accessorKey: column.columnId,
            header: column.columnName,
            cell: (props) => {
                return <div>{getCellElement(column.columnId, props.getValue())}</div>
            },
            enableSorting: true,
        };
    }), []);

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable<Sale>({
        data: tableData,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className="table-container">
            <ColumnHeader table={table} />
            {isLoading && <LoadingElement />}
            {productSales &&
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr className="tr" key={row.id}>
                                {row.getVisibleCells().map(cell => 
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                )}
                            </tr>    
                        )})}
                </tbody>
            }
        </table>
    )
}