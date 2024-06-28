import z, { ZodSchema } from 'zod';

export abstract class zodSchema extends ZodSchema{};
export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});


export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;