import ErrorServer from "@controllers/ErrorServer.controller";
import Product from "@models/products/products.model";
import { TQProduct, TPProduct } from "@models/products/products.entity";

export default class ProductsController {
  private model = new Product();

  /**
   * @description Find users.
   * @param {TQProduct} query
   * @returns Users array. */
  async findUsers(query?: TQProduct) {
    return await this.model.findMany(query);
  }

  /**
   * @description Find a user.
   * @param {TQProduct} query
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async findUser(query: TQProduct) {
    const user = await this.model.findUnique(query);
    if (!user) throw new ErrorServer("NOT_FOUND", "User not found.");
    return user;
  }

  /**
   * @description Create a user.
   * @param {string} password
   * @param {TPPost} payload
   * @returns User. */
  // eslint-disable-next-line consistent-return
  async createUser({ ...payload }: TPProduct) {
    const user = await this.model.findUnique({ email: payload.email });
    console.log(user);
    if (user !== null) {
      return user;
    }
    return await this.model.create({
      username: payload.username,
      email: payload.email,
      photos: payload.photos,
    });
  }

  /**
   * @description Update a user by id.
   * @param {TQProduct} query
   * @param {TPProduct} payload
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async updateUser(query: TQProduct, payload: TPProduct) {
    await this.findUser(query);
    return await this.model.update(query, payload);
  }

  /**
   * @description Delete a user by id.
   * @param {TQProduct} query
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async deleteUser(query: TQProduct) {
    await this.findUser(query);
    return await this.model.delete(query);
  }
}
