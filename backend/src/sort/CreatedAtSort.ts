import { Sort, SortModifier } from "../share/interface";

export class CreatedAtSort implements Sort<string, string> {
  createQueryModifier(value: 'asc' | 'desc' | undefined): SortModifier | undefined {
    if (value) {
      return {
        ['createdAt']: value,
      };
    }
    return undefined;
  }

  matchKey(sortKey: string): boolean {
    return sortKey === 'createdAt';
  }

  validateValue(value: string): 'asc' | 'desc' {
    return value === 'asc' ? 'asc' : 'desc';
  }
}