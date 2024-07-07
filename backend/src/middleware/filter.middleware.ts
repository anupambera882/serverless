import { Context, Next } from "hono";
import { Filter, FilterModifier } from "../share/interface";
import { HttpStatusCode } from "../share/enum";

// middleware for filter
export const filter = (filters: Filter<any, any>[]) => {
  return async (c: Context, next: Next) => {
    const requestFilters = JSON.parse(c.req.query('filter') || '');
    const filterEntries = requestFilters ? Object.entries(requestFilters) : [];
    const modifiers: FilterModifier[] = [];
    for (const [key, value] of filterEntries) {
      const filter = filters.find(f => f.matchKey(key));
      if (!filter) {
        return c.json({
          statusCode: HttpStatusCode.NotImplement,
          response: {},
          message: 'This filter not implement',
        }, HttpStatusCode.NotImplement);
      }
      const parsedValue = filter.validateValue(value);
      const filterModifier = filter.createQueryModifier(parsedValue);
      if (filterModifier) {
        modifiers.push(filterModifier);
      }
    }

    const filter = Object.assign({}, ...modifiers.map((val) => val));
    c.set('filter', filter);
    await next();
  };
};
