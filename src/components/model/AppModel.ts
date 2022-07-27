import { FiltersPickNames, FiltersRangeNames } from "../utils/constants";
import { FilterParameters, IViewOptions, LocalStorageItems, SortTypes, StoreItemData, TRange } from "../utils/types";
import LocalStorage from "./StorageModel";

export default class AppModel {
    goods: StoreItemData[] = [];

    tagsSources: { [index: string]: string[] } = {};
    rangeSources: { [index: string]: TRange } = {};

    localStorage: LocalStorage;

    defaultSettings: IViewOptions = {
        filters: {},
        filtersBySingle: [],
        sort: { name: 'Asc' }
    };

    constructor() {
        this.localStorage = new LocalStorage();
    }

    async loadData() {
        const response = await fetch('././json/goods.json');
        this.goods = await response.json();
        this.setSources();
        this.findTopRating();
        this.findPopular();
    }

    getData(options: IViewOptions) {
        let filtered = this.filterData(options.filters);
        if (options.filtersBySingle)
            filtered = this.filterDataBySingleParam(filtered, options.filtersBySingle);
        const sorted = this.sortData(filtered, options.sort);
        return (options.search) ? this.searchData(sorted, options.search) : sorted;
    }

    setLocalStore(item: string, category: string) {             // move it tp controller? 

        const store = this.getLocalStore();
        const i = <keyof typeof store>category;

        if (store[i].includes(item)) {
            const index = store[i].indexOf(item);
            store[i].splice(index, 1);
        } else {
            store[i].push(item);
        }

        this.localStorage.setStore(store);
    }

    getLocalStore() {
        const local = this.localStorage.getStore();
        const empty: LocalStorageItems = { cart: [], favorites: [] };
        return (local) ? local : empty;
    }

    getLocalSettings(): IViewOptions {
        const local = this.localStorage.getSettings();

        return (local) ? local : JSON.parse(JSON.stringify(this.defaultSettings));
    }

    findTopRating() {
        this.goods.forEach(item => {
            if (+item.rating > 4) item['topRated'] = 'true';
        });
    }

    findPopular() {
        this.goods.forEach(item => {
            if (+item.reviews > 15) item['popular'] = 'true';
        });
    }

    setSources() {
        const keysPick = Object.keys(FiltersPickNames);
        const keysRange = Object.keys(FiltersRangeNames);

        keysPick.forEach(key => {
            const tags = new Set(this.goods.map(item => item[key]));
            this.tagsSources[key] = Array.from(tags);
        });

        keysRange.forEach(key => {
            const min = Math.min(...(this.goods.map(item => +item[key])));
            const max = Math.max(...(this.goods.map(item => +item[key])));

            this.rangeSources[key] = { min, max };
        });
    }

    getTagSources() {
        return this.tagsSources;
    }

    getRangeSources() {
        return this.rangeSources;
    }

    filterData(filters: FilterParameters) {
        let filtered = [...this.goods];

        Object.entries(filters).forEach(([key, value]) => {

            filtered = filtered.filter((item) => {
                if (Array.isArray(value)) {
                    if (value.length > 0) return (value).includes(item[key]);
                    else return item[key];
                }
                else


                    return (parseFloat(item[key]) <= +value.max && parseFloat(item[key]) >= +value.min);
            });


        });
        return filtered;
    }

    filterDataBySingleParam(items: StoreItemData[], filters: string[]) {
        let filtered = [...items];
        filters.forEach(filter => {
            filtered = filtered.filter(item => (item[filter] === 'true'));
        });

        return filtered;
    }

    sortData(items: StoreItemData[], sortOptions: SortTypes) {

        const [rule, order] = Object.entries(sortOptions)[0];

        if (rule === 'name') {
            return items.sort((a, b) => {
                return (order === 'Asc') ? (a[rule].localeCompare(b[rule])) : (b[rule].localeCompare(a[rule]));
            });
        }

        else {
            return items.sort((a, b) => {
                return (order === 'Asc')
                    ? (+(a[rule] ?? 0) - +(b[rule] ?? 0))
                    : (+(b[rule] ?? 0) - +(a[rule] ?? 0));
            });
        }

    }

    searchData(items: StoreItemData[], searchQuery: string) {
        return items.filter(item => {
            return (item.brand.toLowerCase() + ' ' + item.name.toLowerCase())
                .includes(searchQuery.toLowerCase());
        });
    }

}
