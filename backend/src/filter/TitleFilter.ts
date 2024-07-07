import { User } from "@prisma/client/edge";
import { Filter, FilterModifier } from "../share/interface";

export class TitleFilter implements Filter<string, string> {

  checkPermissions(user: User): boolean {
    return true;
  }

  createQueryModifier(value: string | undefined): FilterModifier | undefined {
    if (value) {
      return {
        ['title']: { contains: value }
      };
    }
    return undefined;
  }

  matchKey(filterKey: string): boolean {
    return filterKey === 'title';
  }

  validateValue(value: string): string {
    return value;
  }

}