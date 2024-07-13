import { Sort, SortModifier } from "../share/interface";

export class TitleSort implements Sort<string, string> {
  createQueryModifier(value: 'asc' | 'desc' | undefined): SortModifier | undefined {
    if (value) {
      return {
        ['title']: value,
      };
    }
    return undefined;
  }

  matchKey(sortKey: string): boolean {
    return sortKey === 'title';
  }

  validateValue(value: string): 'asc' | 'desc' {
    return value === 'asc' ? 'asc' : 'desc';
  }
}