import Prisma from "@libs/Prisma";

export default abstract class Model<TModel, TQuery, TPayload> {
  protected client: Prisma;

  protected constructor(model: string) {
    this.client = new Prisma(model);
  }

  /**
   * @abstract
   * @description Abstract method to find registers in model.
   * @param query Query to find registers.
   * @returns Array of register of model. */
  abstract findMany(query?: TQuery): Promise<TModel[]>;

  /**
   * @abstract
   * @description Abstract method to find register in model.
   * @param query Query to find registers.
   * @returns Register in model. */
  abstract findUnique(query?: TQuery): Promise<TModel>;

  /**
   * @abstract
   * @description Abstract method to find register in model.
   * @param payload Payload to create register.
   * @returns Register in model as result set. */
  abstract create(payload: TPayload): Promise<TModel>;

  /**
   * @abstract
   * @description Abstract method to update a register in model.
   * @param query Query to find register.
   * @param payload Payload to update register.
   * @returns Register in model as result set. */
  abstract update(query: TQuery, payload: TPayload): Promise<TModel>;

  /**
   * @abstract
   * @description Abstract method to delete a register in model.
   * @param query Query to find register.
   * @returns Register in model as result set. */
  abstract delete(query: TQuery): Promise<TModel>;
}
