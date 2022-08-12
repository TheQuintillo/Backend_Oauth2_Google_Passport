import ErrorServer from "@controllers/ErrorServer.controller";
import Order from "@models/orders/orders.model";
import { TQOrder, TPOrder } from "@models/orders/orders.entity";

export default class OrdersController {
  private model = new Order();

  /**
   * @description Find users.
   * @param {TQOrder} query
   * @returns Users array. */
  async findOrders(query?: TQOrder) {
    return await this.model.findMany(query);
  }

  /**
   * @description Find a user.
   * @param {TQOrder} query
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async findOrder(query: TQOrder) {
    const order = await this.model.findUnique(query);
    if (!order) throw new ErrorServer("NOT_FOUND", "Order not found.");
    return order;
  }

  /**
   * @description Create a user.
   * @param {string} password
   * @param {TPPost} payload
   * @returns User. */
  // eslint-disable-next-line consistent-return
  async createOrder({ ...payload }: TPOrder) {
    /* const Order = await this.model.findUnique({ name: payload.name });
    console.log(Order);
    if (Order !== null) {
      return Order;
    }
    await this.model.create({
      name: payload.name,
      price: payload.price,
      colors: payload.colors,
      sizes: payload.sizes,
      photos: payload.photos,
    }); */
  }

  /**
   * @description Update a user by id.
   * @param {TQOrder} query
   * @param {TPOrder} payload
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async updateOrder(query: TQOrder, payload: TPOrder) {
    await this.findOrder(query);
    return await this.model.update(query, payload);
  }

  /**
   * @description Delete a user by id.
   * @param {TQOrder} query
   * @throws {ErrorServer} User not found.
   * @returns; User. */
  async deleteOrder(query: TQOrder) {
    await this.findOrder(query);
    return await this.model.delete(query);
  }
}
