import { Context, Next } from "hono";
import { zodSchema } from "@learndev/todo-common";
import { HttpStatusCode } from "../share/enum";

// middleware for validation
export const validate = (schema: zodSchema) => {
  return async (c: Context, next: Next) => {
    const { success, error } = schema.safeParse(await c.req.json());
    if (!success) {
      return c.json({
        statusCode: HttpStatusCode.BadRequest,
        response: error,
        message: 'invalid data'
      }, HttpStatusCode.BadRequest);
    }
    await next();
  };
};
