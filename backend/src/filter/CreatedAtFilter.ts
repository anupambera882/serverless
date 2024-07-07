import { User } from "@prisma/client/edge";
import { Filter, FilterModifier } from "../share/interface";

export class CreatedAtFilter implements Filter<string, string> {

  checkPermissions(user: User): boolean {
    return true;
  }

  createQueryModifier(value: string | undefined): FilterModifier | undefined {
    if (!value) {
      return undefined;

    }

    const formattedDate = value.split('/').reverse().join('-');
    const date = new Date(formattedDate);

    if (isNaN(date.getTime())) {
      return undefined;
    }

    const startDate = new Date(formattedDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(formattedDate);
    endDate.setHours(23, 59, 59, 999);

    return {
      ['createdAt']: {
        gte: startDate,
        lt: endDate
      }
    };
  }

  matchKey(filterKey: string): boolean {
    return filterKey === 'createdAt';
  }

  validateValue(value: string): string {
    return value;
  }
}
