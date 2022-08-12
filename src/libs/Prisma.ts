/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import ErrorServer from '@controllers/ErrorServer.controller';

interface IParams {
    data?: {
        [key: string]: any
    }
    include?: {
        [key: string]: boolean
    }
    where?: {
        AND?: Array<{
            [key: string]: any
        }>
        OR?: Array<{
            [key: string]: any
        }>

        [key: string]: any
    } 
    orderBy?: Array<{
            [key: string]: any
    }>
    select?: Array<{
        [key: string]: any
    }>
}

export default class Prisma {
    
    private readonly resource: string

    private readonly client: PrismaClient = new PrismaClient()

    constructor(resource: string) {
        this.resource = resource
    }

    private connect() {
        const model = Object.entries(this.client).find(
            ([key]) => key === this.resource
        )
        if(!model)
            throw new ErrorServer('SERVER', `Model ${this.resource} not found`)
            return model[1]
    }

    findUnique(params: IParams) {
        return this.connect().findUnique(params)
    }

    /**
     * @description Find all registers in model.
     * @returns Result. */
     findMany(params: IParams) {
        return this.connect().findMany(params)
    }

    /**
     * @description Get a count of registers in model.
     * @returns Result. */
    count() {
        return this.connect().count()
    }

    /**
     * @description Create a registers in model.
     * @returns Result. */
    create(params: IParams) {
        return this.connect().create(params)
        this.client.$disconnect();
    }

    /**
     * @description Update a register in model.
     * @returns Result. */
    update(params: IParams) {
        return this.connect().update(params)
    }

    /**
     * @description Delete a register in model.
     * @returns Result. */
    delete(params: IParams) {
        return this.connect().delete(params)
    }

}