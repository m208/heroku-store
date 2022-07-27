import { SortTypes, TRange } from "./types";

export function isRange(value: string[] | string | TRange | SortTypes): value is TRange {
    return (value as TRange)?.min !== undefined;
}