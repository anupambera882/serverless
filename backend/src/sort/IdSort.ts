import { Sort, SortModifier } from "../share/interface";

export class IdSort implements Sort<string, string> {
  createQueryModifier(value: 'asc' | 'desc' | undefined): SortModifier | undefined {
    if (value) {
      return {
        ['id']: value,
      };
    }
    return undefined;
  }

  matchKey(sortKey: string): boolean {
    return sortKey === 'id';
  }

  validateValue(value: string): 'asc' | 'desc' {
    return value === 'asc' ? 'asc' : 'desc';
  }
}