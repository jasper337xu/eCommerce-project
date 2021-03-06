export class Product {
    // check out backend API http://localhost:8080/api/products
    id: number;
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
}

export interface ProductSearch {
    // new properties for pagination
    pageNumber?: number,
    pageSize?: number,
    
    productCategoryId?: number,
    searchKeyword?: string,
}
