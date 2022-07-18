import { ICategory } from "./category.interface";

export interface IProduct {
    id: number;
    name: string;
    code: string;
    quantity: number;
    is_active: boolean;
    categoryId: number;
    Category: ICategory;
}
