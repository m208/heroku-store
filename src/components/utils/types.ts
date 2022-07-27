export type CrElementOptions = {
    tag: string;
    styles?: string;
    caption?: string;
    option?: { param: string, value: string };
    type?: string;
    id?: string;
};

export type ItemData = {
    id: string;
    name: string;
    cost: number;
    descr: string;
};

export type createListOptions = {
    header: string;
    buttons: string[];
    range: TRange;
};

export type StoreItemData = { [index: string]: string };

export type FilterParameters = { [index: string]: string[] | TRange };

export interface TRange {
    min: number;
    max: number;
}

export type SortTypes = {
    [index: string]: SortOrder;
};

type SortOrder = 'Asc' | 'Desc';

export interface IViewOptionsExt {
    sort: SortTypes;
    filters: FilterParameters;
    filtersBySingle: string[];
    search?: string;

    filtersByTag: { [index: string]: string[] };
    filtersByRange: { [index: string]: TRange };
}


export type IViewOptions = Omit<IViewOptionsExt, "filtersByTag" | "filtersByRange">;

export type LocalStorageItems = {
    cart: string[];
    favorites: string[];
};
export type ItemStoreState = {
    cart: boolean;
    favorites: boolean;
};

export type TStore = {
    cart: string[];
    favorites: string[];
};

export type TCallBackDrawData = { (data: StoreItemData[], storage: LocalStorageItems): void; };

export type Tcb = TFilterCb | TFilterCbCb | TFilterRangeCb | TSortCb | TResetCb | TSearchCb;

export type TFilterCb = ((name: string, value: string) => void);
export type TFilterCbCb = ((name: string) => void);
export type TFilterRangeCb = ((name: string, value: TRange) => void);
export type TSortCb = ((type: SortTypes) => void);
export type TResetCb = ((name: string) => void);
export type TSearchCb = ((query: string) => void);