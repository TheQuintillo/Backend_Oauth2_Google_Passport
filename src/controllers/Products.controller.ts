import ErrorServer from "@controllers/ErrorServer.controller";
import Product from "@models/products/products.model";
import { TQProduct, TPProduct } from "@models/products/products.entity";

export default class ProductsController {
  private model = new Product();

  /**
   * @description Find users.
   * @param {TQProduct} query
   * @returns Users array. */
  async findProducts(query?: TQProduct) {
    return await this.model.findMany(query);
  }

  /**
   * @description Find a user.
   * @param {TQProduct} query
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async findProduct(query: TQProduct) {
    const product = await this.model.findUnique(query);
    if (!product) throw new ErrorServer("NOT_FOUND", "Product not found.");
    return product;
  }

  /**
   * @description Create a user.
   * @param {string} password
   * @param {TPPost} payload
   * @returns User. */
  // eslint-disable-next-line consistent-return
  async createProduct({ ...payload }: TPProduct) {
   /* const product = await this.model.findUnique({ name: payload.name });
    console.log(product);
    if (product !== null) {
      return product;
    }*/
    console.log(payload);
    return await this.model.create(payload);
  }

  /**
   * @description Update a user by id.
   * @param {TQProduct} query
   * @param {TPProduct} payload
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async updateProduct(query: TQProduct, payload: TPProduct) {
    await this.findProduct(query);
    return await this.model.update(query, {
      name: payload.name,
      price: payload.price,
      colors: payload.colors,
      sizes: payload.sizes,
      photos: payload.photos,
  });
  }

  /**
   * @description Delete a user by id.
   * @param {TQProduct} query
   * @throws {ErrorServer} User not found.
   * @returns; User. */
  async deleteProduct(query: TQProduct) {
    await this.findProduct(query);
    return await this.model.delete(query);
  }
}
