import { User } from "@prisma/client/edge";

export interface Filter<RawInputType, ParseInputType> {
	matchKey(filterKey: string): boolean;

	validateValue(value: RawInputType): ParseInputType;

	checkPermissions(user: User): boolean;

	createQueryModifier(value: ParseInputType | undefined): FilterModifier | undefined;
}

export interface FilterModifier {
	[x: string]: any;
}

export interface Sort<RawInputType, ParseInputType> {
	matchKey(filterKey: string): boolean;

	validateValue(value: RawInputType): 'asc' | 'desc';

	createQueryModifier(value: ParseInputType | undefined): SortModifier | undefined;
}

export interface SortModifier {
	[x: string]: 'asc' | 'desc';
}
