import { Sort, SortModifier } from "../share/interface";

export class IsDoneSort implements Sort<string, string> {
  createQueryModifier(value: 'asc' | 'desc' | undefined): SortModifier | undefined {
    if (value) {
      return {
        ['isDone']: value,
      };
    }
    return undefined;
  }

  matchKey(sortKey: string): boolean {
    return sortKey === 'isDone';
  }

  validateValue(value: string): 'asc' | 'desc' {
    return value === 'asc' ? 'asc' : 'desc';
  }
}