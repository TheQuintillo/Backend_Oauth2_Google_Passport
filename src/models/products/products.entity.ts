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
    name?: Boolean
    price?: Number
    colors?: String
    sizes?: String
    photos?: String
}
