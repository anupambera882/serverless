import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { auth } from "../middleware/auth.middleware";
import { PrismaClient } from "@prisma/client/edge";
import bcrypt from 'bcryptjs';
import { getCookie, setCookie } from "hono/cookie";
import { validate } from "../middleware/validation.middleware";
import { SignInInput, SignUpInput, signInInput, signUpInput } from "@learndev/todo-common";
import { HttpStatusCode } from "../share/enum";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId?: string
  }
}>();

userRouter.post('/signup', validate(signUpInput), async ({ req, env, json, status }) => {
  const prisma = new PrismaClient({
    datasourceUrl: env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password, firstName, lastName } = await req.json() as SignUpInput;

  const isEmailExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isEmailExist) {
    return json({
      statusCode: HttpStatusCode.Forbidden,
      response: {},
      message: 'User already exist'
    }, HttpStatusCode.Forbidden);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      firstName,
      lastName,
    }
  });
  const jwt = await sign({ id: user.id }, env.JWT_SECRET);
  return json({
    statusCode: HttpStatusCode.Created,
    response: { jwt },
    message: 'signup successful'
  }, HttpStatusCode.Created);
});

userRouter.post('/signin', validate(signInInput), async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json() as SignInInput;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return c.json({
      statusCode: HttpStatusCode.Forbidden,
      response: {},
      message: 'User not found'
    }, HttpStatusCode.Forbidden);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return c.json({
      statusCode: HttpStatusCode.Forbidden,
      response: {},
      message: 'Invalid credentials',
    }, HttpStatusCode.Forbidden);
  }

  const refreshToken = await sign(
    { userId: user.id, email: user.email },
    c.env.JWT_SECRET,
  );
  const accessToken = await sign(
    { userId: user.id, email: user.email },
    c.env.JWT_SECRET,
  );

  setCookie(c, 'refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 34560000,
  });

  return c.json({
    statusCode: HttpStatusCode.Ok,
    response: {
      accessToken,
      ...user,
      password: undefined,
    },
    message: 'login successful!!',
  }, HttpStatusCode.Ok);
});

userRouter.get('/get-me', auth, async ({ get, env, json }) => {
  const userId = get('userId') as string;
  const prisma = new PrismaClient({
    datasourceUrl: env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: { id: +userId },
  });

  return json({
    statusCode: HttpStatusCode.Ok,
    response: { ...user, password: undefined },
    message: 'retrieve details successfully',
  }, HttpStatusCode.Ok);
});

userRouter.get('/access-token', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const refreshToken = getCookie(c, 'refreshToken');
  if (!refreshToken) {
    return c.json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }

  let user;
  try {
    user = await verify(refreshToken, c.env?.JWT_SECRET);

    if (!user.userId || !user.email) {
      return c.json({
        statusCode: HttpStatusCode.Unauthorized,
        response: {},
        message: 'Unauthorized'
      }, HttpStatusCode.Unauthorized);
    }
  } catch (error) {
    return c.json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }

  const findUser = await prisma.user.findFirst({
    where: { id: user.userId, email: user.email },
  });

  if (!findUser) {
    return c.json({
      statusCode: HttpStatusCode.Unauthorized,
      response: {},
      message: 'Unauthorized'
    }, HttpStatusCode.Unauthorized);
  }

  const accessToken = await sign({ userId: findUser.id, email: findUser.email }, c.env.JWT_SECRET);

  return c.json({
    statusCode: HttpStatusCode.Ok,
    response: {
      accessToken,
      ...findUser,
      password: undefined,
    },
    message: 'Verify successfully!!',
  }, HttpStatusCode.Ok);
})

export default userRouter;
