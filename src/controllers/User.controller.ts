import ErrorServer from "@controllers/ErrorServer.controller";
import User from "@models/user/user.model";
import { TQUser, TPUser } from "@models/user/user.entity";

export default class UserController {
  private model = new User();

  /**
   * @description Find users.
   * @param {TQUser} query
   * @returns Users array. */
  async findUsers(query?: TQUser) {
    return await this.model.findMany(query);
  }

  /**
   * @description Find a user.
   * @param {TQUser} query
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async findUser(query: TQUser) {
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
  async createUser({ ...payload }: TPUser) {
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
   * @param {TQUser} query
   * @param {TPUser} payload
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async updateUser(query: TQUser, payload: TPUser) {
    await this.findUser(query);
    return await this.model.update(query, payload);
  }

  /**
   * @description Delete a user by id.
   * @param {TQUser} query
   * @throws {ErrorServer} User not found.
   * @returns User. */
  async deleteUser(query: TQUser) {
    await this.findUser(query);
    return await this.model.delete(query);
  }
}
