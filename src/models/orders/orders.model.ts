import Model from "@models/Model";
import { IOrder, TQOrder, TPOrder } from "./orders.entity";

/**
 * @class User
 * @extends Model
 * @description User Model Class. */
export default class Order extends Model<IOrder, TQOrder, TPOrder> {
  /**
   * @constructor
   * @description Generate link to Prisma model. */
  constructor() {
    super("pedidos");
  }

  /**
   * @description Find pool of users.
   * @param {TQOrder} query Query to find users.
   * @returns User array. */
  async findMany(query?: TQOrder) {
    return [
      await this.client.findMany({
        where: query,
        include: { user: true, product: true },
      }),
      await this.client.count(),
    ];
  }

  /**
   * @description Find a user.
   * @param {TQOrder} query Query to find user.
   * @returns User. */
  async findUnique(query: TQOrder) {
    return await this.client.findUnique({ where: query });
  }

  /**
   * @description Create a user.
   * @param {TPOrder} payload Payload to create a user.
   * @returns User. */
  async create(payload: TPOrder) {
    return await this.client.create({ data: payload });
  }

  /**
   * @description Update a user.
   * @param {TQOrder} query Query to find user.
   * @param {TPOrder} payload Payload to create a user.
   * @returns User. */
  async update(query: TQOrder, payload: TPOrder) {
    return await this.client.update({ where: query, data: payload });
  }

  /**
   * @description Delete a user.
   * @param {TQOrder} query Query to find user.
   * @returns User. */
  async delete({ id }: TQOrder) {
    return await this.client.delete({ where: { id } });
  }
}
