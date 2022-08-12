/* eslint-disable prettier/prettier */
export interface IProduct {
    id: Number
    name: String
    price: Number
    colors: String
    sizes: String
    photos: File
    orders: Number
}

export type TQProduct = {
    id?: Number
    name?: String
    order?: Object
}

export type TPProduct = {
    product?: String
    color?: String
    size?: String
    shippingAddress?: String;
    billingAddress?: String;
    productId?: Number;
}
