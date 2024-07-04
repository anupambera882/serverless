import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { auth } from "../middleware/auth.middleware";
import { PrismaClient } from "@prisma/client/edge";
import { validate } from "../middleware/validation.middleware";
import { CreateBlogInput, UpdateBlogInput, createBlogInput, updateBlogInput } from "@learndev/todo-common";
import { HttpStatusCode } from "../share/enum";

const todoRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables: {
		userId?: string
	}
}>();

todoRouter.post('/create', auth, validate(createBlogInput), async (c) => {
	const userId = c.get('userId') as string;
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const { content, title } = await c.req.json() as CreateBlogInput;
	const todo = await prisma.todo.create({
		data: {
			title,
			content,
			createdBy: +userId
		}
	});
	return c.json({
		statusCode: HttpStatusCode.Created,
		response: todo,
		message: 'todo create successfully!!',
	}, HttpStatusCode.Created);
})

todoRouter.get('/all', auth, async (c) => {
	const userId = c.get('userId') as string;
	let page = (c.req.query('page') || 0) as number;
	let limit = (c.req.query('limit') || 25) as number;
	[limit, page] = [Math.max(1, limit), Math.max(0, page)];
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const where = {
		createdBy: +userId
	};

	const allTodo = await prisma.todo.findMany({
		where,
		select: {
			id: true,
			title: true,
			content: true,
			isDone: true,
			createdAt: true,
			updateAt: true,
			createdBy: true,
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: limit,
		skip: page * limit
	});

	const total = await prisma.todo.count({ where })

	return c.json({
		statusCode: HttpStatusCode.Ok,
		response: {
			data: allTodo,
			metaData: {
				pageNumber: page,
				limitCount: limit,
				total,
			},
		},
		message: 'All todo retrieve successfully!!',
	}, HttpStatusCode.Ok);
});

todoRouter.get('/:id', auth, async (c) => {
	const userId = c.get('userId') as string;
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const todo = await prisma.todo.findUnique({
		where: {
			createdBy: +userId,
			id: +id
		}
	});

	if (!todo) {
		return c.json({
			statusCode: HttpStatusCode.NotFound,
			response: {},
			message: 'todo not exist',
		}, HttpStatusCode.NotFound);
	}

	return c.json({
		statusCode: HttpStatusCode.Ok,
		response: todo,
		message: 'todo retrieve successfully!!',
	}, HttpStatusCode.Ok);
});

todoRouter.put('/:id', auth, validate(updateBlogInput), async (c) => {
	const userId = c.get('userId') as string;
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json() as UpdateBlogInput;
	const todo = await prisma.todo.update({
		where: {
			id: +id,
			createdBy: +userId
		},
		data: {
			...body
		}
	});

	return c.json({
		statusCode: HttpStatusCode.Ok,
		response: todo,
		message: 'todo update successfully!!',
	}, HttpStatusCode.Ok);
});

export default todoRouter;
