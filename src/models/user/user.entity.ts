/* eslint-disable prettier/prettier */
export interface IUser {
    id: Number
    username: String
    email: String
}

export type TQUser = {
    id?: Number
    username?: String
    email?: String
}

export type TPUser = {
    username?: String
    email?: String
    photos?: String
}