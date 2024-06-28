import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { HttpStatusCode } from "../share/enum";

// middleware use for authenticate
export const auth = async ({ req, json, env, set }: Context, next: Next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }

  if (!authHeader.startsWith('Bearer ')) {
    return json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }

  const token = authHeader.split(' ')?.[1];
  if (!token) {
    return json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }

  try {
    const payload = await verify(token, env.JWT_SECRET);
    if (!payload) {
      return json({
        statusCode: HttpStatusCode.Unauthorized,
        response: {},
        message: 'Unauthorized'
      }, HttpStatusCode.Unauthorized);
    }

    set('userId', payload.userId);
    await next();
  } catch (err) {
    return json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }
}
