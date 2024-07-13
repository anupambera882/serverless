import { Sort, SortModifier } from "../share/interface";

export class UpdateAtSort implements Sort<string, string> {
  createQueryModifier(value: 'asc' | 'desc' | undefined): SortModifier | undefined {
    if (value) {
      return {
        ['updateAt']: value,
      };
    }
    return undefined;
  }

  matchKey(sortKey: string): boolean {
    return sortKey === 'updateAt';
  }

  validateValue(value: string): 'asc' | 'desc' {
    return value === 'asc' ? 'asc' : 'desc';
  }
}