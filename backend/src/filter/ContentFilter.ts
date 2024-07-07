import { User } from "@prisma/client/edge";
import { Filter, FilterModifier } from "../share/interface";

export class ContentFilter implements Filter<string, string> {

  checkPermissions(user: User): boolean {
    return true;
  }

  createQueryModifier(value: string | undefined): FilterModifier | undefined {
    if (value) {
      return {
        ['content']: { contains: value }
      };
    }
    return undefined;
  }

  matchKey(filterKey: string): boolean {
    return filterKey === 'content';
  }

  validateValue(value: string): string {
    return value;
  }

}