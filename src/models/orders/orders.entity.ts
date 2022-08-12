/* eslint-disable prettier/prettier */
export interface IOrder {
    id: Number
    color: String
    size: Number
    shippingaddress: String
    billingaddress: String
    usuario: Number
    producto: Number
}

export type TQOrder = {
    id?: Number
    usuario?: String
    producto?: String
}

export type TPOrder = {
    color: String
    size: Number
    shippingaddress: String
    billingaddress: String
    usuario: File
    producto: Number
}
