import { SortingFn, sortingFns } from "@tanstack/react-table"
import { compareItems } from "@tanstack/match-sorter-utils"

export function sortingFunction(rowA: any, rowB: any, columnId: string): SortingFn<any> | number {
    let dir = 0

    if (rowA.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]!,
        rowB.columnFiltersMeta[columnId]!
      )
    }

    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}