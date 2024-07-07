import { Context, Next } from "hono";
import { Sort, SortModifier } from "../share/interface";
import { HttpStatusCode } from "../share/enum";

// middleware for sorting
export const sort = (sort: Sort<any, any>[]) => {
  return async (c: Context, next: Next) => {
    const requestSort = JSON.parse(c.req.query('sort') || '');
    const sortEntries = requestSort ? Object.entries(requestSort) : [];
    const sortModifiers: SortModifier[] = [];
    for (const [key, value] of sortEntries) {
      const matchedSort = sort.find(f => f.matchKey(key));
      if (!matchedSort) {
        return c.json({
          statusCode: HttpStatusCode.NotImplement,
          response: {},
          message: 'This sort not implement',
        }, HttpStatusCode.NotImplement);
      }
      const parsedValue = matchedSort.validateValue(value);
      const sortModifier = matchedSort.createQueryModifier(parsedValue);
      if (sortModifier) {
        sortModifiers.push(sortModifier);
      }
    }

    c.set('sort', sortModifiers);
    await next();
  };
};

