import { User } from "@prisma/client/edge";
import { Filter, FilterModifier } from "../share/interface";

export class IsDoneFilter implements Filter<string, string> {

  checkPermissions(user: User): boolean {
    return true;
  }

  createQueryModifier(value: string | undefined): FilterModifier | undefined {
    if (value) {
      return {
        ['isDone']: JSON.parse(value)
      };
    }
    return undefined;
  }

  matchKey(filterKey: string): boolean {
    return filterKey === 'isDone';
  }

  validateValue(value: string): string {
    return value;
  }

}