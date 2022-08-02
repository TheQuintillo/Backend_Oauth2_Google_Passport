import Model from "@models/Model";
import { IProduct, TQProduct, TPProduct } from "./products.entity";

/**
 * @class User
 * @extends Model
 * @description User Model Class. */
export default class Product extends Model<IProduct, TQProduct, TPProduct> {
  /**
   * @constructor
   * @description Generate link to Prisma model. */
  constructor() {
    super("product");
  }

  /**
   * @description Find pool of users.
   * @param {TQProduct} query Query to find users.
   * @returns User array. */
  async findMany(query?: TQProduct) {
    return [
      await this.client.findMany({ where: query }),
      await this.client.count(),
    ];
  }

  /**
   * @description Find a user.
   * @param {TQProduct} query Query to find user.
   * @returns User. */
  async findUnique(query: TQProduct) {
    return await this.client.findUnique({ where: query });
  }

  /**
   * @description Create a user.
   * @param {TPProduct} payload Payload to create a user.
   * @returns User. */
  async create(payload: TPProduct) {
    return await this.client.create({ data: payload });
  }

  /**
   * @description Update a user.
   * @param {TQProduct} query Query to find user.
   * @param {TPProduct} payload Payload to create a user.
   * @returns User. */
  async update(query: TQProduct, payload: TPProduct) {
    return await this.client.update({ where: query, data: payload });
  }

  /**
   * @description Delete a user.
   * @param {TQProduct} query Query to find user.
   * @returns User. */
  async delete({ id }: TQProduct) {
    return await this.client.delete({ where: { id } });
  }
}
