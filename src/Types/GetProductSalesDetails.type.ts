export interface Sale {
    weekEnding: string,
    retailSales: number,
    wholesaleSales: number, 
    unitsSold: number,
    retailerMargin: number
};

export type Sales = Sale[];

export type Tags = string[];

export type Details = string[];

export interface Review {
    customer: string, 
    review: string, 
    score: number,
};

export type Reviews = Review[];

export interface ProductSaleDetails {
    id: string,
    title: string,
    image: string, 
    subtitle: string,
    brand: string,
    reviews: Reviews,
    retailer: string,
    details: Details,
    tags: Tags,
    sales: Sales
}

export type ProductSalesResponseType = ProductSaleDetails[];